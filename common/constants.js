export const isMain = true

export const CONTRACT_UP_DOWN = isMain ? '0x479e88c1aec622d1d200ef582deffe59e79553b0' : '0x4C5E6De7978E578c5eACb1dC1EbD18E21c3A9DEb'
export const CONTRACT_BUY_ADDRESS = isMain ? '0xb8c16a1e1b3e00dfd1ac25ca7d7c32a69939b587' : '0x7cEc9Bdd903D6f6290507C5b1aC340a36f0b76d4'
export const CONTRACT_SWAP_COIN = isMain ? '0x902eEC473241dF58ca6979Cbfad4d03e67657e3f' : '0xb7fA13148cDB6cC91BB836C3D62f92DD21863756'
export const CONTRACT_TICKET_GAME = isMain ? '0xa2B7129248a63782d6F07a2787322c2C3003aD55' : '0xa7DF97c12a489F943c1047e393832579a636Ec32'
export const CHARITY_ADDRESS = '0x6DF9fc28cD90DDd265b5404d8E8FCD8FDc0ae92e'
export const MARKET_ADDRESS = '0xb9f4de1774316973ee4c03ae597d207198d21d6a'
export const SAROS_SWAP_ADDRESS_V1 = 'SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'

export const SYSTEM_KEY = {
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
  C98GIFT: 'giftcard'
}

export const KEY_STORE = {
  coinList: 'coinList',
  rewardList: 'rewardList'
}

export const sarosSwapType = {
  swap: 'swap',
  addLiquidiTy: 'addLiquidiTy',
  removeLiquidity: 'removeLiquidity',
  createPool: 'createPool'
}

export const sarosSwapPoolType = {
  RAYDIUM: 'RAYDIUM',
  ORCA: 'ORCA',
  C98: 'C98'
}

export const sarosSwapDayDataType = {
  token: 'token',
  pool: 'pool'
}

export const baryonSwapContract = {
  heco: '0x89E7147b29D8842B49eF60b5ede07F9579e9dAef'
}

export const defaultModel = {
  date: { type: Date },
  sString: { type: String },
  string: { type: String, default: '' },
  numberUnique: { type: Number, required: true, unique: true },
  stringUnique: { type: String, required: true, unique: true },
  sArray: { type: Array },
  array: { type: Array, default: [] },
  number: { type: Number, default: 0 },
  sNumber: { type: Number },
  boolean: { type: Boolean, default: true },
  booleanFalse: { type: Boolean, default: false },
  sObject: { type: Object },
  object: { type: Object, default: {} }
}

export const optionsSocket = {
  /* socket.io options */
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
}

export const sendGridId = {
  vi: 'd-706255bb1f0a4e329826805f78a1572b',
  en: 'd-51e66f89753140f0a961d1cdb78ec3a9'
}

export const POINT_EARN = 2

export const newsType = {
  normal: 'normal',
  news: 'news'
}

export const userMarket = {
  id: '84396362645',
  address: '0xb9f4de1774316973ee4c03ae597d207198d21d6a'
}

export const transactionType = {
  burnMint: 'burnMint',
  lottery: 'lottery',
  game: 'game',
  earn: 'earn',
  swap: 'swap',
  normal: 'normal',
  kudo: 'kudo',
  reward: 'reward'
}

export const kudoType = {
  feed: 'feed',
  token: 'token',
  article: 'article',
  video: 'video',
  report: 'report'
}

export const rewardType = {
  item: 'item',
  code: 'code',
  abstract: 'abstract'
}

export const gameType = {
  dapp: 'dapp',
  c98: 'c98'
}

export const categoryType = {
  gemCoin: 'gemCoin',
  store: 'store',
  video: 'video',
  article: 'article',
  report: 'report',
  token: 'token',
  game: 'game'
}

export const earnMessage = {
  earnMission: ' Earn Mission',
  regBonus: 'Register Bonus',
  verifyEmail: 'Verify Email',
  connectChat: 'Connect Chatbot',
  swapTomoC98: 'Swap TOMO to C98',
  swapC98Tomo: 'Swap C98 to TOMO',
  verifyFace: 'Verify Facebook',
  verifyTelegram: 'Verify Telegram',
  dailyCheckIn: 'Check-in Day ',
  refBonusMission: 'Referral Bonus by ',
  refBonusIntroduced: 'Ref Bonus: Introduced ',
  refBonusBy: 'Ref Bonus: Introduced by ',
  kudoFrom: 'Kudos from '
}

export const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const invoiceStatus = {
  paid: 'paid',
  unPaid: 'unPaid',
  claim: 'claim'
}

export const COIN_ITEM = {
  DOT: {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT'
  },
  BNBSmart: {
    id: 'binancecoin',
    name: 'Binance Smart Chain',
    symbol: 'BNB'
  },
  BNB: {
    id: 'binancecoin',
    name: 'Binance Chain',
    symbol: 'BNB'
  },
  TRX: {
    id: 'tron',
    name: 'Tron',
    symbol: 'TRX'
  },
  SOL: {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    decimal: 9
  },
  BTC: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimal: 9
  },
  KSM: {
    id: 'kusama',
    name: 'Kusama',
    image: 'kusama',
    symbol: 'KSM'
  },
  HT: {
    id: 'huobi-token',
    name: 'Heco',
    image: 'heco',
    symbol: 'HT'
  },
  ETH: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    decimal: 18
  },
  C98: {
    symbol: 'C98',
    address: isMain ? '0x043BD4B9c8f93D3c8c220d1fb7b3EB961D24CbF7' : '0xddF4FCb7eb39F41A5b2A75e8677E4aA8EB91651D',
    decimal: 18
  },
  TOMO: {
    id: 'tomochain',
    symbol: 'TOMO',
    decimal: 18
  },
  CELO: {
    name: 'Celo',
    id: 'celo-gold',
    symbol: 'CELO',
    decimal: 18
  },
  USDT: {
    id: 'tether',
    symbol: 'USDT',
    address: isMain ? '0x381b31409e4d220919b2cff012ed94d70135a59e' : '0xe7932274D213778E612DD7dD92B1fed566babF6B',
    decimal: 6
  },
  avax: {
    id: 'avalanche-2',
    name: 'Avalanche IOU',
    image: 'avax',
    symbol: 'AVAX'
  }
}

export const chainType = {
  baseTest: 'baseTest',
  algorand: 'algorand',
  functionX: 'functionX',
  casper: 'casper',

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

export const ntfTokenType = {
  axies: 'axies',
  cryptoBlades: 'ceyptoBlades',
  faraland: 'faraland'
}
export const COIN_IMAGE = {
  BTC: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/BTC.png',
  ETH: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ETH.png',
  ETHARB: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/arbitrum_eth.png',
  ETHA0X: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/arbitrum_xdai.png',
  OP: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/op.png',
  BOBA: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/boba_eth.png',
  KCS: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/kucoin.png',
  BNB: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/BNBVer2.png',
  HT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/heco.png',
  TOMO: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/Tomo.png',
  USDT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/USDT.jpg',
  AVAX: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/avax.png',
  KSM: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/kusama.png',
  NEAR: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/near.png',
  DOT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/dot.png',
  C98: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/c98.png',
  TRX: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/tron.png',
  CELO: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/celo.png',
  SOL: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/solana.jpg',
  SRM: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/serum.jpg',
  ATOM: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/cosmos.png',
  RUNE: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/thor.png',
  LUNA: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/terra.png',
  KAVA: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/kava.png',
  BAND: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/band.png',
  FTM: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/fantom.png',
  MATIC: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/polygon.png',
  XPRT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/persistance.png',
  XDAI: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_xdai.png',
  KAI: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_kardia.png',
  RON: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_ronin.png',
  OKT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_okex.png',
  GT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_gate.png',
  KLAY: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ic_klaytn.png'
}

export const COSMOS_CHAIN = [chainType.cosmos, chainType.thor, chainType.band, chainType.terra]

export const CHAIN_DATA = {
  multiChain: {
    isOther: true,
    isMnemonic: true,
    name: 'Multi-Chain',
    image: 'app_multi_chain',
    chain: chainType.multiChain,
    trcName: 'All Blockchain'
  },
  customCreate: {
    isOther: true,
    name: 'Custom Network',
    image: 'app_custom_network',
    chain: chainType.customCreate,
    trcName: 'Create Custom Network'
  },
  custom: {
    isOther: true,
    name: 'Custom Network',
    image: 'app_box',
    chain: chainType.custom,
    trcName: 'Custom Network'
  },
  bitcoin: {
    numLoad: 5,
    isFee: true,
    isMnemonic: true,
    image: 'app_bitcoin',
    id: 'bitcoin',
    name: 'Bitcoin',
    shortName: 'Bitcoin',
    imageLink: COIN_IMAGE.BTC,
    symbol: 'BTC',
    chain: chainType.bitcoin,
    trcName: 'BTC',
    scan: 'https://www.blockchain.com/btc'
  },
  ether: {
    numChainId: 1,
    chainId: '0x1',
    numLoad: 1,
    isSupportedEIP1559: true,
    isToken: true,
    isSupportedNFT: true,

    trcToken: 'ERC20',
    nftToken: 'ERC721',
    balances: '0x38bb7b9b87bdfbed883aaf50a2f411d330fe32d6',
    multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_ethereum',
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'Ethereum',
    imageLink: COIN_IMAGE.ETH,
    symbol: 'ETH',
    chain: chainType.ether,
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://nd-882-009-235.p2pify.com/f2cfb8777ba44e372c9ab251b51980d8',
    scan: 'https://etherscan.io'
  },
  binanceSmart: {
    numChainId: 56,
    chainId: '0x38',
    numLoad: 1,
    isToken: true,
    isSupportedNFT: true,
    nftToken: 'BEP721',
    trcToken: 'BEP20',
    symbolSpecial: 'BSC',
    balances: '0xA6762c710852681c4593C10c4304C5211FB2122c',
    multisend: '0x2E1D30460265bFEBedacf5bb6f9A80F0E74B7498',
    nftMint: '0xc4cAd0938256ABA4417c565044Be2c2EB77096cb',

    subName: 'BSC',

    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_binance',

    id: 'binancecoin',
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    imageLink: COIN_IMAGE.BNB,
    symbol: 'BNB',
    chain: chainType.binanceSmart,
    trcName: 'BNB BEP20',
    rpcURL: 'https://bsc-mainnet.nodereal.io/v1/68ac333c4bc646df8ef23fe996dd6d83',
    scan: 'https://bscscan.com'
  },
  heco: {
    numChainId: 128,
    chainId: '0x80',
    numLoad: 1,
    isToken: true,
    isSupportedEIP1559: true,
    isSupportedNFT: true,
    trcToken: 'HRC20',
    nftToken: 'HRC721',
    isWeb3: true,
    isFee: true,
    image: 'app_heco',
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',

    id: 'huobi-token',
    name: 'HECO Chain',
    shortName: 'Huobi',
    imageLink: COIN_IMAGE.HT,
    symbol: 'HT',
    chain: chainType.heco,
    trcName: 'HT HRC20',
    rpcURL: 'https://http-mainnet.hecochain.com',
    scan: 'https://hecoinfo.com'
  },
  okex: {
    numChainId: 66,
    chainId: '0x42',
    numLoad: 2,
    isSupportedNFT: true,
    balances: '0x5c93f4b35d3dd97ef481881aa33d00f76806fdad',
    multisend: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    isToken: true,
    id: 'okexchain',
    name: 'OKExChain',
    image: 'app_okex',
    symbol: 'OKT',
    chain: chainType.okex,
    imageLink: COIN_IMAGE.OKT,
    icon: 'okex',
    trcToken: 'KIP20',
    nftToken: 'NFT',
    trcName: 'OKT KIP10 KIP20 NFT',
    isFee: true,
    isWeb3: true,
    rpcURL: 'https://exchainrpc.okex.org',
    scan: 'https://www.oklink.com/okexchain'
  },
  gate: {
    numChainId: 86,
    chainId: '0x56',
    numLoad: 2,
    balances: '0x5c93f4b35d3dd97ef481881aa33d00f76806fdad',
    multisend: '0x963e1bcd1f82724bd8fa16a3b6962d100fb287fc',
    nftMint: '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',
    isSupportedNFT: true,
    isToken: true,
    id: 'gatechain-token',
    name: 'GateChain',
    image: 'app_gate',
    symbol: 'GT',
    chain: chainType.gate,
    imageLink: COIN_IMAGE.GT,
    icon: 'gate',
    trcToken: 'GRC20',
    nftToken: 'GRC721',
    trcName: 'GT GRC20 GRC721',
    isFee: true,
    isWeb3: true,
    rpcURL: 'https://evm.gatenode.cc',
    scan: 'https://gatescan.org'
  },

  kucoin: {
    numChainId: 321,
    chainId: '0x141',

    numLoad: 2,
    isToken: true,
    subName: 'KCS',
    trcToken: 'KRC20',
    nftToken: 'KRC721',
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    isWeb3: true,
    isSupportedNFT: true,
    isFee: true,
    image: 'app_kucoin',
    id: 'kucoin-shares',
    name: 'KuCoin Chain',
    shortName: 'Kucoin',
    imageLink: COIN_IMAGE.KCS,
    symbol: 'KCS',
    chain: chainType.kucoin,
    trcName: 'KCS KRC20 KRC721',
    rpcURL: 'https://rpc-mainnet.kcc.network',
    scan: 'https://explorer.kcc.io/en'
  },
  solana: {
    numLoad: 1,
    isToken: true,
    trcToken: 'SPL',
    nftToken: 'SPL NFT',
    multisend: true,
    isSupportedNFT: true,

    image: 'app_solana',

    id: 'solana',
    name: 'Solana',
    shortName: 'Solana',
    imageLink: COIN_IMAGE.SOL,
    symbol: 'SOL',
    chain: chainType.solana,
    trcName: 'SOL SPL',
    rpcURL: 'https://orca.rpcpool.com',
    rpcURLSerum: 'https://solana-api.projectserum.com',
    scan: 'https://solscan.io'
  },
  near: {
    numLoad: 2,
    isToken: true,
    trcToken: 'NEP21',

    image: 'app_near',
    id: 'near',
    name: 'Near',
    imageLink: COIN_IMAGE.NEAR,
    symbol: 'NEAR',
    trcName: 'NEAR NEP21',
    chain: chainType.near,
    scan: 'https://explorer.near.org',
    rpcURL: 'https://public-rpc.blockpi.io/http/near',
    scanTxs: 'transactions',
    scanAddr: 'accounts'
  },
  avax: {
    numPath: 9000,

    numChainId: 43114,
    chainId: '0xa86a',

    numLoad: 1,
    isSupportedNFT: true,
    isToken: true,
    trcToken: 'ARC20',
    nftToken: 'ARC721',
    symbolSpecial: 'CCHAIN',
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    nftMint: '0x0eCE57A677D5e72D1ad45774239e23463CF1d743',

    subName: 'C',

    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_avalancher',
    id: 'avalanche-2',
    name: 'Avalanche C-Chain',
    shortName: 'Avalanche',
    imageLink: COIN_IMAGE.AVAX,
    symbol: 'AVAX',
    chain: chainType.avax,
    trcName: 'AVAX-C ARC20',
    rpcURL: 'https://rpc.ankr.com/avalanche',
    scan: 'https://snowtrace.io'
  },
  avaxX: {
    numLoad: 5,
    symbolSpecial: 'XCHAIN',
    subName: 'X',
    image: 'app_avalancher',
    id: 'avalanche-2',
    name: 'Avalanche X-Chain',
    shortName: 'Avalanche',
    imageLink: COIN_IMAGE.AVAX,
    symbol: 'AVAX',
    chain: chainType.avaxX,
    trcName: 'AVAX-X',
    scan: 'https://avascan.info/blockchain/x'
  },
  tron: {
    numLoad: 1,
    isToken: true,
    trcToken: 'TRC20',
    trcSubName: 'TRC10',

    image: 'app_tron',

    id: 'tron',
    name: 'Tron',
    shortName: 'Tron',
    imageLink: COIN_IMAGE.TRX,
    symbol: 'TRX',
    chain: chainType.tron,
    trcName: 'TRX TRC10 TRC20',
    scan: 'https://tronscan.org/#',
    scanTxs: 'transaction'
  },
  matic: {
    numChainId: 137,
    chainId: '0x89',
    numLoad: 2,
    isToken: true,
    trcToken: 'PRC20',
    nftToken: 'PRC721',
    isSupportedV2: true,
    isSupportedNFT: true,
    isFee: true,
    isWeb3: true,
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',
    nftMint: '0x9aE5c1cf82aF51CBB83D9A7B1C52aF4B48E0Bb5E',

    id: 'matic-network',
    name: 'Polygon',
    image: 'app_polygon',
    imageLink: COIN_IMAGE.MATIC,
    symbol: 'MATIC',
    chain: chainType.matic,
    trcName: 'MATIC PRC20',
    rpcURL: 'https://nd-302-286-039.p2pify.com/2d8e16206109f7b5256e1d7d58345a90',
    scan: 'https://polygonscan.com'
  },
  fantom: {
    numChainId: 250,
    chainId: '0xFA',

    numLoad: 2,
    isSupportedV2: true,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'FRC20',
    nftToken: 'FRC721',
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0x5c93f4b35d3dd97ef481881aa33d00f76806fdad',
    nftMint: '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',

    isFee: true,
    isWeb3: true,

    id: 'fantom',
    name: 'Fantom',
    image: 'app_fantom',
    imageLink: COIN_IMAGE.FTM,
    symbol: 'FTM',
    chain: chainType.fantom,
    trcName: 'FANTOM FRC20',
    rpcURL: 'https://rpc.ftm.tools',
    scan: 'https://ftmscan.com'
  },
  baseTest: {
    isToken: true,
    isSupportedNFT: true,

    trcToken: 'ERC20',
    nftToken: 'ERC721',
    trcName: 'ETH ERC20 ERC721',
    environment: 'devnet',
    isDevnet: true,
    numChainId: 84531,
    chainId: '0x14A33',
    numLoad: 2,
    isFee: true,
    isWeb3: true,
    balances: '0x1C40CBda91e1E0504805eCf038F2e067D11DdBE9',
    nftMint: '0xB3E382CA0562C4440f346768b9b20bA813d21FDb',
    multisend: '0x8a77C6d87B5E5Ea7e779C7d14cA50315Bfc4C019',

    id: 'basetest',
    name: 'Base',
    image: 'ic-base',
    imageLink: COIN_IMAGE.BASE,
    symbol: 'ETH',
    chain: chainType.baseTest,
    rpcURL: 'https://goerli.base.org',
    scan: 'https://goerli.basescan.org'
  },
  xDai: {
    numChainId: 100,
    chainId: '0x64',

    numLoad: 2,
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    isSupportedNFT: true,
    isToken: true,
    id: 'xdai',
    name: 'xDAI Chain',
    image: 'app_xDai',
    symbol: 'XDAI',
    chain: chainType.xDai,
    imageLink: COIN_IMAGE.XDAI,
    icon: 'xDai',
    trcToken: 'XRC20',
    nftToken: 'XRC721',
    trcName: 'XDAI XRC20',
    isFee: true,
    isWeb3: true,
    rpcURL: 'https://rpc.xdaichain.com',
    scan: 'https://blockscout.com/xdai/mainnet'
  },
  polkadot: {
    isPolkadot: true,
    numLoad: 3,
    image: 'app_polkadot',

    isMnemonic: true,
    id: 'polkadot',
    name: 'Polkadot',
    shortName: 'Polkadot',
    imageLink: COIN_IMAGE.DOT,
    symbol: 'DOT',
    chain: chainType.polkadot,
    trcName: 'DOT',
    rpcURL: 'rpc.polkadot.io',
    scan: 'https://polkadot.subscan.io',
    scanTxs: 'extrinsic',
    scanAddr: 'account'
  },
  kusama: {
    isPolkadot: true,
    numLoad: 3,
    image: 'app_kusama',

    isMnemonic: true,
    id: 'kusama',
    name: 'Kusama',
    shortName: 'Kusama',
    imageLink: COIN_IMAGE.KSM,
    symbol: 'KSM',
    chain: chainType.kusama,
    trcName: 'KSM',
    rpcURL: 'kusama-rpc.polkadot.io',
    scan: 'https://kusama.subscan.io'
  },
  cosmos: {
    prefix: 'cosmos',
    numPath: 118,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,
    id: 'cosmos',
    name: 'Cosmos',
    image: 'app_cosmos',
    symbol: 'ATOM',
    imageLink: COIN_IMAGE.ATOM,
    chain: chainType.cosmos,
    trcName: 'ATOM',
    scan: 'https://www.mintscan.io/cosmos',
    scanTxs: 'txs',
    scanAddr: 'account',
    scanBlocks: 'blocks/id'
  },
  thor: {
    prefix: 'thor',
    numPath: 931,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,
    id: 'thorchain',
    name: 'THORChain',
    image: 'app_thorchain',
    imageLink: COIN_IMAGE.RUNE,
    symbol: 'RUNE',
    chain: chainType.thor,
    trcName: 'RUNE',
    scan: 'https://viewblock.io/thorchain'
  },
  terra: {
    prefix: 'terra',
    numPath: 330,

    numLoad: 3,
    isToken: true,
    trcToken: 'CW20',

    isCosmos: true,
    isMemo: true,

    id: 'terra-luna',
    name: 'Terra',
    image: 'app_terra',
    symbol: 'LUNA',
    denom: 'uluna',
    imageLink: COIN_IMAGE.LUNA,
    chain: chainType.terra,
    trcName: 'LUNA CW20',
    scan: 'https://finder.terra.money/columbus-4'
  },
  band: {
    prefix: 'band',
    numPath: 494,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,
    id: 'band-protocol',
    name: 'BandChain',
    image: 'app_band',
    imageLink: COIN_IMAGE.BAND,
    symbol: 'BAND',
    trcName: 'BAND',
    chain: chainType.band,
    scan: 'https://cosmoscan.io',
    scanAddr: 'account'
  },
  kava: {
    prefix: 'kava',
    numPath: 459,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,

    id: 'kava',
    name: 'Kava',
    image: 'app_kava',
    imageLink: COIN_IMAGE.KAVA,
    symbol: 'KAVA',
    chain: chainType.kava,
    trcName: 'KAVA',
    scan: 'https://www.mintscan.io/kava',
    scanTxs: 'txs',
    scanAddr: 'account',
    scanBlocks: 'blocks/id'
  },
  secretNetwork: {
    prefix: 'secret',
    numPath: 529,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,

    id: 'secret',
    name: 'Secret Network',
    image: 'app_secret_network',
    imageLink: COIN_IMAGE.SCRT,
    symbol: 'SCRT',
    chain: chainType.secretNetwork,
    trcName: 'SCRT',
    scan: 'https://secretnodes.com/secret/chains/secret-4',
    scanTxs: 'transactions',
    scanAddr: 'account',
    scanBlocks: 'blocks/id'
  },
  persistence: {
    prefix: 'persistence',
    numPath: 750,

    numLoad: 3,
    isCosmos: true,
    isMemo: true,

    id: 'persistence',
    name: 'Persistence',
    image: 'app_-persistence',
    imageLink: COIN_IMAGE.XPRT,
    symbol: 'XPRT',
    chain: chainType.persistence,
    trcName: 'XPRT',
    scan: 'https://explorer.persistence.one',
    scanBlocks: 'blocks',
    scanTxs: 'transactions',
    scanAddr: 'wallet'
  },

  binance: {
    prefix: 'bnb',
    numPath: 714,

    numLoad: 2,
    isToken: true,
    trcToken: 'BEP2',
    symbolSpecial: 'BC',

    isCosmos: true,
    isMemo: true,
    subName: 'BC',

    image: 'app_binance',

    id: 'binancecoin',
    name: 'Binance Chain',
    shortName: 'Binance',
    imageLink: COIN_IMAGE.BNB,
    symbol: 'BNB',
    chain: chainType.binance,
    trcName: 'BNB BEP2 BEP8',
    scan: 'https://explorer.binance.org'
  },
  // elrond: {
  //   prefix: 'erd',
  //   numPath: 508,
  //   nftToken: 'SFT',
  //   numLoad: 3,
  //   isToken: true,
  //   trcToken: 'ESDT',

  //   id: 'elrond-erd-2',
  //   name: 'Elrond',
  //   image: 'app_elrond',
  //   imageLink: COIN_IMAGE.EGLD,
  //   symbol: 'EGLD',
  //   chain: chainType.elrond,
  //   trcName: 'EGLD ESDT SFT',
  //   scan: 'https://explorer.elrond.com',
  //   scanTxs: 'transactions',
  //   scanAddr: 'accounts',
  //   scanBlocks: 'blocks'
  // },
  // tezos: {
  //   prefix: 'tz1',
  //   numPath: 1729,
  //   nftToken: 'FA2',
  //   isToken: true,
  //   trcToken: 'FA1.2',
  //   numLoad: 1,

  //   id: 'tezos',
  //   name: 'Tezos',
  //   image: 'app_tezos',
  //   imageLink: COIN_IMAGE.XTZ,
  //   symbol: 'XTZ',
  //   chain: chainType.tezos,
  //   trcName: 'XTZ FA1.2 FA2',
  //   scan: 'https://tezblock.io',
  //   scanTxs: 'transaction',
  //   scanAddr: 'account',
  //   scanBlocks: 'block'
  // },
  tomo: {
    numPath: 889,

    numChainId: 88,
    chainId: '0x58',
    // numChainId: 4,
    // chainId: '0x4',

    numLoad: 2,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'TRC21',
    nftToken: 'TRC721',
    isWeb3: true,
    isFee: true,
    image: 'app_tomochain',
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',

    id: 'tomochain',
    name: 'TomoChain',
    shortName: 'Tomo',
    imageLink: COIN_IMAGE.TOMO,
    symbol: 'TOMO',
    chain: chainType.tomo,
    trcName: 'TOMO TRC21',
    rpcURL: 'https://rpc.tomochain.com',
    scan: 'https://scan.tomochain.com'
  },
  kardia: {
    numChainId: 1,
    chainId: '0x0',

    numLoad: 2,
    isToken: true,
    id: 'kardiachain',
    name: 'KardiaChain',
    image: 'app_kardia',
    symbol: 'KAI',
    chain: chainType.kardia,
    imageLink: COIN_IMAGE.KAI,
    icon: 'kardia',
    subName: 'KAI',
    trcToken: 'KRC20',
    nftToken: 'KRC721',
    trcName: 'KAI KRC20 KRC721',
    isFee: true,
    isWeb3: true,
    rpcURL: 'https://kai-seeds.kardiachain.io/',
    scan: 'https://explorer.kardiachain.io'
  },
  ronin: {
    prefix: 'ronin:',
    numChainId: 2020,
    chainId: '0x7e4',

    numLoad: 2,
    isToken: true,
    isSupportedNFT: true,
    id: 'ronin',
    name: 'Ronin',
    image: 'app_ronin',
    nftToken: 'RRC721',
    symbol: 'RON',
    chain: chainType.ronin,
    imageLink: COIN_IMAGE.RON,
    icon: 'ronin',
    trcToken: 'RRC20',
    trcName: 'RON RRC20 RRC721',
    isFee: true,
    isWeb3: true,
    rpcURL: 'https://api.roninchain.com/rpc',
    scan: 'https://explorer.roninchain.com'
  },
  celo: {
    mainAddress: '0x471ece3750da237f93b8e339c536989b8978a438',
    numPath: 52752,

    numChainId: 42220,
    chainId: '0xA4EC',

    numLoad: 1,
    isSupportedNFT: true,
    isFee: true,
    isToken: true,
    balances: '0x5c93f4b35d3dd97ef481881aa33d00f76806fdad',
    multisend: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    isWeb3: true,
    nftToken: 'CELO721',
    image: 'app_celo',
    id: 'celo',
    name: 'Celo',
    shortName: 'Celo',
    imageLink: COIN_IMAGE.CELO,
    symbol: 'CELO',
    chain: chainType.celo,
    trcName: 'CELO CUSD',
    rpcURL: 'https://forno.celo.org',
    scan: 'https://explorer.celo.org'
  },
  klaytn: {
    numChainId: 8217,
    chainId: '0x2019',

    numLoad: 2,
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    multisend: '0x5c93f4b35d3dd97ef481881aa33d00f76806fdad',

    isSupportedNFT: true,
    isToken: true,
    id: 'klay-token',
    name: 'Klaytn',
    image: 'app_klaytn',
    symbol: 'KLAY',
    trcToken: 'KIP7',
    nftToken: 'KIP37',

    chain: chainType.klaytn,
    imageLink: COIN_IMAGE.KLAY,
    icon: 'klaytn',
    trcName: 'KLAY KIP7 KIP37',
    isFee: true,
    isWeb3: true,
    scan: 'https://scope.klaytn.com',
    rpcURL: 'https://kaikas.cypress.klaytn.net:8651',
    scanAddr: 'account'
  },
  harmony: {
    prefix: 'one',
    numChainId: 1666600000,
    chainId: '0x63564C40',
    numLoad: 1,
    isToken: true,
    isSupportedNFT: true,
    nftToken: 'HRC721',
    trcToken: 'HRC20',
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    multisend: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    nftMint: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',

    isWeb3: true,
    isFee: true,
    image: 'app_harmony',

    id: 'harmony',
    name: 'Harmony',
    imageLink: COIN_IMAGE.ONE,
    symbol: 'ONE',
    chain: chainType.harmony,
    trcName: 'ONE HRC20 HRC721',
    rpcURL: 'https://api.harmony.one',
    scan: 'https://explorer.harmony.one'
  },
  // conflux: {
  //   prefix: 'cfx',
  //   trcToken: 'CRC20',
  //   nftToken: 'CRC721',
  //   isToken: true,
  //   isFee: true,
  //   numLoad: 1,

  //   id: 'conflux-token',
  //   name: 'Conflux',
  //   image: 'app_conflux',
  //   imageLink: COIN_IMAGE.CFX,
  //   symbol: 'CFX',
  //   chain: chainType.conflux,
  //   trcName: 'CFX CRC20 CRC721',
  //   scan: 'https://www.confluxscan.io',
  //   scanTxs: 'transaction',
  //   scanAddr: 'address',
  //   scanBlocks: 'block'
  // },
  //
  optimism: {
    defaultGas: 882000,
    mainAddress: '0x4200000000000000000000000000000000000006',
    isL2: true,
    numChainId: 10,
    chainId: '0xA',
    // numChainId: 69,
    // chainId: '0x45',

    numLoad: 2,
    isToken: true,
    trcToken: 'ERC20 OPT',
    nftToken: 'ERC721 OPT',
    // balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    // multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    isWeb3: true,
    isFee: true,
    image: 'app_optimism',
    id: 'ethereum',
    name: 'Optimism',
    shortName: 'Optimism',
    imageLink: COIN_IMAGE.OP,
    symbol: 'ETH',
    symbolSpecial: 'OP',
    chain: chainType.optimism,
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://mainnet.optimism.io',
    // rpcURL: 'https://kovan.optimism.io',
    scan: 'https://optimistic.etherscan.io'
  },
  boba: {
    // defaultGas: 80000000,
    // mainAddress: '0x4200000000000000000000000000000000000006',
    isL2: true,
    numChainId: 288,
    chainId: '0x120',
    // numChainId: 28,
    // chainId: '0x1C',

    numLoad: 2,
    isToken: true,
    trcToken: 'ERC20 BOBA',
    nftToken: 'ERC721 BOBA',
    // multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    isWeb3: true,
    isFee: true,
    image: 'app_boba',
    id: 'ethereum',
    name: 'Boba Network',
    shortName: 'Boba Network',
    imageLink: COIN_IMAGE.BOBA,
    symbol: 'ETH',
    symbolSpecial: 'BOBA',
    chain: chainType.boba,
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://mainnet.boba.network',
    scan: 'https://blockexplorer.boba.network'
  },
  arbitrum: {
    defaultGas: 7000000,
    isL2: true,
    numChainId: 42161,
    chainId: '0xA4B1',
    // numChainId: 421611,
    // chainId: '0x66EEB',

    numLoad: 2,
    isToken: true,
    trcToken: 'ERC20 ARB',
    nftToken: 'ERC721 ARB',
    // balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    // multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    isWeb3: true,
    isFee: true,
    image: 'app_arbitrum',
    id: 'ethereum',
    name: 'Arbitrum',
    shortName: 'Arbitrum',
    imageLink: COIN_IMAGE.ETHARB,
    symbol: 'ETH',
    symbolSpecial: 'ARB',
    chain: chainType.arbitrum,
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://arb1.arbitrum.io/rpc',
    // rpcURL: 'https://rinkeby.arbitrum.io/rpc',
    scan: 'https://arbiscan.io'
  },
  arbitrumXdai: {
    isL2: true,
    numChainId: 200,
    chainId: '0xC8',

    numLoad: 2,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'ERC20 AOX',
    nftToken: 'ERC721 AOX',
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',

    isWeb3: true,
    isFee: true,
    image: 'app_arbitrum_xdai',
    id: 'xdai',
    name: 'Arbitrum on xDai',
    shortName: 'Arbitrum on xDai',
    imageLink: COIN_IMAGE.ETHA0X,
    symbol: 'XDAI',
    symbolSpecial: 'AOX',
    chain: chainType.arbitrumXdai,
    trcName: 'XDAI XRC20 XRC721',
    rpcURL: 'https://arbitrum.xdaichain.com',
    scan: 'https://blockscout.com/xdai/aox'
  },
  sei: {
    prefix: 'sei',
    numPath: 118,

    numLoad: 3,
    isCosmos: true,
    isFactory: true,
    isMemo: true,
    isToken: true,
    isSupportedNFT: true,
    chainId: 'atlantic-1',
    id: 'sei',
    name: 'Sei Testnet',
    image: 'app_sei',
    symbol: 'SEI',
    imageLink: COIN_IMAGE.SEI,
    chain: chainType.sei,
    trcName: 'Sei Chain',
    scan: 'https://sei.explorers.guru',
    rpcURL: 'https://sei-chain-incentivized.com/sei-chain-app',
    scanTxs: 'transaction',
    scanAddr: 'account'
  }

}

export const CHAIN_DEFAULT_ID = Object.values(CHAIN_DATA).filter(itm => !itm.isOther).map(item => item.id)

export const CHAIN_DEFAULT = [COIN_ITEM.BNB.id, COIN_ITEM.TRX.id,
  COIN_ITEM.SOL.id, COIN_ITEM.BTC.id, COIN_ITEM.ETH.id, COIN_ITEM.TOMO.id, COIN_ITEM.CELO.id]

export const eventType = {
  normal: 'normal',
  checkIn: 'checkIn'
}

export const bannedType = {
  overCall: 'Call over limit',
  banAdmin: 'Banned By Admin',
  banRefHack: 'Hacked ref user',
  parentBanRefHack: 'Parent Hacked ref user',
  banIpCheckIn: 'Same IP Check-in'
}

export const tradeType = {
  sushiSwapMatic: 'sushiSwapMatic',
  kyberSwap: 'kyberSwap',
  baryonHeco: 'baryonHeco',
  baryon: 'baryon',

  oolongswap: 'oolongswap',
  mojito: 'mojito',
  spooky: 'spooky',
  spirit: 'spirit',

  kudex: 'kudex',
  koffee: 'koffee',
  kuswap: 'kuswap',

  spaceGate: 'spaceGate',
  traderJoe: 'traderJoe',
  ubeSwap: 'ubeSwap',
  htMdexBSC: 'htMdexBSC',

  saros: 'saros',
  serumDEXV3: 'serumDEXV3',
  sushiSwap: 'sushiSwap',
  htMDex: 'htMDex',
  pancakeSwap: 'pancakeSwap',
  pancakeSwapV2: 'pancakeSwapV2',
  erc20splSwap: 'erc20splSwap',
  lunaDEX: 'lunaDEX',
  uniSwapV3: 'uniSwapV3',
  uniSwap: 'uniSwap',
  serumSwap: 'serumSwap',
  kinerc20spl: 'kinerc20spl',
  crossChainBridge: 'crossChainBridge',
  pangolinSwap: 'pangolinSwap',
  quickSwap: 'quickSwap',
  terraSwap: 'terraSwap'
}

export const reportTrade = [tradeType.serumDEXV3, tradeType.uniSwap, tradeType.sushiSwap, tradeType.pancakeSwapV2, tradeType.mojito, tradeType.spooky, tradeType.spirit, tradeType.oolongswap,
  tradeType.htMDex, tradeType.htMdexBSC, tradeType.traderJoe, tradeType.pangolinSwap, tradeType.quickSwap, tradeType.ubeSwap, tradeType.koffee, tradeType.kuswap, tradeType.crossChainBridge]

export const reactionType = {
  notLike: 'notLike',
  report: 'report',
  kudo: 'kudo',
  follow: 'follow',
  like: 'like',
  bad: 'bad',
  good: 'good'
}

export const MAIN_COIN_AMM = {
  [chainType.ether]: {
    chainId: 1,
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoURI: COIN_IMAGE.ETH,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  },
  [chainType.binanceSmart]: {
    id: 'binancecoin',
    chainId: 56,
    name: 'BNB Token',
    symbol: 'BNB',
    decimals: 18,
    logoURI: COIN_IMAGE.BNB,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  },
  [chainType.heco]: {
    id: 'huobi-token',
    chainId: 128,
    name: 'HT Token',
    symbol: 'HT',
    decimals: 18,
    logoURI: COIN_IMAGE.HT,
    address: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F'
  },
  [chainType.matic]: {
    id: 'matic-network',
    chainId: 137,
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
    logoURI: COIN_IMAGE.MATIC,
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
  },
  [chainType.avax]: {
    id: 'avalanche-2',
    chainId: 43114,
    name: 'Avax',
    symbol: 'AVAX',
    decimals: 18,
    logoURI: COIN_IMAGE.AVAX,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
  },
  [chainType.fantom]: {
    id: 'fantom',
    chainId: 250,
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
    logoURI: COIN_IMAGE.FTM,
    address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'
  },
  [chainType.kucoin]: {
    id: 'kucoin-shares',
    chainId: 321,
    name: 'KuCoin Chain',
    symbol: 'KCS',
    decimals: 18,
    logoURI: COIN_IMAGE.KCS,
    address: '0x4446Fc4eb47f2f6586f9fAAb68B3498F86C07521'
  },
  [chainType.celo]: {
    id: 'celo',
    chainId: 42220,
    name: 'Celo',
    symbol: 'Celo',
    decimals: 18,
    logoURI: COIN_IMAGE.CELO,
    address: '0x471EcE3750Da237f93B8E339c536989b8978a438'
  },
  [chainType.boba]: {
    id: 'ethereum',
    chainId: 288,
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoURI: COIN_IMAGE.ETH,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
  },
  [chainType.solana]: {
    symbol: 'SOL'
  }
}

export const txsStatus = {
  pending: 'pending',
  failed: 'failed',
  done: 'done'
}

export const userRole = {
  dagora: 'dagora',
  masterStatistical: 'masterStatistical',
  support: 'support',
  reporter: 'reporter',
  masterData: 'masterData',
  admin: 'admin',
  kol: 'kol',
  member: 'member',
  vip: 'vip',
  marketing: 'marketing',
  moderator: 'moderator'
}

export const userRoleINS = {
  owner: 'owner',
  admin: 'PZNRkMagPr',
  member: 'z6lD4JIL3R'
}

export const partnerRole = {
  admin: 'GXYKPWAWSD',
  partner: 'YBIGVASNIZ'
}

export const LINK_EXPLORER_API = {
  [chainType.baseTest]: 'https://api-goerli.basescan.org/api?',
  [chainType.ether]: 'https://api.etherscan.io/api?',
  [chainType.binanceSmart]: 'https://api.bscscan.com/api?',
  [chainType.heco]: 'https://api.hecoinfo.com/api?',
  [chainType.tomo]: 'https://scan.tomochain.com/api?',
  [chainType.avax]: 'https://api.snowtrace.io/api?',
  [chainType.matic]: 'https://api.polygonscan.com/api?',
  [chainType.fantom]: 'https://api.ftmscan.com/api?',
  [chainType.arbitrum]: 'https://api.arbiscan.io/api?',
  [chainType.arbitrumXdai]: 'https://blockscout.com/xdai/aox/api?',
  [chainType.celo]: 'https://explorer.celo.org/api?',
  [chainType.optimism]: 'https://api-optimistic.etherscan.io/api?',
  [chainType.xDai]: 'https://blockscout.com/xdai/mainnet/api?',
  [chainType.boba]: 'https://api.bobascan.com/api?',
  [chainType.aurora]: 'https://explorer.mainnet.aurora.dev/api?',
  [chainType.cronos]: 'https://api.cronoscan.com/api?',
  [chainType.bittorrent]: 'https://api.bttcscan.com/api?',
  [chainType.moonbeam]: 'https://api-moonbeam.moonscan.io/api?'
}

export const defaultWidget = [
  {
    key: 'favOptimalBand',
    isActive: false
  },
  {
    key: 'marketSimple',
    isActive: true
  },
  {
    key: 'marketFully',
    isActive: false
  },
  {
    key: 'marketStackedChart',
    isActive: false
  },
  {
    key: 'marketPieChart',
    isActive: false
  },
  {
    key: 'marginVolumeStas',
    isActive: false
  },
  {
    key: 'terminalShortcut',
    isActive: false
  },
  {
    key: 'favBasic',
    isActive: false
  },
  {
    key: 'favAdvance',
    isActive: false
  },
  {
    key: 'favOptimal',
    isActive: true
  },
  {
    key: 'vietnamOTC',
    isActive: false
  }
]

export const KEY_EXPLORER_API = {
  [chainType.ether]:
    [
      '8Y8J2T7IQTE8Q7XDSTJVZMAB1I1AUQVAW7',
      '8XR2UB6B1W3KPPCR7S8WHKMF2AAWHBYTRH',
      '21HTR85ZVJ8NXHHAYAEP3P58PTMC8DCAXW',
      'CSGZKJYGN9C2N5X4SVIU8B39CQ72P61399',
      'GASTRGVU4MMV87ADAZ8BQYF69B456XQ2AM',
      '8JVPMDXBA9ZCZ9CQ4U6FYA4QEB9S5CIX2D',
      'NHM4MF9MAR9JQN1H1FCRVUEN62FQJEWC64',
      'RYCVDN7X2X24667KHDN13XJPQC7GDM2QY3',
      '3DWQ18R7K16CAMNWF6SST7JNKHESGM971E',
      'U2FABIPYUVCVEQYXE3VS8B5N48E2N261T5',
      'UM4F4C4FJQF7W9MVY5UT54XX4WKN1YVERJ',
      'DUCG6D25NKHP6SQBGE9KP9XEDBTD5PQ4XK',
      'SIJ6R8RMMJBC5P42MYH516I79PPENCS98I',
      '8NCJPDT5YIAX2YB5P9YPPQ9D5ERQ2VSRDV',
      '2PFSAZFHVG78QBNMY57GYBR713XBWYMSC1',
      'YUQ2AFG3X1MYNTEWD61ZNAGBWNQK49SJF3',
      'B3YB1AIMA31NIY6U8N4AFTD9I5VCVPHVDM',
      'MHPEQ83PUG8BHXXS2T5URNY3XCRDZBUETG'
    ],
  [chainType.binanceSmart]:
    [
      'R2HX94UAXT5RV8685VNH9WRPFZXE1T7E5R',
      'VIKNUINVK8AJ58JCPIZZ632EVMIQ8MRG76',
      'GKYZ2SYS5DJCZJ31BC87JKSXRAK88USMUI',
      'XF9GEBA369W62CT946TNPR4AU2VUEBB2N6',
      'GHV4AR7NRGK134D1CRUREZQIK4BQB2RE39',
      'Q7XT33FJ2JI5XTJ2TGATCF3X5IH89IWSXC',
      'KAMJ8I8JIS5BN6CB262G6RGXQ19P4WYZ93',
      'ZWQMMSQU3MHZWINV3CDNC7WBJXP666T283',
      'Z6R7NKMA7IRYKMNRC7EBGRSX27Q736PPE3',
      'AQDMSZQIKF5Z7S65HH1DA5S4U84JBQ5JEN',
      '56M6P9NRNUY9958Y5TJ1C1B82HBRFG3515',
      'W3JH7B318RDH6SBK9ASR3N8U86YW7ISISI',
      'RRJ92XSC8JQR8T8VSRA199GD1CHPY7AC7D',
      'HK4JMVM891SNUJB4H9M186CXDNCGKCPWMJ',
      'K6XJEHK228D41ETK7V6WRGM2BXUI6WAX9G',
      'CUKZXSHUENDYUQ5HGUAWNZTYXKVVBY5Y7Q',
      '7X3YN2RIVU235Q15N2PGH3K8SD9TK19MJQ',
      'PCVXVB9GCFXFNF3MEXW6CF818E853CTZ1G',
      '1ZW6IYSHKGKP7QQCUMNUSJP2K948ZDPZ46',
      '12TKEJTCPHARAWY6GGPFZZ57GAJS58BSRM',
      '5IQTN54DY8APM8M7JCE19P198CN9GWG4UI',
      'AK43TN2Y2MQH3KTU2HNXVJ24KQKN84ZJYH',
      '8MKGIJI3GIXFX6RNVZEXGJ6WF11GZ9JUVM',
      'YYGXY3D3YJKAZUDXMY784U5NY38M4HCN5S',
      '9HNCYTBBFGKWQZX58887WZMHTUEXBWWFQK',
      '52DNJ591C29Z4QUPZHZU563Y9JDCEPFAWD',
      '1PSKHC1X7JXG4XZQ6VTW9TAQIM12AWVUW6',
      '5G7VQ81RH9GF78K4SM1X5DNPIGKD95T31Y',
      'URMB3PCRRY933FFRQAQH2KSHHRF7EBS55B',
      '4UDJTU2SA8VZN7TZEF9UPISBTSNWJAS453',
      'S6W22TIIW34CK9HGH78FQDCMPSZMGQU7Q1',
      'YEFZ8G3CV29775AMZQAUBF6Q19VSVB397W',
      'PZDDVS68786AN2J6ZS7BYQ44FY4UGJVRAN',
      'UEKUFS8FV7NAGE5R9TX3WIKFHYWDBR9ZKP',
      'G7QVBKFNPJC1NY4YCBBZKMEQCDYW3RYZCB',
      'KTYM18Z7VU4SRFKR5KYJ9QCKBJV1FCQYMQ',
      '72VB6J1XQKYMADMU5DZ8JQXDZSVJAP6Z8J',
      'AI348ATR3YM7BV5YK7TICCWQQFA88JSJAZ',
      '4U4EWS9XH1QH7CKK2512NGEGDHDJDV373G',
      'BRGGEMWJ3GS85UKM3VYDTY64TPC5DMYEQB',
      '8V342G3USUSJDDXNVZRP7C7JZEKG5RUD6B',
      '7FCUEZWJ83P6ZSBRN656VNUHY5V8BG2GIA',
      '2NICU1R4NSSIC2Q9EIVVIMTJITI3RGID7M',
      'D6BN65K1RIR4MG45PTY6EGS95PHXTT432D',
      'BBUXN687TPKWC2WY43YRF16FKMDHIIX5BQ',
      'RMRUPC253T4XS3HTDMPYUXJCS6K7E8M9RC',
      'MEYMTSJU69I2NC3NN9MEIV4I8GFMXCEPHK',
      'VR34NX6XK18WNCAJ2H5DG1MIW6HJZ9KJC3',
      '79RC67QYEAXJR4UNVKK4T1QPXA357GYKR5',
      '7MVJQ872SB7V9ZXFP85INTIENIUUIUFWR2',
      '18FNVP2X2KPWJ8YK1N9CIIX6V92GMQKPQV',
      'NVBN8JG92BG34KW3JXI7H9VHGHKBA44ST4',
      'WGRU1YINPN7VD1N74H1CG514AFQKSPX8TK',
      '1JVZGJ3S69QN6FQ8YHYPZDII4WP747NP27',
      'BYQXNDCMNIUUM76FBPJYGA5RYIXPZBNX19',
      'CY1RRITNF6M3RZZI2VJVSJHCISRUPS491G',
      '9NC4V6YGVIMYEVPI7988C8N717R2RKIGTV',
      '6RF673RGWTQI2B5WW8ZKBHCSGWA3RR1IA8',
      'JN4MW7RT86JT6UR3YVR1DYKFFGS145KWQ9',
      '4W89RGRCYYQFMGPR6YS75ZFREVNDX9YR5F',
      'SNMFSFKFVESWKZR88YJ7F4WM4D4Q5DRGDC',
      'J97MH6PY91UWNSFTMYEG3UBGGNNDAEAVMA',
      'EG3V4UYHFDN16FWTSGFXYUDWDHUUX7GEPN',
      'W8FNZE11N6TIR962SWGVPEU7SJ9TJ9M9ZV',
      '34KN15PSVVJ482GG9YSCVCH5MSI9CEAEFI',
      'E5V7GX62GDZ9C8HIBHXXMFRWQZI621S5UQ',
      'HEX1W2914YPFMAGQUXA6YR3PPRYIM57E1T',
      'HCFBR3NCNWDKKHMWQ1UZZRXAIWBF16QGB3',
      'NWZEGPFHHH8NSPRPXCXGFVNNS1B4GF1PFE',
      'IPI7XT81P17UH11T6X13YESBZ8U2BWQNA9',
      '96U16AC6MB23FCYJK7HNTZMP9W6P7IU25K',
      'IQW2KZZSHKKTSCUT5ZE1GP4UBR4QEMXWRC',
      'FQMHUJXU3WRQZZPFZ83GIZWQCXPUZFXAME',
      'IXG11245YS7VTCI2GNWUND8XPJZ3FQ13NK',
      'FQMHUJXU3WRQZZPFZ83GIZWQCXPUZFXAME'
    ],
  [chainType.fantom]: [
    'KDEYVGVYGMJND7TNSCS1F6Y4R2XGVU1YGV',
    'E46YDV4MHTZ4Q6QEV16U99627CZNQNT2MU',
    '8KMZFC6SA6ZHIZHJXAD1JZFJS4CI2NDYWP',
    'FIWMKY2K2VXUQ9BHSX3WMC827IC5B1KEYV',
    '2WMXR4F4ZJIQPPR8V6GX8HCP9QEJ7GA6N6',
    '4KZBHGJNUE2VBJSD31ITCYP53BNE3Q5D9U',
    'G44IA24G5CBIH5FC858Q9YRFAJNIAP35VC',
    '9QXQNHRRD2NSIVBBB4KFZ4KZI5M3YKMJNU',
    'KPE1J1I81AP7MNUDXESABDRC4ST8WCZTE7',
    '3ZBCWZR2AR25QI69BHRK6BZV9Q98FW4J2F',
    'ST9UUZCA827BJ91V5X5448Y2XS7BDPAVSE',
    'A3JNCE8D1W6GY6J5PKW5V829DGNESXG3NX',
    'YX8VJZ79DFX4FZ8H6D9ABXHJ1VVS2H15AE',

    'IK2FDYG3QV6S66S9GTC5F5J1JIK6REWVNE',
    '29PYGPHP5ZKAHR2UGJYVWX7TIW1774A5GX',
    'QVP1WYEWC9RHPBR1BDV7WRUCJRBYS28GTQ',
    'D8DUPFPPIVN1SJX7N3W1FMD29Y4RXHN672',
    '4N9IRGPWTCUITIYQG15IK5VU97U6J5APNG',
    'QNV76QWT5N342S67274ETA7586R9CKR6WA',
    '49G3F2Y326D53HKKI664BDQ99BGWKPI26Z',
    '7E78MIX45FU1ABIBCQFBZ2DRKFUCT8BNRP',
    'VZU3HJMXXGY8TFWKSHCSXS1USBSDDW8I8T',
    'QJ95XA4DT7T8VJBB5DY128J5GSSFZN73FT',
    'EHVHJJSFVT56HWPQYRQTCVIZPIH5FKQIYD',
    '5MN7HMFNUREGR7TGWQTS1TTGGYEZBD6KGU',

    'KUVSG6XMVA9P86XCRCYW9URQHB5CUP21UY',
    '66EYMTXTCSPHCXKXK4CAEDCXGPDYGYK42H',
    'V34TQE2IJ5JFUEWGE8Q67B9W2B3VCEPT4C',
    'XSC9EHHQTAIH9JCF9MP3BQHI7HQSF8V52H',
    'ZAJP6HHIDYHBJT98WK6YZ8DMDI5PM7SFIN',
    '6HYRTJN9CDMCA736FJBN1H8WIC133T2V7P',
    'F1U9S6RH5YF4GAFQ8Y5KYNA38GIJ7JCR5M',
    'S3B6T5XHC9FFVQNDJ3SMQSRR2AM6BKKQYW',

    'KHIXFZF3V5HZZ9KB5DIPMI38CQ8YSVQP8C',
    'UPK9CZZW5JNA9G289B83TMNCWVBJ473JMC',

    'RECF5NTCZK9Q4HNSRX1FU1Z3YJPCRQUFZ1',
    'TFS7P2YC1GKY31XJW8JRWKXBEWEGB94X2R',
    'WAI4M7799N6EZQC4JNI26J2N3A4AXUYDAN',
    'P3K24DG1UEGF61V6SZ77CCWJWI3BNS8WJV',
    '55I2XV8N84EBNXKP1KZF6HWJDTFHTTSQ4U',
    'M9DKNJUEYWT6TFX69KWCA5DT7U5CM5343Y',
    'CDQ77GTYM3G59X14C5T1FGW5F8XQY3FVAC',
    '3JVQ6A62ZAYIAUQY38GNFMRR718KA8I2Z7',
    'CDH95BRQFV9W1GE16GZW9BTS37GRVU9UMJ',
    'YINERGNM6VWG62APD4GZE2UG7BFW3DI37D',
    'T8J9R4U2FQHTD192AUQR5GIIEXR51MJQIG',
    'UCZEF1PD677EVKI4JRXA4JFQDF8XWZQEH1',
    '126V9P1MS1Z88YQDSIDJRAVA21TRH7GTVV',
    'ZATYKWB4U8D1C6XJUVVZ255WP27QBZFCQ3',
    '88S3X1P32VFQDT1HIWPPYYYT19SFGAAMVA',
    'UDV335X42KHRKIGCDDPW464Y7HWPTSF35Q',
    'MYXEXRRWYU21EZP3515GGEFRY1ZMFIXX9R',
    'HA2SYFE3TR8YKS3PPCPC95IDMMU1PIU9GV',
    '8BS25PYDWQZH5N7NUGBFGDSP5BMED9XYGQ',
    'AQ771KG2CF8GFUJJ6UQV6DZAE2FTSRPKQ2',
    'BDNMUBY89JNGIEHYH43TKEBM9EJJ3SW2CR',
    'A2TZY5FMK6R88JMFZP2C8EZUJKBU3A3PY5',
    'R6TM7NIU24ZKU1E55URK3DTNKCHCIKNK98',
    'VVZ5DW6EE4CBGE5SQH9386XANIQAJAFRP1'
  ],
  [chainType.matic]: [
    'K6R8CAFHPZ4JIG5T4APKY7AI671HI7TPC5',
    'MFGDFTVGYQRT9I6WMY6VDEMAF4I4CXY971',
    '9HVDFE9B42ET4E71V4NWX611MRTUHUYXY4',
    'W8KCMG16CDHC3GFBDV5N66Y85WSP4J387G',
    '1K9Q52UQCSG2GUR2XR7KTPRQSZ4GD18J1F',
    '92ITHFNHYQJW9NGC17D2S73DKMBD1GS6NC',
    'YD7XSBB46RP6K4E5ZE2VP9NH5T7WQ5H455',
    'RCTHUJWNFNB17RBVK4BMMP77GZFMHK9UMP',
    'U16NB8RA5W5EV7GPYK94M5GAD7ZNU7D1M5',
    '72RKDXHIDF87YE2HQEG9PRK9CB4PRTH76D',
    '3VB37PQQKG92NUBH1R2E21R2K3NRH4QGIU',
    'UH98SF3GIEEZSRQXWTV3CPAJ4QSFJFZ8MH',
    'RKVMCENYV6Y5DKVY3SRFZ5HH4SRTS2VBNA',
    'ED8X2T9MH998D8B4K9XIF7YEU5JRWAFYDK',
    '4GCWAQTTUFWY4PITFRDGTB5DW1M16115S9',
    'BJ8NV4UFEHQNMYUJRB1PJ9XN837Y9DEAUW',
    'SSVXHW8HAG2WB57JQI314JPIBVJUGTQV8Y',
    'B7NFUVUYBTU3AX3CDPIGFMB6JSNNWH1RPV',
    '2WTIB9U7B54I8RV79K3NXMEDTVF9N726UC',
    'ZYZ25PDNVKT7RUIB4UN32ABJ95J4I4XT7V',
    'IBPCG74QKQZ5IK5GFDGXW6F8Z7HCVCRJJ3',
    'RF25NHE5G449VEZXFJPYKCGJU4ZTBH6CBX',
    'XEJKMUSI3EWIQG5I5DNZG3PYZMSYVBW5P4',
    '6NPM7FVQH8DMCP3E5MX2FSQT6KMTQKPMPF',
    '5VH9EAVBFPC8WZH5IFZ1T7BEYSPCJXAENK',
    '3637ERAZHJK7M8DPWQ2PCHNHICT6DCH452',
    'KPKHD72EH6GYSY2RK85TB3EXKPYKBKTVHK',
    'F4KYPPYM2I7AYCC2X83Y1587QT9JTY9Z1Q',
    'CATEDMKMYNEBIZ7PZESXR41DSRJYS62R1Y',
    'SIPMH4564TA5EMH5WKZBENJP6USPI8QWBS',
    'Y3YRPFR1V5JS8YQEYINZF1I8AQD1P3C5PK',
    'DXKD1QTI3SHRT92J7MZWNSYWIXB3ABAD9D',
    'NMV5HGF13AMW69N6GUWDEFKI6WEHUT1IBW',
    '5G4B61SBDK6Q34PZV9WFUB91F3XA21EHHV',
    'CS789Z1J9MJ3P35UMC5UHJFQWEGV6MTQQ9',
    'SHI3N3TY1FAIVCKY91TXNT7YXA6AKQM86',
    'M2PUQ2HHCEAWWTVK6ANTMZ4SJVZ7CNVB7T',
    'HDZGKPBZGR1YZFU8APYJAP62IAI1DR4SSE',
    '6WYAU8BV5CMP22AMNA8M4TCGDUI4DMUWCF',
    'XFVK6KBMXE36WIN5H48BFDZ6RR4EGAMCFM',
    'G7WSP5AHG2NBW4KXZ8SWPUCZFBRSBXTK5S',
    'QCRVM91EC8XHMXMMZF64PNWIZ2DSU1KM4B',
    'C4VNNKHVQSQXVHN1GWI6QNRHWYQC7HVEB2',
    'HQJX9A1FQIBVACPIEN8K5QPUJ2EGN5DCIY',
    'AHV9ICUCKXVXM1TYIF64G21W67JK1BGI7H',
    'W22HKNW7V6FA49CEHQF5WGDMRS6KN9H3PD',
    'BYK9SQYK5ZX4RZF1DFK2DQDT6972Q4WZKJ',
    '19KPM2FIJ2MH7AZ348WZ27HXKCJR6XBKVC',
    'JHGTVBVTI8E7ND4UKFCDP7AMIQTETMVGKD',
    'Q1MWZYDIY5G6TM748BS8A8DFSIA2GZ9THR',
    'SPRTXKR2IKM69BRJIAF93PUE1MJB9HX4X2',
    'GN1HEYDVJC51EJ9M77H6XJNRH33XD6U62V',
    'FEG64IME6KH2WS3PHACGBVZ91BWFHDHYYH',
    'PCE4BIYT5RAFGWA9SUB8PTCYZA4SMTFR7U',
    'RFF2TPGCP5E9TPCNZ6BZI5W9VPIWMJKCV6',
    'PCE4BIYT5RAFGWA9SUB8PTCYZA4SMTFR7U',
    'SDK5Y7S9WY5S4XC4556XMPAD61AY7UWBUU',
    'WRX4R1GSDM1AAM68MY5AX1ER7RT7IUQ86M'
  ],
  [chainType.heco]: ['88885DHDHX84RRWC1RCB353MT5BQSGV1DW', 'I1BXZV7BPAAHV8JA9VVU6DYP5UKHJ8E942', 'K77QHJX7H2H9AS9I649PQ78IKNZFNAN858']
}
export const explorerLink = {
  celo: 'https://explorer.celo.org',
  avax: 'https://cchain.explorer.avax.network'
}

export const AMM_ADDRESS = {
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d': tradeType.uniSwap,
  '0xe592427a0aece92de3edee1f18e0157c05861564': tradeType.uniSwap,
  '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F': tradeType.sushiSwap,
  '0x05ff2b0db69458a0750badebc4f9e13add608c7f': tradeType.pancakeSwap,
  '0x10ed43c718714eb63d5aa57b78b54704e256024e': tradeType.pancakeSwapV2,
  '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106': tradeType.pangolinSwap,
  '0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121': tradeType.ubeSwap,
  '0x56d0Ae52f33f7C2e38E92F6D20b8ccfD7Dc318Ce': tradeType.ubeSwap,
  '0x60aE616a2155Ee3d9A68541Ba4544862310933d4': tradeType.traderJoe,
  '0xed7d5f38c79115ca12fe6c0041abb22f0a06c300': tradeType.htMDex,
  '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff': tradeType.quickSwap,
  '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8': tradeType.htMdexBSC
}

export const TRADE_DATA = [
  {
    idxGas: 2,
    chain: chainType.ether,
    key: tradeType.uniSwap,
    image: 'app_uniswap',
    name: 'Uniswap',
    isAMM: true,
    subName: CHAIN_DATA.ether.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
      data: [
        { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
        { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' }
      ]
    }
  },
  {
    idxGas: 2,
    chain: chainType.ether,
    key: tradeType.uniSwapV3,
    image: 'app_uniswap',
    name: 'Uniswap V3',
    isAMM: true,
    subName: CHAIN_DATA.ether.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
      data: [
        { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
        { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' }
      ]
    }
  },
  {
    idxGas: 2,
    chain: chainType.ether,
    key: tradeType.sushiSwap,
    image: 'app_sushiswap',
    name: 'SushiSwap',
    isAMM: true,
    subName: CHAIN_DATA.ether.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
      data: [
        { symbol: MAIN_COIN_AMM.ether.symbol, address: MAIN_COIN_AMM.ether.address },
        { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' }
      ]
    }
  },
  {
    chain: chainType.binanceSmart,
    key: tradeType.baryon,
    image: 'app_baryon',
    name: 'Baryon',
    shortName: 'Baryon',
    isAMM: true,
    subName: CHAIN_DATA.binanceSmart.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
      data: [
        { symbol: 'C98', address: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6' },
        { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
        { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT' }
      ]
    }
  },
  {
    chain: chainType.binanceSmart,
    key: tradeType.kyberSwap,
    image: 'app_kyberswap',
    name: 'KyberSwap',
    shortName: 'KyberSwap',
    isAMM: true,
    subName: CHAIN_DATA.binanceSmart.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
      data: [
        { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
        { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', symbol: 'DAI' },
        { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT' }
      ]
    }
  },
  {
    isTTL: true,
    chain: chainType.binanceSmart,
    key: tradeType.pancakeSwap,
    image: 'app_pancakes_swap',
    name: 'PancakeSwap Old',
    shortName: 'Pancake Old',
    isAMM: true,
    subName: CHAIN_DATA.binanceSmart.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
      data: [
        { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
        { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', symbol: 'DAI' },
        { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT' }
      ]
    }
  },
  {
    isTTL: true,
    chain: chainType.binanceSmart,
    key: tradeType.pancakeSwapV2,
    image: 'app_pancakes_swap',
    name: 'PancakeSwap New',
    shortName: 'Pancake New',
    isAMM: true,
    subName: CHAIN_DATA.binanceSmart.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
      data: [
        { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
        { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', symbol: 'DAI' },
        { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT' }
      ]
    }
  },
  {
    chain: chainType.binanceSmart,
    key: tradeType.htMdexBSC,
    image: 'app_mdex',
    name: 'MDEX BSC',
    shortName: 'MDEX BSC',
    isAMM: true,
    subName: CHAIN_DATA.binanceSmart.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
      data: [
        { symbol: MAIN_COIN_AMM.binanceSmart.symbol, address: MAIN_COIN_AMM.binanceSmart.address },
        { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', symbol: 'DAI' },
        { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD' },
        { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT' }
      ]
    }
  },
  {
    chain: chainType.heco,
    key: tradeType.htMDex,
    image: 'app_mdex',
    name: 'MDEX',
    isAMM: true,
    subName: CHAIN_DATA.heco.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.heco.symbol, address: MAIN_COIN_AMM.heco.address },
      data: [
        { symbol: MAIN_COIN_AMM.heco.symbol, address: MAIN_COIN_AMM.heco.address },
        { address: '0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047', symbol: 'HUSD' },
        { address: '0xa71EdC38d189767582C38A3145b5873052c3e47a', symbol: 'USDT' }
      ]
    }
  },
  {
    isTTL: true,
    chain: chainType.matic,
    key: tradeType.quickSwap,
    image: 'app_quickswap',
    name: 'QuickSwap',
    isAMM: true,
    subName: CHAIN_DATA.matic.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.matic.symbol, address: MAIN_COIN_AMM.matic.address },
      data: [
        { symbol: MAIN_COIN_AMM.matic.symbol, address: MAIN_COIN_AMM.matic.address },
        { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT' },
        { address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', symbol: 'QUICK' }
      ]
    }
  },
  {
    chain: chainType.matic,
    key: tradeType.sushiSwapMatic,
    image: 'app_sushiswap',
    name: 'SushiSwap on Polygon',
    isAMM: true,
    subName: CHAIN_DATA.matic.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.matic.symbol, address: MAIN_COIN_AMM.matic.address },
      data: [
        { symbol: MAIN_COIN_AMM.matic.symbol, address: MAIN_COIN_AMM.matic.address },
        { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT' },
        { address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', symbol: 'QUICK' }
      ]
    }
  },
  {
    chain: chainType.avax,
    key: tradeType.pangolinSwap,
    image: 'app_pangolin',
    name: 'Pangolin',
    isAMM: true,
    subName: CHAIN_DATA.avax.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.avax.symbol, address: MAIN_COIN_AMM.avax.address },
      data: [
        { symbol: MAIN_COIN_AMM.avax.symbol, address: MAIN_COIN_AMM.avax.address },
        { address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', symbol: 'USDT.e' },
        { address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', symbol: 'DAI.e' }
      ]
    }
  },
  {
    chain: chainType.avax,
    key: tradeType.traderJoe,
    image: 'app_joe',
    name: 'Trader Joe',
    isAMM: true,
    subName: CHAIN_DATA.avax.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.avax.symbol, address: MAIN_COIN_AMM.avax.address },
      data: [
        { symbol: MAIN_COIN_AMM.avax.symbol, address: MAIN_COIN_AMM.avax.address },
        { address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', symbol: 'USDT.e' },
        { address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', symbol: 'DAI.e' }
      ]
    }
  },
  {
    chain: chainType.celo,
    key: tradeType.ubeSwap,
    image: 'app_ubeswap',
    name: 'Ubeswap',
    isAMM: true,
    subName: CHAIN_DATA.celo.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.celo.symbol, address: MAIN_COIN_AMM.celo.address },
      data: [
        { symbol: MAIN_COIN_AMM.celo.symbol, address: MAIN_COIN_AMM.celo.address },
        { address: '0x765DE816845861e75A25fCA122bb6898B8B1282a', symbol: 'cUSD' },
        { address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', symbol: 'cEUR' }
      ]
    }
  },
  {
    chain: chainType.kucoin,
    key: tradeType.kudex,
    image: 'app_kudex',
    name: 'KuDEX',
    isAMM: true,
    subName: CHAIN_DATA.kucoin.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
      data: [
        { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
        { address: '0x0039f574eE5cC39bdD162E9A88e3EB1f111bAF48', symbol: 'USDT' },
        { address: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.fantom,
    key: tradeType.spooky,
    image: 'app_spookyswap',
    name: 'SpookySwap',
    isAMM: true,
    subName: CHAIN_DATA.fantom.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.fantom.symbol, address: MAIN_COIN_AMM.fantom.address },
      data: [
        { symbol: MAIN_COIN_AMM.fantom.symbol, address: MAIN_COIN_AMM.fantom.address },
        { address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', symbol: 'USDT' },
        { address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.fantom,
    key: tradeType.spirit,
    image: 'app_spiritswap',
    name: 'SpiritSwap',
    isAMM: true,
    subName: CHAIN_DATA.fantom.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.fantom.symbol, address: MAIN_COIN_AMM.fantom.address },
      data: [
        { symbol: MAIN_COIN_AMM.fantom.symbol, address: MAIN_COIN_AMM.fantom.address },
        { address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', symbol: 'USDT' },
        { address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.kucoin,
    key: tradeType.mojito,
    image: 'app_mojitoswap',
    name: 'MojitoSwap',
    isAMM: true,
    subName: CHAIN_DATA.kucoin.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
      data: [
        { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
        { address: '0x0039f574eE5cC39bdD162E9A88e3EB1f111bAF48', symbol: 'USDT' },
        { address: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.kucoin,
    key: tradeType.kuswap,
    image: 'app_kuswap',
    name: 'KuSwap',
    isAMM: true,
    subName: CHAIN_DATA.kucoin.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
      data: [
        { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
        { address: '0x0039f574eE5cC39bdD162E9A88e3EB1f111bAF48', symbol: 'USDT' },
        { address: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.kucoin,
    key: tradeType.koffee,
    image: 'app_koffee_swap',
    name: 'KoffeeSwap',
    isAMM: true,
    subName: CHAIN_DATA.kucoin.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
      data: [
        { symbol: MAIN_COIN_AMM.kucoin.symbol, address: MAIN_COIN_AMM.kucoin.address },
        { address: '0x0039f574eE5cC39bdD162E9A88e3EB1f111bAF48', symbol: 'USDT' },
        { address: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430', symbol: 'USDC' }
      ]
    }
  },
  {
    chain: chainType.boba,
    key: tradeType.oolongswap,
    image: 'app_oolong_swap',
    name: 'Oolong Swap',
    isAMM: true,
    subName: CHAIN_DATA.boba.name,
    pairDefault: {
      default: { symbol: MAIN_COIN_AMM.boba.symbol, address: MAIN_COIN_AMM.boba.address },
      data: [
        { symbol: MAIN_COIN_AMM.boba.symbol, address: MAIN_COIN_AMM.boba.address },
        { address: '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d', symbol: 'USDT' },
        { address: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc', symbol: 'USDC' }
      ]
    }
  },
  {
    isSerum: true,
    chain: chainType.solana,
    key: tradeType.serumDEXV3,
    image: 'app_c98Exchange',
    name: 'Coin98 Exchange',
    subName: CHAIN_DATA.solana.name,
    pairDefault: {
      default: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1'
    }
  },
  {
    isSaros: true,
    chain: chainType.solana,
    key: tradeType.saros,
    image: 'app_saros',
    name: 'SarosSwap',
    subName: CHAIN_DATA.solana.name,
    pairDefault: {
      default: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1'
    }
  },
  {
    isNoConfig: true,
    titleName: 'selectAsset',
    isSwap: true,
    chain: chainType.ether,
    key: tradeType.crossChainBridge,
    image: 'app_spacegate',
    name: 'SpaceGate',
    subName: CHAIN_DATA.multiChain.name,
    isNoWallet: true
  }
]

export const SOLANA_TOKEN = [
  {
    id: 'solana',
    mintAddress: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/solana/info/logo.png',
    decimals: 9
  },
  {
    id: 'bitcoin',
    mintAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    symbol: 'BTC',
    name: 'Wrapped Bitcoin',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/bitcoin/info/logo.png',
    decimals: 6
  },
  {
    id: 'ethereum',
    mintAddress: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
    symbol: 'ETH',
    name: 'Wrapped Ethereum',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 6
  },
  {
    id: 'usd-coin',
    mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USDC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    decimals: 6
  },
  {
    id: 'yearn-finance',
    mintAddress: '3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB',
    symbol: 'YFI',
    name: 'Wrapped YFI',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png',
    decimals: 6
  },
  {
    id: 'chainlink',
    mintAddress: 'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
    symbol: 'LINK',
    name: 'Wrapped Chainlink',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    decimals: 6
  },
  {
    id: 'ripple',
    mintAddress: 'Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8',
    symbol: 'XRP',
    name: 'Wrapped XRP',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ripple/info/logo.png',
    decimals: 6
  },
  {
    id: 'tether',
    mintAddress: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
    symbol: 'USDT',
    name: 'Wrapped USDT',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    decimals: 6
  },
  {
    id: 'sushi',
    mintAddress: 'AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy',
    symbol: 'SUSHI',
    name: 'Wrapped SUSHI',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png',
    decimals: 6
  },
  {
    id: 'aleph',
    mintAddress: 'CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K',
    symbol: 'ALEPH',
    name: 'Wrapped ALEPH',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/nuls/assets/NULSd6HgyZkiqLnBzTaeSQfx1TNg2cqbzq51h/logo.png',
    decimals: 6
  },
  {
    id: 'swipe',
    mintAddress: 'SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX',
    symbol: 'SXP',
    name: 'Wrapped SXP',
    icon: 'https://github.com/trustwallet/assets/raw/blockchains/ethereum/assets/0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9/logo.png',
    decimals: 6
  },
  {
    id: 'hedget',
    mintAddress: 'BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN',
    symbol: 'HGET',
    name: 'Wrapped Hedget',
    icon: 'https://www.hedget.com/images/favicon.svg',
    decimals: 6
  },
  {
    id: 'cream-2',
    mintAddress: '5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv',
    symbol: 'CREAM',
    name: 'Wrapped Cream Finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/smartchain/assets/0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888/logo.png',
    decimals: 6
  },
  {
    id: 'upbots',
    mintAddress: '873KLxCbz7s9Kc4ZzgYRtNmhfkQrhfyWGZJBmyCbC3ei',
    symbol: 'UBXT',
    name: 'Wrapped Upbots',
    icon: 'https://assets.coingecko.com/coins/images/12476/small/UBXT.png?1600132967',
    decimals: 6
  },
  {
    id: 'hymnode',
    mintAddress: 'HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e',
    symbol: 'HNT',
    name: 'Wrapped Helium',
    icon: 'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png?1612620071',
    decimals: 6
  },
  {
    id: 'frontier-token',
    mintAddress: '9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw',
    symbol: 'FRONT',
    name: 'Wrapped FRONT',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xf8C3527CC04340b208C854E985240c02F7B7793f/logo.png',
    decimals: 6
  },
  {
    id: 'akropolis',
    mintAddress: '6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF',
    symbol: 'AKRO',
    name: 'Wrapped AKRO',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xb2734a4Cec32C81FDE26B0024Ad3ceB8C9b34037/logo.png',
    decimals: 6
  },
  {
    id: 'hxro',
    mintAddress: 'DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc',
    symbol: 'HXRO',
    name: 'Wrapped HXRO',
    icon: 'https://assets.coingecko.com/coins/images/7805/large/hxro-squarelogo-1585089594129.png?1586221980',
    decimals: 6
  },
  {
    id: 'uni-coin',
    mintAddress: 'DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw',
    symbol: 'UNI',
    name: 'Wrapped UNI',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    decimals: 6
  },
  {
    id: 'serum',
    mintAddress: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    symbol: 'SRM',
    name: 'Serum',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x476c5E26a75bd202a9683ffD34359C0CC15be0fF/logo.png',
    decimals: 6
  },
  {
    id: 'ftx-token',
    mintAddress: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
    symbol: 'FTT',
    name: 'Wrapped FTT',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9/logo.png',
    decimals: 6
  },
  {
    id: 'serum',
    mintAddress: 'MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L',
    symbol: 'MSRM',
    name: 'MegaSerum',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x476c5E26a75bd202a9683ffD34359C0CC15be0fF/logo.png',
    decimals: 0
  },
  {
    id: 'usd-coin',
    mintAddress: 'BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW',
    symbol: 'WUSDC',
    name: 'Wrapped USDC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    decimals: 6
  },
  {
    id: 'tomochain',
    mintAddress: 'GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd',
    symbol: 'TOMO',
    name: 'Wrapped TOMO',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/tomochain/info/logo.png',
    decimals: 6
  },
  {
    id: 'karma-coin',
    mintAddress: 'EcqExpGNFBve2i1cMJUTR4bPXj4ZoqmDD2rTkeCcaTFX',
    symbol: 'KARMA',
    name: 'Wrapped KARMA',
    icon: 'https://cdn.jsdelivr.net/gh/machi-x/assets/blockchains/ethereum/assets/0xdfe691f37b6264a90ff507eb359c45d55037951c/logo.png',
    decimals: 4
  },
  {
    id: 'lua-token',
    mintAddress: 'EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX',
    symbol: 'LUA',
    name: 'Wrapped LUA',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xB1f66997A5760428D3a87D68b90BfE0aE64121cC/logo.png',
    decimals: 6
  },
  {
    id: 'math',
    mintAddress: 'GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza',
    symbol: 'MATH',
    name: 'Wrapped MATH',
    decimals: 6
  },
  {
    id: 'keep-network',
    mintAddress: 'GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht',
    symbol: 'KEEP',
    name: 'Wrapped KEEP',
    icon: 'https://assets.coingecko.com/coins/images/3373/large/IuNzUb5b_400x400.jpg?1589526336',
    decimals: 6
  },
  {
    id: 'swag-finance',
    mintAddress: '9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy',
    symbol: 'SWAG',
    name: 'Wrapped SWAG',
    icon: 'https://assets.coingecko.com/coins/images/12805/large/photo_2020-10-14_23.17.02.jpeg?1602688642',
    decimals: 6
  },
  {
    id: 'bonfida',
    mintAddress: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
    symbol: 'FIDA',
    name: 'Bonfida',
    icon: 'https://cdn.jsdelivr.net/gh/dr497/awesome-serum-markets/02ce7c74fd2e9bd4cb55a15f735fc3ad0e7335f6/icons/fida.svg',
    decimals: 6
  },
  {
    id: 'kin',
    mintAddress: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
    symbol: 'KIN',
    name: 'KIN',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/kin/info/logo.png',
    decimals: 5
  },
  {
    id: 'maps',
    mintAddress: 'MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb',
    symbol: 'MAPS',
    name: 'MAPS',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/explorer/public/tokens/maps.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
    symbol: 'OXY',
    name: 'Oxygen Protocol',
    icon: 'https://cdn.jsdelivr.net/gh/nathanielparke/awesome-serum-markets/icons/oxy.svg',
    decimals: 6
  },
  {
    id: 'breezecoin',
    mintAddress: 'FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD',
    symbol: 'BRZ',
    name: 'BRZ',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/explorer/public/tokens/brz.png',
    decimals: 4
  },
  {
    id: '',
    mintAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbol: 'USDT',
    name: 'USDT',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/explorer/public/tokens/usdt.svg',
    decimals: 6
  },
  {
    mintAddress: '2oDxYGgTBmST4rc3yn1YtcSEck7ReDZ8wHWLqZAuNWXH',
    symbol: 'xMARK',
    name: 'Standard',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/2oDxYGgTBmST4rc3yn1YtcSEck7ReDZ8wHWLqZAuNWXH/logo.png',
    decimals: 9
  },
  {
    id: 'raydium',
    mintAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    symbol: 'RAY',
    name: 'Raydium',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png',
    decimals: 6
  },
  {
    mintAddress: 'CzPDyvotTcxNqtPne32yUiEVQ6jk42HZi1Y3hUu7qf7f',
    symbol: 'RAY-USDT',
    name: 'Raydium Legacy LP Token (RAY-USDT)',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png',
    decimals: 6
  },
  {
    mintAddress: 'FgmBnsF5Qrnv8X9bomQfEtQTQjNNiBCWRKGpzPnE5BDg',
    symbol: 'RAY-USDC',
    name: 'Raydium Legacy LP Token (RAY-USDC)',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png',
    decimals: 6
  },
  {
    mintAddress: '5QXBMXuCL7zfAk39jEVVEvcrz1AvBGgT9wAhLLHLyyUJ',
    symbol: 'RAY-SRM',
    name: 'Raydium Legacy LP Token (RAY-SRM)',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'Q6MKy5Yxb9vG1mWzppMtMb2nrhNuCRNUkJTeiE3fuwD',
    symbol: 'RAY-ETH',
    name: 'Raydium ETH Liquidity Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png'
  },
  {
    id: '',
    mintAddress: 'F5PPQHGcznZ2FxD9JaxJMXaf7XkaFFJ6zzTBcW8osQjw',
    symbol: 'RAY-SOL',
    name: 'Raydium SOL Liquidity Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png'
  },
  {
    id: '',
    mintAddress: 'DSX5E21RE9FB9hM8Nh8xcXQfPK6SzRaJiywemHBSsfup',
    symbol: 'RAY-SRM',
    name: 'Raydium SRM Liquidity Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png'
  },
  {
    id: '',
    mintAddress: 'FdhKXYjCou2jQfgKWcNY7jb8F2DPLU1teTTTRfLBD2v1',
    symbol: 'RAY-USDT',
    name: 'Raydium USDT Liquidity Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png'
  },
  {
    id: '',
    mintAddress: 'BZFGfXMrjG2sS7QT2eiCDEevPFnkYYF7kzJpWfYxPbcx',
    symbol: 'RAY-USDC',
    name: 'Raydium USDC Liquidity Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png'
  },
  {
    mintAddress: 'AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo',
    symbol: 'LSD',
    name: 'LSD',
    decimals: 9
  },
  {
    mintAddress: '91fSFQsPzMLat9DHwLdQacW3i3EGnWds5tA5mt7yLiT9',
    symbol: 'Unlimited Energy',
    name: 'Unlimited Energy',
    decimals: 9
  },
  {
    mintAddress: '29PEpZeuqWf9tS2gwCjpeXNdXLkaZSMR2s1ibkvGsfnP',
    symbol: 'Need for Speed',
    name: 'Need for Speed',
    decimals: 9
  },
  {
    mintAddress: 'HsY8PNar8VExU335ZRYzg89fX7qa4upYu6vPMPFyCDdK',
    symbol: 'ADOR OPENS',
    name: 'ADOR OPENS',
    decimals: 0
  },
  {
    mintAddress: 'EDP8TpLJ77M3KiDgFkZW4v4mhmKJHZi9gehYXenfFZuL',
    symbol: 'CMS - Rare',
    name: 'CMS - Rare',
    decimals: 0
  },
  {
    id: 'teslacoilcoin',
    mintAddress: 'BrUKFwAABkExb1xzYU4NkRWzjBihVQdZ3PBz4m5S8if3',
    symbol: 'Tesla',
    name: 'Tesla',
    decimals: 0
  },
  {
    mintAddress: '9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ',
    symbol: 'DeceFi',
    name: 'DeceFi',
    decimals: 0
  },
  {
    mintAddress: 'F6ST1wWkx2PeH45sKmRxo1boyuzzWCfpnvyKL4BGeLxF',
    symbol: 'Power User',
    name: 'Power User',
    decimals: 0
  },
  {
    mintAddress: 'dZytJ7iPDcCu9mKe3srL7bpUeaR3zzkcVqbtqsmxtXZ',
    symbol: 'VIP Member',
    name: 'VIP Member',
    decimals: 0
  },
  {
    mintAddress: '8T4vXgwZUWwsbCDiptHFHjdfexvLG9UP8oy1psJWEQdS',
    symbol: 'Uni Christmas',
    name: 'Uni Christmas',
    decimals: 0
  },
  {
    id: 'binancecoin',
    mintAddress: 'EjFGGJSyp9UDS8aqafET5LX49nsG326MeNezYzpiwgpQ',
    symbol: 'BNB',
    name: 'BNB',
    decimals: 0
  },
  {
    mintAddress: 'FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z',
    symbol: 'Seldom',
    name: 'Seldom',
    decimals: 9
  },
  {
    mintAddress: '2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD',
    symbol: 'Satoshi Closeup',
    name: 'Satoshi Closeup',
    decimals: 9
  },
  {
    mintAddress: '7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR',
    symbol: 'Satoshi GB',
    name: 'Satoshi GB',
    decimals: 9
  },
  {
    mintAddress: '8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2',
    symbol: 'Satoshi OG',
    name: 'Satoshi OG',
    decimals: 9
  },
  {
    mintAddress: '9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J',
    symbol: 'Satoshi BTC',
    name: 'Satoshi BTC',
    decimals: 10
  },
  {
    mintAddress: 'AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH',
    symbol: 'Satoshi GB',
    name: 'Satoshi GB',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4qzEcYvT6TuJME2EMZ5vjaLvQja6R4hKjarA73WQUwt6',
    symbol: 'APESZN_HOODIE',
    name: 'APESZN_HOODIE',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'APhyVWtzjdTVYhyta9ngSiCDk2pLi8eEZKsHGSbsmwv6',
    symbol: 'APESZN_TEE_SHIRT',
    name: 'APESZN_TEE_SHIRT',
    decimals: 9
  },
  {
    mintAddress: 'bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb',
    symbol: 'Satoshi',
    name: 'Satoshi',
    decimals: 9
  },
  {
    mintAddress: 'GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF',
    symbol: 'Satoshi Closeup',
    name: 'Satoshi Closeup',
    decimals: 9
  },
  {
    mintAddress: 'oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV',
    symbol: 'Satoshi BTC',
    name: 'Satoshi BTC',
    decimals: 9
  },
  {
    mintAddress: '9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E',
    symbol: 'Satoshi Nakamoto',
    name: 'Satoshi Nakamoto',
    decimals: 9
  },
  {
    mintAddress: '7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP',
    symbol: 'Charles Hoskinson',
    name: 'Charles Hoskinson',
    decimals: 9
  },
  {
    mintAddress: 'GyRkPAxpd9XrMHcBF6fYHVRSZQvQBwAGKAGQeBPSKzMq',
    symbol: 'SBF',
    name: 'SBF',
    decimals: 0
  },
  {
    mintAddress: 'AgdBQN2Sy2abiZ2KToWeUsQ9PHdCv95wt6kVWRf5zDkx',
    symbol: 'Bitcoin Tram',
    name: 'Bitcoin Tram',
    decimals: 0
  },
  {
    mintAddress: '7TRzvCqXN8KSXggbSyeEG2Z9YBBhEFmbtmv6FLbd4mmd',
    symbol: 'SRM tee-shirt',
    name: 'SRM tee-shirt',
    decimals: 0
  },
  {
    mintAddress: 'gksYzxitEf2HyE7Bb81vvHXNH5f3wa43jvXf4TcUZwb',
    symbol: 'PERK',
    name: 'PERK',
    icon: 'https://cdn.jsdelivr.net/gh/perkexchange/assets/logos/SPL-token/logo.png',
    decimals: 6
  },
  {
    id: 'bitsong',
    mintAddress: 'BDxWSxkMLW1nJ3VggamUKkEKrtCaVqzFxoDApM8HdBks',
    symbol: 'BTSG',
    name: 'BitSong',
    icon: 'https://cdn.jsdelivr.net/gh/bitsongofficial/assets/logo_128x128.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '5ddiFxh3J2tcZHfn8uhGRYqu16P3FUvBfh8WoZPUHKW5',
    symbol: 'EOSBEAR',
    name: 'EOSBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'qxxF6S62hmZF5bo46mS7C2qbBa87qRossAM78VzsDqi',
    symbol: 'EOSBULL',
    name: 'EOSBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '2CDLbxeuqkLTLY3em6FFQgfBQV5LRnEsJJgcFCvWKNcS',
    symbol: 'BNBBEAR',
    name: 'BNBBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'AfjHjdLibuXyvmz7PyTSc5KEcGBh43Kcu8Sr2tyDaJyt',
    symbol: 'BNBBULL',
    name: 'BNBBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '8kA1WJKoLTxtACNPkvW6UNufsrpxUY57tXZ9KmG9123t',
    symbol: 'BSVBULL',
    name: 'BSVBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '2FGW8BVMu1EHsz2ZS9rZummDaq6o2DVrZZPw4KaAvDWh',
    symbol: 'BSVBEAR',
    name: 'BSVBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '8L9XGTMzcqS9p61zsR35t7qipwAXMYkD6disWoDFZiFT',
    symbol: 'LTCBEAR',
    name: 'LTCBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '863ZRjf1J8AaVuCqypAdm5ktVyGYDiBTvD1MNHKrwyjp',
    symbol: 'LTCBULL',
    name: 'LTCBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'GkSPaHdY2raetuYzsJYacHtrAtQUfWt64bpd1VzxJgSD',
    symbol: 'BULL',
    name: 'BULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '45vwTZSDFBiqCMRdtK4xiLCHEov8LJRW8GwnofG8HYyH',
    symbol: 'BEAR',
    name: 'BEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '2VTAVf1YCwamD3ALMdYHRMV5vPUCXdnatJH5f1khbmx6',
    symbol: 'BCHBEAR',
    name: 'BCHBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '22xoSp66BDt4x4Q5xqxjaSnirdEyharoBziSFChkLFLy',
    symbol: 'BCHBULL',
    name: 'BCHBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'CwChm6p9Q3yFrjzVeiLTTbsoJkooscof5SJYZc2CrNqG',
    symbol: 'ETHBULL',
    name: 'ETHBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'Bvv9xLodFrvDFSno9Ud8SEh5zVtBDQQjnBty2SgMcJ2s',
    symbol: 'ETHBEAR',
    name: 'ETHBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'HRhaNssoyv5tKFRcbPg69ULEbcD8DPv99GdXLcdkgc1A',
    symbol: 'ALTBULL',
    name: 'ALTBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '9Mu1KmjBKTUWgpDoeTJ5oD7XFQmEiZxzspEd3TZGkavx',
    symbol: 'ALTBEAR',
    name: 'ALTBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'AYL1adismZ1U9pTuN33ahG4aYc5XTZQL4vKFx9ofsGWD',
    symbol: 'BULLSHIT',
    name: 'BULLSHIT',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '5jqymuoXXVcUuJKrf1MWiHSqHyg2osMaJGVy69NsJWyP',
    symbol: 'BEARSHIT',
    name: 'BEARSHIT',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'EL1aDTnLKjf4SaGpqtxJPyK94imSBr8fWDbcXjXQrsmj',
    symbol: 'MIDBULL',
    name: 'MIDBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '2EPvVjHusU3ozoucmdhhnqv3HQtBsQmjTnSa87K91HkC',
    symbol: 'MIDBEAR',
    name: 'MIDBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '8TCfJTyeqNBZqyDMY4VwDY7kdCCY7pcbJJ58CnKHkMu2',
    symbol: 'LINKBEAR',
    name: 'LINKBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'EsUoZMbACNMppdqdmuLCFLet8VXxt2h47N9jHCKwyaPz',
    symbol: 'LINKBULL',
    name: 'LINKBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '262cQHT3soHwzuo2oVSy5kAfHcFZ1Jjn8C1GRLcQNKA3',
    symbol: 'XRPBULL',
    name: 'XRPBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '8sxtSswmQ7Lcd2GjK6am37Z61wJZjA2SzE7Luf7yaKBB',
    symbol: 'XRPBEAR',
    name: 'XRPBEAR',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '4pk3pf9nJDN1im1kNwWJN1ThjE8pCYCTexXYGyFjqKVf',
    symbol: 'ODOP',
    name: 'ODOP',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '91z91RukFM16hyEUCXuwMQwp2BW3vanNG5Jh5yj6auiJ',
    symbol: 'BVOL',
    name: 'BVOL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '5TY71D29Cyuk9UrsSxLXw2quJBpS7xDDFuFu2K9W7Wf9',
    symbol: 'IBVOL',
    name: 'IBVOL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'dK83wTVypEpa1pqiBbHY3MNuUnT3ADUZM4wk9VZXZEc',
    symbol: 'AAVE',
    name: 'Wrapped Aave',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'A6aY2ceogBz1VaXBxm1j2eJuNZMRqrWUAnKecrMH85zj',
    symbol: 'LQID',
    name: 'LQID',
    icon: 'https://cdn.jsdelivr.net/gh/dr497/awesome-serum-markets/icons/lqid.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '7CnFGR9mZWyAtWxPcVuTewpyC3A3MDW4nLsu5NY6PDbd',
    symbol: 'SECO',
    name: 'SECO',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '3GECTP7H4Tww3w8jEPJCJtXUtXxiZty31S9szs84CcwQ',
    symbol: 'HOLY',
    name: 'HOLY',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'DgHK9mfhMtUwwv54GChRrU54T2Em5cuszq2uMuen1ZVE',
    symbol: 'CEL',
    name: 'Wrapped Celsius',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '7ncCLJpP3MNww17LW8bRvx8odQQnubNtfNZBL5BgAEHW',
    symbol: 'RSR',
    name: 'Wrapped Reserve Rights',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8762db106B2c2A0bccB3A80d1Ed41273552616E8/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '5wihEYGca7X4gSe97C5mVcqNsfxBzhdTwpv72HKs25US',
    symbol: '1INCH',
    name: 'Wrapped 1INCH',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '38i2NQxjp5rt5B3KogqrxmBxgrAwaB3W1f1GmiKqh9MS',
    symbol: 'GRT',
    name: 'Wrapped GRT',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xc944E90C64B2c07662A292be6244BDf05Cda44a7/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'Avz2fmevhhu87WYtWQCFj9UjKRjF9Z9QWwN2ih9yF95G',
    symbol: 'COMP',
    name: 'Wrapped Compound',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '9wRD14AhdZ3qV8et3eBQVsrb3UoBZDUbJGyFckpTg8sj',
    symbol: 'PAXG',
    name: 'Wrapped Paxos Gold',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x45804880De22913dAFE09f4980848ECE6EcbAf78/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '6ry4WBDvAwAnrYJVv6MCog4J8zx6S3cPgSqnTsDZ73AR',
    symbol: 'TRYB',
    name: 'TRYB',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'ASboaJPFtJeCS5eG4gL3Lg95xrTz2UZSLE9sdJtY93kE',
    symbol: 'DOGEBULL',
    name: 'DOGEBULL',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'Gnhy3boBT4MA8TTjGip5ND2uNsceh1Wgeaw1rYJo51ZY',
    symbol: 'MAPSPOOL',
    name: 'Bonfida Maps Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/explorer/public/tokens/maps.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '9iDWyYZ5VHBCxxmWZogoY3Z6FSbKsX4WFe37c728krdT',
    symbol: 'OXYPOOL',
    name: 'Bonfida Oxy Pool',
    icon: 'https://cdn.jsdelivr.net/gh/nathanielparke/awesome-serum-markets/icons/oxy.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'D68NB5JkzvyNCZAvi6EGtEcGvSoRNPanU9heYTAUFFRa',
    symbol: 'PERP',
    name: 'PERP',
    icon: '',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '93a1L7xaEV7vZGzNXCcb9ztZedbpKgUiTHYxmFKJwKvc',
    symbol: 'RAYPOOL',
    name: 'Bonfida Ray Pool',
    icon: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list/assets/mainnet/RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AbLwQCyU9S8ycJgu8wn6woRCHSYJmjMpJFcAHQ6vjq2P',
    symbol: 'TUSD',
    name: 'TrueUSD',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3JfuyCg5891hCX1ZTbvt3pkiaww3XwgyqQH6E9eHtqKD',
    symbol: 'LON',
    name: 'Tokenlon',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0000000000095413afC295d19EDeb1Ad7B71c952/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6k7mrqiAqEWnABVN8FhfuNUrmrnaMh44nNWydNXctbpV',
    symbol: 'ALBT',
    name: 'AllianceBlock Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4b166BQEQunjg8oNTDcLeWU3nidQnVTL1Vni8ANU7Mvt',
    symbol: 'SKL',
    name: 'SKALE',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CcHhpEx9VcWx7UBJC8DJaR5h3wNdexsQtB1nEfekjSHn',
    symbol: 'UFT',
    name: 'UniLend Finance Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'VPjCJkR1uZGT9k9q7PsLArS5sEQtWgij8eZC8tysCy7',
    symbol: 'ORN',
    name: 'Orion Protocol',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0258F474786DdFd37ABCE6df6BBb1Dd5dfC4434a/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'CxzHZtzrm6bAz6iFCAGgCYCd3iQb5guUD7oQXKxdgk5c',
    symbol: 'SRK',
    name: 'SparkPoint',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0488401c3F535193Fa8Df029d9fFe615A06E74E6/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FqMZWvmii4NNzhLBKGzkvGj3e3XTxNVDNSKDJnt9fVQV',
    symbol: 'UMA',
    name: 'UMA Voting Token v1',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6GGNzF99kCG1ozQbP7M7EYW9zPbQGPMwTCCi2Dqx3qhU',
    symbol: 'Skey',
    name: 'SmartKey',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x06A01a4d579479Dd5D884EBf61A31727A3d8D442/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'Gc9rR2dUHfuYCJ8rU1Ye9fr8JoZZt9ZrfmXitQRLsxRW',
    symbol: 'MIR',
    name: 'Wrapped MIR Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x09a3EcAFa817268f77BE1283176B946C4ff2E608/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'B8xDqdrHpYLNHQKQ4ARDKurxhkhn2gfZa8WRosCEzXnF',
    symbol: 'GRO',
    name: 'Growth',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x09e64c2B61a5f1690Ee6fbeD9baf5D6990F8dFd0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GE1X8ef7fcsJ93THx4CvV7BQsdEyEAyk61s2L5YfSXiL',
    symbol: 'STAKE',
    name: 'xDai',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7TK6QeyTsnTT6KsnK2tHHfh62mbjNuFWoyUc8vo3CmmU',
    symbol: 'YFI',
    name: 'yearn.finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CTtKth9uW7froBA6xCd2MP7BXjGFESdT1SyxUmbHovSw',
    symbol: 'BAT',
    name: 'Basic Attention Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DrL2D4qCRCeNkQz3AJikLjBc3cS6fqqcQ3W7T9vbshCu',
    symbol: 'MANA',
    name: 'Decentraland MANA',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3cJKTW69FQDDCud7AhKHXZg126b3t73a2qVcVBS1BWjL',
    symbol: 'XIO',
    name: 'XIO Network',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CQivbzuRQLvZbqefKc5gLzhSzZzAaySAdMmTG7pFn41w',
    symbol: 'LAYER',
    name: 'Unilayer',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x0fF6ffcFDa92c53F615a4A75D982f399C989366b/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'C1LpKYrkVvWF5imsQ7JqJSZHj9NXNmJ5tEHkGTtLVH2L',
    symbol: 'UMX',
    name: 'https://unimex.network/',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x10Be9a8dAe441d276a5027936c3aADEd2d82bC15/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8F3kZd9XEpFgNZ4fZnEAC5CJZLewnkNE8QCjdvorGWuW',
    symbol: '1INCH',
    name: '1INCH Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'H3UMboX4tnjba1Xw1a2VhUtkdgnrbmPvmDm6jaouQDN9',
    symbol: 'ARMOR',
    name: 'Armor',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Cw26Yz3rAN42mM5WpKriuGvbXnvRYmFA9sbBWH49KyqL',
    symbol: 'arNXM',
    name: 'Armor NXM',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3GVAecXsFP8xLFuAMMpg5NU4g5JK6h2NZWsQJ45wiw6b',
    symbol: 'DPI',
    name: 'DefiPulse Index',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AC4BK5yoEKn5hw6WpH3iWu56pEwigQdR48CiiqJ3R1pd',
    symbol: 'DHC',
    name: 'DeltaHub Community',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x152687Bc4A7FCC89049cF119F9ac3e5aCF2eE7ef/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7bXgNP7SEwrqbnfLBPgKDRKSGjVe7cjbuioRP23upF5H',
    symbol: 'KEX',
    name: 'KIRA Network',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x16980b3B4a3f9D89E33311B5aa8f80303E5ca4F8/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '5uC8Gj96sK6UG44AYLpbX3DUjKtBUxBrhHcM8JDtyYum',
    symbol: 'EWTB',
    name: 'Energy Web Token Bridged',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x178c820f862B14f316509ec36b13123DA19A6054/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'EzeRaHuh1Xu1nDUypv1VWXcGsNJ71ncCJ8HeWuyg8atJ',
    symbol: 'CC10',
    name: 'Cryptocurrency Top 10 Tokens Index',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x17aC188e09A7890a1844E5E65471fE8b0CcFadF3/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CYzPVv1zB9RH6hRWRKprFoepdD8Y7Q5HefCqrybvetja',
    symbol: 'AUDIO',
    name: 'Audius',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9yPmJNUp1qFV6LafdYdegZ8sCgC4oy6Rgt9WsDJqv3EX',
    symbol: 'REP',
    name: 'Reputation',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1985365e9f78359a9B6AD760e32412f4a445E862/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CZxP1KtsfvMXZTGKR1fNwNChv8hGAfQrgVoENabN8zKU',
    symbol: 'VSP',
    name: 'VesperToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8cGPyDGT1mgG1iWzNjPmCDKSK9veJhoBAguq7rp7CjTe',
    symbol: 'KP3R',
    name: 'Keep3rV1',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DGghbWvncPL41U8TmUtXcGMgLeQqkaA2yM7UfcabftR8',
    symbol: 'LEAD',
    name: 'Lead Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1dD80016e3d4ae146Ee2EBB484e8edD92dacC4ce/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3MVa4e32PaKmPxYUQ6n8vFkWtCma68Ld7e7fTktWDueQ',
    symbol: 'UNI',
    name: 'Uniswap',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL',
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '8My83RG8Xa1EhXdDKHWq8BWZN1zF3XUrWL3TXCLjVPFh',
    symbol: 'UNN',
    name: 'UNION Protocol Governance Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x226f7b842E0F0120b7E194D05432b3fd14773a9D/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6jVuhLJ2mzyZ8DyUcrDj8Qr6Q9bqbJnq4fAnMeEduDM9',
    symbol: 'SOCKS',
    name: 'Unisocks Edition 0',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x23B608675a2B2fB1890d3ABBd85c5775c51691d5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Az8PAQ7s6s5ZFgBiKKEizHt3SzDxXKZayDCtRZoC3452',
    symbol: 'DEXT',
    name: 'DEXTools',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x26CE25148832C04f3d7F26F32478a9fe55197166/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'ELSnGFd5XnSdYFFSgYQp7n89FEbDqxN4npuRLW4PPPLv',
    symbol: 'HEX',
    name: 'HEX',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '9iwfHhE7BJKNo4Eb1wX3p4uyJjEN9RoGLt4BvMdzZoiN',
    symbol: 'CREAM',
    name: 'Cream',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x2ba592F78dB6436527729929AAf6c908497cB200/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DdiXkfDGhLiKyw889QC4nmcxSwMqarLBtrDofPJyx7bt',
    symbol: 'YFIM',
    name: 'yfi.mobi',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x2e2f3246b6c65CCc4239c9Ee556EC143a7E5DE2c/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6wdcYNvUyHCerSiGbChkvGBF6Qzju1YP5qpXRQ4tqdZ3',
    symbol: 'ZEE',
    name: 'ZeroSwapToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x2eDf094dB69d6Dcd487f1B3dB9febE2eeC0dd4c5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4xh8iC54UgaNpY4h34rxfZBSc9L2fBB8gWcYtDGHjxhN',
    symbol: 'wANATHA',
    name: 'Wrapped ANATHA',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x3383c5a8969Dc413bfdDc9656Eb80A1408E4bA20/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5Jq6S9HYqfG6TUMjjsKpnfis7utUAB69JiEGkkypdmgP',
    symbol: 'RAMP',
    name: 'RAMP DEFI',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6uMUH5ztnj6AKYvL71EZgcyyRxjyBC5LVkscA5LrBc3c',
    symbol: 'PRQ',
    name: 'Parsiq Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x362bc847A3a9637d3af6624EeC853618a43ed7D2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '42gecM46tdSiYZN2CK1ek5raCxnzQf1xfhoKAf3F7Y5k',
    symbol: 'SLP',
    name: 'Small Love Potion',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1/logo.png',
    decimals: 0
  },
  {
    id: '',
    mintAddress: 'F6M9DW1cWw7EtFK9m2ukvT9WEvtEbdZfTzZTtDeBcnAf',
    symbol: 'SAND',
    name: 'SAND',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x3845badAde8e6dFF049820680d1F14bD3903a5d0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'G27M8w6G4hwatMNFi46DPAUR1YkxSmRNFKus7SgYLoDy',
    symbol: 'CVP',
    name: 'Concentrated Voting Power',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FjucGZpcdVXaWJH21pbrGQaKNszsGsJqbAXu4sJywKJa',
    symbol: 'REN',
    name: 'Republic Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5kvugu18snfGRu1PykMfRzYfUxJYs3smk1PWQcGo6Z8a',
    symbol: 'XOR',
    name: 'Sora',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x40FD72257597aA14C7231A7B1aaa29Fce868F677/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3EKQDmiXj8yLBFpZca4coxBpP8XJCzmjVgUdVydSmaaT',
    symbol: 'FUN',
    name: 'FunFair',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '6J9soByB65WUamsEG8KSPdphBV1oCoGvr5QpaUaY3r19',
    symbol: 'PICKLE',
    name: 'PickleToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HEsqFznmAERPUmMWHtDWYAZRoFbNHZpuNuFrPio68Zp1',
    symbol: 'PAXG',
    name: 'Paxos Gold',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x45804880De22913dAFE09f4980848ECE6EcbAf78/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BrtLvpVCwVDH5Jpqjtiuhh8wKYA5b3NZCnsSftr61viv',
    symbol: 'QNT',
    name: 'Quant',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4a220E6096B25EADb88358cb44068A3248254675/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8DRgurhcQPJeCqQEpbeYGUmwAz2tETbyWUYLUU4Q7goM',
    symbol: 'ORAI',
    name: 'Oraichain Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4c11249814f11b9346808179Cf06e71ac328c1b5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4e5cqAsZ7wQqwLi7AApS9CgN8Yaho5TvkhvcLaGyiuzL',
    symbol: 'TRU',
    name: 'TrustToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'HkhBUKSct2V93Z35apDmXthkRvH4yvMovLyv8s8idDgP',
    symbol: 'MCB',
    name: 'MCDEX Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Eof7wbYsHZKaoyUGwM7Nfkoo6zQW4U7uWXqz2hoQzSkK',
    symbol: 'NU',
    name: 'NuCypher',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4fE83213D56308330EC302a8BD641f1d0113A4Cc/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5CmA1HTVZt5NRtwiUrqWrcnT5JRW5zHe6uQXfP7SDUNz',
    symbol: 'RAZOR',
    name: 'RAZOR',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6msNYXzSVtjinqapq2xcvBb5NRq4YTPAi7wc5Jx8M8TS',
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BX2gcRRS12iqFzKCpvTt4krBBYNymR9JBDZBxzfFLnbF',
    symbol: 'eRSDL',
    name: 'UnFederalReserveToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CCGLdsokcybeF8NrCcu1RSQK8isNBjBA58kVEMTHTKjx',
    symbol: 'sUSD',
    name: 'Synth sUSD',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FP9ogG7hTdfcTJwn4prF9AVEcfcjLq1GtkqYM4oRn7eY',
    symbol: 'HEGIC',
    name: 'Hegic',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x584bC13c7D411c00c01A62e8019472dE68768430/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DboP5vvYUVjmKSHKJ1YFHwmv41KtUscnYgzjmPgHwQVn',
    symbol: 'XFI',
    name: 'Xfinance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x5BEfBB272290dD5b8521D4a938f6c4757742c430/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6c4U9yxGzVjejSJJXrdX8wtt532Et6MrBUZc2oK5j6w5',
    symbol: 'DEXTF',
    name: 'DEXTF Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x5F64Ab1544D28732F0A24F4713c2C8ec0dA089f0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'JuXkRYNw54rujC7SPWcAM4ArLgA5x8nDQbS8xHAr6MA',
    symbol: 'RLC',
    name: 'iExec RLC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x607F4C5BB672230e8672085532f7e901544a7375/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7NfgSkv6kZ6ZWP6SJPtMuaUYGVEngVK8UFnaFTPk3QsM',
    symbol: 'CORE',
    name: 'cVault.finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AqLKDJiGL4wXKPAfzNom3xEdQwgj2LTCE4k34gzvZsE6',
    symbol: 'CFi',
    name: 'CyberFi Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FLrjpCRrd4GffHu8MVYGvuLxYLuBGVaXsnCecw3Effci',
    symbol: 'WISE',
    name: 'Wise Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x66a0f676479Cee1d7373f3DC2e2952778BfF5bd6/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GaMPhVyp1xd9xJuPskDEzQzp8mKfEjAmhny8NX7y7YKc',
    symbol: 'GNO',
    name: 'Gnosis Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CCAQZHBVWKDukT68PZ3LenDs7apibeSYeJ3jHE8NzBC5',
    symbol: 'POOLZ',
    name: '$Poolz Finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HbMGwfGjGPchtaPwyrtJFy8APZN5w1hi63xnzmj1f23v',
    symbol: 'SUSHI',
    name: 'SushiSwap',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '6Tmi8TZasqdxWB59uE5Zw9VLKecuCbsLSsPEqoMpmozA',
    symbol: 'FYZ',
    name: 'Fyooz',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6BFf2fE249601ed0Db3a87424a2E923118BB0312/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3sHinPxEPqhEGip2Wy45TFmgAA1Atg2mctMjY5RKJUjk',
    symbol: 'QRX',
    name: 'QuiverX',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6e0daDE58D2d89eBBe7aFc384e3E4f15b70b14D8/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4ighgEijHcCoLu9AsvwVz2TnGFqAgzQtQMr6ch88Jrfe',
    symbol: 'TRADE',
    name: 'UniTrade',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6F87D756DAf0503d08Eb8993686c7Fc01Dc44fB1/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FTPnEQ3NfRRZ9tvmpDW6JFrvweBE5sanxnXSpJL1dvbB',
    symbol: 'BIRD',
    name: 'Bird.Money',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'QVDE6rhcGPSB3ex5T7vWBzvoSRUXULjuSGpVuKwu5XH',
    symbol: 'AXN',
    name: 'Axion',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x71F85B2E46976bD21302B64329868fd15eb0D127/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'J6AbGG62yo9UJ2T9r9GM7pnoRNui5DsZDnPbiNAPqbVd',
    symbol: 'BMI',
    name: 'Bridge Mutual',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x725C263e32c72dDC3A19bEa12C5a0479a81eE688/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4wvHoaxxZxFeNrMTP8bLVRh1ziSBV7crN665WX4rRMqe',
    symbol: 'DYT',
    name: 'DoYourTip',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x740623d2c797b7D8D1EcB98e9b4Afcf99Ec31E14/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Fe5fWjCLDMJoi4sTmfR2VW4BT1LwsbR1n6QAjzJQvhhf',
    symbol: 'BBR',
    name: 'BitberryToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7671904eed7f10808B664fc30BB8693FD7237abF/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5J9yhFRnQZx3RiqHzfQpAffX5UQz3k8vQCZH2g9Z9sDg',
    symbol: 'WAXE',
    name: 'WAX Economic Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7a2Bc711E19ba6aff6cE8246C546E8c4B4944DFD/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '4DHywS5EjUTF5AYisPZiJbWcCV4gfpH98oKxpgyKRnnQ',
    symbol: 'MATIC',
    name: 'Matic Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Au9E8ygQdTJQZXmNKPdtLEP8rGjC4qsGRhkJgjFNPAr8',
    symbol: 'XRT',
    name: 'Robonomics',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5DQZ14hLDxveMH7NyGmTmUTRGgVAVXADp3cP2UHeH6hM',
    symbol: 'AAVE',
    name: 'Aave Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Arc2ZVKNCdDU4vB8Ubud5QayDtjo2oJF9xVrUPQ6TWxF',
    symbol: 'LEND',
    name: 'Lend',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x80fB784B7eD66730e8b1DBd9820aFD29931aab03/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2ctKUDkGBnVykt31AhMPhHvAQWJvoNGbLh7aRidjtAqv',
    symbol: 'POLS',
    name: 'PolkastarterToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8FnkznYpHvKiaBkgatVoCrNiS5y5KW62JqgjnxVhDejC',
    symbol: 'UBT',
    name: 'Unibright',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '4LLAYXVmT3U8Sew6k3tk66zk3btT91QRzQzxcNX8XhzV',
    symbol: 'DIA',
    name: 'DIA',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8L8pDf3jutdpdr4m3np68CL9ZroLActrqwxi6s9Ah5xU',
    symbol: 'FRAX',
    name: 'Frax',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x853d955aCEf822Db058eb8505911ED77F175b99e/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'H3oVL2zJpHJaDoRfQmSrftv3fkGzvsiQgugCZmcRBykG',
    symbol: 'KEEP',
    name: 'KEEP Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '64oqP1dFqqD8NEL4RPCpMyrHmpo31rj3nYxULVXvayfW',
    symbol: 'RSR',
    name: 'Reserve Rights',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8762db106B2c2A0bccB3A80d1Ed41273552616E8/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5SU7veiCRA16ZxnS24kCC1dwQYVwi3whvTdM48iNE1Rm',
    symbol: 'MPH',
    name: '88mph.app',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8888801aF4d980682e47f1A9036e589479e835C5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5fv26ojhPHWNaikXcMf2TBu4JENjLQ2PWgWYeitttVwv',
    symbol: 'PAID',
    name: 'PAID Network',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8c8687fC965593DFb2F0b4EAeFD55E9D8df348df/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'ACr98v3kv9qaGnR3p2BfsoSK9Q2ZmP6zUkm3qxv5ZJDd',
    symbol: 'SXP',
    name: 'Swipe',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7gBuzBcJ7V48m8TiKJ1XWNDUerK2XfAbjxuRiKMb6S8Z',
    symbol: 'REQ',
    name: 'Request Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x8f8221aFbB33998d8584A2B05749bA73c37a938a/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CtDjsryLtwZCLj8TeniV7tWHbkaREfjKDWpvyQvsTyek',
    symbol: 'WHALE',
    name: 'WHALE',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x9355372396e3F6daF13359B7b607a3374cc638e0/logo.png',
    decimals: 4
  },
  {
    id: '',
    mintAddress: 'JDUgn6JUSwufqqthRdnZZKWv2vEdYvHxigF5Hk79yxRm',
    symbol: 'PNK',
    name: 'Pinakion',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'EJKqF4p7xVhXkcDNCrVQJE4osow76226bc6u3AtsGXaG',
    symbol: 'APY',
    name: 'APY Governance Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x95a4492F028aa1fd432Ea71146b433E7B4446611/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AF7Dv5Vzi1dT2fLnz4ysiRQ6FxGN1M6mrmHwgNpx7FVH',
    symbol: 'OCEAN',
    name: 'Ocean Protocol',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x967da4048cD07aB37855c090aAF366e4ce1b9F48/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AyNULvvLGW11fThvhncqNRjEgmDbMEHdDL4HqXD6SM8V',
    symbol: 'SPI',
    name: 'Shopping.io',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x9B02dD390a603Add5c07f9fd9175b7DABE8D63B7/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3UeKTABxz9XexDtyKq646rSQvx8GVpKNwfMoKKfxsTsF',
    symbol: 'BBTC',
    name: 'Binance Wrapped BTC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'DsGbyCHbG4vSWBqAprR2eWuUAg8fXAgYkWL9psgvYZn5',
    symbol: 'UNISTAKE',
    name: 'Unistake',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x9Ed8e7C9604790F7Ec589F99b94361d8AAB64E5E/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GBvv3jn9u6pZqPd2GVnQ7BKJzLwQnEWe4ci9k359PN9Z',
    symbol: 'MKR',
    name: 'MakerDAO',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '53ETjuzUNHG8c7rZ2hxQLQfN5R6tEYtdYwNQsa68xFUk',
    symbol: 'FARM',
    name: 'FARM Reward Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xa0246c9032bC3A600820415aE600c6388619A14D/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FVsXUnbhifqJ4LiXQEbpUtXVdB8T5ADLKqSs5t1oc54F',
    symbol: 'wUSDC (V1)',
    name: 'USD Coin (Wormhole v1)',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'EjBpnWzWZeW1PKzfCszLdHgENZLZDoTNaEmz8BddpWJx',
    symbol: 'ANT',
    name: 'Aragon Network Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xa117000000f279D81A1D3cc75430fAA017FA5A2e/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Rs4LHZ4WogZCAkCzfsKJib5LLnYL6xcVAfTcLQiSjg2',
    symbol: 'NPXS',
    name: 'Pundi X Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xA15C7Ebe1f07CaF6bFF097D8a589fb8AC49Ae5B3/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '65ribugkb42AANKYrEeuruhhfXffyE4jY22FUxFbpW7C',
    symbol: 'RFOX',
    name: 'RFOX',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xa1d6Df714F91DeBF4e0802A542E13067f31b8262/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'T2mo6dnFiutu26KMuCMSjCLBB4ofWvQ3qBJGEMc3JSe',
    symbol: 'MTA',
    name: 'Meta',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HC8SaUm9rhvVZE5ZwBWiUhFAnCuG8byd5FxKYdpFm5MR',
    symbol: 'RBC',
    name: 'Rubic',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xA4EED63db85311E22dF4473f87CcfC3DaDCFA3E3/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9DdtKWoK8cBfLSLhHXHFZzzhxp4rdwHbFEAis8n5AsfQ',
    symbol: 'NOIA',
    name: 'NOIA Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xa8c8CfB141A3bB59FEA1E2ea6B79b5ECBCD7b6ca/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DTQStP2z4DRqbNHRxtwThAujr9aPFPsv4y2kkXTVLVvb',
    symbol: 'CEL',
    name: 'Celsius',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d/logo.png',
    decimals: 4
  },
  {
    id: '',
    mintAddress: '59NPV18vAbTgwC9aeEGikrmX3EbZHMEMkZfvcsHBNFr9',
    symbol: 'CWS',
    name: 'Crowns',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xaC0104Cca91D167873B8601d2e71EB3D4D8c33e0/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4811JP9i35zgAxSFZjGXQwew6xd1qSBE4xdMFik2J14Z',
    symbol: 'ROOM',
    name: 'OptionRoom Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xAd4f86a25bbc20FfB751f2FAC312A0B4d8F88c64/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2VAdvHWMpzMnDYYn64MgqLNpGQ19iCiusCet8JLMtxU5',
    symbol: 'YOP',
    name: 'YOP',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xAE1eaAE3F627AAca434127644371b67B18444051/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'AKiTcEWZarsnUbKkwQVRjJni5eqwiNeBQsJ3nrADacT4',
    symbol: 'LGCY',
    name: 'LGCY Network',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xaE697F994Fc5eBC000F8e22EbFfeE04612f98A0d/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4kPHTMfSD1k3SytAMKEVRWH5ip6WD5U52tC5q6TuXUNU',
    symbol: 'RFuel',
    name: 'Rio Fuel Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xaf9f549774ecEDbD0966C52f250aCc548D3F36E5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'E1w2uKRsVJeDf1Qqbk7DDKEDe7NCYwh8ySgqCaEZ4BTC',
    symbol: 'MAHA',
    name: 'MahaDAO',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xB4d930279552397bbA2ee473229f89Ec245bc365/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4psmnTirimNyPEPEZtkQkdEPJagTXS3a7wsu1XN9MYK3',
    symbol: 'RPL',
    name: 'Rocket Pool',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xB4EFd85c19999D84251304bDA99E90B92300Bd93/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FrhQauNRm7ecom9FRprNcyz58agDe5ujAbAtA9NG6jtU',
    symbol: 'NEXO',
    name: 'Nexo',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AoU75vwpnWEVvfarxRALjzRc8vS9UdDhRMkwoDimt9ss',
    symbol: 'SFI',
    name: 'Spice',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xb753428af26E81097e7fD17f40c88aaA3E04902c/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CRZuALvCYjPLB65WFLHh9JkmPWK5C81TXpy2aEEaCjr3',
    symbol: 'STBZ',
    name: 'Stabilize Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xB987D48Ed8f2C468D52D6405624EADBa5e76d723/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HPYXGSdAwyK5GwmuivL8gDdUVRChtgXq6SRat44k4Pat',
    symbol: 'BAL',
    name: 'Balancer',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AV7NgJV2BsgEukzUTrcUMz3LD37xLcLtygFig5WJ3kQN',
    symbol: 'BAND',
    name: 'BandToken',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4obZok5FFUcQXQoV39hhcqk9xSmo4WnP9wnrNCk1g5BC',
    symbol: 'SWFL',
    name: 'Swapfolio',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xBa21Ef4c9f433Ede00badEFcC2754B8E74bd538A/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HCP8hGKS6fUGfTA1tQxBKzbXuQk7yktzz71pY8LXVJyR',
    symbol: 'LRC',
    name: 'LoopringCoin V2',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9sNArcS6veh7DLEo7Y1ZSbBCYtkuPVE6S3HhVrcWR2Zw',
    symbol: 'PERP',
    name: 'Perpetual',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xbC396689893D065F41bc2C6EcbeE5e0085233447/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3XnhArdJydrpbr9Nbj8wNUaozPL9WAo9YDyNWakhTm9X',
    symbol: 'COMP',
    name: 'Compound',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'CPLNm9UMKfiJKiySQathV99yeSgTVjPDZx4ucFrbp2MD',
    symbol: 'SNX',
    name: 'Synthetix Network Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets//logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'D6eVKSfLdioqo2zG8LbQYFU2gf66FrjKA7afCYNo1GHt',
    symbol: 'DUCK',
    name: 'DLP Duck Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xC0bA369c8Db6eB3924965e5c4FD0b4C1B91e305F/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9PwPi3DAf9Dy4Y6qJmUzF6fX9CjNwScBidsYqJmcApF8',
    symbol: 'CHAIN',
    name: 'Chain Games',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xC4C2614E694cF534D407Ee49F8E44D125E4681c4/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BmxZ1pghpcoyT7aykj7D1o4AxWirTqvD7zD2tNngjirT',
    symbol: 'GRT',
    name: 'Graph Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xc944E90C64B2c07662A292be6244BDf05Cda44a7/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FMr15arp651N6fR2WEL36pCMBnFecHcN6wDxne2Vf3SK',
    symbol: 'ROOT',
    name: 'RootKit',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'E9X7rKAGfSh1gsHC6qh5MVLkDzRcT64KQbjzvHnc5zEq',
    symbol: 'SWAP',
    name: 'TrustSwap Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xCC4304A31d09258b0029eA7FE63d032f52e44EFe/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5NEENV1mNvu7MfNNtKuGSDC8zoNStq1tuLkDXFtv6rZd',
    symbol: 'TVK',
    name: 'Terra Virtua Kolect',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xd084B83C305daFD76AE3E1b4E1F1fe2eCcCb3988/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5ZXLGj7onpitgtREJNYb51DwDPddvqV1YLC8jn2sgz48',
    symbol: 'OMG',
    name: 'OMG Network',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets//logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2Xf2yAXJfg82sWwdLUo2x9mZXy6JCdszdMZkcF1Hf4KV',
    symbol: 'LUNA',
    name: 'Wrapped LUNA Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5Ro6JxJ4NjSTEppdX2iXUYgWkAEF1dcs9gqMX99E2vkL',
    symbol: 'BONDLY',
    name: 'Bondly Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xD2dDa223b2617cB616c1580db421e4cFAe6a8a85/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '5jFzUEqWLnvGvKWb1Pji9nWVYy5vLG2saoXCyVNWEdEi',
    symbol: 'DETS',
    name: 'Dextrust',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xd379700999F4805Ce80aa32DB46A94dF64561108/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BV5tm1uCRWQCQKNgQVFnkseqAjxpmbJkRCXvzFWBdgMp',
    symbol: 'AMPL',
    name: 'Ampleforth',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets//logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2PSvGigDY4MVUmv51bBiARBMcHBtXcUBnx5V9BwWbbi2',
    symbol: 'POLK',
    name: 'Polkamarkets',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xD478161C952357F05f0292B56012Cd8457F1cfbF/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'ApmXkxXCASdxRf3Ln6Ni7oAZ7E6CX1CcJAD8A5qBdhSm',
    symbol: 'CRV',
    name: 'Curve DAO Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DWECGzR56MruYJyo5g5QpoxZbFoydt3oWUkkDsVhxXzs',
    symbol: 'MEME',
    name: 'MEME',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xD5525D397898e5502075Ea5E830d8914f6F0affe/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: '3Y2wTtM4kCX8uUSLrKJ8wpajCu1C9LaWWAd7b7Nb2BDw',
    symbol: 'EXNT',
    name: 'ExNetwork Community Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xD6c67B93a7b248dF608a653d82a100556144c5DA/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9w97GdWUYYaamGwdKMKZgGzPduZJkiFizq4rz5CPXRv2',
    symbol: 'wUSDT (V1)',
    name: 'Tether USD (Wormhole v1)',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'CqWSJtkMMY16q9QLnQxktM1byzVHGRr8b6LCPuZnEeiL',
    symbol: 'YLD',
    name: 'Yield',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xDcB01cc464238396E213a6fDd933E36796eAfF9f/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '26ZzQVGZruwcZPs2sqb8n9ojKt2cviUjHcMjstFtK6ow',
    symbol: 'KNC',
    name: 'Kyber Network Crystal',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HHoHTtntq2kiBPENyVM1DTP7pNrkBXX2Jye29PSyz3qf',
    symbol: 'COTI',
    name: 'COTI Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xDDB3422497E61e13543BeA06989C0789117555c5/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4sEpUsJ6uJZYi6A2da8EGjKPacRSqYJaPJffPnTqoWVv',
    symbol: 'INJ',
    name: 'Injective Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'G2jrxYSoCSzmohxERa2JzSJMuRM4kiNvRA3DnCv7Lzcz',
    symbol: 'ZRX',
    name: '0x Protocol Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3bkBFHyof411hGBdcsiM1KSDdErw63Xoj3eLB8yNknB4',
    symbol: 'SUPER',
    name: 'SuperFarm',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xe53EC727dbDEB9E2d5456c3be40cFF031AB40A55/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7kkkoa1MB93ELm3vjvyC8GJ65G7eEgLhfaHU58riJUCx',
    symbol: 'aEth',
    name: 'aEthereum',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xE95A203B1a91a908F9B9CE46459d101078c2c3cb/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'F48zUwoQMzgCTf5wihwz8GPN23gdcoVMiT227APqA6hC',
    symbol: 'SURF',
    name: 'SURF.Finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xEa319e87Cf06203DAe107Dd8E5672175e3Ee976c/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'EK6iyvvqvQtsWYcySrZVHkXjCLX494r9PhnDWJaX1CPu',
    symbol: 'renBTC',
    name: 'renBTC',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D/logo.png',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'B2m4B527oLo5WFWLgy2MitP66azhEW2puaazUAuvNgqZ',
    symbol: 'DMG',
    name: 'DMM: Governance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xEd91879919B71bB6905f23af0A68d231EcF87b14/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'H3iuZNRwaqPsnGUGU5YkDwTU3hQMkzC32hxDko8EtzZw',
    symbol: 'HEZ',
    name: 'Hermez Network Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xEEF9f339514298C6A857EfCfC1A762aF84438dEE/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DL7873Hud4eMdGScQFD7vrbC6fzWAMQ2LMuoZSn4zUry',
    symbol: 'RLY',
    name: 'Rally',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3N89w9KPUVYUK5MMGNY8yMXhrr89QQ1RQPJxVnQHgMdd',
    symbol: 'Yf-DAI',
    name: 'YfDAI.finance',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xf4CD3d3Fda8d7Fd6C5a500203e38640A70Bf9577/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8ArKbnnDiq8eRR8hZ1eULMjd2iMAD8AqwyVJRAX7mHQo',
    symbol: 'FCL',
    name: 'Fractal Protocol Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xF4d861575ecC9493420A3f5a14F85B13f0b50EB3/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'ZWGxcTgJCNGQqZn6vFdknwj4AFFsYRZ4SDJuhRn3J1T',
    symbol: 'AXS',
    name: 'Axie Infinity',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xF5D669627376EBd411E34b98F19C868c8ABA5ADA/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'PEjUEMHFRtfajio8YHKZdUruW1vTzGmz6F7NngjYuou',
    symbol: 'ENJ',
    name: 'Enjin Coin',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2cW5deMKeR97C7csq1aMMWUa5RNWkpQFz8tumxk4ZV8w',
    symbol: 'YLD',
    name: 'Yield',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xF94b5C5651c888d928439aB6514B93944eEE6F48/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FR5qPX4gbKHPyKMK7Cey6dHZ7wtqmqRogYPJo6bpd5Uw',
    symbol: 'DDIM',
    name: 'DuckDaoDime',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8HCWFQA2GsA6Nm2L5jidM3mus7NeeQ8wp1ri3XFF9WWH',
    symbol: 'RARI',
    name: 'Rarible',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Egrv6hURf5o68xJ1AGYeRv8RNj2nXJVuSoA5wwiSALcN',
    symbol: 'AMP',
    name: 'Amp',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xfF20817765cB7f73d4bde2e66e067E58D11095C2/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GXMaB6jm5cdoQgb65YpkEu61eDYtod3PuVwYYXdZZJ9r',
    symbol: 'FSW',
    name: 'FalconSwap Token',
    icon: 'https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xfffffffFf15AbF397dA76f1dcc1A1604F45126DB/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AJ1W9A9N9dEMdVyoDiam2rV44gnBm2csrPDP7xqcapgX',
    symbol: 'BUSD',
    name: 'Binance USD',
    icon: ' https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2VmKuXMwdzouMndWcK7BK2951tBEtYVmGsdU4dXbjyaY',
    symbol: 'aDAI',
    name: 'Aave Interest bearing DAI',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aDAI.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AXvWVviBmySSdghmuomYHqYB3AZn7NmAWrHYHKKPJxoL',
    symbol: 'aTUSD',
    name: 'Aave Interest bearing TUSD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aTUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AkaisFPmasQYZUJsZLD9wPEo2KA7aCRqyRawX18ZRzGr',
    symbol: 'aUSDC',
    name: 'Aave Interest bearing USDC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUSDC.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'FZfQtWMoTQ51Z4jxvHfmFcqj4862u9GzmugBnZUuWqR5',
    symbol: 'aUSDT',
    name: 'Aave Interest bearing USDT',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUSDT.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'BMrbF8DZ9U5KGdJ4F2MJbH5d6KPi5FQVp7EqmLrhDe1f',
    symbol: 'aSUSD',
    name: 'Aave Interest bearing SUSD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aSUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Fzx4N1xJPDZENAhrAaH79k2izT9CFbfnDEcpcWjiusdY',
    symbol: 'aLEND',
    name: 'Aave Interest bearing LEND',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aLEND.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GCdDiVgZnkWCAnGktUsjhoho2CHab9JfrRy3Q5W51zvC',
    symbol: 'aBAT',
    name: 'Aave Interest bearing BAT',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aBAT.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FBrfFh7fb7xKfyBMJA32KufMjEkgSgY4AuzLXFKdJFRj',
    symbol: 'aETH',
    name: 'Aave Interest bearing ETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Adp88WrQDgExPTu26DdBnbN2ffWMkXLxwqzjTdfRQiJi',
    symbol: 'aLINK',
    name: 'Aave Interest bearing LINK',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aLINK.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3p67dqghWn6reQcVCqNBkufrpU1gtA1ZRAYja6GMXySG',
    symbol: 'aKNC',
    name: 'Aave Interest bearing KNC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aKNC.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'A4qYX1xuewaBL9SeZnwA3We6MhG8TYcTceHAJpk7Etdt',
    symbol: 'aREP',
    name: 'Aave Interest bearing REP',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aREP.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3iTtcKUVa5ouzwNZFc3SasuAKkY2ZuMxLERRcWfxQVN3',
    symbol: 'aMKR',
    name: 'Aave Interest bearing MKR',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aMKR.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'EMS6TrCU8uBMumZukRSShGS1yzHGqYd3S8hW2sYULX3T',
    symbol: 'aMANA',
    name: 'Aave Interest bearing MANA',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aMANA.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'qhqzfH7AjeukUgqyPXncWHFXTBebFNu5QQUrzhJaLB4',
    symbol: 'aZRX',
    name: 'Aave Interest bearing ZRX',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aZRX.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FeU2J26AfMqh2mh7Cf4Lw1HRueAvAkZYxGr8njFNMeQ2',
    symbol: 'aSNX',
    name: 'Aave Interest bearing SNX',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmXj52EGotmpyep84PBycmQnAgCF2sbqxdXFWP3GPZFbEz',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GveRVvWTUH1s26YxyjUnXh1J5mMdu5crC2K2uQy26KXi',
    symbol: 'aWBTC',
    name: 'Aave Interest bearing WBTC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aWBTC.svg',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'F2WgoHLwV4pfxN4WrUs2q6KkmFCsNorGYQ82oaPNUFLP',
    symbol: 'aBUSD',
    name: 'Aave Interest bearing Binance USD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aBUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3rNUQJgvfZ5eFsZvCkvdYcbd9ZzS6YmtwQsoUTFKmVd4',
    symbol: 'aENJ',
    name: 'Aave Interest bearing ENJ',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aENJ.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BHh8nyDwdUG4uyyQYNqGXGLHPyb83R6Y2fqJrNVKtTsT',
    symbol: 'aREN',
    name: 'Aave Interest bearing REN',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmUgE3UECZxZcCAiqd3V9otfFWLi5fxR8uHd94RxkT3iYb',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'EE58FVYG1UoY6Givy3K3GSRde9sHMj6X1BnocHBtd3sz',
    symbol: 'aYFI',
    name: 'Aave Interest bearing YFI',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmauhqAKU8YLhDhT4M5ZcPMuqEfqkBrBaC31uWC9UXd1ik',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8aYsiHR6oVTAcFUzdXDhaPkgRbn4QYRCkdk3ATmAmY4p',
    symbol: 'aAAVE',
    name: 'Aave Interest bearing Aave Token',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aAAVE.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8kwCLkWbv4qTJPcbSV65tWdQmjURjBGRSv6VtC1JTiL8',
    symbol: 'aUNI',
    name: 'Aave Interest bearing Uniswap',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmYdpeez387RdMw6zEEa5rMXuayi748Uc15eFuoa3QhGEJ',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9NDu1wdjZ7GiY7foAXhia9h1wQU45oTUzyMZKJ31V7JA',
    symbol: 'stkAAVE',
    name: 'Staked Aave',
    icon: 'https://cloudflare-ipfs.com/ipfs/Qmc2N4CsWDH3ZnnggcvbF8dN1JYsKTUyh3rdj5NBZH9KKL',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GNQ1Goajm3Za8uC1Eptt2yfsrbnkZh2eMJoqxg54sj3o',
    symbol: 'UniDAIETH',
    name: 'Uniswap DAI LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmYNz8J1h5yefkaAw6tZwUYoJyBTWmBXgAY28ZWZ5rPsLR',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7NFin546WNvWkhtfftfY77z8C1TrxLbUcKmw5TpHGGtC',
    symbol: 'UniUSDCETH',
    name: 'Uniswap USDC LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/Qme9QQcNzKvk3FEwEZvvKJWSvDUd41z5geWHNpuJb6di9y',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7gersKTtU65ERNBNTZKjYgKf7HypR7PDMprcuhQJChaq',
    symbol: 'UnisETHETH',
    name: 'Uniswap sETH LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmZcwn4eZJpjihH8TApRczQQJdAzpR6Er7g1bvo6PGhxWi',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4aqNtSCr77eiEZJ9u9BhPErjEMju6FFdLeBKkE1pdxuK',
    symbol: 'UniLENDETH',
    name: 'Uniswap LEND LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/Qmcbin86EXd14LhbqLknH9kM3N7oueBYt9qQmZdmMWqrgu',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FDdoYCHwFghBSbnN6suvFR3VFw6kAzfhfGpkAQAGPLC3',
    symbol: 'UniMKRETH',
    name: 'Uniswap MKR LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmSS94EJyBeHeUmoDmGjQjeuUHQxTcMaD8Zvw8W8XdGDBv',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'FSSTfbb1vh1TRe8Ja64hC65QTc7pPUhwHh5uTAWj5haH',
    symbol: 'UniLINKETH',
    name: 'Uniswap LINK LP',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmQWb2cb9QZbTeMTtoWzUpJGNXcZiGXTygbRLKHNNwhk4Y',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Aci9xBGywrgBxQoFnL6LCoCYuX5k6AqaYhimgSZ1Fhrk',
    symbol: 'aUniETH',
    name: 'Aave Interest bearing UniETH',
    icon: ' https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x6179078872605396Ee62960917128F9477a5DdbB/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GqHK99sW4ym6zy6Kdoh8f7sb2c3qhtB3WRqeyPbAYfmy',
    symbol: 'aUniDAI',
    name: 'Aave Interest bearing UniDAI',
    icon: ' https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0x048930eec73c91B44b0844aEACdEBADC2F2b6efb/logo.png',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4e4TpGVJMYiz5UBrAXuNmiVJ9yvc7ppJeAn8sXmbnmDi',
    symbol: 'aUniUSDC',
    name: 'Aave Interest bearing UniUSDC',
    icon: ' https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xe02b2Ad63eFF3Ac1D5827cBd7AB9DD3DaC4f4AD0/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '49LoAnQQdo9171zfcWRUoQLYSScrxXobbuwt14xjvfVm',
    symbol: 'aUniUSDT',
    name: 'Aave Interest bearing UniUSDT',
    icon: ' https://cdn.jsdelivr.net/gh/trustwallet/assets/blockchains/ethereum/assets/0xb977ee318010A5252774171494a1bCB98E7fab65/logo.png',
    decimals: 6
  },
  {
    id: '',
    mintAddress: 'CvG3gtKYJtKRzEUgMeb42xnd8HDjESgLtyJqQ2kuLncp',
    symbol: 'aUniDAIETH',
    name: 'Aave Interest bearing UniDAIETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20DAI%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GSv5ECZaMfaceZK4WKKzA4tKVDkqtfBASECcmYFWcy4G',
    symbol: 'aUniUSDCETH',
    name: 'Aave Interest bearing UniUSDCETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20USDC%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7LUdsedi7qpTJGnFpZo6mWqVtKKpccr9XrQGxJ2xUDPT',
    symbol: 'aUniSETHETH',
    name: 'Aave Interest bearing UniSETHETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20sETH%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Hc1zHQxg1k2JVwvuv3kqbCyZDEJYfDdNftBMab4EMUx9',
    symbol: 'aUniLENDETH',
    name: 'Aave Interest bearing UniLENDETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20LEND%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9PejEmx6NKDHgf6jpgAWwZsibURKifBakjzDQdtCtAXT',
    symbol: 'aUniMKRETH',
    name: 'Aave Interest bearing UniMKRETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20MKR%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'KcHygDp4o7ENsHjevYM4T3u6R7KHa5VyvkJ7kpmJcYo',
    symbol: 'aUniLINKETH',
    name: 'Aave Interest bearing UniLINKETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUNI%20LINK%20ETH.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'GNPAF84ZEtKYyfuY2fg8tZVwse7LpTSeyYPSyEKFqa2Y',
    symbol: 'aUSDT',
    name: 'Aave interest bearing USDT',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUSDT.svg',
    decimals: 6
  },
  {
    id: '',
    mintAddress: '3QTknQ3i27rDKm5hvBaScFLQ34xX9N7J7XfEFwy27qbZ',
    symbol: 'aWBTC',
    name: 'Aave interest bearing WBTC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aWBTC.svg',
    decimals: 8
  },
  {
    id: '',
    mintAddress: 'EbpkofeWyiQouGyxQAgXxEyGtjgq13NSucX3CNvucNpb',
    symbol: 'aWETH',
    name: 'Aave interest bearing WETH',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmUDc7LQN6zKHon9FChTqZc7WGFvGPZe698Bq5HbSYtfk9',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '67uaa3Z7SX7GC6dqSTjpJLnySLXZpCAK9MHMi3232Bfb',
    symbol: 'aYFI',
    name: 'Aave interest bearing YFI',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmauhqAKU8YLhDhT4M5ZcPMuqEfqkBrBaC31uWC9UXd1ik',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '9xS6et5uvQ64QsmaGMfzfXrwTsfYPjwEWuiPnBGFgfw',
    symbol: 'aZRX',
    name: 'Aave interest bearing ZRX',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aZRX.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2TZ8s2FwtWqJrWpdFsSf2uM2Fvjw474n6HhTdTEWoLor',
    symbol: 'aUNI',
    name: 'Aave interest bearing UNI',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmYdpeez387RdMw6zEEa5rMXuayi748Uc15eFuoa3QhGEJ',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'G1o2fHZXyPCeAEcY4o6as7SmVaUu65DRhcq1S4Cfap9T',
    symbol: 'aAAVE',
    name: 'Aave interest bearing AAVE',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aAAVE.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '8PeWkyvCDHpSgT5oiGFgZQtXSRBij7ZFLJTHAGBntRDH',
    symbol: 'aBAT',
    name: 'Aave interest bearing BAT',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aBAT.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '67opsuaXQ3JRSJ1mmF7aPLSq6JaZcwAmXwcMzUN5PSMv',
    symbol: 'aBUSD',
    name: 'Aave interest bearing BUSD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aBUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4JrrHRS56i9GZkSmGaCY3ZsxMo3JEqQviU64ki7ZJPak',
    symbol: 'aDAI',
    name: 'Aave interest bearing DAI',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aDAI.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '3LmfKjsSU9hdxfZfcr873DMNR5nnrk8EvdueXg1dTSin',
    symbol: 'aENJ',
    name: 'Aave interest bearing ENJ',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aENJ.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '7VD2Gosm34hB7kughTqu1N3sW92hq3XwKLTi1N1tdKrj',
    symbol: 'aKNC',
    name: 'Aave interest bearing KNC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aKNC.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4erbVWFvdvS5P8ews7kUjqfpCQbA8vurnWyvRLsnZJgv',
    symbol: 'aLINK',
    name: 'Aave interest bearing LINK',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aLINK.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'AXJWqG4SpAEwkMjKYkarKwv6Qfz5rLU3cwt5KtrDAAYe',
    symbol: 'aMANA',
    name: 'Aave interest bearing MANA',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aMANA.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '4kJmfagJzQFuwto5RX6f1xScWYbEVBzEpdjmiqTCnzjJ',
    symbol: 'aMKR',
    name: 'Aave interest bearing MKR',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aMKR.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'DN8jPo8YZTXhLMyDMKcnwFuKqY8wfn2UrpX8ct4rc8Bc',
    symbol: 'aREN',
    name: 'Aave interest bearing REN',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmUgE3UECZxZcCAiqd3V9otfFWLi5fxR8uHd94RxkT3iYb',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'HWbJZXJ7s1D1zi5P7yVgRUmZPXvYSFv6vsYU765Ti422',
    symbol: 'aSNX',
    name: 'Aave interest bearing SNX',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmXj52EGotmpyep84PBycmQnAgCF2sbqxdXFWP3GPZFbEz',
    decimals: 9
  },
  {
    id: '',
    mintAddress: '2LForywWWpHzmR5NjSEyF1kcw9ffyLuJX7V7hne2fHfY',
    symbol: 'aSUSD',
    name: 'Aave interest bearing SUSD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aSUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'Badj3S29a2u1auxmijwg5vGjhPLb1K6WLPoigtWjKPXp',
    symbol: 'aTUSD',
    name: 'Aave interest bearing TUSD',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aTUSD.svg',
    decimals: 9
  },
  {
    id: '',
    mintAddress: 'BZCPpva12M9SqJgcpf8jtP9Si6rMANFoUR3i7nchha7M',
    symbol: 'aUSDC',
    name: 'Aave interest bearing USDC',
    icon: 'https://cloudflare-ipfs.com/ipfs/QmaznB5PRhMC696u8yZuzN6Uwrnp7Zmfa5CydVUMvLJc9i/aUSDC.svg',
    decimals: 6
  }
]

export const BAND_PROTOCOL_DATA = [
  'ETH',
  'MIR',
  'ANC',
  'DOGE',
  'LUNA',
  'UST',
  'DOT',
  'ADA',
  'BNB',
  'LINA',
  'LINK',
  'TRX',
  'UNI',
  'VET',
  'XLM',
  'XRP',
  'YFI',
  'CAKE',
  'XVS',
  'INDEX',
  'PERP',
  'DPI',
  'USDT',
  'BSV',
  'XMR',
  'USDC',
  'DASH',
  'ZEC',
  'ETC',
  'WAVES',
  'EWT',
  'NXM',
  'AMPL',
  'DAI',
  'TUSD',
  'BAND',
  'EGLD',
  'ANT',
  'NMR',
  'PAX',
  'LSK',
  'LRC',
  'HBAR',
  'BAL',
  'RUNE',
  'YFII',
  'DCR',
  'AUTO',
  'SC',
  'STX',
  'ENJ',
  'OCEAN',
  'RSR',
  'BTG',
  'BZRX',
  'SRM',
  'SNT',
  'SOL',
  'CKB',
  'BNT',
  'CRV',
  'MANA',
  'YFV',
  'KAVA',
  'MATIC',
  'TRB',
  'REP',
  'FTM',
  'TOMO',
  'ONE',
  'WNXM',
  'PAXG',
  'WAN',
  'SUSD',
  'RLC',
  'OXT',
  'RVN',
  'FNX',
  'WBTC',
  'DIA',
  'BTM',
  'IOTX',
  'FET',
  'JST',
  'MCO',
  'KMD',
  'BTS',
  'QKC',
  'YAMV2',
  'UOS',
  'AKRO',
  'HNT',
  'HOT',
  'KAI',
  'OGN',
  'WRX',
  'KDA',
  'ORN',
  'FOR',
  'AST',
  'STORJ',
  '2KEY',
  'ABYSS',
  'BLZ',
  'BTU',
  'CND',
  'CVC',
  'DGX',
  'ELF',
  'EQUAD',
  'EURS',
  'GDC',
  'GEN',
  'GHT',
  'GNO',
  'GVT',
  'IOST',
  'KEY',
  'LOOM',
  'MET',
  'MFG',
  'MLN',
  'MYB',
  'NPXS',
  'OST',
  'PAY',
  'PBTC',
  'PLR',
  'PLTC',
  'PNK',
  'PNT',
  'POLY',
  'POWR',
  'QNT',
  'RAE',
  'REQ',
  'RSV',
  'SAN',
  'STMX',
  'TKN',
  'TKX',
  'TRYB',
  'UBT',
  'UPP',
  'USDS',
  'VIDT',
  'ALPHA',
  'TWT',
  'CREAM',
  'XHV',
  'COVER',
  'FRAX',
  'KP3R',
  'HEGIC',
  'SFI',
  'STRK',
  'SCRT',
  'BCH',
  'LTC',
  'CRO',
  'EOS',
  'XTZ',
  'ATOM']

export const CarnivalRule = {
  en: `
<body>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>There are 3 games that users can participate in.<br /><br />

          <span class="text-danger">
          Game 1: Rewards Counter - More friends, more X, more Profit.
          </span>

              <ul>
                <li>The game will have 5 prizes, the more friends you invite, the more rewards you will receive according to each level. The 5 prizes will have different requirements with different ticket milestones and prizes to be received.</li>
              </ul>
      
      </div>
    </div>
<div class="row">
  <figure class="image-cover">
    <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
  </figure>
  <div>
    <p>In addition, when you have completed 1 of 5 prize, you will have the opportunity to participate in Top Ref Race with a total prize of up to $5,000
    <br />
    <br />See how to get the Ref code in the picture below<br /><br />

    Or read more about X point and how to get REF code <a  rel="_blank" href="https://coin98.net/x-point-la-gi">here</a>

    <br/>
<br/>

    <image class="image-background" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule2.png"></image>


  </div>
</div>

  </div>


  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Game 2: Lucky Wheel
          </span>
  
        <ul>
          <li>Users try their luck by conquering the Lucky Wheel with a variety of prizes from $50, $5, $2, $1, NFT and Crypto project
          logos.</li><br/>

             <br />
              
              <image class="image-background2" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule1.png"></image>


          <li>Each spin will cost 1 ticket, users can use 500X or 3 Ref to exchange tickets or invite friends and gain X in Game 1 to
          accumulate more tickets for more Spin turns.</li><br />

          <li><span class="text-danger">Note:</span> Users can completely send tickets or Crypto project logos to friends.</li>
  
        </ul>
  </p>
      </div>
    </div>
  
  </div>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
          Game 3: Get-go - Prize $50,000
          </span>
  
        <ul>
          <li>Collect project logos from Lucky Wheel game to have a collection of 1 of 3 logo sets.</li><br/>

          <li>In case a user collects a full set, he will be participating in a Sharepool prize pool of xxx token GuildFi or $20,000
          or $25,000.</li><br />
          <li>Game Get-go has no limit to the number of times you participate, the more times you participate, the higher the
          percentage of prizes will be divided.</li>

        </ul>

          <p>

          <span class="text-danger">Note:</span><br />
          
            <ul>
              <li>The prize will be converted to C98 by Coin98 and sent to the user's BEP20 wallet within 48 hours from the time the user
              presses the "Claim" button.</li><br />
            
              <li>The Share Pool prizes will be sent to the user's wallet within 7 days of the prize announcement.</li><br />
              <li>Users do not forget to update the reward wallet in the personal section, see the instructions right here.</li><br />
              <li>Coin98 has the right to edit information related to the contest without prior notice on the principle of ensuring
              fairness and transparency.</li><br />
            <li>See more at: <a rel="_blank" 
              href="https://coin98.net/coin98-rewards-carnival-event_tag">coin98.net/coin98-rewards-carnival-event</a></li>
            </ul>
          


</p>


  
  </p>
      </div>
    </div>
  
  </div>


</body>

`,
  vi: `
<body>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>Có 3 game mà người chơi có thể tham gia. <br /><br />

          <span class="text-danger">
          Game 1: Rewards Counter - Mời nhiều bạn, tích nhiều X, nhận nhiều quà.
          </span>

              <ul>
                <li>Game sẽ có 5 giải thưởng, người chơi càng mời được nhiều người tham gia sẽ càng có cơ hội nhận thưởng lớn theo từng giải thưởng. 5 giải thưởng sẽ có các yêu cầu khác nhau với các mốc ticket và giải thưởng được nhận khác nhau.</li>
              </ul>
      
      </div>
    </div>
<div class="row">
  <figure class="image-cover">
    <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
  </figure>
  <div>
    <p>Ngoài ra, khi bạn đã hoàn thành 1 giải thưởng bất kì, bạn sẽ có cơ hội tham gia Đua Top Ref với tổng giải thưởng lên đến $5,000
    <br />
    <br />Xem cách lấy mã Ref ở hình dưới<br /><br />

    Hoặc xem thêm về điểm X và cách lấy mã REF <a rel="_blank"  href="https://coin98.net/x-point-la-gi">tại đây</a>

    <br/>
<br/>

    <image class="image-background" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule2.png"></image>

  </div>
</div>

  </div>


  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Game 2: Lucky Wheel
          </span>
  
        <ul>
          <li>Người chơi thử vận may bằng cách chinh phục vòng quay may mắn với hàng loạt các giải thưởng nhận được đa dạng từ $50,
          5$, $2, $1, NFT và các logo dự án crypto.</li><br/>

          <li>Mỗi lượt quay sẽ tốn 1 vé, người chơi có thể dùng 500X hoặc 3 Ref để đổi vé hoặc tham gia mời bạn bè ở Game 1 để tích
          thêm vé cho nhiều lượt quay.</li><br />

          <li><span class="text-danger">Lưu ý:</span> Người chơi hoàn toàn có thể gửi tặng ticket hoặc các logo dự án quay được cho bạn bè.</li>
  
        </ul>
  </p>
      </div>
    </div>
  
  </div>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Game 3: Get-go - Giải thưởng $50,000
          </span>
  
        <ul>
          <li>Thu thập các logo của dự án từ game Lucky Wheel để sưu tập đủ 1 trong 3 bộ logo.</li><br/>

          <li>Trong trường hợp người chơi sưu tập đủ bộ, bạn sẽ được tham gia chia sẻ giải thưởng Sharepool xxx token GuildFi hoặc
          $20,000 hoặc $25,000.</li><br />
          <li>Game Get-go không giới hạn số lần tham gia, càng tham gia nhiều lần, tỉ lệ được chia giải thưởng càng cao.</li>

        </ul>

          <p>

          <span class="text-danger">Lưu ý:</span><br />
          
            <ul>
              <li>Giải thưởng sẽ được Coin98 quy đổi thành C98 và gửi đến ví BEP20 của người chơi trong vòng 48 giờ kể từ khi người người
              chơi nhấn nút “Claim”.</li><br />
            
              <li>Các giải Share Pool sẽ được gửi đến ví của người chơi trong vòng 7 ngày kể từ khi công bố giải.</li><br />
              <li>Người chơi đừng quên cập nhật ví nhận thưởng tại mục cá nhân, xem hướng dẫn ngay tại đây.</li><br />

                 <br />
              
              <image class="image-background2" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule1.png"></image>


              <li>Coin98 có quyền chỉnh sửa các thông tin liên quan đến cuộc thi mà không cần phải báo trước trên nguyên tắc đảm bảo tính
              công bằng và minh bạch.</li><br />
            <li>Xem thêm tại: <a rel="_blank" 
              href="https://coin98.net/coin98-rewards-carnival-event_tag">coin98.net/coin98-rewards-carnival-event</a></li>
            </ul>
          


</p>


  
  </p>
      </div>
    </div>
  
  </div>


</body>

</html>
`,
  ru: `
<body>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>Всего 3 игры, в которых могут участвовать пользователи.<br /><br />

          <span class="text-danger">
          Игра 1: Rewards Counter — больше друзей, больше X, больше прибыли.
          </span>

              <ul>
                <li>В игре будет 5 призов, чем больше друзей вы пригласите, тем больше наград вы получите в каждом призе. 5 призов будут иметь разные требования с разными билетами и призами, которые можно получить.</li>
              </ul>
      
      </div>
    </div>
<div class="row">
  <figure class="image-cover">
    <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
  </figure>
  <div>
    <p>Кроме того, когда вы получите 1 из 5 призов, у вас будет возможность принять участие в Top Ref Race с общим призовым фондом до $5,000.
    <br />
    <br />Как получить реф код смотрите на картинке ниже<br /><br />

    Или узнайте больше об X-points и о том, как получить реф код здесь <a rel="_blank"  href="https://coin98.net/x-point-la-gi"></a>

    <br/>
<br/>

    <image class="image-background" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule2.png"></image>

  </div>
</div>

  </div>


  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Игра 2: Колесо удачи - Lucky Wheel
          </span>
  
        <ul>
          <li>Пользователи попытают счастья, покорив колесо удачи с различными призами от  $50, $5, $2, $1, NFT и логотипы Крипто проектов.</li><br/>

          <li>За каждый круг колеса требуется 1 билет, пользователи могут использовать 500X или 3 Ref, чтобы обменять билеты или пригласить друзей и получить X в игре 1, чтобы накопить больше билетов для большего количества кружков.</li><br />

          <li><span class="text-danger">Lưu ý:</span> Примечание: пользователи могут  отправлять друзьям билеты или логотипы Крипто проектов.</li>
  
        </ul>
  </p>
      </div>
    </div>
  
  </div>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Игра 3: Get-go — Приз $50,000
          </span>
  
        <ul>
          <li>Соберите логотипы проектов из игры Lucky Wheel, чтобы собрать 1 из 3 наборов логотипов.</li><br/>

          <li>В случае, если пользователь соберет полный набор, он будет участвовать в призовом фонде Sharepool токена xxx GuildFi или  $20,000 или $25,000.</li><br />
          <li>Игра Get-go не имеет ограничений на количество раз вы участвуете, чем больше раз вы участвуете, тем выше будет разделен процент призов.</li>

        </ul>

          <p>

          <span class="text-danger">Примечание:</span><br />
          
            <ul>
              <li>Приз будет конвертирован в C98 с помощью Coin98 и отправлен на кошелек BEP20 пользователя в течение 48 часов с момента пользователь нажмет кнопки «Получить» (Claim).</li><br />
            
              <li>Призы Share Pool будут отправлены на кошелек пользователя в течение 7 дней с момента объявления приза.</li><br />
              <li>Пользователи не забудьте обновить кошелек вознаграждения в разделе аккаунта, смотрите инструкцию прямо здесь.</li><br />

                 <br />
              
              <image class="image-background2" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule1.png"></image>


              <li>Coin98 имеет право редактировать информацию, связанную с конкурсом, без предварительного объявления по принципу обеспечения справедливости и прозрачности.</li><br />
            <li>Узнайте больше на: <a rel="_blank" 
              href="https://coin98.net/coin98-rewards-carnival-event_tag">coin98.net/coin98-rewards-carnival-event</a></li>
            </ul>
          


</p>


  
  </p>
      </div>
    </div>
  
  </div>


</body>

</html>
`,
  pt: `
<body>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>Existem 3 jogos em que os usuários podem participar. <br /><br />

          <span class="text-danger">
          Jogo 1: Rewards Counter - Mais amigos, mais X, mais Prendas.
          </span>

              <ul>
                <li>O jogo terá 5 prêmios, quanto mais amigos você convidar, mais recompensas você receberá de acordo com cada prêmio. Os 5 prêmios terão requisitos diferentes com diferentes marcos de ingressos e prêmios a serem recebidos.</li>
              </ul>
      
      </div>
    </div>
<div class="row">
  <figure class="image-cover">
    <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
  </figure>
  <div>
    <p>Além disso, quando você completar qualquer prêmio, você terá a oportunidade de participar da Top Ref Race com um prêmio total de até $5.000
    <br />
    <br />Veja como obter o código Ref na imagem abaixo<br /><br />

    Ou leia mais sobre o ponto X e como obter o código REF <a rel="_blank"  href="https://coin98.net/x-point-la-gi">aqui</a>

    <br/>
<br/>

    <image class="image-background" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule2.png"></image>

  </div>
</div>

  </div>


  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Jogo 2: Roda da Sorte
          </span>
  
        <ul>
          <li>Os usuários tentam a sorte conquistando a Roda da Sorte com uma variedade de prêmios de logotipos de projetos de $50, $5, $2, $1, NFT e Crypto.</li><br/>

          <li>Cada giro custará 1 ticket, os usuários podem usar 500X ou 3 Ref para trocar tickets ou convidar amigos e ganhar X no Jogo 1 para acumular mais tickets para mais giros.</li><br />

          <li><span class="text-danger">Nota: </span> os usuários podem enviar tíquetes ou logotipos do projeto Crypto para amigos.</li>
  
        </ul>
  </p>
      </div>
    </div>
  
  </div>

  <div class="container">
    <div class="row">
      <figure class="image-cover">
        <image class="icon-image" src="https://coin98.s3.amazonaws.com/0lrFDYS1EgFPwbCU"></image>
      </figure>
      <div>
        <p>
          <span class="text-danger">
            Jogo 3: Get-go - Prêmio $50.000
          </span>
  
        <ul>
          <li>Colete logotipos de projetos do jogo Roda da Sorte para ter uma coleção de 1 de 3 conjuntos de logotipos.</li><br/>

          <li>Caso um usuário colete um conjunto completo, ele estará participando de um prêmio Sharepool de xxx token GuildFi ou $20.000 ou $25.000.</li><br />
          <li>O Game Get-go não tem limite para o número de vezes que você participa, quanto mais vezes você participar, maior será o percentual de prêmios que será dividido.</li>

        </ul>

          <p>

          <span class="text-danger">Nota:</span><br />
          
            <ul>
              <li>O prêmio será convertido para C98 pela Coin98 e enviado para a carteira BEP20 do usuário dentro de 48 horas a partir do momento em que o usuário pressionar o botão "Reivindicar".</li><br />
            
              <li>Os prêmios do Share Pool serão enviados para a carteira do usuário dentro de 7 dias após o anúncio do prêmio.</li><br />
              <li>Os usuários não se esqueçam de atualizar a carteira de recompensas na seção pessoal, veja as instruções aqui.</li><br />

                 <br />
              
              <image class="image-background2" src="https://coin98.s3.ap-southeast-1.amazonaws.com/Carnival/carnivalRule1.png"></image>


              <li>A Coin98 tem o direito de editar informações relacionadas ao concurso sem aviso prévio, com o princípio de garantir justiça e transparência.</li><br />
            <li>Veja mais em: <a rel="_blank" 
              href="https://coin98.net/coin98-rewards-carnival-event_tag">coin98.net/coin98-rewards-carnival-event</a></li>
            </ul>
          


</p>


  
  </p>
      </div>
    </div>
  
  </div>


</body>

</html>
`
}
