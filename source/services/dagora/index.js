import { recoverPersonalSignature } from 'eth-sig-util'
import EVMServices from '../evm'
import { chainIdSupported, chainSupported, dagoraContractAddress, dagoraElasticIndex, dagoraFilterType, dagoraHistoryType, dagoraNFTMintAddress, dagoraUniverseCollectionAddress, dagoraVerifiedAccountAddress, keyChainNFT } from './constants'
import DagoraElasticServices from './elastic'
import ERC721 from '../../../blockchain/abi/ERC721'
import DAgoraCollection from '../../../blockchain/abi/dagora/DAgoraCollection'
import { genUpdate, getLength, getStorage, lowerCase, onlyUnique } from '../../worker/function'
import DagoraHistory from '../../model/dagora/History'
import { get, stubFalse } from 'lodash'
import * as ed from '@noble/ed25519'
import * as borsh from '@project-serum/borsh'
import * as bs58 from 'bs58'
import create from 'keccak'
import { PublicKey } from '@solana/web3.js'
import MARKET_PLACE from './marketPlaceABI'
import profileABI from './ABI/profile'
import Web3 from 'web3'
import FormData from 'form-data'
import axios from 'axios'
import { chainType } from '../../worker/constants'
import DagoraSolanaServices from './solana'
import SocketServices from '../../../common/socket'
import { convertHexToDecimal } from '../../../common/function'
import UserOnchain from '../../model/dagora/UserOnchain'
const ethUtil = require('ethereumjs-util')
const ethSigUtils = require('eth-sig-util')

const InputDataDecoder = require('ethereum-input-data-decoder')
const MessageRandomLayout = borsh.struct([
  borsh.publicKey('root'),
  borsh.publicKey('nftMint')
])

export default class DagoraServices {
  static decodeAddressFromSig (signature, signMessage) {
    try {
      const addressDecode = recoverPersonalSignature({
        data: signMessage,
        sig: signature
      })

      return addressDecode
    } catch (error) {
      return ''
    }
  }

  static getElasticIndexFromQuery (type, listing) {
    let query = [dagoraElasticIndex.market, dagoraElasticIndex.auction, dagoraElasticIndex.bundleMarket]
    if (getLength(type) > 0) {
      query = type.split(',').map(it => dagoraFilterType[it]).flat()
    }
    if (getLength(listing) > 0) {
      const listingArray = listing.split(',')
      query = query.filter(indexString => listingArray.some(key => indexString.includes(key)))
    }
    return query
  }

  static async getAllDataByIndex (index = dagoraElasticIndex.activity, size = 100) {
    let finalData = []
    let page = 1
    while (page > 0) {
      const payload = await DagoraElasticServices.searchElasticLocal({
        index: index,
        query: {
          match_all: {}
        },
        sort: {},
        page,
        size: size
      })
      if (getLength(payload.hits.hits) < 10000) {
        page = 0
      }
      finalData = finalData.concat(payload.hits.hits)
    }

    return finalData
  }

  // static gensignMessageDagora ()

  static async validateListingNFTData (activity) {
    try {
      const { address, chain, id, from } = activity

      if (chain === chainType.solana) {
        const owner = await DagoraSolanaServices.getOwnerOfSolanaNft(address)
        return lowerCase(owner) === lowerCase(from)
      } else {
        const owner = await DagoraServices.getOwer(address, id, chain)
        return (lowerCase(from) === lowerCase(owner))
      }
    } catch (error) {
      return false
    }
  }

  static async validateListingBundleData (activity) {
    const { from, nfts, chain, bundleAddress } = activity
    if (chain !== chainType.solana) {
      const arrOwner = await Promise.all(nfts.map(async ({ address, id }) => {
        const owner = await DagoraServices.getOwer(address, id, chain)
        return owner
      }))

      const arrfilterOwner = arrOwner.filter(onlyUnique)

      if (getLength(arrfilterOwner) > 1 || EVMServices.convertCheckSUM(arrfilterOwner[0]) !== EVMServices.convertCheckSUM(from)) {
        return false
      }
      return true
    } else {
      const bundleData = await DagoraSolanaServices.getInfo(bundleAddress, 'BUNDLE')

      if (!bundleData.owner || bundleData.owner.toString() !== from) {
        return false
      }

      return true
    }
  }

  static async getOwer (contractAddress, id, chain) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const contract = EVMServices.genContract(web3, ERC721, contractAddress)
      const owner = await contract.methods.ownerOf(id).call()
      return owner
    } catch (err) {
      return ''
    }
  }

  static async getNFTDetail (address, id, chain) {
    try {
      if (chain !== chainType.solana) {
        return DagoraServices.getEvmNftDetail(address, id, chain)
      } else {
        return DagoraServices.getSolanaNftDetail(address)
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js:139 ~ DagoraServices ~ getNFTDetail ~ error:', error)
      return false
    }
  }

  static async getEvmNftDetail (address, id, chain) {
    try {
      const payload = await DagoraElasticServices.searchElasticLocal({
        index: dagoraElasticIndex.nfts,
        query: {
          bool: {
            must: [
              { match: { chain: chain } },
              { match: { address: address } },
              { match: { id: id } }
            ]
          }
        }
      })
      let newData = payload.hits.hits[0] ? payload.hits.hits[0]._source.metaData : false
      if (newData) {
        const isMint = lowerCase(payload.hits.hits[0]._source.symbol) === 'c98nftmint'
        if (isMint) {
          const key = `NFTMINT_${id}_${keyChainNFT[chain]}`
          const metaData = await getStorage(key)
          newData = Object.assign(newData, metaData)
        }
        if (newData.image) {
          newData.image = DagoraServices.formatImageIPFS(newData.image)
        }
        const finalData = Object.assign(newData, { address: address, chain, id, contractName: payload.hits.hits[0]._source.name })
        return finalData
      } else {
        const newData = await EVMServices.getNFTContractData(address, chain)
        if (!newData) {
          return false
        }
        const newElasticData = {
          address,
          chain,
          id,
          name: newData.name,
          Symbol: newData.symbol,
          metaData: {}
        }
        const isMint = lowerCase(newData.symbol) === 'c98nftmint'
        if (isMint) {
          const key = `NFTMINT_${id}_${keyChainNFT[chain]}`
          const metaData = await getStorage(key)
          if (metaData) {
            const { name, description, image, id, chain } = metaData
            newElasticData.metaData = { name, description, image, id, chain }
          }
          await DagoraElasticServices.createNewDataLocal(
            dagoraElasticIndex.nfts,
            newElasticData
          )
          return {
            address,
            chain,
            id,
            name: get(newElasticData, 'metaData.name', ''),
            image: get(newElasticData, 'metaData.image', ''),
            contractName: newData.name
          }
        }
        const metaDataServices = await DagoraServices.getMetaDataServices(address, chain, id)
        const name = get(metaDataServices, 'name', '')
        const image = get(metaDataServices, 'image', '')
        if (metaDataServices.name) {
          DagoraElasticServices.updateDataByQuery({
            index: dagoraElasticIndex.nfts,
            query: {
              bool: {
                must: [
                  { match: { address } },
                  { match: { chain } },
                  { match: { id } }
                ]
              }
            },
            data: {
              address,
              chain,
              id,
              name: newData.name,
              metaData: {
                name: get(metaDataServices, 'name', ''),
                description: get(metaDataServices, 'description', ''),
                image: get(metaDataServices, 'image', '')
              }
            }
          })
        }
        return {
          address,
          chain,
          id,
          name,
          image,
          contractName: newData.name
        }
      }
    } catch (error) {
      return false
    }
  }

  static async getMetaDataServices (address, chain, id) {
    try {
      const chainId = chainIdSupported[chain]

      const url = `https://nfts.coin98.com/meta/${chainId}/${address}/${id}`

      const payload = await axios.get(url)

      if (payload.data && payload.data.metaData) {
        if (typeof (payload.data.metaData) === 'string') {
          return JSON.parse(payload.data.metaData)
        }
        return payload.data.metaData
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
  }

  static formatURILink (link = '') {
    let url = typeof link === 'object' ? get(link, 'url', '') : link
    const URL_CLOUD_FARE = 'https://ipfs.io'
    if (!url) {
      return ''
    }
    if (url && url.includes('ipfs://')) {
      return `${URL_CLOUD_FARE}/${url.replace('ipfs://', 'ipfs/')}`
    }
    if (!DagoraServices.validateImageURL(url)) {
      return (url = `${URL_CLOUD_FARE}/ipfs/${url}`)
    }
    return url
  }

  static async formatArrNFTDataEvm (arrData) {
    const query = DagoraElasticServices.genQueryArrNFT(arrData)
    const elasticDataNFt = await DagoraElasticServices.searchElasticLocal({
      index: dagoraElasticIndex.nfts,
      query
    })

    const nftCacheDataElastic = get(elasticDataNFt, 'hits.hits', false)
    const nftCacheData = nftCacheDataElastic ? nftCacheDataElastic.map(it => it._source) : []
    return await Promise.all(arrData.filter(it => (it)).map(async (it) => {
      const tokenId = it.id
      const isMint = lowerCase(it.symbol) === 'c98nftmint'
      if (isMint) {
        const keyNft = `NFTMINT_${tokenId}_${keyChainNFT[chainSupported[chainIdSupported[it.chain]]]}`
        const metaData = await getStorage(keyNft)
        it.metaData = it.metaData ? Object.assign(it.metaData, metaData) : metaData
      }
      if (it.address === dagoraVerifiedAccountAddress && it.chain === chainType.binanceSmart) {
        const metaData = await UserOnchain.findOne({ nftVerifiedId: tokenId }, { name: 1, quote: 1, image: 1, background: 1, social: 1, _id: 0 }).lean()
        it.metaData = metaData
      }
      const newItem = Object.assign({}, it)
      delete newItem.blockNumber
      delete newItem.metaData
      if (newItem.id.includes('0x')) {
        newItem.id = tokenId
      }

      if (it.address === dagoraUniverseCollectionAddress && it.chain === chainType.binanceSmart) {
        it.metaData = {
          id: it.id,
          name: 'Coin98 Universe',
          Symbol: 'C98U',
          description: 'The exclusive NFT collection marks the milestone of Coin98 Ecosystem launching a new NFT-dedicated product, contributing a step closer to fulfilling the mission of making web3 accessible to everyone.',
          image: 'https://inventory.coin98.com/images/c98u.png'
        }
      }

      const foundCacheData = nftCacheData.find(nft => (it.chain === nft.chain && it.id === nft.id && nft.address === it.address))
      let metaData = get(foundCacheData, 'metaData', false) || get(it, 'metaData', false)
      if (!metaData) {
        metaData = await DagoraServices.getMetaDataServices(it.address, it.chain, tokenId)
      }
      newItem.name = get(metaData, 'name', '')
      newItem.image = DagoraServices.formatURILink(get(metaData, 'image', ''))
      newItem.description = get(metaData, 'description', '')
      newItem.contractName = it.contractName || it.name
      return newItem
    }))
  }

  static async getSolanaNftDetail (address, uriLink) {
    try {
      const payloadElastic = await DagoraElasticServices.searchElasticLocal({
        index: dagoraElasticIndex.nfts,
        query: {
          bool: {
            must: [
              { match: { chain: chainType.solana } },
              { match: { address: address } }
            ]
          }
        }
      })
      const newData = payloadElastic.hits.hits[0] ? payloadElastic.hits.hits[0]._source : false
      if (newData) {
        const current = Date.now()
        if (newData.lastCache && newData.lastCache < current - 3600 * 1000) {
          DagoraServices.updateNftElasticData(address)
        }
        return DagoraServices.formatSolanaNft(newData.metaData)
      } else {
        const nftMetaData = await DagoraSolanaServices.getNFTDetailByMint(address)
        const finalData = Object.assign(nftMetaData, nftMetaData.json)
        const { name, image, uri, attributes, collection, description } = finalData
        DagoraServices.updateSolanaNftElastic(address, { name, image, uri, attributes: DagoraServices.formatAttributes(attributes), collection, description })
        return DagoraServices.formatSolanaNft({ address, name, image, uri, attributes, collection, description })
      }
    } catch (error) {
      return false
    }
  }

  static async updateNftElasticData (address) {
    const nftMetaData = await DagoraSolanaServices.getNFTDetailByMint(address)
    const { name, image, uri, attributes, collection, description } = nftMetaData.json || nftMetaData
    DagoraServices.updateSolanaNftElastic(address, { name, image, uri, attributes: DagoraServices.formatAttributes(attributes), collection, description })
  }

  static formatListingData (arrListingData, arrTopbid = []) {
    return arrListingData.map(it => {
      const { address, chain, id } = it._source
      const isAuction = it._index === dagoraElasticIndex.auction
      if (!isAuction) {
        // return { hash, id, address, chain, nfts, name, time, duration, image, amountUSD, tokens, amount, tokenAddress, price, from, contractName, type: 'market' }
        const newItem = Object.assign({ type: 'market' }, it._source)
        delete newItem.tokenId
        return newItem
      } else {
        const foundTopBid = arrTopbid.find(bid => (bid._id.address === address && bid._id.chain === chain && bid._id.id === id))
        const newItem = Object.assign({ type: 'auction', topBid: foundTopBid || {} }, it._source, { type: 'auction' })
        delete newItem.tokenId
        return newItem
      }
    })
  }

  static formatSolanaNft (nftData) {
    const { name, image, uri, attributes, collection, address, chain, description, blockTime } = nftData
    const newData = {
      address, chain, name, image, uri, attributes: DagoraServices.formatAttributes(attributes), description, blockTime
    }
    if (collection && collection.verified) {
      newData.contractName = collection.name || ''
      newData.collectionKey = collection.key || ''
    }
    return newData
  }

  // format data attributtes value to string data
  static formatAttributes (attributes) {
    if (attributes && attributes.map) {
      return attributes.map(it => {
        return Object.assign({}, it, { value: it.value.toString() })
      })
    }
    return attributes
  }

  static async updateSolanaNftElastic (address, updateFiled) {
    const updateData = genUpdate(updateFiled, ['name', 'image', 'uri', 'attributes', 'collection', 'id', 'logo', 'exploreImage', 'description'])

    await DagoraElasticServices.updateDataByQuery({
      index: dagoraElasticIndex.nfts,
      query: {
        bool: {
          must: [
            { match: { chain: chainType.solana } },
            { match: { address: address } }
          ]
        }
      },
      data: {
        metaData: Object.assign({ address, chain: chainType.solana }, updateData),
        chain: chainType.solana,
        address,
        lastCache: Date.now()
      }
    })
  }

  static formatImageIPFS (imageLink) {
    try {
      const isIPFS = imageLink.includes('ipfs') && !imageLink.includes('https')
      if (isIPFS) {
        const baseIPFS = imageLink.replace('ipfs://', '')
        return `https://ipfs.io/ipfs/${baseIPFS}`
      }
      return imageLink
    } catch (error) {
      return false
    }
  }

  static async getFloorPriceLocal (address, chain, id) {
    const averagePricePayload = await DagoraHistory.aggregate([
      {
        $match: { address, chain, id, type: { $in: [dagoraHistoryType.buy, dagoraHistoryType.sell] } }
      },
      {
        $group: {
          _id: null,
          average: { $avg: '$price' }
        }
      }
    ])
    return averagePricePayload[0] ? averagePricePayload[0].average : false
  }

  //* Lauchpad Services
  static async gensignatureLaunchpad (user, nftMint) {
    const messageDefault = {
      root: new PublicKey(user),
      nftMint: new PublicKey(nftMint)
    }

    const message = DagoraServices.hashMessage(messageDefault)

    const secretKey = Uint8Array.from(bs58.decode(process.env.Secret_Key_String))
    const publicKey = await ed.getPublicKey(secretKey.slice(0, 32))
    const signMessage = await DagoraServices.signMessage(secretKey, message)
    const signatureString = bs58.encode(signMessage)
    return { signature: signatureString, publicKey: (new PublicKey(publicKey)).toString() }
  }

  static keckka256 (input) {
    return create('keccak256').update(input).digest()
  }

  static hashMessage (message) {
    const buffer = Buffer.alloc(64)
    const span = MessageRandomLayout.encode(message, buffer)
    const serialize = buffer.slice(0, span)

    return this.keckka256(serialize)
  }

  static async signMessage (secretKey, message) {
    const signature = await ed.sign(message, secretKey.slice(0, 32))
    return Buffer.from(signature)
  }
  //* END Lauchpad Services

  static async endBidLocal (address, chain, id, amount, buyer, nonce, signature) {
    const web3 = EVMServices.genWeb3(chain)
    const contract = EVMServices.genContract(web3, MARKET_PLACE, dagoraContractAddress[chain])
    const DAgoraPrivateKey = process.env.DAGORA_PRIVATE_KEY_BID
    const formatAmount = parseFloat(amount).toLocaleString('fullwide', { useGrouping: false })
    const formatId = parseFloat(id).toLocaleString('fullwide', { useGrouping: false })
    const obj = [
      [EVMServices.convertCheckSUM(address)],
      [formatId],
      formatAmount,
      EVMServices.convertCheckSUM(buyer),
      signature,
      parseInt(nonce)
    ]
    const dataTxs = contract.methods
      .endBid(
        ...obj
      )
      .encodeABI()

    const hash = await EVMServices.postBaseSendTxs(web3, chain, DAgoraPrivateKey, dagoraContractAddress[chain], dataTxs, false, true)
    if (hash) {
      return hash
    } else {
      return false
    }
  }

  static async retryEndbidData (address, chain, id, amount, buyer, nonce, signature, retryTime = 1, maxRetry = 10) {
    if (retryTime > maxRetry) {
      return false
    } else {
      const hash = await DagoraServices.endBidLocal(address, chain, id, amount, buyer, nonce, signature)
      if (hash) {
        return hash
      } else {
        // eslint-disable-next-line no-return-assign
        return DagoraServices.retryEndbidData(address, chain, id, amount, buyer, nonce, signature, retryTime + 1, maxRetry)
      }
    }
  }

  static getDagoraMsgLocal () {
    return process.env.DAGORA_MESSAGE
  }

  static decodeDataTransactionLocal (data) {
    const decoder = new InputDataDecoder(MARKET_PLACE)
    const result = decoder.decodeData(data)
    return result
  }

  static genListingsignMessage (address, id, chain, arrSaleBytoken, arrAmount, time, duration, nonce, reserve = '0x0000000000000000000000000000000000000000') {
    const metaAddress = [reserve].concat(address)
    const metaUInt = [time, duration, nonce].concat(id)
    const dagoraMsg = DagoraServices.getDagoraMsgLocal()
    const objToSign = [
      {
        type: 'address[]',
        value: metaAddress
      },
      {
        type: 'uint256[]',
        value: metaUInt
      },
      {
        type: 'address[]',
        value: arrSaleBytoken
      },
      {
        type: 'uint256[]',
        value: arrAmount
      },
      {
        type: 'bytes',
        value: dagoraMsg
      }
    ]
    const web3 = EVMServices.genWeb3(chain)
    const params = web3.utils.soliditySha3(...objToSign)
    return params
  }

  static async getSigFromHashLocal (hash, chain, isCancel = true) {
    try {
      const txData = await EVMServices.getTxsByHash(chain, hash)
      const decodeData = DagoraServices.decodeDataTransactionLocal(txData.input)
      const signature = decodeData.inputs[isCancel ? 4 : 5].toString('hex')
      return '0x' + signature
    } catch (error) {
      return false
    }
  }

  static genBidSignMessage (tokenAddresses, tokenIds, amount, nonce) {
    const objNftToHash = [
      {
        type: 'address[]',
        value: [tokenAddresses]
      },
      {
        type: 'uint256[]',
        value: [tokenIds]
      }
    ]
    const nftHash = Web3.utils.soliditySha3(...objNftToHash)
    const msg = DagoraServices.getDagoraMsgLocal()
    const objToSign = [
      {
        type: 'bytes32',
        value: nftHash
      },
      {
        type: 'uint256',
        value: amount
      },
      {
        type: 'bytes',
        value: msg
      },
      {
        type: 'uint',
        value: nonce
      }
    ]
    const params = Web3.utils.soliditySha3(...objToSign)
    return params
  }

  static genOfferSignMessage (arrAddress, arrId, time, duration, nonce, buyByTokenAddresses, buyByAmounts) {
    const metaAddress = arrAddress.map(it => EVMServices.convertCheckSUM(it))
    const metaUInt = [time, duration, nonce].concat(arrId)
    const dagoraMsg = DagoraServices.getDagoraMsgLocal()
    const objToSign = [
      {
        type: 'address[]',
        value: metaAddress
      },
      {
        type: 'uint256[]',
        value: metaUInt
      },
      {
        type: 'address[]',
        value: buyByTokenAddresses
      },
      {
        type: 'uint256[]',
        value: buyByAmounts
      },
      {
        type: 'bytes',
        value: dagoraMsg
      }
    ]
    const params = Web3.utils.soliditySha3(...objToSign)
    return params
  }

  static async uploadImageResize (url, fileName, size = { width: 1200, height: 400 }) {
    try {
      const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' })
      const imageBuffer = response.data
      const sharp = require('sharp')

      const resizeImage = await sharp(imageBuffer).resize(size.width, size.height).toBuffer()
      var formData = new FormData()
      formData.append('image', resizeImage, { filename: Date.now() + '-' + fileName + `_${size.width}x${size.height}.png` })
      const responseUpload = await axios({
        url: 'https://inventory.coin98.com/api/images/upload',
        method: 'POST',
        data: formData,
        headers: { ...formData.getHeaders() }
      })
      if (responseUpload.data) {
        const name = responseUpload.data.split('_')[0]
        const imageType = responseUpload.data.split('.')[getLength(responseUpload.data.split('.')) - 1]
        return name + '.' + imageType
      } else {
        return false
      }
    } catch (err) {
      console.log('Rsize Image err:', err)
      return false
    }
  }

  static validateImageURL (url) {
    try {
      const newURL = new URL(url)
      return !!newURL
    } catch (e) {
      return false
    }
  }

  static async getAllBalanceFromAddress (address, chainId) {
    let cursor = '1'
    let balanceData = []

    while (cursor) {
      const url = `https://nfts.coin98.com/walletsync/${chainId}/${address}/${cursor}`
      const payload = await axios.get(url)
      if (payload && payload.data) {
        cursor = payload.data.nextPage
        balanceData = balanceData.concat(payload.data.data)
      } else {
        cursor = false
      }
    }

    return balanceData
  }

  static async fetchBalanceServices (address, chainId, cursor = '1') {
    const url = `https://nfts.coin98.com/walletsync/${chainId}/${address}/${cursor}`
    const payload = await axios.get(url)
    if (payload && payload.data) {
      return {
        cursor: payload.data.nextPage,
        data: get(payload.data, 'data', []).filter(it => it.type === 'ERC721')
      }
    } else {
      return {
        data: [],
        cursor: false
      }
    }
  }

  static async getItemOfCollection (address, chainId, cursor, size) {
    const url = `https://nfts.coin98.com/collection/nft/${chainId}/${address}/${cursor}?size=${size}`
    const payload = await axios.get(url)
    return payload.data
  }

  static async getCollectionOwner (address, chain) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const contract = EVMServices.genContract(web3, DAgoraCollection, address)
      const owner = await contract.methods.owner().call()
      return owner
    } catch (err) {
      return false
    }
  }

  static async syncMetaData (address, chain, id) {
    const chainId = chainIdSupported[chain]
    if (!chainId) return false
    if (!address || !id) return false
    await axios.get(`https://nfts.coin98.com/metaData/sync/${chainId}/${EVMServices.convertCheckSUM(address)}/${id}`).catch()
  }

  static async emitSocketNftStatus (address, chain, id, statusData = {}) {
    const { hash, status } = statusData
    // handle socket emit
    console.log(hash, status)
    SocketServices.emitSocket('DAGORA_NFT_STATUS', { address, chain, id, hash, status }, false, 'DAGORA_NFT_STATUS')
    return true
  }

  // Profile Account

  static decodeMintNFTProfileData (input) {
    const decoder = new InputDataDecoder(profileABI)

    const decodeData = decoder.decodeData(input)

    if (!decodeData || decodeData.method !== 'create') {
      return false
    } else {
      return decodeData.inputs
    }
  }

  static async getNFTIdMintFromHash (hash, signer) {
    try {
      const web3 = EVMServices.genWeb3(chainType.binanceSmart)
      const txReceipt = await web3.eth.getTransactionReceipt(hash)
      const foundMintLog = txReceipt.logs.find(it => (it.topics[1] === '0x0000000000000000000000000000000000000000000000000000000000000000' && EVMServices.convertCheckSUM('0x' + it.topics[2].slice(26)) === EVMServices.convertCheckSUM(signer)))
      return convertHexToDecimal(foundMintLog.topics[3].replace('0x', ''))
    } catch (error) {
      return 0
    }
  }

  static genEVMSignatureLocal (msg, privateKey) {
    const message = msg.startsWith('0x') ? ethUtil.toBuffer(msg) : Buffer.from(msg, 'utf-8')
    const msgHash = ethUtil.hashPersonalMessage(message)
    const sig = ethUtil.ecsign(msgHash, Buffer.from(privateKey.replace('0x', ''), 'hex'))
    const signature = ethUtil.bufferToHex(ethSigUtils.concatSig(sig.v, sig.r, sig.s))
    return signature
  }
}
