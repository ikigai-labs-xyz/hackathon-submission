import { Trans } from '@lingui/macro';
import { Trace } from '@uniswap/analytics';
import { InterfacePageName } from '@uniswap/analytics-events';
import {
  Currency, CurrencyAmount, Token
} from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import JSBI from 'jsbi';
import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useLocation } from 'react-router';
import { Text } from 'rebass';

import { ButtonDropdownLight } from '../../components/Button';
import { LightCard, BlueCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import CurrencyLogo from '../../components/Logo/CurrencyLogo';
import { FindPoolTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row from '../../components/Row';
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink';
import { nativeOnChain } from '../../constants/tokens';
import { PairState, useV2Pair } from '../../hooks/useV2Pairs';
import { useTokenBalance } from '../../state/connection/hooks';
import { usePairAdder } from '../../state/user/hooks';
import { StyledInternalLink, ThemedText } from '../../theme';
import { currencyId } from '../../utils/currencyId';
import AppBody from '../AppBody';
import { Dots } from '../Pool/styleds';
import ErrorPopup from '../../components/Popups/ErrorPopup';
import ethers from 'ethers';

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CONTRACT_ADDRESS = "0x..."; // Put the contract address here
const CONTRACT_ABI = [...]; // Put the contract ABI array here

export default function PoolFinder() {
  const query = useQuery();
  const { account, chainId, library } = useWeb3React();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1);
  const [currency0, setCurrency0] = useState<Currency | null>(() => (chainId ? nativeOnChain(chainId) : null));
  const [currency1, setCurrency1] = useState<Currency | null>(null);
  const [pairState, pair] = useV2Pair(currency0 ?? undefined, currency1 ?? undefined);
  const addPair = usePairAdder();
  const [contract, setContract] = useState<null | ethers.Contract>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    if (pair) {
      addPair(pair);
    }
  }, [pair, addPair]);

  useEffect(() => {
    if (library) {
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, library.getSigner());
      setContract(contractInstance);
    }
  }, [library]);

  useEffect(() => {
    const checkContractSecurity = async () => {
      try {
        if (contract) {
          const contractSecurity = await contract.getContractSecurity('0x5FbDB2315678afecb367f032d93F642f64180aa3');
          if (contractSecurity.score === 0) {
            setShowErrorPopup(true);
          }
        }
      } catch (error) {
        console.error('Error fetching contract security', error);
      } 
    };

    checkContractSecurity();
  }, [contract]);

  const contract = new ethers.Contact("addresse", abi, ethersProvider)

  const { library } = useWeb3React();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (library) {
            const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, library.getSigner());
            setContract(contractInstance);
        }
    }, [library]);

  return (
    <Trace page={InterfacePageName.POOL_PAGE} shouldLogImpression>
      <>
        <AppBody>
          <FindPoolTabs origin={query.get('origin') ?? '/pools'} />
          <AutoColumn style={{ padding: '1rem' }} gap="md">
            <BlueCard>
              <AutoColumn gap="10px">
                <ThemedText.DeprecatedLink fontWeight={400} color="accentAction">
                  <Trans>
                    <b>Tip:</b> Use this tool to find v2 pools that don&apos;t automatically appear in the interface.
                  </Trans>
                </ThemedText.DeprecatedLink>
              </AutoColumn>
            </BlueCard>
            <ButtonDropdownLight
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN0)
              }}
            >
              {currency0 ? (
                <Row>
                  <CurrencyLogo currency={currency0} />
                  <Text fontWeight={500} fontSize={20} marginLeft="12px">
                    {currency0.symbol}
                  </Text>
                </Row>
              ) : (
                <Text fontWeight={500} fontSize={20} marginLeft="12px">
                  <Trans>Select a token</Trans>
                </Text>
              )}
            </ButtonDropdownLight>

            <ColumnCenter>
              <Plus size="16" color="#888D9B" />
            </ColumnCenter>

            <ButtonDropdownLight
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN1)
              }}
            >
              {currency1 ? (
                <Row>
                  <CurrencyLogo currency={currency1} />
                  <Text fontWeight={500} fontSize={20} marginLeft="12px">
                    {currency1.symbol}
                  </Text>
                </Row>
              ) : (
                <Text fontWeight={500} fontSize={20} marginLeft="12px">
                  <Trans>Select a token</Trans>
                </Text>
              )}
            </ButtonDropdownLight>

            {hasPosition && (
              <ColumnCenter
                style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
              >
                <Text textAlign="center" fontWeight={500}>
                  <Trans>Pool Found!</Trans>
                </Text>
                <StyledInternalLink to="pools/v2">
                  <Text textAlign="center">
                    <Trans>Manage this pool.</Trans>
                  </Text>
                </StyledInternalLink>
              </ColumnCenter>
            )}

            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} border="1px solid #CED0D9" />
                ) : (
                  <LightCard padding="45px 10px">
                    <AutoColumn gap="sm" justify="center">
                      <Text textAlign="center">
                        <Trans>You don’t have liquidity in this pool yet.</Trans>
                      </Text>
                      <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                        <Text textAlign="center">
                          <Trans>Add liquidity.</Trans>
                        </Text>
                      </StyledInternalLink>
                    </AutoColumn>
                  </LightCard>
                )
              ) : validPairNoLiquidity ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">
                      <Trans>No pool found.</Trans>
                    </Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Trans>Create pool.</Trans>
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.INVALID ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center" fontWeight={500}>
                      <Trans>Invalid pair.</Trans>
                    </Text>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.LOADING ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">
                      <Trans>Loading</Trans>
                      <Dots />
                    </Text>
                  </AutoColumn>
                </LightCard>
              ) : null
            ) : (
              prerequisiteMessage
            )}
          </AutoColumn>

          <CurrencySearchModal
            isOpen={showSearch}
            onCurrencySelect={handleCurrencySelect}
            onDismiss={handleSearchDismiss}
            showCommonBases
            selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
          />
          {showErrorPopup && <ErrorPopup onClose={() => setShowErrorPopup(false)} />}
        </AppBody>
        <SwitchLocaleLink />
      </>
    </Trace>
  );
}
