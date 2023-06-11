import React, { useEffect } from "react"
import cookie3 from "../../assets/cookie3.svg"
import soonami from "../../assets/soonami.svg"
import XyChart from "./XyChart"
import PieChart from "./PieChart"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import AuditorForm from "./AuditorForm"

import "./Cookie3.css"
import { useQuery, gql } from "@apollo/client"
import Spinner from "../../components/Spinner"

const GET_MINTED_SMART_CONTRACT_NFTS = gql`
  query GetMintedSmartContractNfts {
    mintSmartContractNFTs(
      where: { auditor: "0x98cec326d379850e61cb2bceb3df470c874dd13d" }
    ) {
      id
      auditor
      contractAddress
      securityData_auditor
      securityData_contractType
      blockNumber
      blockTimestamp
    }
  }
`

function Cookie3() {
  const { loading, error, data } = useQuery(GET_MINTED_SMART_CONTRACT_NFTS)

  return (
    <div className="cookie3">
      <div className="section3">
        <div>
          <h2>Audit Data for Wallet</h2>
          <p className="cookie3-image mb-12">
            <ConnectButton />
          </p>

          {loading && <Spinner />}

          {error && <div className="text-red-700">{error}</div>}

          {data &&
            Array.isArray(data?.mintSmartContractNFTs) &&
            data.mintSmartContractNFTs?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="mb-6 flex flex-col items-start w-2/3 mx-auto border-2 border-white rounded-lg p-2 break-all"
                >
                  <p className="self-end">
                    Audited:{" "}
                    {item.blockTimestamp &&
                      new Date(item.blockTimestamp * 1e3).toLocaleString()}
                  </p>

                  <p>Auditor: {item.auditor}</p>
                  <p>ContractAddress: {item.contractAddress}</p>
                  <p>ContractType: {item.securityData_contractType}</p>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Cookie3
