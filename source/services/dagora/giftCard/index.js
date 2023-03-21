import { lowerCase } from '../../../worker/function'
import EVMServices from '../../evm'
import GiftCardABI from '../ABI/GifCardFactory'
import GiftABI from '../ABI/GiftClaim'

// import { dagoraCardAddress } from '../constants'
import { MerkleTreeServices, WhiteList } from '../MerkleTreeServices'
const InputDataDecoder = require('ethereum-input-data-decoder')
// const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export default class DagoraGiftServices {
  static async getPackageKeyFromHash (input) {
    try {
      const decoder = new InputDataDecoder(GiftCardABI)
      const result = decoder.decodeData(input)
      return result.inputs[0].map(it => '0x' + lowerCase(it.toString('hex')))
    } catch (error) {
      console.log('🚀 ~ file: index.js:22 ~ DagoraGiftServices ~ getPackageKeyFromHash ~ error', error)
      return false
    }
  }

  static createTree (wallets, nfts, ids) {
    const arrHash = DagoraGiftServices.genHashMerkletree(wallets, nfts, ids)
    const tree = new WhiteList(arrHash)

    const root = '0x' + tree._root.hash.toString('hex')

    const proofs = wallets.map((item, index) => MerkleTreeServices.printProof(tree, index))

    return {
      root,
      proofs
    }
  }

  static genHashMerkletree (wallets, tokens, ids) {
    const hashes = wallets.map((wallet, idx) => {
      const nft = tokens[idx]
      const nftId = ids[idx]

      if (!nft) return

      const objHash = [
        { type: 'uint256', value: idx }, // wallet indx
        {
          type: 'address',
          // value: isRandom ? ADDRESS_ZERO : get(nft, 'address') // token Address || nft Contract
          value: nft
        },
        { type: 'address', value: wallet }, // receive address
        { type: 'uint256', value: 1 }, // token amount if nft amount :1
        {
          type: 'uint256',
          // value: isRandom ? 0 : get(nft, 'id') || get(nft, 'idNft') // nft id if token value :0
          value: nftId
        }
      ]

      return MerkleTreeServices.computeHashParams(objHash)
    })

    return hashes
  }

  static async getGiftKeyFromHash (hash, chain) {
    const web3 = EVMServices.genWeb3(chain)

    const txData = await web3.eth.getTransaction(hash)

    const decoder = new InputDataDecoder(GiftABI)
    const result = decoder.decodeData(txData.input)
    if (result.method !== 'claim') {
      return false
    }

    return '0x' + result.inputs[0].toString('hex')
  }
}
