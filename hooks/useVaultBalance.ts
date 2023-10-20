// import useSWR from 'swr';
// import { Contract } from '@ethersproject/contracts';
// import { useWeb3React } from '@web3-react/core';
// import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

// function getVaultBalance(vault: Contract) {
//     return async (address: any, _: any) => {
//         return vault.getBalance(address);
//     };
// }

// export default function useVaultBalance(vault: Contract | undefined, suspense = false) {
//     const { account } = useWeb3React();
//     const shouldFetch = typeof account === 'string' && !!vault;



//     const result = useSWR(shouldFetch ? [account, 'UnstakedBalance', vault] : null, getVaultBalance(vault!), {
//         suspense,
//     });

//     useKeepSWRDataLiveAsBlocksArrive(result.mutate);

//     return result;
// }
