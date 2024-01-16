import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { Layout, Row, Col,  } from 'antd';
import styled from 'styled-components';
import  { useState, useEffect } from 'react';
import OutlinedButton from '../components/Button/Outline';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import RewardCard from '../components/RewardCard';
import { formatNumber, getNamedAddress } from '../util';
// import useContract from '../hooks/useContract';
import MinterABI from '../contracts/Minter.json';
import BundleTokenABI from '../contracts/BundleToken.json';
import { Contract } from '@ethersproject/contracts';
import Link from 'next/link';
import PairABI from '../contracts/Pair.json';
import { formatUnits, parseEther } from '@ethersproject/units';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { getAsset } from '../lib/asset';

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
const LandingRow = styled(Row)`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;

`;

const LandingCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding-top: 50px;
    }
`;

const SecondaryBox = styled(Image)`
    @media (max-width: 768px) {
        width: 120% !important;
        margin-left: -10% !important;
    }
`;

const Boxs = styled.img`
    @media (max-width: 768px) {
        display: none;
    }
`;

const BoxHeader = styled.div`
    @media (max-width: 768px) {
        span {
            color: rgba(0, 0, 0, 0.85) !important;
        }
    }
`;

  const BgBox = styled.div`
  background-image: url(/assets/bg.png);
  background-repeat: no-repeat;
  height:60vh;
  width: 100%
  `

const BoxMain = styled.img`
    @media (max-width: 768px) {
        margin-right: -20% !important;
    }
`;

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const CHAINID = 137
// const getApy = async (
//   pid: string,
//   setApy: React.Dispatch<React.SetStateAction<string>>,
//   minter: any | undefined,
//   bundleToken: Contract | undefined,
//   stakeToken: Contract | undefined,
//   token0: string | undefined,
//   token1: string | undefined
// ) => {; 50
//   try {
//       if (!!minter && !!bundleToken && !!stakeToken) {
//           const minterAddress = getNamedAddress(CHAINID, 'Minter');

//           const batch = [];
//           batch.push(minter.poolInfo(pid));
//           batch.push(minter.totalAllocPoint());
          // batch.push(getAsset(bundleToken.address, bundleToken.provider));
          // batch.push(getAsset(token0, bundleToken.provider));
          // batch.push(getAsset(token1, bundleToken.provider));
//           batch.push(stakeToken.totalSupply());
//           batch.push(stakeToken.getReserves());

//           const batchResult = await Promise.all(batch).then((values) => values);

//           const pInfo = batchResult[0];
//           const totalAllocPoint = batchResult[1];
//           const bundleAsset = batchResult[2];
//           const token0Asset = batchResult[3];
//           const token1Asset = batchResult[4];
//           const stakeTokenSupply = batchResult[5];
//           const token0Supply = batchResult[6][0];
//           const token1Supply = batchResult[6][1];

//           const stakeTokenPrice = token0Supply
//               .mul(token0Asset.price)
//               .add(token1Supply.mul(token1Asset.price))
//               .mul(parseEther('1'))
//               .div(stakeTokenSupply);

//           const staked = (await stakeToken.balanceOf(minterAddress)).mul(stakeTokenPrice).div(parseEther('1'));
//           const rewardsPerDay = (await minter.blockRewards()).mul(bundleAsset.price).mul(28800);

//           const stakedFormatted = parseFloat(formatUnits(staked));
//           const rewardsFormatted = parseFloat(formatUnits(rewardsPerDay));

//           const dpr = ((rewardsFormatted / stakedFormatted) * pInfo.allocPoint) / totalAllocPoint;
//           const apy = (1 + dpr) ** 365 - 1;

//           setApy(`${formatNumber(apy * 100)}%`);
//       }
//   } catch (e) {}
// };


// const stakeToken = useContract('0xe3b698b149634a09B806BC9Ec438111a3d3E833A', PairABI, false); //PancakeSwap V2 pool to exchange between BDL and WBNB.
// 0x693e745700D278Bf7e180D3fD94FA1A740807926
// const bDEFIStakeToken = useContract('0x8100fedEE0463647e401e1ce9295911298A4fc97', PairABI, false); //PancakeSwap V2 pool to exchange between bDEFI and BUSD.
// 0x107a78f4e90141bb4aacdb6b4c903f27baf43e58
// const bCHAINStakeToken = useContract('0x8100fedEE0463647e401e1ce9295911298A4fc97', PairABI, false); //PancakeSwap V2 pool to exchange between bCHAIN and BUSD.
// 0x3666d1eE816852A6BD08196243567D3945058E40
// const bSTBLStakeToken = useContract('0xcC093E98a673E5702037754F20b81D636C56F1ec', PairABI, false); //PancakeSwap V2 pool to exchange between bSTBL and BUSD.
// 0xaF748cE79E2c966a660A34c803e63A3e6553E670


// const [bdlApy, setBdlApy] = useState('...');
// const [bDEFIApy, setbDEFIApy] = useState('...');
// const [bCHAINApy, setbChainApy] = useState('...');
// const [bSTBLApy, setbSTBLApy] = useState('...');

// if (minter != undefined && bundleToken != undefined) {
//   getApy(
//       '0',
//       setBdlApy,
//       minter,
//       bundleToken,
//       stakeToken,
//       '0x620F9998cf912F38030610690e2F164A54F5d44b',
//       '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
//       // '0x7ff78e1cab9a2710eb6486ecbf3d94d125039364', // Bundle (BDL) (@$0.00)
//       // '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'//Wrapped BNB (WBNB) (@$242.8211)
//   );
//   getApy(
//       '1',
//       setbDEFIApy,
//       minter,
//       bundleToken,
//       bDEFIStakeToken,
//       '0x045FE47f58b673402D79Ee13c509bB9E745b793B', // bDeFi Index (bDEFI)
//       '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' // Binance-Peg BUSD Token (BUSD) 
//   );
//   getApy(
//       '2',
//       setbChainApy,
//       minter,
//       bundleToken,
//       bCHAINStakeToken,
//       '0x0f2CA5Fb9379de74C2E0dF51538a9E4e2f2b50af', //bChain Index (bCHAIN)
//       '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' // Binance-Peg BUSD Token (BUSD) (@$1.00)
//   );
//   getApy(
//       '3',
//       setbSTBLApy,
//       minter,
//       bundleToken,
//       bSTBLStakeToken,
//       '0x64cA8Ab4f3214c8D3fc8D0d865A97D0aaF22F514', //bStable (bSTBL)
//       '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' //Binance-Peg BUSD Token (BUSD) (@$1.00)
//   );
// }

export default function Home({darkMode}: { darkMode: boolean}) {

    const [btcPrice, setBtcPrice] = useState(null);
     const [bnbPrice, setBnbPrice] = useState(null);
     const [maticPrice, setMaticPrice] = useState(null);
     const [solPrice, setSolPrice] = useState(null);

    useEffect(() => {
        const fetchBtcPrice = async () => {
          try {
            const response = await axios.get(
              'https://api.dexscreener.com/latest/dex/pairs/ethereum/0x11b815efb8f581194ae79006d24e0d814b7697f6'
            );
            console.log(response)
            const priceData = response.data.pairs[0].priceUsd
            setBtcPrice(priceData)
              } catch (error) {
           
            console.error('Error fetching BTC price:', error);
          }
        };

        const fetchBnbPrice = async () => {
          try {
            const response = await axios.get(
              'https://api.dexscreener.com/latest/dex/pairs/bsc/0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae'
            );
            console.log(response)
            const priceData = response.data.pairs[0].priceUsd
            setBnbPrice(priceData)
              } catch (error) {
           
            console.error('Error fetching BNB price:', error);
          }
        };

        const fetchMaticPrice = async () => {
          try {
            const response = await axios.get(
              'https://api.dexscreener.com/latest/dex/pairs/ethereum/0x290a6a7460b308ee3f19023d2d00de604bcf5b42'
            );
            console.log(response)
            const priceData = response.data.pairs[0].priceUsd
            setMaticPrice(priceData)
              } catch (error) {
           
            console.error('Error fetching Matic price:', error);
          }
        };

        const fetchSolPrice = async () => {
          try {
            const response = await axios.get(
              'https://api.dexscreener.com/latest/dex/pairs/solana/7qbrf6ysyguluvs6y1q64bdvrfe4zcuuz1jrdovnujnm'
            );
            console.log(response)
            const priceData = response.data.pairs[0].priceUsd
            setSolPrice(priceData)
              } catch (error) {
           
            console.error('Error fetching Sol price:', error);
          }
        };

  
    
    
        fetchBtcPrice();
        fetchBnbPrice()
        fetchMaticPrice()
        fetchSolPrice()
      }, []); // Empty dependency array ensures the effect runs once on mount
    
    console.log(darkMode)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Layout.Content>
            <RowContainer darkMode={darkMode}>
                <LandingRow>
                    <LandingCol xs={24} sm={24} md={12}>
                        <div>
                            <h1 style={{ position: 'relative' }}>
                                <Image
                                    src="/assets/derpfi.png"
                                    width={275}
                                    height={275}
                                    alt=""
                                    style={{
                                        position: 'absolute',
                                        bottom: '-15px',
                                        left: '50px',
                                        zIndex: 0,
                                        opacity: '0.25',
                                    }}
                                />
                               
                            </h1>
                            <p style={{ maxWidth: '600px'}}>
                            Derpfi is redefining passive asset management. We&apos;re a community-governed project offering full exposure to crypto risk-management and the DeFi ecosystem through passively managed, non-custodial funds and indices.

                            </p>

                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                
                            <Grid item xs={6}>
                            <Card sx={{ maxWidth: 275 ,backgroundColor: "#0000FF"}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="#FFFFFF" gutterBottom>
                           Derphi
                            </Typography>
                              <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
                            
                              the price is $0.04
                              </Typography>
                              
                            </CardContent>
                            
                          </Card>
                            </Grid>

                            <Grid item xs={6}>
                            <Card sx={{ maxWidth: 275 ,backgroundColor: "#4a148c"}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="#FFFFFF" gutterBottom>
                            SOL
                            </Typography>
                              <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
                              the price is ${solPrice}
                              </Typography>
                              
                            </CardContent>
                            
                          </Card>
                            </Grid>

                            <Grid item xs={6}>
                            <Card sx={{ maxWidth: 275 ,backgroundColor: "#009688"}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="#FFFFFF" gutterBottom>
                            BNB
                            </Typography>
                              <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
                              the price is ${bnbPrice}
                              </Typography>
                              
                            </CardContent>
                            
                          </Card>
                            </Grid>

                            <Grid item xs={6}>
                            <Card sx={{ maxWidth: 275 ,backgroundColor: "#ff1744"}}>
                            <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="#FFFFFF" gutterBottom>
                            Matic
                            </Typography>
                              <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
                              the price is ${maticPrice}
                              </Typography>
                              
                            </CardContent>
                            
                          </Card>
                            </Grid>
                           
                          </Grid>
                            
                        </div>
                    </LandingCol>
                    <LandingCol xs={24} sm={24} md={12}>
                        <BoxMain height="100%" width="100%" src="/assets/derpfi.png" />
                    </LandingCol>
                </LandingRow>
            </RowContainer>
            <RowContainer>
                <LandingRow>
                    <LandingCol xs={24} sm={24} md={12}>
                        <div>
                            <h2 style={{ position: 'relative', maxWidth: '600px',  }}>
                                Earn rewards for active participation
                            </h2>
                            <p style={{ maxWidth: '600px' }}>
                                At Derpfi, we decided to distribute governance tokens in return for active community
                                participation. With no private investment, presale or ICO, all tokens are being
                                distributed fairly and deterministically to individuals actively supporting our mission.
                            </p>
                        </div>
                    </LandingCol>
                    <LandingCol xs={0} sm={0} md={1} />
                    <LandingCol xs={24} sm={24} md={11}>
                        <Link href="/staking">
                           
                                <RewardCard
                                    image="/assets/derpfi-small.png"
                                    imageSecondary="/assets/polygon-matic-logo.png"
                                    name="Derpfi"
                                    ticker="DFI-MATIC"
                                    // apy={bdlApy}
                                    width="100%"
                                    imgStyle={{ marginTop: '2px', marginLeft: '2px' }}
                                    cardStyle={{ maxWidth: '550px' }}
                                />
                          
                        </Link>
                        <Link href="/staking">
                        
                                <RewardCard
                                    image="/assets/derpfi-small.png"
                                    imageSecondary="/assets/polygon-matic-logo.png"
                                    name="bDefi Index"
                                    ticker="bDFI-MATIC"
                                    // apy={bDEFIApy}
                                    width="100%"
                                    imgStyle={{ marginTop: '2px', marginLeft: '2px' }}
                                    cardStyle={{ maxWidth: '550px' }}
                                />
                        
                        </Link>
                        <Link href="/staking">
                          
                                <RewardCard
                                    image="/assets/derpfi-small.png"
                                    imageSecondary="/assets/polygon-matic-logo.png"
                                    name="bChain Index"
                                    ticker="bCHAIN-Matic"
                                    // apy={bCHAINApy}
                                    width="100%"
                                    imgStyle={{ marginTop: '2px', marginLeft: '2px' }}
                                    cardStyle={{ maxWidth: '550px' }}
                                />
                          
                        </Link>
                        <Link href="/staking">
                            
                                {/* <RewardCard
                                    image="/assets/BUSD.png"
                                    imageSecondary="/assets/polygon-matic-logo.png"
                                    name="bStable Index"
                                    ticker="bSTBL-MATIC"
                                    // apy={bSTBLApy}
                                    width="100%"
                                    imgStyle={{ marginTop: '2px', marginLeft: '2px' }}
                                    cardStyle={{ maxWidth: '550px' }}
                                /> */}
                          
                        </Link>
                    </LandingCol>
                </LandingRow>
            </RowContainer>
            <RowContainer>
                <LandingRow>
                    <LandingCol xs={24} sm={24} md={12}>
                        <SecondaryBox
                          width={500}
                          height={500}
                          src="/assets/LAPTOP.png"
                          alt="Description of the image"
                          style={{ marginLeft: '-5%' }}
                        />
                    </LandingCol>
                    <LandingCol xs={24} sm={24} md={12}>
                        <div>
                            <BoxHeader style={{ position: 'relative' }}>
                                <h1 style={{ position: 'relative' }}>
                                    A dao, <br />
                                    that comes in{' '}
                                    <span style={{ color: 'white', position: 'relative' }}>
                                        <Boxs
                                            src="/assets/boxes.svg"
                                            width="125px"
                                            style={{ position: 'absolute', right: '3px', bottom: '5px' }}
                                        />
                                        <span style={{ position: 'relative' }}>boxes</span>
                                    </span>
                                </h1>
                            </BoxHeader>
                            <p style={{ maxWidth: '600px' }}>
                            Derpfi is tearing down traditional financial definitions surrounding funds and indices through our innovative Derpfis. We&apos;re building a protocol that enables users to passively maintain risk-optimal portfolios while still gaining the benefits and returns of active DeFi protocol participation.

                            
                            </p>
                        </div>
                    </LandingCol>
                </LandingRow>
            </RowContainer>
            <BgBox>

            </BgBox>
           
        </Layout.Content>
      </main>
    </>
  )
}
