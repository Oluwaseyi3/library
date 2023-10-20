import Bundle from '../contracts/Bundle.json';
import { getAsset, Asset } from './asset';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

export interface Fund {
    name: string;
    address: string;
    assets: string[];
    symbol: string;
    description?: string;
    autoGas?: string;
    cgid?: string;
}

type NamedFunds = { [key: string]: Fund };

const FUNDS: NamedFunds = {
    dDEFI: {
        name: 'dDeFi Index',
        address: '0x045FE47f58b673402D79Ee13c509bB9E745b793B',
        assets: ['UNI', 'LINK', 'SUSHI', 'COMP', 'CAKE', 'BIFI', 'ALPACA', 'MIR', 'CREAM'],
        symbol: 'bDEFI',
        description: 'A hyper-focused index containing market-leading cross-chain and BSC native DeFi protocols.',
        autoGas: '5000000',
        cgid: 'bdefi',
    },
    dCHAIN: {
        name: 'dChain Index',
        address: '0x0f2CA5Fb9379de74C2E0dF51538a9E4e2f2b50af  ',
        assets: ['BTCB', 'ETH', 'WBNB', 'ADA', 'DOT'],
        symbol: 'bCHAIN',
        description: 'A hyper-focused index containing native assets of market-leading chains and high-cap protocols.',
        autoGas: '3000000',
        cgid: 'bchain',
    },
    dSTBL: {
        name: 'dStable Index',
        address: '0x64cA8Ab4f3214c8D3fc8D0d865A97D0aaF22F514 ',
        assets: ['USDC', 'DAI', 'BUSD', 'USDT'],
        symbol: 'bSTBL',
        description: 'A risk-mitigated stable index of high-cap collateralized and algorithmic stablecoins.',
        autoGas: '1500000',
        cgid: 'bstable',
    },
};

export const getFundByName = (name: string | undefined): Fund | undefined => {
    if (name) {
        return FUNDS[name];
    }
};

export const getAssets = async (fund: Fund | undefined, provider: any, setAssets?: any): Promise<Asset[]> => {
    if (!fund || !provider) {
        return [];
    }

    const assets: Asset[] = [];
    const amounts: BigNumber[] = [];
    const bundle = new Contract(fund.address, Bundle, provider);

    const addresses = await bundle.getCurrentTokens();

    const assetPromises = [];
    const balancePromises = [];

    for (const address of addresses) {
        assetPromises.push(getAsset(address, provider));
        balancePromises.push(bundle.getBalance(address));
    }

    await Promise.all(balancePromises).then((values) => {
        values.forEach((a) => {
            amounts.push(a);
        });
    });

    await Promise.all(assetPromises).then((values) => {
        values.forEach((a, i) => {
            assets.push(a);
            assets[i].amount = amounts[i];
        });
    });

    if (setAssets) {
        setAssets(assets);
    }

    return assets;
};
