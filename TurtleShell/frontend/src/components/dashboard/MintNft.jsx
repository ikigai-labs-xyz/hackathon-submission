import ContractCard, { CardType } from "./ContractCard"
import Spinner from "../Spinner"
import { BsArrowRightShort } from "react-icons/bs"

export default function MintNft({ contract, loading, mintNft, score, audits }) {
  return (
    <>
      <div className="w-full items-center justify-between mb-4">
        <h2 className="flex w-full justify-center text-center font-bold leading-[3rem] text-[#DBDBDB] text-4xl mb-4">
          Security data ready!
        </h2>

        <div className="text-[#8594AB] text-center">
          <div>The AI model has scanned your contract.</div>
          <div>Mint your security badge now.</div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap justify-center text-sm">
        {loading && <Spinner />}

        <ContractCard
          isSelected={true}
          setSelectedContract={null}
          contract={contract}
          cardType={CardType.onMint}
          grade={score}
        />

        <div className="m-4 p-4 w-[360px] bg-black rounded-sm text-[#8594AB] ">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(
              {
                address: contract.address,
                vulnerabilities: audits?.map?.(
                  (audit) => audit.vulnerabilityType
                ),
                recommendations: [{ solVersion: "0.8.19" }],
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => mintNft()}
          className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              Mint Badge <BsArrowRightShort size={20} />
            </div>
          )}
        </button>
      </div>
    </>
  )
}
