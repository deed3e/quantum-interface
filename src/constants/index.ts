import { ChainId } from './../interfaces/index'
import { Token, TokenList } from '../interfaces'
import ETH_LOGO from 'assets/token-logos/eth.svg'
import MATIC_LOGO from 'assets/token-logos/matic.png'
import tokenList from './jsons/tokenList.json'
import { WRAPPED_NATIVE_ADDRESSES } from './addresses'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const ETHER_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export const NATIVE_COIN: { [chainId in number]: Token } = {
    [ChainId.GOERLI]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.GOERLI,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.MUMBAI]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'MATIC',
        chainId: ChainId.MUMBAI,
        name: 'Polygon',
        logoURI: MATIC_LOGO,
        decimals: 18,
    },
    [ChainId.ZKMAINNET]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.ZKMAINNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.ZKTESTNET]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.ZKTESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.BASETESTNET]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.BASETESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.LINEATESTNET]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.LINEATESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.LINEAMAINNET]: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'ETH',
        chainId: ChainId.LINEAMAINNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    // [ChainId.ETHMAINNET]: {
    //     address: '0x0000000000000000000000000000000000000000',
    //     symbol: 'ETH',
    //     chainId: ChainId.LINEAMAINNET,
    //     name: 'Ethereum',
    //     logoURI: ETH_LOGO,
    //     decimals: 18,
    // },
}

export const URLSCAN_BY_CHAINID: { [chainId in number]: { url: string } } = {
    [ChainId.GOERLI]: {
        url: 'https://goerli.etherscan.io/',
    },
    [ChainId.MUMBAI]: {
        url: 'https://mumbai.polygonscan.com/',
    },
    [ChainId.ZKMAINNET]: {
        url: 'https://explorer.zksync.io/',
    },
    [ChainId.ZKTESTNET]: {
        url: 'https://goerli.explorer.zksync.io/',
    },
    [ChainId.BASETESTNET]: {
        url: 'https://goerli.basescan.org/',
    },
    [ChainId.LINEATESTNET]: {
        url: 'https://goerli.lineascan.build/',
    },
    [ChainId.LINEAMAINNET]: {
        url: 'https://lineascan.build/',
    },
    // [ChainId.ETHMAINNET]: {
    //     url: 'https://etherscan.io',
    // },
}

export const WRAPPED_NATIVE_COIN: { [chainId in number]: Token } = {
    [ChainId.GOERLI]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.GOERLI],
        symbol: 'ETH',
        chainId: ChainId.GOERLI,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.MUMBAI]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.MUMBAI],
        symbol: 'MATIC',
        chainId: ChainId.MUMBAI,
        name: 'Polygon',
        logoURI: MATIC_LOGO,
        decimals: 18,
    },
    [ChainId.ZKMAINNET]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.ZKMAINNET],
        symbol: 'ETH',
        chainId: ChainId.ZKMAINNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.ZKTESTNET]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.ZKTESTNET],
        symbol: 'ETH',
        chainId: ChainId.ZKTESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.BASETESTNET]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.BASETESTNET],
        symbol: 'ETH',
        chainId: ChainId.BASETESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.LINEATESTNET]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.LINEATESTNET],
        symbol: 'ETH',
        chainId: ChainId.LINEATESTNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    [ChainId.LINEAMAINNET]: {
        address: WRAPPED_NATIVE_ADDRESSES[ChainId.LINEAMAINNET],
        symbol: 'ETH',
        chainId: ChainId.LINEAMAINNET,
        name: 'Ethereum',
        logoURI: ETH_LOGO,
        decimals: 18,
    },
    // [ChainId.ETHMAINNET]: {
    //     address: WRAPPED_NATIVE_ADDRESSES[ChainId.LINEAMAINNET],
    //     symbol: 'ETH',
    //     chainId: ChainId.LINEAMAINNET,
    //     name: 'Ethereum',
    //     logoURI: ETH_LOGO,
    //     decimals: 18,
    // },
}

export const CommonBaseTokens: { [chainId in number]: Token[] } = {
    [ChainId.GOERLI]: [
        NATIVE_COIN[ChainId.GOERLI],
        ...tokenList
            .filter((token) => token.chainId === ChainId.GOERLI)
            .slice(0, 5),
    ],
    [ChainId.MUMBAI]: [
        NATIVE_COIN[ChainId.MUMBAI],
        ...tokenList
            .filter((token) => token.chainId === ChainId.MUMBAI)
            .slice(0, 5),
    ],
    [ChainId.ZKMAINNET]: [
        NATIVE_COIN[ChainId.ZKMAINNET],
        ...tokenList
            .filter((token) => token.chainId === ChainId.ZKMAINNET)
            .slice(0, 5),
    ],
    [ChainId.ZKTESTNET]: [
        NATIVE_COIN[ChainId.ZKTESTNET],
        ...tokenList
            .filter((token) => token.chainId === ChainId.ZKTESTNET)
            .slice(0, 5),
    ],
    [ChainId.BASETESTNET]: [
        NATIVE_COIN[ChainId.BASETESTNET],
        ...tokenList
            .filter((token) => token.chainId === ChainId.BASETESTNET)
            .slice(0, 5),
    ],
    [ChainId.LINEATESTNET]: [
        NATIVE_COIN[ChainId.LINEATESTNET],
        ...tokenList
            .filter((token) => token.chainId === ChainId.LINEATESTNET)
            .slice(0, 5),
    ],
    [ChainId.LINEAMAINNET]: [
        NATIVE_COIN[ChainId.LINEAMAINNET],
        ...tokenList
            .filter((token) => token.chainId === ChainId.LINEAMAINNET)
            .slice(0, 5),
    ],
    // [ChainId.ETHMAINNET]: [
    //     NATIVE_COIN[ChainId.LINEAMAINNET],
    //     ...tokenList
    //         .filter((token) => token.chainId === ChainId.ETHMAINNET)
    //         .slice(0, 5),
    // ],
}

export const PRICE_TOKEN: { [chainId in number]: Token } = {
    [ChainId.ZKTESTNET]: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        decimals: 18,
        logoURI: ETH_LOGO,
        name: 'Ethereum',
        chainId: 280,
    },
    [ChainId.ZKMAINNET]: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        decimals: 18,
        logoURI: ETH_LOGO,
        name: 'Ethereum',
        chainId: 324,
    },
    [ChainId.BASETESTNET]: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        decimals: 18,
        logoURI: ETH_LOGO,
        name: 'Ethereum',
        chainId: 84531,
    },
    [ChainId.LINEATESTNET]: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        decimals: 18,
        logoURI: ETH_LOGO,
        name: 'Ethereum',
        chainId: 59140,
    },
    [ChainId.LINEAMAINNET]: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        decimals: 18,
        logoURI: ETH_LOGO,
        name: 'Ethereum',
        chainId: 59144,
    },
    // [ChainId.ETHMAINNET]: {
    //     address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    //     symbol: 'ETH',
    //     decimals: 18,
    //     logoURI: ETH_LOGO,
    //     name: 'Ethereum',
    //     chainId: 1,
    // },
}

export const DEFAULT_TOKEN_LIST: { [chainId in number]: TokenList } = {
    [ChainId.GOERLI]: [NATIVE_COIN[ChainId.GOERLI], ...tokenList],
    [ChainId.MUMBAI]: [NATIVE_COIN[ChainId.MUMBAI], ...tokenList],
    [ChainId.ZKMAINNET]: [NATIVE_COIN[ChainId.ZKMAINNET], ...tokenList],
    [ChainId.ZKTESTNET]: [NATIVE_COIN[ChainId.ZKTESTNET], ...tokenList],
    [ChainId.BASETESTNET]: [NATIVE_COIN[ChainId.BASETESTNET], ...tokenList],
    [ChainId.LINEATESTNET]: [NATIVE_COIN[ChainId.LINEATESTNET], ...tokenList],
    [ChainId.LINEAMAINNET]: [NATIVE_COIN[ChainId.LINEAMAINNET], ...tokenList],
    // [ChainId.ETHMAINNET]: [NATIVE_COIN[ChainId.LINEAMAINNET], ...tokenList],
}

export const ALL_SUPPORTED_CHAIN_IDS: ChainId[] = [
    ChainId.ZKMAINNET,
    ChainId.ZKTESTNET,
    ChainId.GOERLI,
    ChainId.MUMBAI,
    ChainId.BASETESTNET,
    ChainId.LINEATESTNET,
    ChainId.LINEAMAINNET,
    // ChainId.ETHMAINNET,
]

export const POOLS_SUBGRAPH_URL: { [chainId in number]: string } = {
    [ChainId.GOERLI]: '',
    [ChainId.MUMBAI]: '',
    [ChainId.ZKTESTNET]: '',
    [ChainId.ZKMAINNET]: '',
    [ChainId.BASETESTNET]: '',
    [ChainId.LINEATESTNET]: '',
    [ChainId.LINEAMAINNET]: '',
    // [ChainId.ETHMAINNET]: '',
}

export const ZKS_TOKEN: { [chainId in number]: Token } = {
    [ChainId.GOERLI]: {
        address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
        symbol: 'ZKS',
        name: 'zkSync Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 5,
    },
    [ChainId.MUMBAI]: {
        address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
        symbol: 'ZKS',
        name: 'zkSync Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 80001,
    },
    [ChainId.ZKTESTNET]: {
        address: '0x61F63BA22eEeE02E549F3f64abf19686691d7c9e',
        symbol: 'ZKS',
        name: 'zkSync Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 280,
    },
    [ChainId.ZKMAINNET]: {
        address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
        symbol: 'ZKS',
        name: 'zkSync Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 324,
    },
    [ChainId.BASETESTNET]: {
        address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
        symbol: 'ZKS',
        name: 'zkSync Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 84531,
    },
    [ChainId.LINEATESTNET]: {
        address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
        symbol: 'TLinea',
        name: 'TLinea Token',
        logoURI:
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
        decimals: 18,
        chainId: 59140,
    },
    [ChainId.LINEAMAINNET]: {
        address: '0xEFcdB0a0F99BDa971744F4D2B0684797915fAc0F',
        symbol: 'ACR',
        name: 'AncoraFinance Token',
        logoURI: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1936614963-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FNbWFZZFYYlXqZDfsGrB0%252Ficon%252F4Km3eJBbvq9FLr7ITwrB%252Flogo-dex-ancora1.png%3Falt%3Dmedia%26token%3Db2741617-67c8-44b5-8ca5-6900d79d61ae',
        decimals: 18,
        chainId: 59144,
    },
    // [ChainId.ETHMAINNET]: {
    //     address: '0x61Ed2c581cf6985FaFF0178617967f659AfaF27A',
    //     symbol: 'Token',
    //     name: 'Token',
    //     logoURI:
    //         'https://ipfs-2.thirdwebcdn.com/ipfs/QmRkhUD6J3B9WhT4hEWLrcFVTrBhx3CQgNC783aJsrwxSN/',
    //     decimals: 18,
    //     chainId: 1,
    // },
}

export const SUPPORTED_SYNCSWAP_TOKENS: { [chainId in number]: string[] } = {
    [ChainId.GOERLI]: [''],
    [ChainId.MUMBAI]: [''],
    [ChainId.ZKTESTNET]: [''],
    [ChainId.ZKMAINNET]: [
        'USDC',
        'ETH',
        'WETH',
        'USDT',
        'DAI',
        'ceBUSD',
        'zkUSD',
        'LUSD',
        'USD+',
        'crvUSD',
        'TiUSD',
    ],
    [ChainId.BASETESTNET]: [''],
    [ChainId.LINEATESTNET]: [''],
    [ChainId.LINEAMAINNET]: ['USDC', 'ETH', 'WETH', 'USDT', 'DAI'],
}
export const SUPPORTED_SYNCSWAP_STABLE_TOKENS: {
    [chainId in number]: string[]
} = {
    [ChainId.GOERLI]: [''],
    [ChainId.MUMBAI]: [''],
    [ChainId.ZKTESTNET]: [''],
    [ChainId.ZKMAINNET]: [
        'USDC',
        'USDT',
        'DAI',
        'ceBUSD',
        'zkUSD',
        'LUSD',
        'USD+',
        'crvUSD',
        'TiUSD',
    ],
    [ChainId.LINEAMAINNET]: [
        'USDC',
        'USDT',
        'DAI',
        'ceBUSD',
        'zkUSD',
        'LUSD',
        'USD+',
        'crvUSD',
        'TiUSD',
    ],
}
