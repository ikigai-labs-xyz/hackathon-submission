import { getContractsOfAddress } from "../utils/api"
import { useEffect, useRef, useState } from "react"
// import { ethers } from "ethers"

export default function useGetContracts(walletAddress) {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [contracts, setContracts] = useState([])

  const prevWalletAddress = useRef("")
  useEffect(() => {
    if (walletAddress === prevWalletAddress.current) {
      return
    }

    ;(async () => {
      try {
        prevWalletAddress.current = walletAddress

        setLoading(true)

        const contracts = await getContractsOfAddress(walletAddress)

        if (!contracts || !contracts.data || !Array.isArray(contracts.data)) {
          throw new Error("Failed to get contracts")
        }

        setContracts(contracts.data)
      } catch (error) {
        console.error(`getContractsOfAddress error: ${error.message}`)
      } finally {
        setLoading(false)
        setLoaded(true)
      }
    })()
  }, [contracts, walletAddress])

  return {
    loading,
    loaded,
    contracts,
  }
}
