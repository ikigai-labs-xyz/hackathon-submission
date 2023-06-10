// @ts-nocheck
import { Currency, Token } from "@uniswap/sdk-core"
import TokenSafety from "components/TokenSafety"
import { memo, useCallback, useEffect, useState } from "react"
import { useUserAddedTokens } from "state/user/hooks"

import useLast from "../../hooks/useLast"
import { useWindowSize } from "../../hooks/useWindowSize"
import Modal from "../Modal"
import { CurrencySearch } from "./CurrencySearch"
import SafetyWarning from "pages/AddLiquidity/SafetyWarning"

import smartContractArtifact from "pages/AddLiquidity/SmartContractNFT.json"
import securedDexArtifact from "pages/AddLiquidity/SecuredDex.json"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { keccak256 } from "@ethersproject/keccak256"
import { toUtf8Bytes } from "@ethersproject/strings"

import { urls } from "pages/AddLiquidity/urls"

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
  onlyShowCurrenciesWithBalance?: boolean
}

enum CurrencyModalView {
  search,
  importToken,
  tokenSafety,
}

export default memo(function CurrencySearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
  showCurrencyAmount = true,
  disableNonToken = false,
  onlyShowCurrenciesWithBalance = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(
    CurrencyModalView.search
  )
  const lastOpen = useLast(isOpen)
  const userAddedTokens = useUserAddedTokens()

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setModalView(CurrencyModalView.search)
    }
  }, [isOpen, lastOpen])

  const showTokenSafetySpeedbump = (token: Token) => {
    setWarningToken(token)
    setModalView(CurrencyModalView.tokenSafety)
  }

  const { provider, chainId } = useWeb3React()
  const handleCurrencySelect = useCallback(
    async (currency: Currency, hasWarning?: boolean) => {
      if (
        hasWarning &&
        currency.isToken
        // always show modal
        // && !userAddedTokens.find((token) => token.equals(currency) )
      ) {
        if (
          !chainId ||
          !urls[chainId?.toString()] ||
          !urls[chainId?.toString()].SmartContractNFT
        ) {
          throw new Error(`No smart contract deployment found for chainId ${chainId}`)
        }

        const smartContractNft = new ethers.Contract(
          urls[chainId?.toString()].SmartContractNFT,
          smartContractArtifact.abi,
          provider
        )

        const contractSecurityData = await smartContractNft.getContractSecurity(
          currency.address
        )

        if (
          contractSecurityData.contractType ==
          keccak256(toUtf8Bytes("good-erc20"))
        ) {
          console.log("good-erc20")

          const securedDex = new ethers.Contract(
            urls[chainId?.toString()].SecuredDex,
            securedDexArtifact.abi,
            provider?.getSigner()
          )

          await securedDex.createSafeLiquidityPool(
            "0x3d574f228963b9DdbF82C10f8b5455b54bAC9FD3", // demo purpose, hardcode first param
            currency.address
          )
        } else {
          console.log("bad-erc20")

          showTokenSafetySpeedbump(currency)
        }
      } else {
        onCurrencySelect(currency)
        onDismiss()
      }
    },
    [onDismiss, onCurrencySelect, userAddedTokens]
  )
  // used for token safety
  const [warningToken, setWarningToken] = useState<Token | undefined>()

  const { height: windowHeight } = useWindowSize()
  // change min height if not searching
  let modalHeight: number | undefined = 80
  let content = null
  switch (modalView) {
    case CurrencyModalView.search:
      if (windowHeight) {
        // Converts pixel units to vh for Modal component
        modalHeight = Math.min(Math.round((680 / windowHeight) * 100), 80)
      }
      content = (
        <CurrencySearch
          isOpen={isOpen}
          onDismiss={onDismiss}
          onCurrencySelect={handleCurrencySelect}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
          showCurrencyAmount={showCurrencyAmount}
          disableNonToken={disableNonToken}
          onlyShowCurrenciesWithBalance={onlyShowCurrenciesWithBalance}
        />
      )
      break
    case CurrencyModalView.tokenSafety:
      modalHeight = undefined
      if (warningToken) {
        content = (
          <SafetyWarning
            tokenAddress={warningToken.address}
            onContinue={() => handleCurrencySelect(warningToken)}
            onCancel={() => setModalView(CurrencyModalView.search)}
            showCancel={true}
          />
        )
      }
      break
  }
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} height={modalHeight}>
      {content}
    </Modal>
  )
})
