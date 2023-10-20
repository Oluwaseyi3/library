// import { useEffect, useRef } from 'react';
// import useBlockNumber from './useBlockNumber';

// export default function useKeepSWRDataLiveAsBlocksArrive(mutate: any) {
//     // Create a ref to store the mutate function
//     const mutateRef = useRef(mutate);

//     // Update the mutateRef when the mutate function changes
//     useEffect(() => {
//         mutateRef.current = mutate;
//     }, [mutate]);

//     // Fetch the latest block number using useBlockNumber hook
//     const { data: latestBlockNumber } = useBlockNumber();

//     // Trigger a mutation whenever a new block arrives
//     useEffect(() => {
//         // Call the stored mutate function
//         mutateRef.current();
//     }, [latestBlockNumber]);
// }
