import { OpenSeaPort, Network } from 'opensea-js'
import axieABI from './axieABI'
import Web3 from 'web3'
import { CacheNFT } from '../model'
import { ntfTokenType } from '../common/constants'

import { client } from './AxieClient'
import { queriesAxies } from './queriesAxies'
import get from 'lodash/get'

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})

const axieContractAddress = '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d'
const web3Ether = new Web3('https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570')
const axieContract = new web3Ether.eth.Contract(axieABI, '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d')
export default class AxiesServices {
  static async getAllAsset (req, res) {
    const { ownerAddress, page = 1, size = 10 } = req.query
    const totalAxies = await seaport.getTokenBalance({
      accountAddress: ownerAddress,
      tokenAddress: axieContractAddress
    })

    if ((page - 1) * size > totalAxies) {
      res.json([])
    } else {
      const arrAxies = []
      const startNum = (page - 1) * size
      const endNum = page * size < totalAxies.toNumber() ? page * size : totalAxies.toNumber()
      const arrAxiesExist = await CacheNFT.find({ ownerAddress: ownerAddress, tokenType: ntfTokenType.axies })

      for (let i = startNum; i < endNum; i++) {
        const axieID = await axieContract.methods.tokenOfOwnerByIndex(ownerAddress, i).call()
        const exitsAxies = arrAxiesExist.find(it => it.tokenId === parseFloat(axieID))
        if (exitsAxies) {
          arrAxies.push(exitsAxies.tokenInfo)
        } else {
          const axie = await seaport.api.getAsset({
            tokenAddress: axieContractAddress,
            tokenId: axieID
          })
          CacheNFT.create({ tokenType: ntfTokenType.axies, tokenInfo: axie, tokenId: axieID, ownerAddress: ownerAddress })
          arrAxies.push(axie)
        }
      }

      res.json(arrAxies)
    }
  }

  static async getAllAssetGraphql (req, res) {
    const { ownerAddress, page, size } = req
    const result = await client.query({
      query: queriesAxies,
      variables: {
        from: (page - 1) * size,
        size: size,
        sort: 'IdDesc',
        auctionType: 'All',
        owner: ownerAddress
      }
    })

    const total = get(result, 'data.axies.total', 0)
    const arrAxies = get(result, 'data.axies.results', [])

    res.json({ total, arrAxies })
  }
}
