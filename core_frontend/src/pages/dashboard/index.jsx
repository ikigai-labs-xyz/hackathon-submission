import { useState } from "react"
import Confetti from "react-confetti"
import { useAccount } from "wagmi"
import NavBar from "../../components/dashboard/Navbar"
import NoWallet from "../../components/dashboard/NoWallet"
import useWindowSize from "../../hooks/useWindowSize"

const PageState = {
  getStarted: "getStarted",
  mintNft: "mintNft",
  auditForm: "auditForm",
  successCongrats: "successCongrats",
}

export default function Dashboard() {
  const [pageState, setPageState] = useState(PageState.performAudit)

  const { address } = useAccount()
  const { width, height } = useWindowSize()

  const [error, setError] = useState("")
  const [success, setSuccess] = useState({ show: false, hash: "" })

  function renderContent() {
    let content = ""
    if (!address) {
      content = <NoWallet />

      return content
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
