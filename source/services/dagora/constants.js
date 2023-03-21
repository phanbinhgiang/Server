import { chainType } from '../../worker/constants'
export const dagoraElasticIndex = process.env.IS_TEST ? {
  activity: 'dagora_activity_test',
  market: 'dagora_market_test',
  bundleActivity: 'dagora_bundle_activity_test',
  bundleMarket: 'dagora_bundle_market_test',
  auction: 'dagora_auction_test',
  nfts: 'dagora_nfts_test',
  balance: 'dagora_balance_test'
} : {
  activity: 'dagora_activity',
  market: 'dagora_market',
  bundleActivity: 'dagora_bundle_activity',
  bundleMarket: 'dagora_bundle_market',
  auction: 'dagora_auction',
  nfts: 'dagora_nfts',
  balance: 'dagora_balance',
  balanceV2: 'dagora_balance_v2'
}
export const dagoraFilterType = {
  bundle: [dagoraElasticIndex.bundleMarket],
  single: [dagoraElasticIndex.market, dagoraElasticIndex.auction]
}

export const dagoraCollectionStatus = {
  pending: 'pending',
  approve: 'approve',
  reject: 'reject'
}
// Market Address
export const dagoraContractAddress = {
  [chainType.binanceSmart]: process.env.DAGORA_MARKETPLACE_ADDRESS || '0x78D8BdA493c1BF9A6d2d309a1224b0c434618710',
  [chainType.matic]: process.env.DAGORA_MARKETPLACE_ADDRESS_137 || '0xd14f818E7c16891993C57B189646C5059Bf0533B',
  [chainType.ether]: '0x1d814289A64103094fE09f32fe00ACd70D100F3A',
  [chainType.avax]: '0x77f56cf9365955486B12C4816992388eE8606f0E',
  [chainType.solana]: '0x1d814289A64103094fE09f32fe00ACd70D100F3A',
  'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161': '0xd14f818E7c16891993C57B189646C5059Bf0533B',
  5: '0xd14f818E7c16891993C57B189646C5059Bf0533B',
  [chainType.optimism]: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
  'ibiza-808': '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC'
}

export const DagoraLaunchpadType = {
  TRANSFERABLE: 'TRANSFERABLE',
  MINTABLE: 'MINTABLE'
}

export const dagoraLaunchpadVersion = {
  v1: 'v1',
  v2: 'v2'
}

// Launchpad
export const dagoraLaunchpadFactoryAddress = {
  v1: {
    mintable: '',
    transferable: ''
  },
  v2: {
    mintable: '',
    transferable: ''
  }
}
// NFTMINT
export const c98NFTMintCollectionAddress = {
  [chainType.binanceSmart]: '0xc4cAd0938256ABA4417c565044Be2c2EB77096cb',
  [chainType.matic]: '0x9aE5c1cf82aF51CBB83D9A7B1C52aF4B48E0Bb5E'
}

// Collection Register contract
export const dagoraCollectionAddress = {
  [chainType.binanceSmart]: process.env.DAGORA_MARKETPLACE_COLLECTION_ADDRESS || '0x7B11a60E3Fbe021dD3faa48B49598B7Ff0C667A4',
  [chainType.matic]: process.env.DAGORA_MARKETPLACE_COLLECTION_ADDRESS_137 || '0xA0357dfa2EA744d31373E3E0Dc7D77d3f735dE81'
}

// register nft token
export const dagoraNFTCollection = {
  [chainType.binanceSmart]: process.env.DAGORA_MARKETPLACE_COLLECTION_ADDRESS_NFT || '0xb88597A177Aa6aA65D16c07610035a3B468aB52C',
  [chainType.matic]: process.env.DAGORA_MARKETPLACE_COLLECTION_ADDRESS_NFT_137 || '0x14a90545a64a5176aa678cacdf4d4f16d6ffbd68'
}

// gift card mint
export const dagoraCardAddress = {
  [chainType.matic]: '0xEdD785b5e5430f0ff81d979c92A25FEe0b0aE760'
}

export const dagoraUniverseCollectionAddress = '0x0c7E65DB46869272980b8937c4A7235694e74782'

// DAC
export const dagoraVerifiedAccountAddress = '0x6F7E557fbD2b85151739E30318D46742a3E3a0Ff'

// DM
export const dagoraMinterCollectionAddress = {
  [chainType.binanceSmart]: process.env.DAGORA_COLLECTION_MINT_ADDRESS || '0x366660dCa241AFeE67c1f3da9Cb93aa465641956',
  [chainType.matic]: process.env.DAGORA_COLLECTION_MINT_ADDRESS_137 || '0xC285B7E09A4584D027E5BC36571785B515898246'
}

export const chainSupported = {
  // 1: chainType.ether,
  56: chainType.binanceSmart,
  137: chainType.matic
  // 43114: chainType.avax,
  // 10: chainType.optimism
}

export const chainIdSupported = {
  // '0x1': chainType.ether,
  [chainType.binanceSmart]: '56',
  [chainType.matic]: '137'
  // [chainType.avax]: '43114',
  // [chainType.optimism]: '10'
}

export const dagoraType = '_doc'

export const AUCTION_TYPE = {
  listingNFT: 'listingNFT',
  cancelListingNFT: 'cancelListingNFT',
  endBid: 'endBid',
  bid: 'bid'
}

export const LAUNCHPAD_STATUS = {
  live: 'live',
  upComing: 'upComing'
}

export const dagoraSourceKey = 'C98DAGDBMQ9'

export const launchpadFilter = { _id: 0, proofs: 0, whitelistRoot: 0 }

export const launchpadFeeType = {
  fee: 'fee',
  free: 'free'
}

export const nftDetailActivityType = {
  buy: 'purchase',
  sell: 'acceptOffer',
  cancel: 'cancel',
  listingNFT: 'startBid',
  endBid: 'endBid',
  listing: 'listing'
}
export const dagoraFavoriteType = {
  dagoraNFT: 'dagoraNFT',
  dagoraGenre: 'dagoraGenre',
  dagoraCollection: 'dagoraCollection',
  dagoraLaunchpad: 'dagoraLaunchpad',
  dagoraUser: 'dagoraUser',
  dagoraBundle: 'dagoraBundle'
}

export const dagoraAuctionActiontype = {
  createAuction: 'createAuction',
  placeABid: 'placeABid',
  cancelAuction: 'cancelAuction',
  withdrawItem: 'withdrawItem'
}

export const dagoraSolanaActionName = {
  cancelSignature: 'cancel',
  executeSell: 'sell',
  executeBuy: 'buy'
}

export const sortTypeMongo = {
  '-time': { createdAt: -1 },
  time: { createdAt: 1 },
  name: { title: 1 },
  '-name': { title: -1 }
}

export const dagoraInteractionType = {
  nftView: 'nftView',
  nftShare: 'nftShare',
  collectionView: 'collectionView',
  collectionShare: 'collectionShare',
  launchpadView: 'launchpadView',
  launchpadShare: 'launchpadShare',
  userView: 'userView',
  userShare: 'userShare',
  bundleView: 'bundleView',
  bundleShare: 'bundleShare'
}

export const exploreConfig = {
  chain: 'chain',
  token: 'tokens',
  price: 'price',
  genre: 'genre',
  collection: 'collection'
}

export const dagoraCollectionImageSize = {
  logo: {
    width: 120,
    height: 120
  },
  image: {
    width: 1200,
    height: 400
  },
  exploreImage: {
    width: 500,
    height: 300
  }
}

export const offerStatus = {
  acceptOffer: 'acceptOffer',
  cancelOffer: 'cancelOffer',
  rejectOffer: 'rejectOffer'
}

export const bidOfferType = {
  bid: 'bid',
  offer: 'offer'
}

export const exploreType = {
  nfts: 'Nfts',
  collections: 'Collections'
}

export const profileType = {
  onSale: 'Listing',
  collections: 'Collection',
  bundle: 'Bundle',
  auctions: 'Auction',
  favorited: 'Favorited',
  activity: 'Activity'
}

export const collectionType = {
  onSale: 'Listing',
  bundle: 'Bundle',
  auctions: 'Auction',
  activity: 'Activity',
  item: 'Item'
}

export const dagoraMetaActivityType = {
  listing: 'listing',
  sold: 'sold',
  purchase: 'purchase',
  transfer: 'transfer'
}

export const dagoraHistoryType = {
  buy: 'buy',
  listing: 'listing',
  sell: 'sell',
  cancel: 'cancel',
  endBid: 'endBid',
  listingNFT: 'listingNFT',
  withDraw: 'withDraw'
}
export const dagoraLaunchpadHistoryType = {
  register: 'register',
  redeem: 'redeem',
  claim: 'claim'
}

export const dagoraMarketType = {
  buy: 'buy',
  cancel: 'cancel',
  offer: 'offer'
}

export const dagoraAuctionType = {
  listing: 'listing',
  cancelListing: 'cancelListing',
  endBid: 'endBid'
}

export const dagoraRecordType = {
  transfer: 'transfer',
  mintNFT: 'mintNFT'
}

export const lookupUser = {
  from: 'useronchains',
  let: { from: '$from' },
  pipeline: [
    { $match: { $expr: { $eq: ['$id', '$$from'] } } },
    { $limit: 1 },
    { $project: { _id: 0, id: 1, name: 1, userName: 1, image: 1, background: 1 } }
  ],
  as: 'userInfo'
}

export const lookupUserOwner = {
  from: 'useronchains',
  let: { from: '$owner' },
  pipeline: [
    { $match: { $expr: { $eq: ['$id', '$$from'] } } },
    { $limit: 1 },
    { $project: { _id: 0, id: 1, name: 1, userName: 1, image: 1, background: 1 } }
  ],
  as: 'ownerInfo'
}

export const dagoraValidToken = {
  [chainType.matic]: [
    {
      address: '0x0000000000000000000000000000000000000000',
      id: 'matic-network'
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      id: 'usd-coin'
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      id: 'tether'
    }
  ],
  [chainType.binanceSmart]: [
    {
      address: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
      id: 'coin98'
    },
    {
      address: '0x0000000000000000000000000000000000000000',
      id: 'binancecoin'
    },
    {
      address: '0xFa4BA88Cf97e282c505BEa095297786c16070129',
      id: 'coin98-dollar'
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      id: 'usd-coin'
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      id: 'tether'
    },
    {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      id: 'binance-usd'
    }
  ],
  [chainType.avax]: [
    // {
    //   address: '0x0000000000000000000000000000000000000000',
    //   id: 'avalanche-2'
    // },
    {
      address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
      id: 'usd-coin'
    },
    {
      address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
      id: 'tether'
    }
  ],
  [chainType.solana]: [
    {
      address: 'E8ydQKFSFvFypHduQbTjA1oxtDsxGKTtRFczZDoJwkYx',
      id: 'usd-coin'
    },
    {
      address: 'TknDPjS2ePx3BxTRDKtAhu5ZiJqBJrHdcJd53S2R6gC',
      id: 'tether'
    }
    // {
    //   address: 'CUSDvqAQLbt7fRofcmV2EXfPA2t36kzj7FjzdmqDiNQL',
    //   id: 'coin98-dollar'
    // }
  ]
  // [chainType.ether]: [
  //   {
  //     address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  //     id: 'usd-coin'
  //   },
  //   {
  //     address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  //     id: 'tether'
  //   }
  // ],
  // [chainType.solana]: [
  //   {
  //     address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  //     id: 'usd-coin'
  //   },
  //   {
  //     address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  //     id: 'tether'
  //   }
  // ]
}

export const nftEventstatus = {
  sold: 'sold',
  delisted: 'delisted'
}

export const keyChainNFT = {
  ether: 'eth',
  binanceSmart: 'bsc',
  // [chainType.heco]: 'heco',
  // [chainType.okex]: 'okex',
  // [chainType.gate]: 'gate',
  // [chainType.kucoin]: 'kcs',
  avax: 'avax',
  matic: 'matic'
  // [chainType.fantom]: 'ftm',
  // [chainType.xDai]: 'xdai',
  // [chainType.tomo]: 'tomo',
  // [chainType.celo]: 'celo',
  // [chainType.klaytn]: 'klaytn',
  // [chainType.arbitrumXdai]: 'aox',
  // [chainType.harmony]: 'one'
}
export const dagoraElasticIndexMapping = {
  dagora_activity: {
    mappings: {
      properties: {
        address: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        chain: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        collectionKey: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        contractName: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        duration: {
          type: 'long'
        },
        expireAt: {
          type: 'long'
        },
        from: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        image: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        nonce: {
          type: 'long'
        },
        price: {
          type: 'float'
        },
        signMessage: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        signature: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        time: {
          type: 'long'
        },
        tokenId: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        tokens: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            amount: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }

  },
  dagora_market: {
    mappings: {
      properties: {
        address: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        chain: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        collectionKey: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        contractName: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        duration: {
          type: 'long'
        },
        expireAt: {
          type: 'long'
        },
        from: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        image: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        nonce: {
          type: 'long'
        },
        price: {
          type: 'float'
        },
        signMessage: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        signature: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        time: {
          type: 'long'
        },
        tokenId: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        tokens: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            amount: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }

  },
  dagora_auction: {
    mappings: {
      properties: {
        address: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        auctionAddress: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        auctionPath: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        block: {
          type: 'long'
        },
        bundleAddress: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        bundlePath: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        chain: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        collectionKey: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        contractName: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        duration: {
          type: 'long'
        },
        endPrice: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        expireAt: {
          type: 'long'
        },
        from: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        hash: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        image: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        isEndBid: {
          type: 'boolean'
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        price: {
          type: 'float'
        },
        startPrice: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        time: {
          type: 'long'
        },
        tokenAddress: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        tokenId: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        type: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        }
      }
    }
  },
  dagora_bundle_activity: {
    mappings: {
      properties: {
        bundleAddress: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        chain: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        duration: {
          type: 'long'
        },
        expireAt: {
          type: 'long'
        },
        from: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        hash: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        nfts: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            attributes: {
              properties: {
                trait_type: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256
                    }
                  }
                },
                value: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256
                    }
                  }
                }
              }
            },
            chain: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            collectionKey: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            contractName: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            description: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            id: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            image: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            name: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            uri: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        },
        nonce: {
          type: 'long'
        },
        signMessage: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        signature: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        time: {
          type: 'long'
        },
        tokens: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            amount: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }
  },
  dagora_bundle_market: {
    mappings: {
      properties: {
        bundleAddress: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        chain: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        duration: {
          type: 'long'
        },
        expireAt: {
          type: 'long'
        },
        from: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        hash: {
          type: 'text'
        },
        id: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        nfts: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            attributes: {
              properties: {
                trait_type: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256
                    }
                  }
                },
                value: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256
                    }
                  }
                }
              }
            },
            chain: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            collectionKey: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            contractName: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            description: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            id: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            image: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            name: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            uri: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        },
        nonce: {
          type: 'long'
        },
        price: {
          type: 'float'
        },
        signMessage: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        signature: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        },
        time: {
          type: 'long'
        },
        tokens: {
          properties: {
            address: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            },
            amount: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256
                }
              }
            }
          }
        },
        tokenId: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256
            }
          }
        }
      }
    }
  }
}
