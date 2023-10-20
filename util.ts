import { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export function shortenHex(hex: string, length: number = 4): string {
    return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

const NAMED_ADDRESSES: { [index: number]: { [index: string]: string } } = {
    137: {
        DerpfiToken: '0xa1fc310115FbC3b0e72DEf432Ccb91FABF9fcb94',
        Minter: '0xAEAbF28093fE275bF27c18f41a72e15cfb2FcBAF',
        BDLBNB: '0x620F9998cf912F38030610690e2F164A54F5d44b',
        BundleVault: '0x133F0aDDb0a549E4F70d0bCF2C724050B8cf7284 ',
    },
    // 56: {
    //     BundleToken: '0x7fF78E1cab9A2710Eb6486Ecbf3D94D125039364',
    //     Minter: '0xA54D10C6666172824Da54C0d90BcdE36B6dAbd85',
    //     BDLBNB: '0x693e745700D278Bf7e180D3fD94FA1A740807926',
    //     BundleVault: '0x6fdc3805A5F5f6cA28094ed8d20971ca4b85f20c',
    // },
};

export const CHAIN_IDS: (number | undefined)[] = [137];

const NUMERIC_UNITS: { [index: number]: string } = {
    1: 'K',
    2: 'M',
    3: 'B',
    4: 'T',
};

export function getNamedAddress(chainId: number | undefined, name: string): string | undefined {
    if (!!chainId) {
        return NAMED_ADDRESSES[chainId][name];
    }
}

export const parseBalance = (
    balance: BigNumberish,
    decimals: number = 18,
    decimalsToDisplay: number = 2,
    round: boolean = true
): string => {
    if (balance) {
        return Math.max(
            0,
            round
                ? Number(formatUnits(balance, decimals)) - 0.5 * 10 ** (-1 * decimalsToDisplay)
                : Number(formatUnits(balance, decimals))
        ).toFixed(decimalsToDisplay);
    } else {
        return '0.00';
    }
};

export const formatNumber = (input: number, precision = 2): string => {
    let tempInput = input;
    let count = 0;

    while (tempInput >= 1000 && count < 4) {
        tempInput /= 1000;
        count++;
    }

    if (tempInput >= 1000) {
        return `${parseFloat(input.toPrecision(4)).toExponential(precision)}`;
    } else if (count == 0) {
        return `${parseFloat(input.toPrecision(4)).toFixed(precision)}`;
    } else {
        return `${parseFloat(tempInput.toPrecision(4)).toFixed(precision)}${NUMERIC_UNITS[count]}`;
    }
};
