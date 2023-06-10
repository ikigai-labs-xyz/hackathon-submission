import { chainIdToExplorerUrl } from "../../utils/chainMapping"

export default function MintSuccess({ hash, contract }) {
  const explorerUrl = chainIdToExplorerUrl[contract.chain?.toString()]
  const explorerFullurl = explorerUrl && `${explorerUrl}/tx/${hash}`

  return (
    <>
      <div className="w-full items-center justify-between mb-4">
        <h2 className="flex w-full justify-center text-center font-bold leading-[3rem] text-[#DBDBDB] text-4xl mb-4">
          Congrats! 🎉
        </h2>

        <div className="text-[#8594AB] text-center">
          <div>You successfully minted your audit NFT.</div>

          <div className="mt-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={explorerFullurl}
              className="text-[#3546E0] break-words"
            >
              Explore Transaction: {hash}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
