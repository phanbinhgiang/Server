export default [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'baseURI',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
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
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'time',
        type: 'uint256'
      }
    ],
    name: '_claim',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string'
      }
    ],
    name: '_renaming',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isCustomID',
        type: 'bool'
      }
    ],
    name: '_stake',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'time',
        type: 'uint256'
      }
    ],
    name: '_unstake',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'MetaInfos',
    outputs: [
      {
        internalType: 'uint256',
        name: 'total_staked',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'max_staked',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'naming_fee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'id_fee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'locked_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'pending_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'floating_rate',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'name_prefix',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'nft_prefix',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    name: 'PackageInfos',
    outputs: [
      {
        internalType: 'address',
        name: 'meta',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'min',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rate',
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
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
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
    inputs: [],
    name: 'baseTokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'claimPending',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_package',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '_min',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_max',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rate',
        type: 'uint256'
      }
    ],
    name: 'configurePackage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'getApproved',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'getStakedInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'pending_flag',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'flag',
            type: 'bool'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'packageID',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isCustomID',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'meta',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'package_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pending_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'unstaked_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'claim_pending_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'earn_staked',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'est_staked',
            type: 'uint256'
          }
        ],
        internalType: 'struct Coin98Stake.StakeInfo',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
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
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'ownerOf',
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
        internalType: 'string',
        name: '_package',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_meta',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_min',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_max',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rate',
        type: 'uint256'
      }
    ],
    name: 'register',
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
      },
      {
        internalType: 'uint256',
        name: '_max_staked',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_naming_fee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_id_fee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_locked_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_pending_time',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_floating_rate',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_name_prefix',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_nft_prefix',
        type: 'string'
      }
    ],
    name: 'registerMeta',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string'
      }
    ],
    name: 'renaming',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'baseURI',
        type: 'string'
      }
    ],
    name: 'setBaseURI',
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
        internalType: 'string',
        name: '_name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_package',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: '_customID',
        type: 'uint256'
      }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
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
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'tokenByIndex',
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
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'tokenOfOwnerByIndex',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
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
    inputs: [],
    name: 'totalToken',
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
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
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
        internalType: 'string',
        name: '_package',
        type: 'string'
      }
    ],
    name: 'unRegister',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'walletOfOwner',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'pending_flag',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'flag',
            type: 'bool'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'packageID',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isCustomID',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'meta',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'package_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pending_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'unstaked_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'claim_pending_time',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'earn_staked',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'est_staked',
            type: 'uint256'
          }
        ],
        internalType: 'struct Coin98Stake.StakeInfo[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
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
        internalType: 'contract IBEP20',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
