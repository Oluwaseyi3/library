// import { BigNumberish } from '@ethersproject/bignumber';
// import { parseBalance } from '../util';
// import { Contract } from '@ethersproject/contracts';
// import { useWeb3React } from '@web3-react/core';
// import useSWR from 'swr';
// import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

// async function getBalance(bundleToken: Contract, address: string): Promise<BigNumberish> {
//     const balance = await bundleToken.balanceOf(address);
//     return parseBalance(balance);
// }

// export default function useBalance(bundleToken: Contract | undefined) {
//     const { account } = useWeb3React();

//     const shouldFetch = typeof account === 'string' && !!bundleToken;

//     const balanceFetcher = async () => {
//         if (!bundleToken || !account) {
//             return null;
//         }

//         try {
//             const balance = await getBalance(bundleToken, account);
           
            
//             return balance;
//         } catch (error) {
//             console.error('Error fetching balance:', error);
//             return null;
//         }
//     };

//     const { data: balance, error } = useSWR(shouldFetch ? ['balance', account] : null, balanceFetcher);

//     // useKeepSWRDataLiveAsBlocksArrive(balanceFetcher);

//     return {
//         balance,
//         isLoading: shouldFetch && !balance && !error,
//         isError: !!error,
//     };
// }
