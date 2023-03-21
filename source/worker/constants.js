export const BLACKLIST_USRNAME = [' ', 'coin98', 'marginatm', 'c98', 'profile']

export const COIN98_SYSTEM_KEY = {
  C98AMBEOLCN: 'amberBlocks',
  C98SUPAGEIR: 'superlinkCoin98',
  C98SUPIMNKM: 'superlink',
  C98ISSNKIMK: 'insight',
  C98WLFININS: 'wallet',
  C98EXTMSKWE: 'extension',
  C98HUWAEXMK: 'labs',
  C98BARYDMWN: 'baryon',
  C98SARMENCS: 'saros',
  C98ANCMEK8W: 'ancient8',
  C98DAGDBMQ9: 'dagora',
  C98GIFT: 'C98GIFT'
}

export const INFO_SYSTEM = {
  C98ISSNKIMK: {
    logo: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Logo/c98ins.png',
    title: 'Coin98 Insights',
    url: 'https://coin98.net'
  },
  C98HUWAEXMK: {
    logo: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Logo/c98ins.png',
    title: 'Coin98 Hubs',
    url: 'https://hub.coin98.com/'
  }
}

export const PROJECT_USER = {
  _id: 1,
  id: 1,
  name: 1,
  userName: 1,
  isHideFromSearch: 1,
  rewardWalletAddress: 1,
  refId: 1,
  image: 1,
  locale: 1
}

export const PROJECT_MARKET_COIN = {
  _id: 0,
  id: 1,
  symbol: 1,
  image: 1,
  name: 1,
  current_price: 1,
  price_change_percentage_24h: 1
}

export const chainType = {
  algorand: 'algorand',
  functionX: 'functionX',
  secretNetwork: 'secretNetwork',
  elrond: 'elrond',
  conflux: 'conflux',
  tezos: 'tezos',
  harmony: 'harmony',
  aurora: 'aurora',
  // 10.5.0

  kucoin: 'kucoin',
  boba: 'boba',
  arbitrum: 'arbitrum',
  arbitrumXdai: 'arbitrumXdai',
  optimism: 'optimism',

  ETH: 'ether',
  BSC: 'binanceSmart',
  TRX: 'tron',

  near: 'near',
  avax: 'avax',
  avaxX: 'avaxX',
  polkadot: 'polkadot',
  binanceSmart: 'binanceSmart',
  multiChain: 'multiChain',
  bitcoin: 'bitcoin',
  tomo: 'tomo',
  binance: 'binance',
  ether: 'ether',
  celo: 'celo',
  eos: 'eos',
  heco: 'heco',
  kusama: 'kusama',
  solana: 'solana',
  tron: 'tron',
  cosmos: 'cosmos',
  thor: 'thor',
  terra: 'terra',
  band: 'band',
  kava: 'kava',
  fantom: 'fantom',
  matic: 'matic',
  persistence: 'persistence',
  xDai: 'xDai',
  kardia: 'kardia',
  helimum: 'helium',
  casper: 'casper',
  omg: 'omg',
  dogecoin: 'dogecoin',
  ronin: 'ronin',
  okex: 'okex',
  gate: 'gate',
  klaytn: 'klaytn',
  //* 17/5/2022
  cronos: 'cronos', // done
  bittorrent: 'bittorrent', // done
  moonbeam: 'moonbeam', // done
  theta: 'theta', //
  thetaFuel: 'thetaFuel', // EVM
  platon: 'platon', //
  ton: 'ton'
}

export const DEFAULT_NETWORK_PROFILE = [
  {
    bech32Config: {
      bech32PrefixAccAddr: 'aura',
      bech32PrefixAccPub: 'aurapub',
      bech32PrefixConsAddr: 'auravalcons',
      bech32PrefixConsPub: 'auravalconspub',
      bech32PrefixValAddr: 'auravaloper',
      bech32PrefixValPub: 'auravaloperpub'
    },
    bip44: {
      coinType: 118
    },
    chainId: 'serenity-testnet-001',
    chainName: 'Aura Serenity Testnet',
    name: 'Aura Serenity Testnet',
    coinType: 118,
    currencies: [
      {
        coinDecimals: 6,
        coinDenom: 'AURA',
        coinMinimalDenom: 'uaura'
      }
    ],
    explorer: 'https://serenity.aurascan.io/',
    features: [
      'ibc-transfer'
    ],
    feeCurrencies: [
      {
        coinDecimals: 6,
        coinDenom: 'AURA',
        coinMinimalDenom: 'uaura'
      }
    ],
    gasPriceStep: {
      average: 0.0025,
      high: 0.004,
      low: 0.001
    },
    logo: 'https://i.imgur.com/zi0mTYb.png',
    rest: 'https://lcd.serenity.aura.network',
    rpc: 'https://rpc.serenity.aura.network',
    stakeCurrency: {
      coinDecimals: 6,
      coinDenom: 'AURA',
      coinMinimalDenom: 'uaura'
    },
    walletUrlForStaking: 'https://serenity.aurascan.io/validators'
  },
  {
    chainId: 'euphoria-2',
    chainName: 'Aura Euphoria TestNet',
    name: 'Aura Euphoria TestNet',
    rpc: 'https://rpc.euphoria.aura.network',
    rest: 'https://lcd.euphoria.aura.network',
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: 'aura',
      bech32PrefixAccPub: 'aura' + 'pub',
      bech32PrefixValAddr: 'aura' + 'valoper',
      bech32PrefixValPub: 'aura' + 'valoperpub',
      bech32PrefixConsAddr: 'aura' + 'valcons',
      bech32PrefixConsPub: 'aura' + 'valconspub'
    },
    currencies: [{
      coinDenom: 'EAURA',
      coinMinimalDenom: 'ueaura',
      coinDecimals: 6
    }],
    feeCurrencies: [{
      coinDenom: 'EAURA',
      coinMinimalDenom: 'ueaura',
      coinDecimals: 6
    }],
    stakeCurrency: {
      coinDenom: 'EAURA',
      coinMinimalDenom: 'ueaura',
      coinDecimals: 6
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.001,
      average: 0.0025,
      high: 0.004
    },
    features: ['no-legacy-stdTx'],
    walletUrlForStaking: 'https://euphoria.aurascan.io/validators',
    logo: 'https://i.imgur.com/zi0mTYb.png',
    explorer: 'https://euphoria.aurascan.io/'
  },
  {
    name: 'Ethereum Rinkeby Testnet',
    rpcURL: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    url: 'https://rinkeby.etherscan.io',
    symbol: 'ETH',
    chainId: '4'
  },
  {
    name: 'Ethereum Kovan Testnet',
    rpcURL: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    url: 'https://kovan.etherscan.io',
    symbol: 'ETH',
    chainId: '42'
  },
  {
    name: 'Ethereum Ropsten Testnet',
    rpcURL: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    url: 'https://ropsten.etherscan.io',
    symbol: 'ETH',
    chainId: '3'
  },
  {
    name: 'Ethereum Goerli Testnet',
    rpcURL: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    url: 'https://goerli.etherscan.io',
    symbol: 'ETH',
    chainId: '5'
  },
  {
    name: 'Eden Network',
    rpcURL: 'https://api.edennetwork.io/v1/rpc',
    url: 'https://explorer.edennetwork.io',
    symbol: 'ETH',
    chainId: '1'
  },
  {
    name: 'Eden Ropsten Testnet',
    rpcURL: 'https://dev-api.edennetwork.io/v1/rpc',
    url: 'https://ropsten.etherscan.io',
    symbol: 'ETH',
    chainId: '3'
  },
  {
    name: 'Binance Smart Chain Testnet',
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    url: 'https://testnet.bscscan.com',
    symbol: 'BNB',
    chainId: '97'
  },
  {
    name: 'HECO Chain Testnet',
    rpcURL: 'https://http-testnet.hecochain.com',
    url: 'https://testnet.hecoinfo.com',
    symbol: 'htt',
    chainId: '256'
  },
  {
    name: 'OKExChain Testnet',
    rpcURL: 'https://exchaintestrpc.okex.org',
    url: 'https://www.oklink.com/okexchain-test',
    symbol: 'OKT',
    chainId: '65'
  },
  {
    name: 'GateChain Testnet',
    rpcURL: 'https://meteora.gatenode.cc:6060',
    url: 'https://explorer.gatechain.io/meteora',
    symbol: 'GT',
    chainId: '1337'
  },
  {
    name: 'KCC Mainnet',
    rpcURL: 'https://rpc-mainnet.kcc.network',
    url: 'https://explorer.kcc.io/en',
    symbol: 'KCS',
    chainId: '321'
  },
  {
    name: 'KCC Testnet',
    rpcURL: 'https://rpc-testnet.kcc.network',
    url: 'https://scan-testnet.kcc.network',
    symbol: 'tKCS',
    chainId: '322'
  },
  {
    name: 'Avalanche Testnet Fuji',
    rpcURL: 'https://api.avax-test.network/ext/bc/C/rpc',
    url: 'https://cchain.explorer.avax-test.network',
    symbol: 'AVAX',
    chainId: '43113'
  },
  {
    name: 'Polygon Testnet Mumbai',
    rpcURL: 'https://rpc-mumbai.matic.today',
    url: 'https://mumbai.polygonscan.com/',
    symbol: 'tMATIC',
    chainId: '80001'
  },
  {
    name: 'Celo Testnet Baklava',
    rpcURL: 'https://baklava-forno.celo-testnet.org',
    url: 'https://docs.celo.org/',
    symbol: 'CELO',
    chainId: '62320'
  },
  {
    name: 'EOS Mainnet',
    rpcURL: 'https://api.eosargentina.io',
    url: 'https://bloks.eosargentina.io',
    symbol: 'EOS',
    chainId: '59'
  },
  {
    name: 'Arbitrum Testnet',
    rpcURL: 'https://rinkeby.arbitrum.io/rpc',
    url: 'https://rinkeby-explorer.arbitrum.io/#/',
    symbol: 'ETH',
    chainId: '421611'
  },
  {
    name: 'Optimism Testnet Kovan',
    rpcURL: 'https://kovan.optimism.io',
    url: 'https://kovan-explorer.optimism.io/',
    symbol: 'ETH',
    chainId: '69'
  },
  {
    name: 'Optimistic Testnet Goerli',
    rpcURL: 'https://goerli.optimism.io/',
    url: 'https://optimism.io',
    symbol: 'GOR',
    chainId: '420'
  },
  {
    name: 'OMGX Testnet L2 BOBA',
    rpcUrl: 'https://rinkeby.boba.network',
    url: 'https://blockexplorer.rinkeby.boba.network/',
    symbol: 'ETH',
    chainId: '28'
  },
  {
    name: 'Harmony Mainnet Shard 0',
    rpcURL: 'https://api.harmony.one',
    url: 'https://explorer.harmony.one',
    symbol: 'ONE',
    chainId: '1666600000'
  },
  {
    name: 'Harmony Mainnet Shard 1',
    rpcURL: 'https://s1.api.harmony.one',
    url: 'https://www.harmony.one/',
    symbol: 'ONE',
    chainId: '1666600001'
  },
  {
    name: 'Harmony Mainnet Shard 2',
    rpcURL: 'https://s2.api.harmony.one',
    url: 'https://www.harmony.one/',
    symbol: 'ONE',
    chainId: '1666600002'
  },
  {
    name: 'Harmony Testnet Shard 1',
    rpcURL: 'https://api.s1.b.hmny.io',
    url: 'https://www.harmony.one/',
    symbol: 'ONE',
    chainId: '1666700001'
  },
  {
    name: 'Theta Mainnet',
    rpcURL: 'https://eth-rpc-api.thetatoken.org/rpc',
    url: 'https://explorer.thetatoken.org',
    symbol: 'TFUEL',
    chainId: '36'
  },
  {
    name: 'Theta Testnet',
    rpcURL: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
    url: 'https://testnet-explorer.thetatoken.org',
    symbol: 'TFUEL',
    chainId: '365'
  },
  {
    name: 'IoTeX Network Mainnet',
    rpcURL: 'https://babel-api.mainnet.iotex.io',
    url: 'https://iotexscan.io',
    symbol: 'IOTX',
    chainId: '4689'
  },
  {
    name: 'IoTeX Network Testnet',
    rpcURL: 'https://babel-api.testnet.iotex.io',
    url: 'https://testnet.iotexscan.io',
    symbol: 'IOTX',
    chainId: '4690'
  },
  {
    name: 'Polis Mainnet',
    rpcURL: 'https://rpc.polis.tech',
    url: 'https://polis.tech',
    symbol: 'POLIS',
    chainId: '333999'
  },
  {
    name: 'Polis Testnet',
    rpcURL: 'https://sparta-rpc.polis.tech',
    url: 'https://polis.tech',
    symbol: 'tPOLIS',
    chainId: '333888'
  },
  {
    name: 'Quarkblockchain Mainnet',
    rpcURL: 'https://hz.rpc.qkiscan.cn',
    url: 'https://quarkblockchain.org/',
    symbol: 'QKI',
    chainId: '20181205'
  },
  {
    name: 'Moonriver Mainnet',
    rpcURL: 'https://rpc.moonriver.moonbeam.network',
    url: 'https://moonbeam.network/networks/moonriver/',
    symbol: 'MOVR',
    chainId: '1285'
  },
  {
    name: 'Moonbase Alpha Testnet',
    rpcURL: 'https://rpc.testnet.moonbeam.network',
    url: 'https://moonbase-blockscout.testnet.moonbeam.network',
    symbol: 'DEV',
    chainId: '1287'
  },
  {
    name: 'Aurora Testnet',
    rpcURL: 'https://testnet.aurora.dev/',
    symbol: 'ETH',
    chainId: '1313161554'
  },
  {
    name: 'Cronos Testnet',
    rpcURL: 'https://cronos-testnet.crypto.org:8545',
    url: 'https://cronos-explorer.crypto.org',
    symbol: 'tCRO',
    chainId: '338'
  },
  {
    name: 'GoChain Testnet',
    rpcURL: 'https://testnet-rpc.gochain.io',
    url: ' https://testnet-explorer.gochain.io',
    symbol: 'GO',
    chainId: '31337'
  }
]
