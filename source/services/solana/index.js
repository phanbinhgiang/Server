import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'
import * as BufferLayout from 'buffer-layout'
import * as borsh from '@project-serum/borsh'

import { chunk } from 'lodash'
import { sleep } from '../../worker/function'
const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, 'mint'),
  BufferLayout.blob(32, 'owner'),
  BufferLayout.nu64('amount'),
  BufferLayout.blob(93)
])

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
)

export const ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
)
export const PRECISION_MULTIPLIER = 10 ** 9

export default class SolanaServices {
  static findGateDerivationPath (
    identifier
  ) {
    return Buffer.from(identifier, 'utf8')
  }

  static async isAddressInUse (connection, address) {
    const programInf = await connection.getAccountInfo(address)
    return programInf !== null
  }

  static genConnectionLocal (rpc) {
    const connection = new Connection(rpc || process.env.RPC_SOLANA,
      {
        commitment: 'confirmed',
        httpHeaders: {
          authority: 'coin98',
          Version: process.env.REACT_APP_VERSION,
          Authorization: 'Bearer token',
          Signature: 'c26340d5243d802f03de751b9cbc049557ad0a14296aacf4a37dc7399adbe65c',
          origin: 'https://wallet.coin98.com',
          referer: 'https://wallet.coin98.com',
          development: 'coin98'
        }
      })
    return connection
  }

  static async getTransactionByhashLocal (hash, timeFetch = 0, rpc) {
    const connection = SolanaServices.genConnectionLocal(rpc)
    const data = await connection.getParsedTransaction(hash)
    if (timeFetch > 30) {
      return false
    }
    if (data && data.transaction && data.transaction.message) {
      return data
    } else {
      await sleep(500)
      return await SolanaServices.getTransactionByhashLocal(hash, timeFetch + 1, rpc)
    }
  }

  static convertToPublicKey (address) {
    return new PublicKey(address)
  }

  static async getTokenAccountsByOwner (owner) {
    try {
      const connection = SolanaServices.genConnectionLocal()
      const publicKey = new PublicKey(owner)
      const payload = await connection.getTokenAccountsByOwner(publicKey, {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
      })
      return payload.value.map(it => it.pubkey.toString())
    } catch (err) {
      return []
    }
  }

  static parseTokenAccountData (data) {
    const { mint, owner, amount } = ACCOUNT_LAYOUT.decode(Buffer.from(data[0], 'base64'))
    return {
      mint: new PublicKey(mint).toString(),
      owner: new PublicKey(owner).toString(),
      amount
    }
  }

  static async buildRequest ({ bodyFetch, method }) {
    try {
      if (!bodyFetch.length) return null
      const body =
      JSON.stringify(bodyFetch.map((item) => ({
        method,
        params: [item, { commitment: 'singleGossip' }],
        id: 1,
        jsonrpc: '2.0'
      })))

      const response = await fetch(process.env.RPC_SOLANA_API, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authority: 'coin98.com',
          origin: 'coin98.com',
          Version: '1.0.0',
          Authorization: 'Bearer token',
          development: 'coin98',
          Signature:
             'c26340d5243d802f03de751b9cbc049557ad0a14296aacf4a37dc7399adbe65c'
        },
        body: body
      })

      if (response.ok) {
        return response.json()
      } else {
        return null
      }
    } catch (err) {
      return null
    }
  }

  static async fetchMultipleAccount (accounts) {
    const fetchAllData = await SolanaServices.buildRequest({
      bodyFetch: accounts,
      method: 'getMultipleAccounts'
    })
    if (!fetchAllData) return []
    const arrData = fetchAllData.map((data) => {
      const result = get(data, 'result', {})
      return get(result, 'value')
    })
    return arrData.flat()
  }

  static async getTokenSupplyByMintLocal (tokenMint) {
    try {
      const connection = SolanaServices.genConnectionLocal()

      const payload = await connection.getTokenSupply(new PublicKey(tokenMint))
      return payload.value
    } catch (err) {
      return {}
    }
  }

  static async getCurrentSlotLocal () {
    const connection = SolanaServices.genConnectionLocal()

    const payload = await connection.getSlot()

    return payload
  }

  static async getAllTransactionLocal (arrHash, rpc) {
    const connection = SolanaServices.genConnectionLocal(rpc)
    const fetchArray = chunk(arrHash, 150)
    const arrTransaction = []
    await fetchArray.reduce(async (total, arrHash, idx) => {
      await total.then(async () => {
        if (arrHash && arrHash.map) {
          const payload = await connection.getParsedTransactions(arrHash, { maxSupportedTransactionVersion: 0 })
          arrTransaction.push(payload)
        }
      })
    }, Promise.resolve())
    return arrTransaction.flat().filter(it => (it && it.transaction))
  }

  static async getAllSigToTimeLocal (address, time = 0) {
    let lastSig = ''
    let arrAllSig = []
    let isFinish = false
    const connection = SolanaServices.genConnectionLocal()
    while (!isFinish) {
      let arrFetchData = []
      if (lastSig === '') {
        arrFetchData = await connection.getSignaturesForAddress(SolanaServices.convertToPublicKey(address))
      } else {
        arrFetchData = await connection.getSignaturesForAddress(SolanaServices.convertToPublicKey(address), { before: lastSig })
      }
      if (getLength(arrFetchData) < 1000) {
        isFinish = true
      }
      const lastSigData = arrFetchData[arrFetchData.length - 1]
      lastSig = lastSigData ? lastSigData.signature : lastSig
      arrAllSig = [].concat.apply(arrAllSig, arrFetchData)

      if (!lastSigData || lastSigData.blockTime * 1000 < time) {
        isFinish = true
      }
    }
    return arrAllSig
  }

  static decodeTokenAccountData (data) {
    const decodeData = SolanaServices.deserializeLocal(
      borsh.struct([
        borsh.publicKey('mint'),
        borsh.publicKey('owner'),
        borsh.u64('amount'),
        borsh.u32('delegateOption'),
        borsh.publicKey('delegate'),
        borsh.u8('state'),
        borsh.u32('isNativeOption'),
        borsh.u64('isNative'),
        borsh.u64('delegatedAmount'),
        borsh.u32('closeAuthorityOption'),
        borsh.publicKey('closeAuthority')
      ]),
      data
    )
    return decodeData
  }

  static async getAllAccountOfmintLocal (mintAddress) {
    try {
      const body =
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'getProgramAccounts',
        params: [
          'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          {
            encoding: 'jsonParsed',
            filters: [
              {
                dataSize: 165
              },
              {
                memcmp: {
                  offset: 0,
                  bytes: mintAddress
                }
              }
            ]
          }
        ]
      }

      const response = await axios({
        url: process.env.RPC_SOLANA_API,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authority: 'coin98.com',
          Version: '1.0.0',
          Authorization: 'Bearer token',
          development: 'coin98',
          origin: 'coin98.com',
          Signature:
             'c26340d5243d802f03de751b9cbc049557ad0a14296aacf4a37dc7399adbe65c'
        },
        data: JSON.stringify(body)
      })

      if (response.data) {
        return response.data.result.map(it => {
          try {
            const data = it.account.data.parsed.info

            return {
              owner: data.owner,
              amount: data.tokenAmount.amount
            }
          } catch (err) {
            return false
          }
        }).filter(it => it)
      }
    } catch (err) {
      return []
    }
  }

  static async getAccountInfoLocal (mintAddress) {
    const connection = SolanaServices.genConnectionLocal()
    const payload = await connection.getAccountInfo(new PublicKey(mintAddress))
    return payload
  }

  static deserializeLocal (layout, data) {
    return layout.decode(data)
  }

  static async findMetadataAddress (mint, tokenMetadataProgramId) {
    const [address] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        tokenMetadataProgramId.toBytes(),
        mint.toBytes()
      ],
      tokenMetadataProgramId
    )

    return address
  }

  static async postBaseSendTxs ({ connection, transactions, signer, isWaitDone }) {
    const { blockhash } = await connection.getRecentBlockhash()

    transactions.recentBlockhash = blockhash

    return connection.sendTransaction(transactions, [signer], {
      skipPreflight: false
    }).then(async (hash) => {
      console.log('Solana Txs hash ', hash)
      if (isWaitDone) {
        await SolanaServices.awaitTransactionSignatureConfirmation(connection, hash)
        return hash
      }

      return hash
    }).catch(mess => {
      console.log('🚀 ~ file: index.js:338 ~ SolanaServices ~ postBaseSendTxs ~ mess', mess)
      return false
    })
  }

  static async awaitTransactionSignatureConfirmation (
    connection,
    txid,
    timeout = 15000
  ) {
    let done = false
    const result = await new Promise((resolve, reject) => {
      (async () => {
        setTimeout(() => {
          if (done) {
            return
          }
          done = true
          console.log('Timed out for txid', txid)
          const timeout = { timeout: true }
          reject(timeout)
        }, timeout)
        try {
          connection.onSignature(
            txid,
            (result) => {
              done = true
              if (result.err) {
                reject(txsFail)
              } else {
                resolve(result)
              }
            },
            'recent'
          )
        } catch (e) {
          done = true
          console.log('WS error in setup', txid, e)
        }
        while (!done) {
          // eslint-disable-next-line no-loop-func
          (async () => {
            try {
              const signatureStatuses = await connection.getSignatureStatuses([
                txid
              ])
              const result = signatureStatuses && signatureStatuses.value[0]
              if (!done) {
                if (!result) {
                  console.log('REST null result for', txid, result)
                } else if (result.err) {
                  done = true
                  reject(txsFail)
                } else if (!result.confirmations) {
                  done = true
                  resolve(result)
                } else {
                  done = true
                  resolve(result)
                }
              }
            } catch (e) {
              if (!done) {
                console.log('REST connection error: txid', txid, e)
              }
            }
          })()
          await sleep(300)
        }
      })()
    })
    done = true
    return result
  }
}
