export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
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
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'ClaimGift',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      }
    ],
    name: 'CreateGift',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
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
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isActive',
        type: 'bool'
      }
    ],
    name: 'SetGiftStatus',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
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
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32[]',
        name: 'proofs',
        type: 'bytes32[]'
      },
      {
        internalType: 'bytes',
        name: 'authoritySignature',
        type: 'bytes'
      }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'vault',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'ftGiftToken',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'authority',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'totalNode',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'claimStartTimestamp',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'claimEndTimestamp',
        type: 'uint256'
      }
    ],
    name: 'createGift',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      }
    ],
    name: 'getGiftInfo',
    outputs: [{
      components: [
        {
          internalType: 'bool',
          name: 'isActive',
          type: 'bool'
        },
        {
          internalType: 'bytes32',
          name: 'merkleRoot',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'vault',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'ftGiftToken',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'authority',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'totalNode',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalNodeClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalClaimed',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'claimStartTimestamp',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'claimEndTimestamp',
          type: 'uint256'
        }
      ],
      internalType: 'struct Coin98GiftManager.GiftInfo',
      name: '',
      type: 'tuple'
    }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]'
      }
    ],
    name: 'multicall',
    outputs: [],
    stateMutability: 'payable',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'giftKey',
        type: 'bytes32'
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool'
      }
    ],
    name: 'setGiftStatus',
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
    stateMutability: 'pure',
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
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isNft',
        type: 'bool'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
