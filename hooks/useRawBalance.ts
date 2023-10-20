// import useSWR from 'swr';
// import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
// import { Contract } from '@ethersproject/contracts';
// import { useWeb3React } from '@web3-react/core';

// async function getPendingBalance(token: Contract | undefined, address: any) {
//   try {
//     const balance = await token?.balanceOf(address);
//     // console.log(balance);
    
//     return balance;
//   } catch (error) {
//     throw new Error(`Failed to fetch balance:`);
//   }
// }

// export default function useRawBalance(token: Contract | undefined) {
//     const { account } = useWeb3React();
//     const shouldFetch = typeof account === 'string' && token;

//     // Create a key for the SWR cache using account and token address.
//     const cacheKey = shouldFetch ? ['UnstakedBalance', account, token.address] : null;
  
//     // Use a callback function for data fetching to make it more concise.
//     const fetcher = async (address: any) => {
//       // console.log(address);
      
//       try {
//         const balance = await getPendingBalance(token, address);
//         return balance;
//       } catch (error) {
//         throw new Error(`Failed to fetch balance:`);
//       }
//     };
  
//     const { data: balance, error, isValidating } = useSWR(
//       shouldFetch ? cacheKey : null,
//       fetcher
//     );
  
//     // console.log(balance)
  
//     return {
//       balance, // Check isLoading
//       isError: !!error,
//     };
//   }
  
  
  
  
  
  