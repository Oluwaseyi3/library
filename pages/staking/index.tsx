import React from 'react'
import { Layout, Row, Col } from 'antd';
import styled from 'styled-components';
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import VaultCard from '../../components/StakingCard/VaultCard';

interface RowContainerProps {
    darkMode?: boolean;
}

const RowContainer = styled.div<RowContainerProps>`
    width: 100vw;
    background: ${(props) => props.theme.white + ' 0% 0% no-repeat padding-box'};
    color: ${(props) => props.theme.whiteText };
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;

    p {
        margin-top: 10px;
    }

    @media (max-width: 768px) {
        padding: 30px;
    }
`;

const StakingRow = styled(Row)<RowContainerProps>`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    color: ${(props) => props.theme.whiteText };
`;

const StakingCol = styled(Col)<RowContainerProps>`
    display: flex;
    color: ${(props) => props.theme.whiteText };
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding-top: 50px;
    }
`;

const BoxImage = styled.img<RowContainerProps>`
    @media (max-width: 768px) {
        margin-right: -20% !important;
        display: none;
    }
`;

const RewardsContainer = styled.div<RowContainerProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 450px;
    color: ${(props) => props.theme.whiteText };

    h1 {
        font-size: 30px;
    }
`;

const RewardCard = styled.div<RowContainerProps>`
    height: 75px;
    width: 100%;
    color: ${(props) => props.theme.whiteText };
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 1px 8px #29292921;
    background-color: ${(props) => props.theme.white};
    z-index: 2;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px 0px;
    color: ${(props) => props.theme.whiteText };

    p {
        margin: 0px 15px 0px 0px;
        font-size: 17px;
        font-family: 'Visuelt';
    }
`;

const RewardRow = styled.div<RowContainerProps>`
    display: flex;
    align-items: center;

    p {
        margin: 0px 0px 0px 25px;
        font-family: 'Visuelt';
    }
    color: ${(props) => props.theme.whiteText };
`;

interface ClaimButtonProps {
    enabled?: boolean;
}

const ClaimButton = styled.div<ClaimButtonProps>`
    cursor: pointer;
    width: 100%;
    padding: 35px 0px 5px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.enabled ? props.theme.white : 'default')};
    background-color: ${(props) => (props.enabled ? props.theme.primary : props.theme.white)};
    z-index: 1;
    margin-top: -23px;
    border-radius: 15px;

    &:hover {
        background-color: ${(props) => (props.enabled ? props.theme.primaryDark : props.theme.white)};
    }

    p {
        margin: 0px;
        font-weight: bold;
        font-size: 17px;
        font-family: 'Visuelt';
    }

    transition: background-color 100ms linear;
`;

const StakingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 30px;
    }
`;

const Landing = ({darkMode}: { darkMode: boolean}) => {

    const { address} = useAccount()

    const { data: derphiBalance} = useBalance({
        address: address,
        token: '0x4987131473ccC84FEdbf22Ab383b6188D206cc9C',
        
      })

     
     
  return (
    <div>
           <Layout.Content>
            <RowContainer darkMode={darkMode}>
                <StakingRow>
                    <StakingCol md={12}>
                        <BoxImage height="80%" width="80%" src="/assets/LAPTOP.png" />
                    </StakingCol>
                    <StakingCol xs={24} sm={24} md={12}>
                        <RewardsContainer>
                            <h1>Rewards</h1>
                            <RewardCard>
                                <RewardRow>
                                    <img height="100%" src="/assets/wallet.png" />
                                    <p>
                                        Derpfi <br /> Balance
                                    </p>
                                </RewardRow>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                             
                                    <p>{`${derphiBalance ? Number(derphiBalance?.formatted).toFixed(2): 0.0 }DFI`}</p>
                                 
                                </div>
                            </RewardCard>
                            <RewardCard>
                                <RewardRow>
                                    <img height="100%" src="/assets/lock-closed.png" />
                                    <p>
                                        Locked <br /> Rewards
                                    </p>
                                </RewardRow>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* <p>{`${!!lockedBalance ? lockedBalance : '0.0'} DFI`}</p> */}
                                </div>
                            </RewardCard>
                            <RewardCard style={{ marginBottom: '0px' }}>
                                <RewardRow>
                                    <img height="100%" src="/assets/lock-open.png" />
                                    <p>
                                        Unlocked <br /> Rewards
                                    </p>
                                </RewardRow>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* <p>{`${!!unlockedBalance ? unlockedBalance : '0.0'} DFI`}</p> */}
                                </div>
                            </RewardCard>
                            <ClaimButton
                                // enabled={unlockedBalance > 0}
                                // onClick={() => {
                                //     if (unlockedBalance > 0) {
                                //         bundleToken
                                //             ?.unlock()
                                //             .then((tx: TransactionResponse) => {
                                //                 txMessage(tx);
                                //                 return tx.wait(1);
                                //             })
                                //             .then((tx: TransactionReceipt) => {
                                //                 unlockMessage(tx);
                                //             })
                                //             .catch((e: any) => {
                                //                 errorMessage(e.data.message);
                                //             });
                                //     }
                                // }}
                            >
                                <p>Claim</p>
                            </ClaimButton>
                        </RewardsContainer>
                    </StakingCol>
                </StakingRow>
            </RowContainer>
            <RowContainer style={{ paddingTop: '50px' }}>
                <StakingRow>
                    <StakingCol span={24}>
                        <StakingContainer>
                            <h1>Available Staking Options</h1>
                            <VaultCard
                                image="/assets/derpfi.png"
                                name="DFI Vault"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="0"
                                // vault={getNamedAddress(chainId, 'BundleVault')!}
                                disabled={false}
                                // account={account!}
                                balance={derphiBalance}
                            />
                            {/* <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BNB.png"
                                name="DFI-BNB"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="0"
                                stakeToken={getNamedAddress(chainId, 'DFIBNB')!}
                                disabled={false}
                                account={account!}
                                tokenA="0x620F9998cf912F38030610690e2F164A54F5d44b" // Bundle (BDL) (@$0.00)
                                tokenB="0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" //Wrapped BNB (WBNB) (@$242.685)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="1"
                                stakeToken={'0x107a78f4e90141bb4aacdb6b4c903f27baf43e58'} // Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x045FE47f58b673402D79Ee13c509bB9E745b793B" // bDeFi Index (bDEFI)
                                tokenB="0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="2"
                                stakeToken={'0x3666d1eE816852A6BD08196243567D3945058E40'} // Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x3E96F79a607d0d2199976c292f9CDF73991A3439" //bChain Index (bCHAIN)
                                tokenB="0xe9e7cea3dedca5984780bafc599bd69add087d56" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            />
                            <StakingCard
                                image="/assets/derpfi.png"
                                imageSecondary="/assets/BUSD.png"
                                name="bDFI-BUSD"
                                imageStyle={{ marginTop: '3px', marginLeft: '2px', zIndex: 2 }}
                                pid="3"
                                stakeToken={'0xaF748cE79E2c966a660A34c803e63A3e6553E670'} //Pancake LPs (Cake-LP)
                                disabled={false}
                                account={account!}
                                tokenA="0x934C7F600d6eE2fb60CdFf61d1b9fC82C6b8C011" //bStable (bSTBL)
                                tokenB="0xe9e7cea3dedca5984780bafc599bd69add087d56" //Binance-Peg BUSD Token (BUSD) (@$1.0001)
                            /> */}
                        </StakingContainer>
                    </StakingCol>
                </StakingRow>
            </RowContainer>
        </Layout.Content>
    </div>
  )
}

export default Landing