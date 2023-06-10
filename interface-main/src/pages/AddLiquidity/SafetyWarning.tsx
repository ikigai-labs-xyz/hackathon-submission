// @ts-nocheck
import { Trans } from "@lingui/macro"
import { Token } from "@uniswap/sdk-core"
import { ButtonPrimary } from "components/Button"
import { AutoColumn } from "components/Column"
import CurrencyLogo from "components/Logo/CurrencyLogo"
import TokenSafetyLabel from "components/TokenSafety/TokenSafetyLabel"
import {
  checkWarning,
  displayWarningLabel,
  getWarningCopy,
  NotFoundWarning,
  TOKEN_SAFETY_ARTICLE,
  Warning,
} from "constants/tokenSafety"
import { useToken } from "hooks/Tokens"
import { ExternalLink as LinkIconFeather } from "react-feather"
import { Text } from "rebass"
import { useAddUserToken } from "state/user/hooks"
import styled from "styled-components/macro"
import { ButtonText, CopyLinkIcon, ExternalLink } from "theme"
import { ExplorerDataType, getExplorerLink } from "utils/getExplorerLink"

import SecuredDexArtifact from "./SecuredDex.json"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { urls as deploymentUrls } from "pages/AddLiquidity/urls"

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  padding: 32px 40px;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const LogoContainer = styled.div`
  display: flex;
  gap: 16px;
`

const ShortColumn = styled(AutoColumn)`
  margin-top: 10px;
`

const InfoText = styled(Text)`
  padding: 0 12px 0 12px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`

const StyledButton = styled(ButtonPrimary)`
  margin-top: 24px;
  width: 100%;
  font-weight: 600;
`

const StyledCancelButton = styled(ButtonText)`
  margin-top: 16px;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
  font-size: 14px;
`

const StyledCloseButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.backgroundInteractive};
  color: ${({ theme }) => theme.textPrimary};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundInteractive};
    opacity: ${({ theme }) => theme.opacity.hover};
    transition: opacity 250ms ease;
  }
`

const Buttons = ({
  warning,
  onContinue,
  onCancel,
  onBlocked,
  showCancel,
}: {
  warning: Warning
  onContinue?: () => void
  onCancel: () => void
  onBlocked?: () => void
  showCancel?: boolean
}) => {
  return warning.canProceed ? (
    <>
      <StyledButton onClick={onContinue}>
        {!displayWarningLabel(warning) ? (
          <Trans>Continue</Trans>
        ) : (
          <Trans>Force tx</Trans>
        )}
      </StyledButton>
      {showCancel && (
        <StyledCancelButton onClick={onCancel}>Cancel</StyledCancelButton>
      )}
    </>
  ) : (
    <StyledCloseButton onClick={onBlocked ?? onCancel}>
      <Trans>Close</Trans>
    </StyledCloseButton>
  )
}

const SafetyLabel = ({ warning }: { warning: Warning }) => {
  return (
    <TokenSafetyLabel level={warning.level} canProceed={warning.canProceed}>
      {warning.message}
    </TokenSafetyLabel>
  )
}

// TODO: Replace color with stylesheet color
const LinkColumn = styled(AutoColumn)`
  width: 100%;
  margin-top: 16px;
  position: relative;
`

const ExplorerContainer = styled.div`
  width: 100%;
  height: 32px;
  margin-top: 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.accentActionSoft};
  color: ${({ theme }) => theme.accentAction};
  border-radius: 8px;
  padding: 2px 12px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const ExplorerLinkWrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  cursor: pointer;

  :hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
  :active {
    opacity: ${({ theme }) => theme.opacity.click};
  }
`

const ExplorerLink = styled.div`
  display: block;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ExplorerLinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 8px;
`

const LinkIconWrapper = styled.div`
  justify-content: center;
  display: flex;
`

function ExternalLinkIcon() {
  return (
    <LinkIconWrapper>
      <ExplorerLinkIcon />
    </LinkIconWrapper>
  )
}

function ExplorerView({ token }: { token: Token }) {
  if (token) {
    const explorerLink = getExplorerLink(
      token?.chainId,
      token?.address,
      ExplorerDataType.TOKEN
    )
    return (
      <ExplorerContainer>
        <ExplorerLinkWrapper
          onClick={() => window.open(explorerLink, "_blank")}
        >
          <ExplorerLink>{explorerLink}</ExplorerLink>
          <ExternalLinkIcon />
        </ExplorerLinkWrapper>
        <CopyLinkIcon toCopy={explorerLink} />
      </ExplorerContainer>
    )
  } else {
    return null
  }
}

const StyledExternalLink = styled(ExternalLink)`
  color: ${({ theme }) => theme.accentAction};
  stroke: currentColor;
  font-weight: 600;
`

export interface TokenSafetyProps {
  tokenAddress: string | null
  secondTokenAddress?: string
  onContinue: () => void
  onCancel: () => void
  onBlocked?: () => void
  showCancel?: boolean
}

export default function SafetyWarning({
  tokenAddress,
  secondTokenAddress,
  onContinue,
  onCancel,
  onBlocked,
  showCancel,
}: TokenSafetyProps) {
  const logos = []
  const urls = []

  const token1Warning = tokenAddress ? checkWarning(tokenAddress) : null
  const token1 = useToken(tokenAddress)
  const token2Warning = secondTokenAddress
    ? checkWarning(secondTokenAddress)
    : null
  const token2 = useToken(secondTokenAddress)

  const token1Unsupported = !token1Warning?.canProceed
  const token2Unsupported = !token2Warning?.canProceed

  // Logic for only showing the 'unsupported' warning if one is supported and other isn't
  if (
    token1 &&
    token1Warning &&
    (token1Unsupported || !(token2Warning && token2Unsupported))
  ) {
    logos.push(
      <CurrencyLogo key={token1.address} currency={token1} size="48px" />
    )
    urls.push(<ExplorerView key={token1.address} token={token1} />)
  }
  if (
    token2 &&
    token2Warning &&
    (token2Unsupported || !(token1Warning && token1Unsupported))
  ) {
    logos.push(
      <CurrencyLogo key={token2.address} currency={token2} size="48px" />
    )
    urls.push(<ExplorerView key={token2.address} token={token2} />)
  }

  const plural = logos.length > 1
  // Show higher level warning if two are present
  let displayWarning = token1Warning
  if (
    !token1Warning ||
    (token2Warning && token2Unsupported && !token1Unsupported)
  ) {
    displayWarning = token2Warning
  }

  // If a warning is acknowledged, import these tokens
  const addToken = useAddUserToken()

  const { provider, chainId } = useWeb3React()
  const acknowledge = async () => {
    if (
      !chainId ||
      !deploymentUrls[chainId?.toString()] ||
      !deploymentUrls[chainId?.toString()].SmartContractNFT
    ) {
      throw new Error(
        `No smart contract deployment found for chainId ${chainId}`
      )
    }

    const securedDex = new ethers.Contract(
      deploymentUrls[chainId?.toString()].SecuredDex,
      SecuredDexArtifact.abi,
      provider?.getSigner()
    )

    const tx = {
      to: deploymentUrls[chainId?.toString()].SecuredDex,
      data: securedDex.interface.encodeFunctionData("createSafeLiquidityPool", [
        "0x3d574f228963b9DdbF82C10f8b5455b54bAC9FD3",
        token2?.address || token1?.address,
      ]),
      gasLimit: 1000000,
    }

    const txResponse = await provider.getSigner().sendTransaction(tx)

    console.log("txHash", txResponse?.hash)

    await txResponse.wait()

    if (token1) {
      addToken(token1)
    }
    if (token2) {
      addToken(token2)
    }
    onContinue()
  }

  const { heading, description } = getWarningCopy(displayWarning, plural)
  const learnMoreUrl = (
    <StyledExternalLink href={TOKEN_SAFETY_ARTICLE}>
      <Trans>Learn more</Trans>
    </StyledExternalLink>
  )

  return displayWarning ? (
    <Wrapper data-testid="TokenSafetyWrapper">
      <Container>
        <AutoColumn>
          <LogoContainer>{logos}</LogoContainer>
        </AutoColumn>
        {displayWarningLabel(displayWarning) && (
          <ShortColumn>
            <SafetyLabel warning={displayWarning} />
          </ShortColumn>
        )}
        <ShortColumn>
          <InfoText>
            this Token appears to be malicious, creating a pool is not possible.
            {/* {heading} {description} {learnMoreUrl} */}
          </InfoText>
        </ShortColumn>
        <LinkColumn>{urls}</LinkColumn>
        <Buttons
          warning={displayWarning}
          onContinue={acknowledge}
          onCancel={onCancel}
          onBlocked={onBlocked}
          showCancel={showCancel}
        />
      </Container>
    </Wrapper>
  ) : (
    <Wrapper>
      <Container>
        <ShortColumn>
          <SafetyLabel warning={NotFoundWarning} />
        </ShortColumn>
        <ShortColumn>
          <InfoText>
            {heading} {description} {learnMoreUrl}
          </InfoText>
        </ShortColumn>
        <Buttons
          warning={NotFoundWarning}
          onCancel={onCancel}
          showCancel={true}
        />
      </Container>
    </Wrapper>
  )
}
