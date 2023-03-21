import { PublicKey } from '@solana/web3.js'
import { chainType } from '../../worker/constants'
import { WhiteList, WhiteListSolana } from './MerkleTreeServices'

export default class LaunchpadServices {
  static generateMarkleTreeLocal (arrAddress, chain) {
    if (chain !== chainType.solana) {
      const merkleTree = WhiteList.createTree(arrAddress)
      return {
        root: '0x' + merkleTree._root.hash.toString('hex'),
        proofs: arrAddress.map((im, idx) => WhiteList.getProofs(idx, merkleTree)).map(it => (it.map(data => '0x' + data.hash.toString('hex'))))
      }
    } else {
      const solanaTree = new WhiteListSolana(arrAddress.map(it => new PublicKey(it)))
      const merkleTree = solanaTree.redemptionTree
      return {
        root: '0x' + merkleTree._root.hash.toString('hex'),
        proofs: arrAddress.map((im, idx) => solanaTree.getProof(idx)).map(it => (it.map(data => '0x' + data.hash.toString('hex'))))
      }
    }
  }
}
