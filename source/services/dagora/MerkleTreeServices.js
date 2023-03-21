/* eslint-disable no-undef */
import Web3 from 'web3'
import * as borsh from '@project-serum/borsh'
import { HashServices } from '../hashServices'

const LEVEL_ARRAY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
const SIZE_ARRAY = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768]
const WHITELIST_LAYOUT = borsh.struct([
  borsh.u32('index'),
  borsh.publicKey('address')
])

const MerkleTreeSolanaContruction = {
  index: 'number',
  address: 'PublicKey'
}

class WhiteList {
  constructor (hashes) {
    // detect tree height
    for (var i = 0; i < SIZE_ARRAY.length; i++) {
      if (SIZE_ARRAY[i] >= hashes.length) {
        this._height = i + 1
        break
      }
    }
    while (hashes.length < SIZE_ARRAY[this._height - 1]) {
      hashes.push(Buffer.from(new Array(32)))
    }
    var leafNodes = hashes.map(function (hash, i) {
      return {
        row: LEVEL_ARRAY[0],
        index: i,
        hash: hash
      }
    })
    this._nodes = [leafNodes]
    for (var i = 1; i < this._height; i++) {
      var subNodes = this._nodes[i - 1]
      var newNodes = []
      for (var j = 0; j < subNodes.length; j += 2) {
        var hash0 = subNodes[j].hash.toString('hex')
        var hash1 = subNodes[j + 1].hash.toString('hex')
        var web3 = new Web3()
        var tempHash = hash0 <= hash1 ? web3.utils.soliditySha3('0x' + hash0, '0x' + hash1) : web3.utils.soliditySha3('0x' + hash1, '0x' + hash0)
        var newHash = Buffer.from(tempHash.substring(2), 'hex')
        newNodes.push({
          row: LEVEL_ARRAY[i],
          index: j / 2,
          hash: newHash
        })
      }
      this._nodes.push(newNodes)
    }
    this._root = this._nodes[this._height - 1][0]
  }

  static createTree (addressArr) {
    const hashArr = addressArr.map((address, idx) => {
      return this.computeHash({
        index: idx,
        address
      })
    })
    return new WhiteList(hashArr)
  }

  static computeHash (wallet) {
    const web3 = new Web3()
    const hash = web3.utils.soliditySha3(
      { type: 'uint256', value: wallet.index },
      { type: 'address', value: wallet.address }
    )
    return Buffer.from(hash.substring(2), 'hex')
  }

  static getProofs (index, tree) {
    const nodes = tree._nodes
    const proofs = []
    let currentIndex = index
    for (let i = 0; i < nodes.length - 1; i++) {
      const proof = currentIndex % 2 === 0
        ? nodes[i][currentIndex + 1]
        : nodes[i][currentIndex - 1]
      currentIndex = (currentIndex - (currentIndex % 2)) / 2
      proofs.push(proof)
    }
    return proofs
  }
}

class WhiteListSolana {
  root () {
    return this.redemptionTree.root()
  }

  nodes () {
    return this.redemptionTree.nodes()
  }

  static getProof (index) {
    const nodes = this.nodes()
    const proofs = []
    let currentIndex = index
    for (let i = 0; i < nodes.length - 1; i++) {
      const proof = currentIndex % 2 === 0
        ? nodes[i][currentIndex + 1]
        : nodes[i][currentIndex - 1]
      currentIndex = (currentIndex - (currentIndex % 2)) / 2
      proofs.push(proof)
    }

    return proofs
  }

  constructor (wallets) {
    const hashes = wallets.map((wallet, idx) => {
      const newItem = {
        index: idx + 1,
        address: wallet
      }
      const buffer = Buffer.alloc(1000)
      const span = WHITELIST_LAYOUT.encode(newItem, buffer)
      const serialize = buffer.slice(0, span)
      return HashServices.keckka256(serialize)
    })
    this.redemptionTree = new MerkleTreeSolana(hashes)
    this.getProof = WhiteListSolana.getProof
  }
}

class MerkleTreeSolana {
  constructor (hashes) {
    // detect tree height
    for (let i = 0; i < SIZE_ARRAY.length; i++) {
      if (SIZE_ARRAY[i] >= hashes.length) {
        this._height = i + 1
        break
      }
    }

    while (hashes.length < SIZE_ARRAY[this._height - 1]) {
      hashes.push(Buffer.from(new Array(32)))
    }

    const leafNodes = hashes.map((hash, i) => {
      return {
        row: LEVEL_ARRAY[0],
        index: i,
        hash: hash
      }
    })

    this._nodes = [leafNodes]
    for (let i = 1; i < this._height; i++) {
      const subNodes = this._nodes[i - 1]
      const newNodes = []
      for (let j = 0; j < subNodes.length; j += 2) {
        const hash0 = subNodes[j].hash
        const hash1 = subNodes[j + 1].hash
        const newHash =
          hash0 <= hash1
            ? HashServices.keckka256(Buffer.concat([hash0, hash1]))
            : HashServices.keckka256(Buffer.concat([hash1, hash0]))
        newNodes.push({
          row: LEVEL_ARRAY[i],
          index: j / 2,
          hash: newHash
        })
      }
      this._nodes.push(newNodes)
    }

    this._root = this._nodes[this._height - 1][0]
  }

  height () {
    return this._height
  }

  nodes () {
    return this._nodes
  }

  root () {
    return this._root
  }
}

class MerkleTreeServices {
  static computeHashParams (params) {
    const web3 = new Web3()
    const hash = web3.utils.soliditySha3(...params)
    return Buffer.from(hash.substring(2), 'hex')
  }

  static printProof (tree, index) {
    const nodes = tree._nodes
    const proofs = []
    let currentIndex = index
    for (let i = 0; i < nodes.length - 1; i++) {
      const proof = currentIndex % 2 === 0
        ? nodes[i][currentIndex + 1]
        : nodes[i][currentIndex - 1]
      currentIndex = (currentIndex - (currentIndex % 2)) / 2
      proofs.push(proof)
    }
    return proofs.map(it => '0x' + it.hash.toString('hex'))
  }
}

export {
  WhiteList,
  WhiteListSolana,
  MerkleTreeServices
}
