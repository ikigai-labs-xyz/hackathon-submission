import classNames from "classNames"
import Logo from "../../assets/logo.svg"
import { chainIdToExplorerUrl, chainIdToName } from "../../utils/chainMapping"

export const CardType = {
  onPerform: "onPerform",
  onMint: "onMint",
}

export default function ContractCard({
  isSelected,
  setSelectedContract,
  contract,
  cardType,
  grade,
}) {
  const chainName = chainIdToName[contract.chain?.toString()]
  const chainNameCap =
    chainName && chainName?.[0]?.toUpperCase?.() + chainName?.slice?.(1)

  const chainImageSrc =
    chainName === "mainnet" || chainName === "goerli"
      ? "/eth_icon.svg"
      : chainName === "polygon" || chainName === "mumbai"
      ? "/polygon_icon.svg"
      : chainName === "avalanche"
      ? "/avalanche_icon.svg"
      : ""
  if (!chainImageSrc) {
    console.warn("No chain image src")
  }

  const explorerUrl = chainIdToExplorerUrl[contract.chain?.toString()]
  const explorerFullurl =
    explorerUrl && `${explorerUrl}/address/${contract.address}`

  return (
    <div
      className={classNames(
        `m-4 p-4 w-[360px] group rounded-lg transition-colors border-4 border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-300`,
        isSelected && ` border-gray-400 hover:border-gray-500`
      )}
      onClick={
        setSelectedContract
          ? () =>
              setSelectedContract({
                address: contract.address,
                chain: contract.chain,
              })
          : () => {}
      }
    >
      <div className="mb-4 flex items-center font-bold text-xl">
        {cardType === CardType.onPerform ? (
          <>
            <img
              src={chainImageSrc}
              alt={`${contract.chain} icon`}
              width={48}
              height={48}
              className="ml-4"
            />
            <div className="ml-4">{chainNameCap}</div>
          </>
        ) : (
          <>
            <img
              src={Logo}
              alt={`${contract.chain} icon`}
              width={48}
              height={48}
              className="ml-4"
            />
            <div className="ml-4">Turtleshell Security Badge</div>
          </>
        )}
      </div>

      <div className="mb-4">
        <div>address</div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={explorerFullurl}
          className="text-[#3546E0] break-words"
        >
          {contract.address}
        </a>
      </div>

      {cardType === CardType.onPerform && (
        <div className="flex justify-center mt-4 cursor-pointer">
          <img
            src={
              isSelected ? "/checkbox_checked.svg" : "/checkbox_unchecked.svg"
            }
            alt="unchecked checkbox"
            width={48}
            height={48}
          />
        </div>
      )}

      {cardType === CardType.onMint && (
        <div className="mt-4">
          <div>
            <div>chain</div>
          </div>

          <div className="flex text-[#3546E0]">{chainNameCap}</div>
        </div>
      )}

      {cardType === CardType.onMint && (
        <div className="mt-4">
          <div>
            <div>security data provided by</div>
          </div>

          <div className="text-[#3546E0]">Turtleshell AI</div>
        </div>
      )}

      {cardType === CardType.onMint && (
        <div className="mt-4 flex flex-col items-center text-xl">
          <div>
            <div>grade</div>
          </div>

          <div
            className={classNames(
              grade && grade >= 1 && "text-green-500",
              grade && grade < 1 && "text-red-500"
            )}
          >
            {grade?.toFixed(3)}
          </div>
        </div>
      )}
    </div>
  )
}
