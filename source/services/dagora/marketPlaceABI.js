export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymentAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_DAgoraRoyaltyFee',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'AddAdmin',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_buyer',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_buyTokenAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_buyTokenAmount',
        type: 'uint256'
      }
    ],
    name: 'Buy',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      }
    ],
    name: 'Cancel',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_tokenId',
        type: 'uint256[]'
      }
    ],
    name: 'CancelListingNFT',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_paymentAddress',
        type: 'address'
      }
    ],
    name: 'ChangePaymentToken',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_profileFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_message',
        type: 'bytes32'
      }
    ],
    name: 'ConfigureFixedVariable',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'DAgoraPayment',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_buyer',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'EndBid',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_nfts',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_saleByToken',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_endPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'ListingNFT',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_time',
        type: 'uint256'
      }
    ],
    name: 'Pay',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_marketFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_claimFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_totalRoyaltyFee',
        type: 'uint256'
      }
    ],
    name: 'RegisterPackage',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'RemoveAdmin',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_buyer',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_buyTokenAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_buyTokenAmount',
        type: 'uint256'
      }
    ],
    name: 'Sell',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_DAgoraRoyaltyFee',
        type: 'address'
      }
    ],
    name: 'SetDAgoraRoyatyFeeNFT',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'UnRegisterPackage',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_nftHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_endPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'UpdateListingInfor',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_collection',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: '_fee',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'UpdateRoyaltyFee',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DAgoraRoyaltyFee',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'addAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address[]',
            name: 'metaAddress',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'metaUint',
            type: 'uint256[]'
          },
          {
            internalType: 'address[]',
            name: 'saleByTokenAddresses',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'saleByAmounts',
            type: 'uint256[]'
          },
          {
            internalType: 'uint16',
            name: 'buyByTokenIndex',
            type: 'uint16'
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes'
          }
        ],
        internalType: 'struct DAgoraMarketplace.BulkBuyParam[]',
        name: '_params',
        type: 'tuple[]'
      }
    ],
    name: 'bulkbuy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '_saleByTokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_saleByAmounts',
        type: 'uint256[]'
      },
      {
        internalType: 'uint16',
        name: '_buyByTokenIndex',
        type: 'uint16'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '_buySaleByTokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_buySaleByAmounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      }
    ],
    name: 'cancelListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymentAddress',
        type: 'address'
      }
    ],
    name: 'changePaymentToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_profileFee',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: '_message',
        type: 'bytes32'
      }
    ],
    name: 'configureFixedVariable',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_buyer',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256'
      }
    ],
    name: 'endBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_nftHash',
        type: 'bytes32'
      }
    ],
    name: 'getListingInfo',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'getPackageInfo',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address'
      }
    ],
    name: 'getRoyaltyFeeConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_saleByToken',
        type: 'address'
      },
      {
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_startPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_endPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'listing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'message',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paymentAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'profileFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_marketFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_claimFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalRoyaltyFee',
        type: 'uint256'
      }
    ],
    name: 'registerPackage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address'
      }
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_metaAddress',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_metaUint',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '_buyByTokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_buyByAmounts',
        type: 'uint256[]'
      },
      {
        internalType: 'uint16',
        name: '_saleByTokenIndex',
        type: 'uint16'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'sell',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: '_fee',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'setRoyaltyFeeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_collection',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_byteCodeHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: '_isCreate2',
        type: 'bool'
      },
      {
        internalType: 'uint32',
        name: '_fee',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'setRoyaltyFeeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'unRegisterPackage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_nftHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_startPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_endPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'updateListingInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      }
    ],
    name: 'withdrawNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
