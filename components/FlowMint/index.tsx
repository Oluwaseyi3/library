
import React, {useState, useRef} from 'react'
import { formatNumber, getNamedAddress, parseBalance } from '../../util';
import { InputNumber, Modal } from 'antd';
import styled from 'styled-components';
import Outline from '../Button/Outline';
import Card from '../Card';
import { Col, Row } from '../Layout';
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import ethers from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import { useContractRead } from 'wagmi'
import { getContract } from '@wagmi/core'
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { approveMessage, depositMessage, txMessage, withdrawMessage , errorMessage, mintMessage} from '../Messages';
import BundleTokenABI from '../../contracts/BundleToken.json';
import TokenMinterABI from "../../contracts/TokenMinter.json"
import TokenRedemptionABI from '../../contracts/TokenRedemption.json';
import { formatUnits, parseEther } from '@ethersproject/units';



interface SelectorProps {
    selected?: boolean;
}

const TextBold = styled.div`
    font-size: 16px;
    font-weight: bold;
    font-family: 'Visuelt';
    margin: 3px 10px 0px 10px;
`;

const Selector = styled.div<SelectorProps>`
    width: 100px;
    height: 35px;
    margin: 10px;
    padding: 5px 20px 8px 20px;
    border-radius: 10px;
    border: ${(props) => '2px solid ' + (props.selected ? props.theme.primary : props.theme.grey)};
    color: ${(props) => (props.selected ? props.theme.primary : props.theme.grey)};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
        border: ${(props) => '2px solid ' + props.theme.primary};
        color: ${(props) => props.theme.primary};
    }

    transition: color 100ms linear, border 100ms linear;
`;

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    overflow: hidden;
    margin 10px 0px 5px 0px;
`;

const Field = styled.span`
    color: ${(props) => props.theme.grey};
`;

const Primary = styled.span`
    color: ${(props) => props.theme.primary};

    &:hover {
        cursor: pointer;
    }`

const FlowMint = () => {
    const [toStake, setToStake] = useState(0);

    const { data: redeemContract}  = useContractRead({
        address: '0xA9695783141eD1552ce42B6c0714798A43C2e37d',
        abi: TokenMinterABI,
        functionName: 'mintFee',
        
        onSuccess(redeemContract) {
        //   setMaticBalance(redeemContract);
     
        },
        onError(error) {
          console.error('Error:', error);
        },
      });

      console.log(redeemContract)
      
      const redeemContractAsBigInt = BigInt(50000000000000000);

    async function handleDepositClick() {
       
        const vaultAddress = '0xA9695783141eD1552ce42B6c0714798A43C2e37d'
      
        
        const { request } = await prepareWriteContract({
          address: vaultAddress,
          abi: TokenMinterABI,
          functionName: 'mint',
          args:  [toStake], 
          value: redeemContractAsBigInt
        }); // Use the prepareWriteContract hook to prepare the contract write transaction
    
        console.log(request)
        const { hash } = await writeContract(request); // Use the writeContract hook to send the contract write transaction
      
         const transactionReceipt = await waitForTransaction({ hash }); // Use the waitForTransaction hook to wait for the transaction to be confirmed
         txMessage(transactionReceipt); 
      
     
          if(transactionReceipt){
            depositMessage(transactionReceipt)
          }
        

        
      }



  return (
    <>

<Card
                    style={{
                        height: '265px' ,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'space-evenly',
                        padding: '20px 30px',
                        // overflowY: mode == AUTO ? 'hidden' : 'scroll',
                        overflowX: 'hidden',
                    }}
                >
           <Col span={24}>
             <Row>
               <Col span={24}>
                    <InputContainer>
                        <InputNumber
                           style={{
                               width: '100%',
                             height: '100%',
                                borderRadius: '15px',
                              padding: '5px 0px 0px 5px',
                              overflow: 'hidden',
                                boxShadow: 'none',
                            }}
                            stringMode={true}
                            min={0}
                            value={toStake}
                            onChange={(newValue) => {
                                if (newValue !== null) {
                                    setToStake(newValue);
                                }
                        
                            }}
                        
                            // disabled={!props.isMinting || !props.approved || props.disabled}
                            // size="large"
                        />
                        <TextBold style={{ position: 'absolute', bottom: '10px', right: '20px' }}>
                            {/* {props.asset ? props.asset.symbol : '...'} */}DFI
                        </TextBold>
                    </InputContainer>
                </Col>
                <Col span={12} style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                    <Field>
     
                        {/* {`Balance: ${dfiChainBalance ? parseFloat(dfiChainBalance?.formatted).toFixed(2) : '0.00'} DFI`} */}
                    </Field>
                </Col>
                <Col span={12} style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                    <Field>
                        {/* {`Balance: ${usdtBalance ? parseFloat(usdtBalance?.formatted).toFixed(2) : '0.00'} USDT`} */}
                    </Field>
                </Col>
                <Col span={12} style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                    <Field>
{/*      
                        {`Balance: ${daiBalance ? parseFloat(daiBalance?.formatted).toFixed(2) : '0.00'} DAI`} */}
                    </Field>
                </Col>
                
              
               
                <Col span={24}>
                    <Outline
                        style={{
                            width: '100%',
                            marginTop: "10px",
                            // display:
                            //     props.isMinting && props.approved != undefined && !props.approved ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}
                        // disabled={!props.fund}
                        onClick={() => {
                          
                            // if (approved) {
                            //      handleDepositClick()
                            // } else{
                            //     handleApproveClick()
                            // }
                            handleDepositClick()
                        }}
                    >
                    Mint a Maximun of 10 DFI tokens
                    </Outline>
                </Col>
           
            </Row>
         </Col>
         
       
         </Card>
        
    </>
  )
}

export default FlowMint