import { Layout } from 'antd';
import React, { useState, useEffect , useRef} from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RowContainer, Row, Col } from '../../components/Layout';
import { getAssets, getFundByName, Fund } from '../../lib/fund';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios';
import Card from '../../components/Card';
import { useWeb3React } from '@web3-react/core';
import AssetCard from '../../components/AssetCard';
import { BigNumber } from '@ethersproject/bignumber';
import { Asset, getAsset, SWAP_ASSETS } from '../../lib/asset';
import { parseBalance } from '../../util';
import { parseEther } from '@ethersproject/units';
// import Swap from '../../components/Swap';
// import Flow from '../../components/Flow';
import FlowMint from "../../components/FlowMint"
import FlowRedeem from "../../components/FlowRedeem"
// import Chart from '../../components/Chart';
import { ApolloClient, InMemoryCache,  } from '@apollo/client';
import Moralis from 'moralis';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import QuickSwap from '@quickswap/sdk';
// import { useQuery, gql,  } from '@apollo/client';
// const CHECK_LP_PRICE_MUTATION = gql`
//   query checkLpPrice($id: String!) {
//     pair(id: $id) {
//       reserve0
//       reserve1
//       price1
//     }
//   }
// `;




interface SelectorProps {
    selected: boolean;
}

const Field = styled.span`
    color: ${(props) => props.theme.grey};
`;

const Text = styled.div`
    font-size: 16px;
    font-family: 'Visuelt';
    margin: 3px 10px 0px 10px;
`;

const Selector = styled.div<SelectorProps>`
    font-size: 16px;
    font-family: 'Visuelt';
    padding: ${(props) => (props.selected ? '10px 0px 10px 0px' : '13px 0px')};
    margin: 3px 10px 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.selected ? props.theme.primary : props.theme.black)};
    border-bottom: ${(props) => (props.selected ? '3px solid ' + props.theme.primary : '')};
    width: 20%;

    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.primary};
        border-bottom: 3px solid ${(props) => props.theme.primary};
        padding: 10px 0px 10px 0px;
    }

    transition: color 100ms linear, border-bottom 100ms linear, padding 100ms ease, margin 100ms ease;
`;

const TRADE = 'TRADE';
const MINT = 'MINT';
const BURN = 'BURN';


const Landing: React.FC = (): React.ReactElement => {

    // const { library, account } = useWeb3React();
    const router = useRouter();
    const [fund, setFund] = useState<Fund>();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [fundAsset, setFundAsset] = useState<Asset>();
    const [nav, setNav] = useState<BigNumber>(BigNumber.from('0'));
    const [selected, setSelected] = useState(TRADE);
    const selectorOnClick = (target: string) => {
        return () => {
            setSelected(target);
        };
    };
   
   

    // useEffect(() => {
    //     if (router.isReady) {
    //         setFund(getFundByName(router.query.id as string));
    //     }
    // }, [router]);

    // useEffect(() => {
    //     getAssets(fund, library, setAssets);
    //     getAsset(fund?.address, library, setFundAsset, true);
    // }, [fund, library]);
    


    useEffect(() => {
        if (fundAsset) {
            setNav(
                assets.reduce(
                    (a: BigNumber, b: Asset) => a.add(b.amount!.mul(b.price!).div(parseEther('1'))),
                    BigNumber.from(0)
                )
            );
        }
    }, [fundAsset, assets]);

    const assetCards = [...assets]
        .sort((a: Asset, b: Asset): number => {
            if (a.amount!.mul(a.price!).gte(b.amount!.mul(b.price!))) {
                return -1;
            } else {
                return 0;
            }
        })
        .map((asset, index) => <AssetCard asset={asset} nav={nav} index={index} />);

        // const { loading, error, data } = useQuery(GET_LP_PRICE);

        // console.log(data)

        const [lpPrice, setLPPrice] = useState(0);
        const [lpPriceNative, setLPPriceNative] = useState(0);
        
  const [lpPriceData, setLPPriceData] = useState(0);

        
        useEffect(() => {
          const fetchLPPriceData = async () => {
            const url = `https://api.dexscreener.com/latest/dex/pairs/polygon/0x9677EBFc82d1cd10220129579fd5436434CA5811`;
      
            try {
              const response = await axios.get(url);
            //   console.log(response)
              const priceData = response.data.pairs[0].priceUsd;
              const  second = response.data.pairs
              setLPPriceData(second)
                  const test = response.data.pairs[0].priceChange.h24
                  setLPPriceData(test)
                  console.log(test)
              const priceNative = response.data.pairs[0].volume.h24;
              console.log(priceData)
              setLPPrice(priceData);
              setLPPriceNative(priceNative)
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchLPPriceData();
        }, []);
      
       console.log(lpPrice)

       const today = new Date();
       const day = today.getDate();
       const month = today.getMonth() + 1;

     const data = [
        { name: `${day}/${month}`, value: `$${lpPrice}` },

      ];

    return (
        <Layout.Content>
            <RowContainer style={{ flexDirection: 'column' }}>
                <Row style={{ paddingBottom: '15px' }}>
                    <Col xs={4} md={2} hideOnMobile={true}>
                        <Link href="/funds">
                            <ArrowLeftOutlined style={{ fontSize: '25px' }} />
                        </Link>
                    </Col>
                    <Col xs={{ span: 22, push: 1 }} md={{ span: 9, push: 0 }} style={{ alignItems: 'flex-start' }}>
                        <h2 style={{ marginBottom: '0px' }}>
                            {fund ? fund.name : '...'}
                            <a
                                href={`https://bscscan.com/address/${fund ? fund.address : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontWeight: 100,
                                    fontSize: '13px',
                                    paddingLeft: '5px',
                                    color: 'rgba(0, 0, 0, 0.85)',
                                }}
                            >
                                {fund ? '- ' + fund.address : '...'}
                            </a>
                        </h2>
                        <span style={{ marginBottom: '0px' }}>{fund ? fund.description : '...'}</span>
                    </Col>
                    <Col xs={12} md={3} style={{ justifyContent: 'flex-end' }} mobilePadding="15px 0px 0px 0px">
                        <Field>Price</Field>
                        <Text>${lpPrice}</Text>
                    </Col>
                    <Col xs={12} md={3} style={{ justifyContent: 'flex-end' }} mobilePadding="15px 0px 0px 0px">
                        <Field>24H</Field>
                        <Text>  ${lpPriceNative}</Text>
                    </Col>
                    <Col xs={12} md={4} style={{ justifyContent: 'flex-end' }} mobilePadding="15px 0px 0px 0px">
                        <Field>Market Cap</Field>
                        <Text>
                        0.00
                        </Text>
                    </Col>
                    <Col xs={12} md={3} style={{ justifyContent: 'flex-end' }} mobilePadding="15px 0px 0px 0px">
                        <Field>NAV</Field>
                        <Text>
                            {fundAsset
                                ? `$${parseBalance(nav.mul(parseEther('1')).div(fundAsset.cap!), 18, 2, false)}`
                                : '0.00'}
                        </Text>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col
                        xs={{ order: 2, span: 24 }}
                        lg={{ order: 1, span: 16 }}
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <Row>
                            <Col span={24} padding="0px" mobilePadding="0px">
                                <Card
                                    style={{
                                        height: '500px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '20px',
                                    }}>
  <LineChart width={300} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
                     
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="space-between">{assetCards}</Row>
                    </Col>
                    <Col
                        xs={{ order: 1, span: 24 }}
                        lg={{ order: 2, span: 8 }}
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <Row>
                            <Col span={24} style={{ width: '100%' }}>
                                <Card
                                    style={{
                                        height: '60px',
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    {/* <Selector onClick={selectorOnClick(TRADE)} selected={selected == TRADE}>
                                        Swap
                                    </Selector> */}
                                    <Selector onClick={selectorOnClick(MINT)} selected={selected == MINT}>
                                        Mint
                                    </Selector>
                                    <Selector onClick={selectorOnClick(BURN)} selected={selected == BURN}>
                                        Redeem
                                    </Selector>
                                </Card>
                            </Col>
                            {selected == BURN && (
                               <FlowRedeem
                            
                           />

                          
                            )}
                                {selected == MINT && (
                               <FlowMint
                            
                           />

                          
                            )}
                        </Row>
                    </Col>
                </Row>
            </RowContainer>
        </Layout.Content>
    );
};

export default Landing;