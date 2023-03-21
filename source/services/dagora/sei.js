import { CosmWasmClient, SigningCosmWasmClient, Secp256k1HdWallet } from 'cosmwasm'

import get from 'lodash/get'
import { coins } from '@cosmjs/amino'
const rpcEndpoint = 'https://rpc.ibiza-808.cosmwasm.com:443'
const masterCollection = 'wasm14jwu2vsu4xuefce0xjyk2t58awth4v42lvwxslqe6vszac66y4tqcynsgj'
export const FEE_SEI = {
  amount: coins(100000, 'ubeat'),
  gas: '2000000'
}

export default class DagoraSeiServices {
  static async getWalletBalance (collectionString, owner) {
    const client = await CosmWasmClient.connect(rpcEndpoint)
    const collection = collectionString.split(',')
    const balance = await Promise.all(collection.map(async (collectionAddress) => {
      const totalNFTInCollection = await client.queryContractSmart(collectionAddress, { tokens: { owner: owner } })
      const contract = await client.getContract(collectionAddress)
      const arrTokens = totalNFTInCollection ? totalNFTInCollection.tokens : []
      if (getLength(arrTokens) > 0) {
        const arrTokenData = await Promise.all(arrTokens.map(async (tokenId) => {
          const nftData = await client.queryContractSmart(
            collectionAddress,
            {
              all_nft_info: {
                token_id: tokenId
              }
            }
          )
          return {
            address: collectionAddress,
            chain: 'sei',
            id: tokenId,
            name: get(contract, 'label'),
            meta: {
              name: get(nftData, 'info.extension.name', ''),
              description: get(nftData, 'info.extension.description', ''),
              image: get(nftData, 'info.extension.image', false) || get(nftData, 'info.extension.imageData', ''),
              tokenURI: get(nftData, 'info.token_uri', '')
            }
          }
        }))
        return arrTokenData
      } else {
        return {
          collection: collectionAddress,
          nfts: []
        }
      }
    }))
    return balance.flat()
  }

  static async mintNFtDta ({ owner, imageData, description, name, tokenId, contractAddress }) {
    const client = await CosmWasmClient.connect(rpcEndpoint)

    const nftData = await DagoraSeiServices.getNftData(client, contractAddress, tokenId)
    if (nftData) {
      return false
    } else {
      const wallet = await Secp256k1HdWallet.fromMnemonic(process.env.DAGORA_SEI_MNEMONIC, { prefix: 'wasm' })
      const sender = await wallet.getAccounts()
      const clientWallet = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        wallet
      )
      const extension = {
        image_data: imageData,
        description,
        name
      }

      const response = await clientWallet.execute(
        sender[0].address,
        contractAddress,
        {
          mint: {
            owner,
            token_id: tokenId,
            extension,
            token_uri: 'Update Latter'
          }
        },
        FEE_SEI
      )
      return response
    }
  }

  static async getNftData (client, address, id) {
    try {
      const nftData = await client.queryContractSmart(
        address,
        {
          all_nft_info: {
            token_id: id
          }
        }
      )
      return nftData
    } catch (error) {
      return false
    }
  }

  static async verifyRegisterCollection (hash, collectionAddress, owner) {
    const client = await CosmWasmClient.connect(rpcEndpoint)

    const txData = await client.getTx(hash)
    if (txData) {
      const parseData = JSON.parse(txData.rawLog)
      const events = parseData[0].events
      const masterCollectionAddress = get(events, '0.attributes.0.value', '')
      const collectionOnchain = get(events, '1.attributes.0.value', '')
      const sender = get(events, '2.attributes.2.value', '')
      if (masterCollectionAddress !== masterCollection || collectionOnchain !== collectionAddress || sender !== owner) {
        return false
      } else {
        return true
      }
    }
    return false
  }

  static async getTransactionDetailByHash (hash) {
    const client = await CosmWasmClient.connect(rpcEndpoint)
    const txDetail = await client.getTx(hash)
    return txDetail
  }
}
