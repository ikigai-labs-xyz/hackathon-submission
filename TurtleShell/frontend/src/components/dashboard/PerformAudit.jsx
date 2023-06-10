import classNames from "classNames"
import { BsArrowRightShort } from "react-icons/bs"
import Spinner from "../Spinner"
import ContractCard, { CardType } from "./ContractCard"

export default function PerformAudit({
  getContractsLoading,
  contracts,
  setSelectedContract,
  selectedContract,
  performAudit,
  loading,
  loaded,
}) {
  return (
    <>
      <div className="w-full items-center justify-between mb-4">
        <h2 className="flex w-full justify-center text-center font-bold leading-[3rem] text-[#DBDBDB] text-4xl">
          Pick one of your deployed contracts
        </h2>
      </div>

      <div className="mb-4 flex flex-wrap justify-center text-sm">
        {getContractsLoading && <Spinner />}

        {loaded && contracts && contracts.length === 0 && (
          <div className="text-[#8594AB] text-xl">
            No contracts from this wallet address found.
          </div>
        )}

        {contracts.map((contract) => {
          const isSelected =
            contract.address === selectedContract?.address &&
            contract.chain === selectedContract?.chain

          return (
            <ContractCard
              key={`${contract.address}-${contract.chain}`}
              isSelected={isSelected}
              setSelectedContract={setSelectedContract}
              contract={contract}
              cardType={CardType.onPerform}
            />
          )
        })}

        {/* <a
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					target="_blank"
					rel="noopener noreferrer"
				  ></a> */}
      </div>

      <div className="text-center">
        <button
          onClick={() => performAudit(selectedContract)}
          className={classNames(
            `px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`,
            selectedContract?.address === "" && "opacity-50 cursor-not-allowed"
          )}
          disabled={selectedContract?.address === ""}
        >
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              Perform Audit
              <BsArrowRightShort size={20} />
            </div>
          )}
        </button>
      </div>
    </>
  )
}
