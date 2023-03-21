import * as borsh from '@project-serum/borsh'
import { HashServices } from '../hashServices'
import * as ed from '@noble/ed25519'
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { BN, BorshCoder } from '@project-serum/anchor'
import { Metaplex } from '@metaplex-foundation/js'
import {
  createVerifySizedCollectionItemInstruction
  , metadataBeet
} from '@metaplex-foundation/mpl-token-metadata'

import SolanaServices from '../solana'
import axios from 'axios'
import DagoraServices from '.'
import { chainType } from '../../worker/constants'
import { getLength } from '../../worker/function'
import FormData from 'form-data'
import DagoraElasticServices from './elastic'
import { dagoraAuctionActiontype, dagoraElasticIndex, dagoraSolanaActionName } from './constants'
import DagoraIDL from './ABI/dagora_marketplace.json'
import { createSolanaWallet } from '../../../blockchain/solana'
import { IdlParserService } from '../solana/idlParse'
import { TokenProgramService } from '../../services/solana/tokenProgramService'
// import { get } from 'lodash'
import get from 'lodash/get'
const coder = new BorshCoder(DagoraIDL)
const dagoraProgramId = 'GbxbAey4BhU3qmvivfCd33zwqfpnWrD6Jvi6eEGLL2iE'
const TOKEN_PROGRAM_METAPLEX_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
)
export const DAGORA_MESSAGE = Buffer.from([68, 97, 103, 111, 114, 97, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const DAGORA_MARKETPLACE = new PublicKey('GbxbAey4BhU3qmvivfCd33zwqfpnWrD6Jvi6eEGLL2iE')

const ExchangeMessageLayout = borsh.struct([
  borsh.array(borsh.u8(), 32, 'nftHash'),
  borsh.vec(borsh.publicKey(), 'exchangeByTokens'),
  borsh.vec(borsh.u64(), 'exchangeByAmounts'),
  borsh.u64('startTime'),
  borsh.u64('expiredAt'),
  borsh.publicKey('reserve'),
  borsh.array(borsh.u8(), 32, 'message'),
  borsh.u64('nonce')
])

const DECODE_INFO = {
  BUNDLE: 'BUNDLE',
  PACKAGE: 'PACKAGE',
  AUCTION: 'AUCTION',
  METADATA: 'METADATA'
}
const NFTListLayout = borsh.struct([
  borsh.vec(borsh.publicKey(), 'nftMints')
])

let metaPlex
const parser = new IdlParserService(DagoraIDL)
const BUNDLE_AUTHORITY = Buffer.from('bundle_authority')
const AUCTION_AUTHORITY = Buffer.from('auction_authority')
const PACKAGE_PREFIX_SEED = Buffer.from([188, 74, 113, 24, 8, 112, 247, 148])
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
export default class DagoraSolanaServices {
  static genMetaPlex () {
    if (metaPlex) {
      return metaPlex
    } else {
      // const connection = SolanaServices.genConnectionLocal()
      const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')
      const metaplexGen = new Metaplex(connection)
      metaPlex = metaplexGen
      return metaplexGen
    }
  }

  // gensolana signature
  static genHashExchangeMessage (address, exchangeByTokens, exchangeByAmounts, startTime, duration, reserve, nonce) {
    const buffer = Buffer.alloc(1000)
    const nftHash = typeof (address) === 'string' ? DagoraSolanaServices.hashNft(new PublicKey(address)) : DagoraSolanaServices.hashNftList(address.map(it => new PublicKey(it)))
    const message = {
      nftHash: nftHash,
      exchangeByTokens: exchangeByTokens.map(it => new PublicKey(it)),
      exchangeByAmounts: exchangeByAmounts.map(it => new BN(it)),
      startTime: new BN(startTime),
      expiredAt: new BN(startTime + duration),
      reserve: reserve || PublicKey.default,
      message: DAGORA_MESSAGE,
      nonce: new BN(nonce)
    }

    const span = ExchangeMessageLayout.encode(message, buffer)
    const serialize = buffer.subarray(0, span)
    return HashServices.keckka256(serialize).toString('hex')
  }

  static hashNft (key) {
    return HashServices.keckka256(key.toBuffer())
  }

  static hashNftList (arrAddress) {
    const buffer = Buffer.alloc(1000)
    const message = {
      nftMints: arrAddress
    }
    const span = NFTListLayout.encode(message, buffer)
    const serialize = buffer.subarray(0, span)

    return HashServices.keckka256(serialize)
  }

  // signMessage
  static async signMessage (signer, message) {
    const signature = await ed.sign(message, signer.secretKey.slice(0, 32))
    return Buffer.from(signature)
  }

  static async verifySignatureSolana (signature, message, publicKey) {
    try {
      return await ed.verify(signature, message, new PublicKey(publicKey).toBytes())
    } catch (error) {
      return false
    }
  }

  static async getNftCollectionDataByMint (mintAddress) {
    const metaplex = DagoraSolanaServices.genMetaPlex()
    // eslint-disable-next-line no-undef
    const abortController = new AbortController()
    const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) }, { signal: abortController.signal })
    return nft.collection
  }

  static async getNFTDetailByMint (mintAddress) {
    const metaplex = DagoraSolanaServices.genMetaPlex()
    // eslint-disable-next-line no-undef
    const abortController = new AbortController()
    const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) }, { signal: abortController.signal })
    if (nft.json === null && nft.uri) {
      const payloadAxios = await axios.get(nft.uri).catch(() => false)
      if (payloadAxios && payloadAxios.data) {
        if (nft.collection && nft.collection.verified) {
          const collectionData = await DagoraSolanaServices.getNFTDetailByMint(nft.collection.key.toString())
          const { name, symbol } = collectionData
          return Object.assign(payloadAxios.data, { collection: { verified: nft.collection.verified, name, symbol, key: nft.collection.key.toString() } })
        }
        return Object.assign(nft, payloadAxios.data, { collection: {} })
      }
      return nft
    }
    if (nft.collection && nft.collection.verified) {
      const collectionData = await DagoraSolanaServices.getNFTDetailByMint(nft.collection.key.toString())
      const { name, symbol } = collectionData
      return Object.assign(nft, { collection: { verified: nft.collection.verified, name, symbol, key: nft.collection.key.toString() } })
    }
    return nft
  }

  static async getNFTDetailByUri (uri) {
    const payload = await axios({
      method: 'GET',
      url: uri,
      timeout: 3000
    }).catch(() => false)
    if (payload && payload.data) {
      return payload.data
    }
    return false
  }

  static async getAllNftByOwner (owner) {
    const metaplex = DagoraSolanaServices.genMetaPlex()
    const balance = await metaplex.nfts().findAllByOwner({ owner: new PublicKey(owner) })

    const queryElastic = DagoraElasticServices.genQueryArrNFT(balance.map(it => ({ address: it.mintAddress.toString(), chain: chainType.solana })))

    const elasticNftPayload = await DagoraElasticServices.searchElasticLocal({
      index: dagoraElasticIndex.nfts,
      query: queryElastic
    })

    const arrNFt = elasticNftPayload.hits.hits.map(it => it._source.metaData)

    const formatBalance = await Promise.all(balance.filter(it => (it.collectionDetails === null && getLength(it.uri) > 0)).map(async (metaData) => {
      const { uri, mintAddress, name, collection, editionNonce } = metaData
      const foundMetaData = arrNFt.find(it => it.address === mintAddress.toString())
      if (foundMetaData) return DagoraServices.formatSolanaNft(Object.assign(foundMetaData, { blockTime: editionNonce }))
      if (getLength(uri) === 0) return false
      const fetchUri = await DagoraSolanaServices.getNFTDetailByUri(uri)
      const { image, attributes } = fetchUri
      const nftData = { name, image, uri, attributes: DagoraServices.formatAttributes(attributes), collection: collection || {} }
      if (collection && collection.verified && collection.key) {
        const collectionData = await DagoraSolanaServices.getNFTDetailByMint(collection.key)
        nftData.collection = Object.assign(nftData.collection, { name: collectionData.name })
      }
      DagoraServices.updateSolanaNftElastic(mintAddress.toString(), nftData)
      const formatData = DagoraServices.formatSolanaNft(Object.assign({ blockTime: editionNonce, chain: chainType.solana, address: mintAddress.toString() }, nftData))
      return formatData
    }))

    return formatBalance.filter(it => it)
  }

  static async getAllCollectionByOwner (owner) {
    const metaplex = DagoraSolanaServices.genMetaPlex()
    const balance = await metaplex.nfts().findAllByOwner({ owner: new PublicKey(owner) })
    const arrcollection = balance.filter(it => (it.collectionDetails && get(it, 'collection.key', '').toString() === process.env.DAGORA_MASTER_COLLECTION && get(it, 'collection.verified', false))).map(collection => {
      const { mintAddress, name, symbol, uri, collectionDetails } = collection
      return {
        address: mintAddress.toString(),
        name,
        symbol,
        uri,
        collectionDetails
      }
    })

    return arrcollection
  }

  static async getTotalCollectionByOwner (owner) {
    const metaplex = DagoraSolanaServices.genMetaPlex()
    const balance = await metaplex.nfts().findAllByOwner({ owner: new PublicKey(owner) })
    return getLength(balance.filter(it => it.collectionDetails))
  }

  static async getAllSigDagoraUntil () {
    try {
      const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')

      const arrSig = await connection.getSignaturesForAddress(DAGORA_MARKETPLACE)

      return arrSig.map(it => it.signature)
    } catch (error) {
      console.log('🚀 ~ file: solana.js:233 ~ DagoraSolanaServices ~ getAllSigDagoraUntil ~ error:', error)
      return []
    }
  }

  static decodeDataFromTransaction (transactionIntructions) {
    try {
      const foundDagoraIntructions = transactionIntructions.find(it => it.programId.toString() === DAGORA_MARKETPLACE.toString())
      const decodeData = coder.instruction.decode(foundDagoraIntructions.data, 'base58')
      const data = DagoraSolanaServices.formatDagoraListingIntructionData(decodeData)
      return data
    } catch (err) {
      return false
    }
  }

  static formatDagoraListingIntructionData (decodeData) {
    const actionType = dagoraSolanaActionName[decodeData.name]
    switch (actionType) {
    case dagoraSolanaActionName.cancelSignature : {
      return {
        action: actionType,
        data: {
          signMessage: Buffer.from(decodeData.data.signMessage).toString('hex'),
          signature: Buffer.from(decodeData.data.signature).toString('hex')
        }
      }
    }
    case dagoraSolanaActionName.executeBuy :
    case dagoraSolanaActionName.executeSell : {
      return {
        action: actionType,
        data: {
          address: decodeData.data.nftMint ? decodeData.data.nftMint.toString() : '',
          tokenAddress: decodeData.data.exchangeByTokens[0].toString(),
          amount: decodeData.data.exchangeByAmounts[0].toNumber(),
          signature: Buffer.from(decodeData.data.signature).toString('hex')
        }
      }
    }
    default: {
      return decodeData
    }
    }
  }

  static getDecodeAuctionData (transactionIntructions, txData) {
    try {
      const foundDagoraIntructions = transactionIntructions.filter(it => it.programId.toString() === DAGORA_MARKETPLACE.toString())
      const intructionsData = foundDagoraIntructions.map(it => coder.instruction.decode(it.data, 'base58'))
      return DagoraSolanaServices.formatAuctionDecodeData(intructionsData, txData)
    } catch (err) {
      return false
    }
  }

  static formatAuctionDecodeData (arrDecodeData, txData) {
    if (arrDecodeData.map(it => it.name).join('-').includes(dagoraAuctionActiontype.createAuction)) {
      const arrInnerInstructions = txData.meta.innerInstructions.map(it => it.instructions).flat().filter(it => it.parsed.type === 'createAccount' && it.parsed.info.owner === dagoraProgramId).map(it => it.parsed.info)
      // return Object.assign()
      const signerAccount = txData.transaction.message.accountKeys.find(it => it.signer)
      const foundBundle = arrDecodeData.find(it => it.name === 'createBundle')
      const bundlePath = foundBundle.data.bundlePath.toString('hex')
      const foundNftMint = arrDecodeData.find(it => it.name === 'depositItem')
      const nftMint = foundNftMint.data.nftMint.toString()
      const foundAuctionData = arrDecodeData.find(it => it.name === dagoraAuctionActiontype.createAuction)
      const auctionPath = foundAuctionData.data.auctionAccountPath.toString('hex')
      const token = foundAuctionData.data.packageToken.toString()
      const startPrice = foundAuctionData.data.startAmount.toNumber()
      const endPrice = foundAuctionData.data.buyImmediateAmount.toNumber()
      const startTime = foundAuctionData.data.startTime.toNumber()
      const endTime = foundAuctionData.data.endTime.toNumber()
      return {
        bundlePath, auctionPath, nftMint, token, startPrice, endPrice, startTime, expiredAt: endTime, actionType: dagoraAuctionActiontype.createAuction, bundleAddress: arrInnerInstructions[0].newAccount, auctionAddress: arrInnerInstructions[1].newAccount, signer: signerAccount.pubkey.toString()
      }
    }

    if (arrDecodeData.map(it => it.name).join('-').includes(dagoraAuctionActiontype.placeABid)) {
      const foundBidInstruction = arrDecodeData.find(it => it.name === dagoraAuctionActiontype.placeABid)
      const amount = foundBidInstruction.data.amount.toNumber()
      const signerAccount = txData.transaction.message.accountKeys.find(it => it.signer)
      const foundInnerInstruocBid = txData.transaction.message.instructions.find(it => it.programId.toString() === dagoraProgramId)
      return {
        amount,
        auctionAddress: foundInnerInstruocBid.accounts.find(it => it.toString() !== signerAccount.pubkey.toString()).toString(),
        actionType: dagoraAuctionActiontype.placeABid,
        signer: signerAccount.pubkey.toString()
      }
    }

    if (arrDecodeData.map(it => it.name).join('-').includes(dagoraAuctionActiontype.cancelAuction)) {
      const foundWithDrawItem = arrDecodeData.find(it => it.name === 'withdrawItem')
      const signerAccount = txData.transaction.message.accountKeys.find(it => it.signer)
      return {
        nftMint: foundWithDrawItem.data.nftMint.toString(),
        actionType: dagoraAuctionActiontype.cancelAuction,
        signer: signerAccount.pubkey.toString()
      }
    }
    if (arrDecodeData.map(it => it.name).join('-').includes(dagoraAuctionActiontype.withdrawItem)) {
      const foundWithDrawItem = arrDecodeData.find(it => it.name === 'withdrawItem')
      const signerAccount = txData.transaction.message.accountKeys.find(it => it.signer)
      return {
        nftMint: foundWithDrawItem.data.nftMint.toString(),
        actionType: dagoraAuctionActiontype.withdrawItem,
        signer: signerAccount.pubkey.toString()
      }
    }
  }

  static async getOwnerOfSolanaNft (nftMint) {
    const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')
    const payload = await connection.getTokenLargestAccounts(new PublicKey(nftMint))
    const account = payload.value[0].address
    const accountInfo = await connection.getAccountInfo(account)
    const decodeToken = await SolanaServices.decodeTokenAccountData(accountInfo.data)
    return decodeToken.owner.toString()
  }

  static async getOwnerOfAccount (mintAddress) {
    const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')
    const accountInfo = await connection.getAccountInfo(new PublicKey(mintAddress))
    return accountInfo.owner.toString()
  }

  static async createTokenUri (nftMint, jsonData) {
    const formData = new FormData()
    formData.append('file', new Buffer.from(JSON.stringify(jsonData)), nftMint)
    await axios({
      url: 'https://inventory.c98staging.dev/metaPlex',
      method: 'POST',
      data: formData,
      headers: { ...formData.getHeaders() }
    })
  }

  static formatCollectionSolana (collectionData) {
    const { name, image, description, address } = collectionData
    return {
      title: name,
      logo: image,
      description,
      address
    }
  }

  static async getCollectionByMint (mint) {
    try {
      const payload = await DagoraSolanaServices.getNFTDetailByMint(mint)
      if (payload.collectionDetails === null) {
        return false
      }
      if (payload && payload.json) {
        return Object.assign({ owner: payload.updateAuthorityAddress.toString(), address: mint, chain: chainType.solana, royaltyFee: payload.sellerFeeBasisPoints }, payload.json, { name: payload.name })
      }
      const fetchUri = await DagoraSolanaServices.getNFTDetailByUri(payload.uri)
      const { name, symbol, sellerFeeBasisPoints } = payload
      return Object.assign({ owner: payload.updateAuthorityAddress.toString(), name, symbol, royaltyFee: sellerFeeBasisPoints }, fetchUri, { name, symbol })
    } catch (error) {
      console.log('🚀 ~ file: solana.js:387 ~ DagoraSolanaServices ~ getCollectionByMint ~ error:', error)
      return false
    }
  }

  static async formatListCollectionOfOwner (arrCollection, registerCollection) {
    const query = DagoraElasticServices.genQueryArrNFT(arrCollection.map(it => ({ address: it.address, chain: chainType.solana })))
    const payloadElastic = await DagoraElasticServices.searchElasticLocal({
      index: dagoraElasticIndex.nfts,
      query
    })

    return await Promise.all(arrCollection.map(async (it) => {
      const foundElasticData = payloadElastic.hits.hits.find(data => data._source.address === it.address)
      let collectionData = {}
      if (foundElasticData) {
        collectionData = Object.assign({}, foundElasticData._source.metaData, it)
      } else {
        const fetchUri = await DagoraSolanaServices.getNFTDetailByUri(it.uri)
        await DagoraServices.updateSolanaNftElastic(it.address, Object.assign({}, fetchUri, it))
        collectionData = Object.assign({}, fetchUri, it)
      }
      const foundRegisterCollection = registerCollection.find(cl => cl.address === it.address)
      if (foundRegisterCollection) {
        const { image, logo, banner } = foundRegisterCollection
        collectionData = Object.assign(collectionData, { image, logo, banner })
      }
      return collectionData
    }))
  }

  static async verifyCollectionNFT (nftMint) {
    try {
      const tokenMetadataProgramID = new PublicKey(TOKEN_PROGRAM_METAPLEX_ID)
      const collectionMint = process.env.DAGORA_MASTER_COLLECTION
      const activeWallet = createSolanaWallet(process.env.DAGORA_MASTER_COLLECTION_OWNER)
      const metaplex = DagoraSolanaServices.genMetaPlex()
      const collectionData = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(collectionMint) })

      const collectionMintAuthority = collectionData.mint.mintAuthorityAddress.toBase58()

      const metadata = await SolanaServices.findMetadataAddress(
        new PublicKey(nftMint),
        tokenMetadataProgramID
      )
      const collectionMetaData = await SolanaServices.findMetadataAddress(
        new PublicKey(collectionMint),
        tokenMetadataProgramID
      )

      const transactions = new Transaction()

      const verifyCollectionItemInstruction =
        createVerifySizedCollectionItemInstruction({
          metadata: new PublicKey(metadata),
          collectionAuthority: new PublicKey(activeWallet.publicKey),
          payer: new PublicKey(activeWallet.publicKey),
          collectionMint: new PublicKey(collectionMint),
          collection: new PublicKey(collectionMetaData),
          collectionMasterEditionAccount: new PublicKey(collectionMintAuthority)
        })

      transactions.add(verifyCollectionItemInstruction)

      const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')
      const hash = await SolanaServices.postBaseSendTxs({ connection, transactions, signer: activeWallet, isWaitDone: true })

      return hash
    } catch (err) {
      return false
    }
  }

  static async endBidLocal (
    auctionAddressString
  ) {
    const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')
    const payer = createSolanaWallet(process.env.DAGORA_MASTER_COLLECTION_OWNER)
    const dagoraProgramId = DAGORA_MARKETPLACE
    const auctionAddress = new PublicKey(auctionAddressString)
    const auctionInfo = await DagoraSolanaServices.getInfo(
      auctionAddress,
      DECODE_INFO.AUCTION
    )
    const { packageToken, highestBidder, bundle: bundleAddress, highestBidAmount } = auctionInfo

    if (highestBidder.toString() === SystemProgram.programId.toString() || !highestBidder) {
      return
    }

    const bundleInfo = await DagoraSolanaServices.getInfo(
      bundleAddress,
      DECODE_INFO.BUNDLE
    )
    const { owner } = bundleInfo
    const [bundleAuthorityAddress] =
      DagoraSolanaServices.findBundleAuthorityAddress(
        bundleAddress,
        dagoraProgramId
      )

    const transactions = new Transaction()

    const [packageAddress] = DagoraSolanaServices.findPackageAddress(
      packageToken,
      dagoraProgramId
    )
    const packageInfo = await DagoraSolanaServices.getInfo(
      packageAddress,
      DECODE_INFO.PACKAGE
    )
    const { feeOwner } = packageInfo

    const bidderATAPackageToken =
    await TokenProgramService.findAssociatedTokenAddress(
      highestBidder,
      packageToken
    )

    const [sellerATAPackageToken] =
    await TokenProgramService.findOrCreateAssociatedTokenAccount({
      connection,
      payerAddress: payer.publicKey,
      ownerAddress: owner,
      tokenMintAddress: packageToken,
      transactions
    })

    const [bundleAuthorityATAPackageToken] =
      await TokenProgramService.findOrCreateAssociatedTokenAccount({
        connection,
        payerAddress: payer.publicKey,
        ownerAddress: bundleAuthorityAddress,
        tokenMintAddress: packageToken,
        transactions
      })

    const feeOwnerATAPackageToken =
     await TokenProgramService.findAssociatedTokenAddress(feeOwner, packageToken)

    const endBidInstruction = DagoraSolanaServices.endBidInstruction(
      payer.publicKey,
      highestBidder,
      packageAddress,
      bundleAddress,
      auctionAddress,
      bidderATAPackageToken,
      sellerATAPackageToken,
      bundleAuthorityATAPackageToken,
      feeOwnerATAPackageToken,
      dagoraProgramId
    )
    transactions.add(endBidInstruction)

    const hash = await SolanaServices.postBaseSendTxs({ connection, transactions, signer: payer, isWaitDone: true })

    return { hash, winnerAddress: highestBidder.toString(), highestBidAmount: highestBidAmount.toNumber() }
  }

  static async getInfo (address, type) {
    const connection = SolanaServices.genConnectionLocal('https://api.devnet.solana.com')

    const accountInfo = await connection.getAccountInfo(new PublicKey(address))

    if (accountInfo === null) return {}

    switch (type) {
    case DECODE_INFO.BUNDLE:
      return parser.decodeBundleInfoAccount(get(accountInfo, 'data'))

    case DECODE_INFO.AUCTION:
      return parser.decodeAuctionInfoAccount(get(accountInfo, 'data'))

    case DECODE_INFO.PACKAGE:
      return parser.decodePackageInfoAccount(get(accountInfo, 'data'))

    case DECODE_INFO.METADATA:
      return metadataBeet.deserialize(get(accountInfo, 'data'))[0]

    default:
      break
    }
  }

  static findBundleAuthorityAddress (bundleAddress, dagoraProgramId) {
    return PublicKey.findProgramAddressSync(
      [BUNDLE_AUTHORITY, bundleAddress.toBytes()],
      dagoraProgramId
    )
  }

  static findPackageAddress (tokenMint, dagoraProgramId) {
    return PublicKey.findProgramAddressSync(
      [PACKAGE_PREFIX_SEED, tokenMint.toBytes()],
      dagoraProgramId
    )
  }

  static endBidInstruction (
    signer,
    bidderAddress,
    packageAddress,
    bundleAddress,
    auctionAddress,
    bidderTokenAddress,
    sellerTokenAddress,
    bundleTokenAddress,
    feeOwnerTokenAddress,
    dagoraProgramId
  ) {
    const [auctionAuthorityAddress] =
      DagoraSolanaServices.findAuctionAuthorityAddress(
        auctionAddress,
        dagoraProgramId
      )

    return parser.endBid(
      {},
      {
        signer: signer,
        bidder: bidderAddress,
        packageAccount: packageAddress,
        bundle: bundleAddress,
        auctionAccount: auctionAddress,
        auctionAuthority: auctionAuthorityAddress,
        bidderTokenAccount: bidderTokenAddress,
        sellerTokenAccount: sellerTokenAddress,
        bundleTokenAccount: bundleTokenAddress,
        feeOwnerTokenAccount: feeOwnerTokenAddress,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      },
      dagoraProgramId
    )
  }

  static findAuctionAuthorityAddress (auctionAddress, dagoraProgramId) {
    return PublicKey.findProgramAddressSync(
      [AUCTION_AUTHORITY, auctionAddress.toBytes()],
      dagoraProgramId
    )
  }
}
