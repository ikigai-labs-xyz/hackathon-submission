import { useState } from "react"
import Confetti from "react-confetti"
import { useAccount, useSigner } from "wagmi"
import MintNft from "../../components/dashboard/MintNft"
import NavBar from "../../components/dashboard/Navbar"
import NoWallet from "../../components/dashboard/NoWallet"
import PerformAudit from "../../components/dashboard/PerformAudit"
import useGetContracts from "../../hooks/useGetContractsOfWalletAddress"
import useWindowSize from "../../hooks/useWindowSize"
import AuditorForm from "../../components/dashboard/AuditorForm"
import {
  getAuditsOfContract,
  getBackendSignature,
  getContractType,
  getScoreOfContract,
  getSourceCodeOfContract,
  uploadToIpfs,
} from "../../utils/api"
import { getTurtleTokenContract } from "../../utils/contracts"
import MintSuccess from "../../components/dashboard/MintSuccess"

const PageState = {
  initialForm: "initialForm",
  performAudit: "performAudit",
  mintNft: "mintNft",
  mintSuccess: "mintSuccess",
}

export default function Dashboard() {
  const [pageState, setPageState] = useState(PageState.initialForm)

  const { width, height } = useWindowSize()
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const handleFormSubmit = (values) => {
    // Handle form submission here, then change page state
    setPageState(PageState.performAudit);
  }

  const [selectedContract, setSelectedContract] = useState({
    address: "",
    chain: 0,
  })

  const [loading, setLoading] = useState(false)
  const [audits, setAudits] = useState("")
  const [score, setScore] = useState("")
  const [contractType, setContractType] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState({ show: false, hash: "" })

  const {
    loading: getContractsLoading,
    loaded: getContractsLoaded,
    contracts,
  } = useGetContracts(address)

  async function performAudit(selectedContract, retryCount = 0) {
    if (!selectedContract) return

    try {
      setError("")
      setSuccess({ show: false, hash: "" })
      setLoading(true)

      const sourceCode = await getSourceCodeOfContract(
        selectedContract.address,
        selectedContract.chain
      )

      if (
        sourceCode.data &&
        typeof sourceCode.data?.sources === "string" &&
        sourceCode?.data.sources === ""
      ) {
        setError("No audits found. This contract might not have been verified.")
      }

      if (sourceCode.status !== 200) {
        if (retryCount < 3) {
          console.log(
            `Failed to retrieve source code, trying again retry count ${++retryCount}`
          )
          performAudit(selectedContract, ++retryCount)
          return
        } else {
          throw new Error("Failed to retrieve source code")
        }
      }

      const [audits, contractType] = await Promise.all([
        getAuditsOfContract(sourceCode.data),
        getContractType(sourceCode.data),
      ])

      if (audits.status !== 201 || contractType.status !== 201) {
        if (retryCount < 3) {
          console.log(
            `Failed to retrieve audits or contract type, trying again retry count ${++retryCount}`
          )
          performAudit(selectedContract, ++retryCount)
          return
        } else {
          throw new Error("Failed to retrieve audits or contract type")
        }
      }

      const score = await getScoreOfContract(
        audits.data?.map((auditData) => auditData.vulnerabilityType)
      )

      if (score.status !== 201) {
        if (retryCount < 3) {
          console.log(
            `Failed to retrieve score, trying again retry count ${++retryCount}`
          )
          performAudit(selectedContract, ++retryCount)
          return
        } else {
          throw new Error("Failed to retrieve score")
        }
      }

      setAudits(audits.data)
      setContractType(contractType.data)
      setScore(+score.data / 1e3)

      setPageState(PageState.mintNft)
    } catch (error) {
      console.error(`performAudit error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function onMint(retryCount = 0) {
    if (!selectedContract || !score || !audits || !contractType) return

    try {
      setLoading(true)

      const ipfsData = {
        address: selectedContract.address,
        chain: selectedContract.chain,
        grade: score,
        vulnerabilities: audits?.map(
          (auditData) => auditData.vulnerabilityType
        ),
        contractType,
      }
      const ipfsResult = await uploadToIpfs(ipfsData)

      if (ipfsResult.status !== 201) {
        if (retryCount < 3) {
          console.log(
            `Failed to upload to IPFS, trying again retry count ${++retryCount}`
          )
          onMint(++retryCount)
          return
        } else {
          throw new Error("Failed to upload to IPFS")
        }
      }

      const signature = await getBackendSignature(
        selectedContract.chain,
        selectedContract.address,
        `ipfs://${ipfsResult.data}`,
        score * 1e3,
        contractType
      )

      if (signature.status !== 200) {
        if (retryCount < 3) {
          console.log(
            `Failed to retrieve signature, trying again retry count ${++retryCount}`
          )
          onMint(++retryCount)
          return
        } else {
          throw new Error("Failed to retrieve signature")
        }
      }

      const turtleContract = getTurtleTokenContract(selectedContract.chain)
      const mintData = {
        to: selectedContract.address,
        tokenURI: `ipfs://${ipfsResult.data}`,
        grade: score * 1e3,
        contractType,
      }

      const tx = turtleContract.connect(signer).mint(mintData, signature.data)

      const hash = tx.hash

      await tx.wait()

      setSuccess({ show: true, hash })
      setPageState(PageState.mintSuccess)
      setTimeout(() => {
        setSuccess({ show: false, hash })
      }, 5000)
    } catch (error) {
      console.error(`onMint error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  function renderContent() {
    let content = ""
    if (!address) {
      content = <NoWallet />

      return content
    }

    switch (pageState) {
      case PageState.initialForm:
        content = <AuditorForm onSubmit={handleFormSubmit} />;
        break

      case PageState.performAudit:
        content = (
          <PerformAudit
            getContractsLoading={getContractsLoading}
            contracts={contracts}
            setSelectedContract={setSelectedContract}
            selectedContract={selectedContract}
            performAudit={performAudit}
            loading={loading}
            loaded={getContractsLoaded}
          />
        )
        break

      case PageState.mintNft:
        content = (
          <MintNft
            contract={selectedContract}
            loading={loading}
            score={score}
            audits={audits}
            mintNft={onMint}
          />
        )
        break

      case PageState.mintSuccess:
        content = (
          <MintSuccess hash={success.hash} contract={selectedContract} />
        )
        break
    }

    return content
  }

  return (
    <div className="h-screen w-screen">
      <NavBar />
      <main className=" flex min-h-screen flex-col items-center justify-between p-24">
        {error && <div className="text-red-500 text-xl">{error}</div>}

        {renderContent()}

        {success.show && <Confetti width={width} height={height} />}
      </main>
    </div>
  )
}
