import { chainType } from '../../worker/constants'

export const providerWeb3 = {
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  ether: 'https://nd-882-009-235.p2pify.com/f2cfb8777ba44e372c9ab251b51980d8',
  binanceSmart: 'https://bsc-mainnet.nodereal.io/v1/68ac333c4bc646df8ef23fe996dd6d83',
  heco: 'https://http-mainnet.hecochain.com',
  okex: 'https://exchainrpc.okex.org',
  gate: 'https://evm.gatenode.cc',
  kucoin: 'https://rpc-mainnet.kcc.network',
  avax: 'https://rpc.ankr.com/avalanche',
  matic: 'https://nd-302-286-039.p2pify.com/2d8e16206109f7b5256e1d7d58345a90',
  fantom: 'https://rpc.ftm.tools',
  xDai: 'https://rpc.xdaichain.com',
  tomo: 'https://rpc.tomochain.com',
  kardia: 'https://kai-seeds.kardiachain.io/',
  ronin: 'https://api.roninchain.com/rpc',
  celo: 'https://forno.celo.org',
  klaytn: 'https://kaikas.cypress.klaytn.net:8651',
  harmony: 'https://api.harmony.one',
  optimism: 'https://mainnet.optimism.io',
  boba: 'https://mainnet.boba.network',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  arbitrumXdai: 'https://arbitrum.xdaichain.com'
}

export const blockTimechain = {
  [chainType.matic]: 6,
  [chainType.binanceSmart]: 3,
  [chainType.avax]: 2,
  [chainType.ether]: 12
}
