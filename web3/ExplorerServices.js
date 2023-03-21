import QueryString from 'query-string'
import { convertHexToDecimal, convertWeiToBalance, convertWeiToBalanceV2, fetchAPI, formatAddressRonin, getLength, lowerCase, onlyUnique } from '../common/function'
import { REQUEST_TYPE, chainType, explorerLink, LINK_EXPLORER_API, KEY_EXPLORER_API } from '../common/constants'
import BlockCypherServices from '../common/blockcypher'

import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import * as cheerio from 'cheerio'
import { concat } from '@ethersproject/bytes'

import get from 'lodash/get'
import fetch from 'node-fetch'
import axios from 'axios'
import { TransactionDetail } from '../model'
import sample from 'lodash/sample'
import blake from 'blakejs'

const publicKeyFromPkHex = (publicKeyHex) => {
  if (!/^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(publicKeyHex)) {
    throw new Error('Invalid public key')
  }
  const publicKeyHexBytes = new Uint8Array(Buffer.from(publicKeyHex, 'hex'))

  return publicKeyHexBytes.subarray(1)
}

const uint8ArrayPkToAccountHash = (uint8ArrayPk) => {
  try {
    const algorithmIdentifier = 'ED25519'
    const separator = Uint8Array.from([0])
    const prefix = Buffer.concat([
      Buffer.from(algorithmIdentifier.toLowerCase()),
      separator
    ])

    if (uint8ArrayPk.length === 0) {
      return Uint8Array.from([])
    } else {
      return blake.blake2b((concat([prefix, uint8ArrayPk])), null, 32)
    }
  } catch (error) {
    console.log('err', error)
  }
}

export default class ExplorerServices {
  static async getTransaction (address, page = 1, limit = 25) {
    return this.postGateWay('txs', REQUEST_TYPE.GET, undefined, { address, page, limit })
  }

  static async getTokenTransaction (chain, holder, token, page = 1, limit = 25, bnbId, tokenDecimals = 18) {
    if (chain === chainType.bitcoin) {
      if (page === 1) {
        const listHistory = await BlockCypherServices.getHistory(holder)
        return listHistory
      } else {
        return []
      }
    } else if (chain === chainType.polkadot || chain === chainType.kusama) {
      const responseHistory = await ExplorerServices.postGateWayPolkadot(holder, page - 1, limit, chain)

      if (responseHistory && getLength(responseHistory.data) > 0) {
        const isHaveTransfer = getLength(responseHistory.transfer) > 0
        const arrHash = responseHistory.data.map(item => item.attributes.extrinsic_hash)
        const arrTxsExist = await TransactionDetail.find({ txHash: { $in: arrHash }, chain: chain })

        const mergeData = await responseHistory.data.reduce(async (array, item) => {
          const newArray = await array
          const findTransfer = isHaveTransfer ? responseHistory.transfer.find(data => data.id.split('-')[0] === item.id.split('-')[0]) : false
          const found = arrTxsExist.find(txs => txs.txHash === item.attributes.extrinsic_hash)

          if (found) {
            newArray.push(found.transaction)
          } else {
            const link = `https://explorer-32.polkascan.io/api/v1/${chain}/extrinsic/0x${item.attributes.extrinsic_hash}`
            const txDetail = await axios.get(link)

            const timeStamp = new Date(txDetail.data.data.attributes.datetime).getTime() / 1000
            let transaction = {}

            const txParams = txDetail.data.data.attributes.params

            if (txDetail.data.data.attributes.params[0].name !== 'calls') {
              transaction = {
                hash: `0x${item.attributes.extrinsic_hash}`,
                from: findTransfer ? findTransfer.attributes.sender.attributes.address : item.attributes.address,
                to: findTransfer ? findTransfer.attributes.destination.attributes.address : txDetail.data.data.attributes.params[0].value,
                timeStamp: parseFloat(timeStamp),
                amount: findTransfer ? convertWeiToBalance(findTransfer.attributes.value, 10) : convertWeiToBalance(txDetail.data.data.attributes.params[1].value, 10)
              }
            } else {
              transaction = {
                hash: `0x${item.attributes.extrinsic_hash}`,
                from: findTransfer ? findTransfer.attributes.sender.attributes.address : item.attributes.address,
                to: txParams[0].value[0].call_args[0].value,
                timeStamp: parseFloat(timeStamp),
                amount: findTransfer ? convertWeiToBalance(findTransfer.attributes.value, 10) : convertWeiToBalance(txParams[0].value[0].call_args[1].value, 10)
              }
            }
            TransactionDetail.create({ txHash: item.attributes.extrinsic_hash, transaction, chain })
            newArray.push(transaction)
          }
          return newArray
        }, [])

        return mergeData.sort((a, b) => a.timeStamp > b.timeStamp ? -1 : 1)
      } else {
        return []
      }
    } else if (chain === chainType.tron) {
      const listHistory = await ExplorerServices.postGateWayTron(holder, page - 1, limit, token)
      if (getLength(listHistory) > 0) {
        const finalData = listHistory.map(item => {
          return {
            hash: token ? item.transaction_id : item.transactionHash,
            from: token ? item.from_address : item.transferFromAddress,
            to: token ? item.to_address : item.transferToAddress,
            timestamp: parseFloat(token ? item.block_ts : item.timestamp),
            amount: convertWeiToBalance(token ? item.quant : item.amount, item.tokenInfo.tokenDecimal)
          }
        })
        return finalData
      }
      return []
    } else if (chain === chainType.cosmos) {
      const listHistory = await ExplorerServices.postGateWayComos(holder, page, limit)
      if (getLength(listHistory) > 0) {
        const finalData = listHistory.map(it => {
          return {
            hash: it.data.txhash,
            from: it.data.tx.body ? it.data.tx.body.messages[0].from_address : it.data.tx.value.msg[0].value.from_address,
            to: it.data.tx.body ? it.data.tx.body.messages[0].to_address : it.data.tx.value.msg[0].value.to_address,
            timeStamp: (new Date(it.header.timestamp)).getTime() / 1000,
            amount: convertWeiToBalance(it.data.tx.body ? it.data.tx.body.messages[0].amount[0].amount : it.data.tx.value.msg[0].value.amount[0].amount, 6)
          }
        })
        return finalData.sort((a, b) => a.timeStamp - b.timeStamp > 0 ? 1 : 0)
      }
      return []
    } else if (chain === chainType.functionX) {
      const data = await ExplorerServices.postGateWayFunctionX(holder, page, limit)

      return data
    } else if (chain === chainType.thor) {
      const listHistory = await ExplorerServices.postGateWayThor(holder, page)
      if (getLength(listHistory) > 0) {
        const finalData = listHistory.map(it => {
          return {
            hash: it.hash,
            from: it.extra.events[0].params.fromAddress,
            to: it.extra.events[0].params.toAddress,
            timeStamp: (new Date(it.timestamp)).getTime() / 1000,
            amount: convertWeiToBalance(it.extra.events[0].params.coins[0].amount, 8)
          }
        })
        const sortedData = finalData.slice(0).reverse()
        return sortedData
      }
      return []
    } else if (chain === chainType.terra) {
      const listHistory = await ExplorerServices.postGateWayTerra(holder, page, token === '' ? limit : 100)
      if (listHistory && getLength(listHistory.txs) > 0) {
        const finalData = listHistory.txs.map(it => {
          if (it.tx.value.msg[0].type === 'bank/MsgSend' && token === '') {
            return {
              hash: it.txhash,
              from: it.tx.value.msg[0].value.from_address,
              to: it.tx.value.msg[0].value.to_address,
              timeStamp: (new Date(it.timestamp)).getTime() / 1000,
              amount: convertWeiToBalance(it.tx.value.msg[0].value.amount[0].amount, 6)
            }
          } else if (token.length < 20 && it.tx.value.msg[0].value.amount && it.tx.value.msg[0].value.amount[0].denom === token) {
            const data = {
              hash: it.txhash,
              from: it.tx.value.msg[0].value.from_address,
              to: it.tx.value.msg[0].value.to_address,
              timeStamp: (new Date(it.timestamp)).getTime() / 1000,
              amount: convertWeiToBalance(it.tx.value.msg[0].value.amount[0].amount, 6)
            }
            return data
          } else if (it.tx.value.msg[0].type === 'wasm/MsgExecuteContract' && token.length >= 20) {
            const isFrom = it.logs[0].events[1].attributes[2].value === holder
            return {
              hash: it.txhash,
              from: isFrom ? holder : token,
              to: isFrom ? token : holder,
              timeStamp: (new Date(it.timestamp)).getTime() / 1000,
              amount: convertWeiToBalance(it.logs[0].events[1].attributes[4].value, 6)
            }
          } else return null
        })
        const filterFinalList = finalData.slice(0).filter(it => it)

        return filterFinalList
      }
    } else if (chain === chainType.kava) {
      const listHistory = await ExplorerServices.postGateWayKava(holder, page, limit)

      if (getLength(listHistory) > 0) {
        const finalData = listHistory.map(it => {
          return {
            hash: it.data.txhash,
            from: it.data.tx.value.msg[0].value.from_address || it.data.tx.value.msg[0].value.delegator_address || it.data.tx.value.msg[0].value.sender || it.data.tx.value.msg[0].value.depositor,
            to: it.data.tx.value.msg[0].value.to_address || it.data.tx.value.msg[0].value.validator_address,
            timeStamp: (new Date(it.data.timestamp)).getTime() / 1000,
            amount: convertWeiToBalance(it.data.tx.value.msg[0].value.amount ? it.data.tx.value.msg[0].value.amount[0].amount : 0, 6)
          }
        })
        const finalFilteredData = finalData.filter(it => it)
        return finalFilteredData
      }
      return []
    } else if (chain === chainType.band) {
      const listhistory = await ExplorerServices.postGateWayBand(holder, page, limit)
      if (getLength(listhistory) > 0) {
        const finalData = listhistory.map(transaction => {
          return {
            hash: transaction.data.txhash,
            from: transaction.data.tx.body.messages[0].from_address || transaction.data.tx.body.messages[0].delegator_address,
            to: transaction.data.tx.body.messages[0].to_address || transaction.data.tx.body.messages[0].validator_address,
            timeStamp: (new Date(transaction.header.timestamp)).getTime() / 1000,
            amount: convertWeiToBalance(transaction.data.tx.body.messages[0].amount.amount, 6)
          }
        })
        const filterData = finalData.filter(it => it)
        return filterData
      }
      return []
    } else if (chain === chainType.persistence) {
      const res = await this.postGateWayPersistence(holder, page, limit)
      return res
    }
    // else if (chain === chainType.avax) {
    //   let result
    //   if (getLength(token) > 0) {
    //     result = await this.postGateWayCeloAvaxToken(holder, page, limit, chain, token)
    //   } else {
    //     result = await this.postGateWayCeloAvax(holder, page, limit, chain)
    //   }
    //   return result
    // }
    else if (chain === chainType.avaxX) {
      const formatHolder = typeof holder === 'string' ? [holder] : (holder.filter ? holder.filter(itm => itm) : [])

      const result = (typeof holder === 'string' || getLength(formatHolder) === 1) ? await this.postGateWayAvaxXSingleAddress(formatHolder[0], page, limit) : await this.postGateWayAvaxX(formatHolder, page, limit)

      const formatedTxs = result.map(it => {
        if (it.type === 'add_validator') return null

        const inputAddr = it.inputs && it.inputs[0].output.addresses[0]
        const outputAddr = it.outputs && it.outputs[0].addresses[0]
        let address

        const foundInput = it.inputs ? it.inputs.filter(it => {
          const arrSame = []
          for (const item of it.output.addresses) {
            if (formatHolder.includes(`${item}`)) {
              arrSame.push(item)
              address = `X-${item}`
            }
          }
          return arrSame.length > 0
        }) : null

        const foundOutput = it.outputs ? it.outputs.filter(it => {
          const arrSame = []
          for (const item of it.addresses) {
            if (formatHolder.includes(`${item}`)) {
              arrSame.push(item)
              address = item
            }
          }
          return arrSame.length > 0
        }) : null

        if (it.type === 'export') {
          const exportArray = it.outputs.filter(item => {
            return item.chainID === '2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5'
          })
          const exportAmount = exportArray.reduce((a, b) => +a + +b.amount, 0)
          return {
            hash: it.id,
            from: `X-${inputAddr}`,
            to: `C-${outputAddr}`,
            amount: convertWeiToBalance(exportAmount, 9),
            timeStamp: new Date(it.timestamp).getTime() / 1000
          }
        }
        if (it.type === 'import') {
          return {
            hash: it.id,
            from: `X-${inputAddr}`,
            to: `X-${outputAddr}`,
            amount: convertWeiToBalance(it.outputs.reduce((a, b) => +a + +b.amount, 0), 9),
            timeStamp: new Date(it.timestamp).getTime() / 1000
          }
        }
        if (it.type === 'base') {
          let amountBase
          if (getLength(foundInput) === getLength(it.inputs) && getLength(foundOutput) === getLength(it.outputs)) {
            const isOuptSmall = getLength(it.inputs) === 1
            amountBase = isOuptSmall ? it.outputs[0].amount : it.outputs[1].amount
            return {
              hash: it.id,
              from: `X-${foundInput ? address : inputAddr}`,
              to: `X-${foundOutput ? address : outputAddr}`,
              amount: convertWeiToBalance(amountBase, 9),
              timeStamp: new Date(it.timestamp).getTime() / 1000
            }
          } else if (getLength(foundInput) === getLength(it.inputs)) {
            const arrRecieve = it.outputs.filter(item => {
              const senderOutput = []
              for (const address of item.addresses) {
                if (!formatHolder.includes(`${address}`)) {
                  senderOutput.push(address)
                }
              }
              return senderOutput.length > 0
            })
            amountBase = arrRecieve.reduce((total, item) => parseFloat(total) + parseFloat(item.amount), 0)
            return {
              hash: it.id,
              from: `X-${address}`,
              to: `X-${arrRecieve[0].addresses[0]}`,
              amount: convertWeiToBalance(amountBase, 9),
              timeStamp: new Date(it.timestamp).getTime() / 1000
            }
          } else {
            const arrRecieve = it.outputs.filter(item => {
              const arrOutput = []
              for (const address of item.addresses) {
                if (formatHolder.includes(`${address}`)) {
                  arrOutput.push(address)
                }
              }
              return arrOutput.length > 0
            })

            amountBase = arrRecieve.reduce((total, item) => parseFloat(total) + parseFloat(item.amount), 0)

            const arrSend = it.inputs.filter(item => {
              const senderOutput = []
              for (const address of item.output.addresses) {
                if (!formatHolder.includes(`${address}`)) {
                  senderOutput.push(address)
                }
              }
              return senderOutput.length > 0
            })
            return {
              hash: it.id,
              from: `X-${arrSend[0].output.addresses[0]}`,
              to: `X-${address}`,
              amount: convertWeiToBalance(amountBase, 9),
              timeStamp: new Date(it.timestamp).getTime() / 1000
            }
          }
        }
        return null
      })
      return formatedTxs.filter(itm => itm)
    } else if (chain === chainType.near) {
      const txsList = await this.postGateWayNear(holder, page, token)
      if (getLength(txsList) > 0) {
        const formatedTxsList = txsList.map(it => {
          let amount = 0

          if (getLength(it.actions) > 0) {
            const findTransfer = it.actions.find(tx => tx.kind === 'Transfer')
            if (findTransfer) {
              amount = convertWeiToBalanceV2(get(findTransfer, 'args.deposit', 0), 24)
            }
          }

          return {
            hash: it.hash,
            from: it.signerId,
            to: it.receiverId,
            timeStamp: Math.round(it.blockTimestamp / 1000),
            amount
          }
        })
        return formatedTxsList
      }
      return []
    } else if (chain === chainType.binance) {
      const txsList = await this.postGateWayBinance(holder, page, limit, bnbId)
      if (getLength(txsList.txArray) === 0) return []
      const finalList = txsList.txArray.map(it => {
        return {
          hash: it.txHash,
          from: it.fromAddr,
          to: it.toAddr,
          amount: it.value,
          timeStamp: it.timeStamp / 1000
        }
      })
      return finalList
    } else if (chain === chainType.kardia) {
      let arrTxs = []
      if (getLength(token)) {
        arrTxs = await this.postGateWayKardiaTokens(holder, page, limit, token)
      } else {
        arrTxs = await this.postGateWayKardia(holder, page, limit)
      }
      if (getLength(arrTxs) > 0) {
        return arrTxs.map(it => {
          return {
            hash: token ? it.transactionHash : it.hash,
            from: it.from,
            to: it.to,
            amount: convertWeiToBalance(it.value, token ? it.decimal : 18),
            timeStamp: (new Date(it.time)).getTime() / 1000
          }
        })
      } else {
        return []
      }
    } else if (chain === chainType.elrond) {
      const listHistory = await this.postGateWayElrond(holder, page, limit)

      if (getLength(listHistory) > 0) {
        return listHistory.map(it => {
          return {
            hash: it.txHash,
            from: it.sender,
            to: it.reciever,
            amount: it.value,
            timeStamp: it.timestamp
          }
        })
      }
      return []
    } else if (chain === chainType.casper) {
      const listHistory = await this.postGateWayCasper(holder, page, limit)
      return listHistory
    } else if (chain === chainType.okex) {
      const listHistory = await this.postGateWayOkex(holder, page, limit, token)

      return listHistory.hits.map(it => {
        return {
          hash: it.txhash || `0x${it.hash}`,
          from: token ? it.from : it.from[0],
          to: token ? it.to : it.to[0].address,
          amount: it.value,
          timeStamp: it.blockTimeU0 / 1000
        }
      })
    } else if (chain === chainType.klaytn) {
      const listHistory = await this.postGateWayKlaytn(holder, page, limit, token)
      return listHistory.map(it => {
        return {
          hash: it.hash,
          from: it.addressFrom.address,
          to: it.address.address,
          amount: it.amount,
          timeStamp: new Date(it.block.timestamp.time).getTime() / 1000
        }
      })
    } else if (chain === chainType.omg) {
      const tokenAddress = token || '0xd26114cd6ee289accf82350c8d8487fedb8a0c07'
      const data = await this.postGateWayOMG(holder, page, limit, tokenAddress)
      let decimals = 18
      if (token) {
        const tokenLink = `https://blockexplorer.mainnet.v1.omg.network/api/token/${token}`
        const tokenData = await axios.get(tokenLink)
        decimals = tokenData.data.token_decimals
      }

      return data.map(it => {
        const isFrom = it.inputs.find(item => item.owner === holder)
        const output = it.outputs.find(item => item.owner === holder)
        return {
          hash: it.txhash,
          from: isFrom ? holder : it.inputs[0] ? it.inputs[0].owner : null,
          to: isFrom ? it.outputs[0].owner : holder,
          amount: isFrom ? convertWeiToBalance(isFrom.amount, decimals) : convertWeiToBalance(output.amount, decimals),
          timeStamp: (new Date(it.inserted_at)).getTime() / 1000
        }
      })
    } else if (chain === chainType.dogecoin) {
      const data = await this.postGateWayDogeCoin(holder, page, limit)
      const decimals = 8

      return data.map(it => {
        const isFrom = it.inputs.find(item => item.recipient === holder)
        const output = it.outputs.find(item => item.recipient === holder)
        return {
          hash: it.transaction.hash,
          from: isFrom ? holder : it.inputs[0] ? it.inputs[0].recipient : null,
          to: isFrom ? it.outputs[0].recipient : holder,
          amount: isFrom ? convertWeiToBalance(isFrom.value, decimals) : convertWeiToBalance(output.value, decimals),
          timeStamp: (new Date(it.transaction.time)).getTime() / 1000
        }
      })
    } else if (chain === chainType.ronin) {
      const data = await this.postGateWayRonin(holder, page, limit, token)
      return data.map(it => {
        return {
          hash: token ? it.txHash : it.hash,
          from: it.from,
          to: it.to,
          timeStamp: it.timestamp,
          amount: convertWeiToBalance(it.value, it.tokenDecimals)
        }
      })
    } else if (chain === chainType.kucoin) {
      const data = await this.postGateWayKCC(holder, page, limit, token)
      if (!data) return []
      return data.map(it => {
        return {
          hash: it.txid,
          from: it.from,
          to: it.to,
          timeStamp: it.time,
          amount: token ? convertWeiToBalance(it.value, it.tokenInfo.d) : it.value
        }
      })
    } else if (chain === chainType.secretNetwork) {
      const data = await this.postGateWaySecret(holder, page, limit)
      if (getLength(data) > 0) {
        return data.map(it => {
          return {
            hash: it.hash,
            from: it.from,
            to: it.to,
            timeStamp: Math.floor(it.date / 1000),
            amount: it.value
          }
        })
      }
      return []
    } else if (chain === chainType.theta || chain === chainType.thetaFuel) {
      const data = await ExplorerServices.postGateWayThetaNetwork(holder, chain, token, page, limit)
      return data
    } else if (chain === chainType.ton) {
      const data = await ExplorerServices.postGateWayThetaNetwork(holder, page, limit)
      return data
    } else {
      const isTokenTxs = getLength(token) > 0

      if (LINK_EXPLORER_API[chain] && chain !== chainType.tomo) {
        const apiKey = sample(KEY_EXPLORER_API[chain] || [])
        const queryValue = {
          startblock: 0,
          endblock: 99999999999999,
          action: isTokenTxs ? 'tokentx' : 'txlist',
          module: 'account',
          address: holder,
          offset: limit,
          page,
          sort: 'desc'
        }
        if (apiKey) {
          queryValue.apiKey = apiKey
        }

        if (isTokenTxs) {
          queryValue.contractaddress = token
        }

        const queryStr = QueryString.stringify(queryValue)
        const data = await this.postGateWayEther('', queryStr, chain)
        if (data) {
          const resultData = data.result
          if ((chain === chainType.binanceSmart || chain === chainType.heco) && getLength(resultData) > 0 && typeof (resultData) === 'object') {
            const fullHash = resultData.map(item => item.hash).filter(onlyUnique)
            return fullHash.map(item => {
              return resultData.find(data => data.hash === item)
            }).filter(item => item)
          }
          return resultData
        }
        return []
      } else {
        if (chain === chainType.harmony) {
          const data = await this.getHarmonyTxs(holder, page, limit)
          if (!data) return []
          return data.map(it => {
            return {
              hash: it.hash,
              from: it.from,
              to: it.to,
              timeStamp: it.timestamp,
              value: convertHexToDecimal(it.value)
            }
          })
        } else {
          if (chain === chainType.tomo) {
            if (isTokenTxs) {
              return this.postGateWay('token-txs/trc21', REQUEST_TYPE.GET, undefined, { holder, token, page, limit })
            } else {
              return this.postGateWay('txs', REQUEST_TYPE.GET, undefined, { address: holder, page, limit })
            }
          } else {
            return []
          }
        }
      }
    }
  }

  static async getHarmonyTxs (address, pageIndex, pageSize) {
    const payload = await axios.post('https://api.harmony.one', {
      jsonrpc: '2.0',
      method: 'hmy_getTransactionsHistory',
      params: [{
        address,
        pageIndex: pageIndex - 1,
        pageSize,
        fullTx: true,
        txType: 'ALL',
        order: 'ASC'
      }],
      id: 1
    })
    if (payload) {
      return payload.data.result.transactions
    }
    return []
  }

  static async verifyOtpCode (id, otp, refId) {
    const body = {
      id, otp, refId
    }

    return this.postGateWay('user/verifyOtp', REQUEST_TYPE.POST, body)
  }

  static async postGateWayKCC (address, page, size, tokenAddress) {
    let link = `https://explorer.kcc.io/api/kcs/address/normal/${lowerCase(address)}/${page}/${size}`
    if (getLength(tokenAddress) > 0) {
      link = `https://explorer.kcc.io/api/kcs/address/tokentrans/${lowerCase(address)}/${lowerCase(tokenAddress)}/${page}/${size}`
    }

    const payload = await axios.get(link)

    if (payload) {
      return payload.data.data
    }
    return []
  }

  static async postGateWaySecret (address, page, size) {
    const link = `https://app.citadel.one/api/transactions/secret/${address}?offset=${(page - 1) * size}&limit=${size}`
    const payload = await axios.get(link, { headers: { Cookie: '1129ce3fa4414568388599223c639643=969469dd813cce0a213b904826e3b690; SID=s%3ApcfUMbMKgEjEFV7WSeqXX4oQ3uL3QbE9.jAthL6OCSwnZkxnWKA3jwpI3MQBAsDwOU7aKF3lIjII; fe13d42287df0ec2731a1757d138b226=d80fed24378942ad14d47b6c30ee19f4' } })
    if (payload && payload.data && payload.data.ok) {
      const arrTxs = payload.data.data.list
      return arrTxs
    }
    return []
  }

  static async postGateWayKlaytn (address, page, limit = 20) {
    const link = await createHttpLink({ uri: 'https://explorer.bitquery.io/proxy_graphql', fetch })
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: link
    })
    const res = await client.query({
      query: gql`
      query ($network: EthereumNetwork!, $address: String!, $limit: Int!, $offset: Int!) {
        ethereum(network: $network) {
          transactions(options: {desc: "block.timestamp.time", limit: $limit, offset: $offset}, txSender: {is: $address}) {
            block {
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
                __typename
              }
              height
              __typename
            }
            success
            address: to {
              address
              annotation
              __typename
            }
            addressFrom:sender{
              address
              __typename
            }
            currency{
              name
              address
              __typename
            }
            amount
            gasValue
            gasCurrency {
              symbol
              __typename
            }
            hash
            __typename
          }
          __typename
        }
      }
      `,
      variables: {
        limit: limit,
        offset: (page - 1) * limit,
        network: 'klaytn',
        address: address,
        dateFormat: '%Y-%m'
      }
    })
    if (res && res.data && res.data.ethereum) {
      return res.data.ethereum.transactions
    } else {
      return []
    }
  }

  static async postGateWayRonin (address, page, size, tokenAddress) {
    const pageSize = `from=${(page - 1) * size}&size=${size}`

    const link =
      tokenAddress
        ? `https://explorer.roninchain.com/api/tokentxs?addr=${tokenAddress}&${pageSize}&token=ERC20`
        : `https://explorer.roninchain.com/api/txs/${address}?${pageSize}`

    const payload = await fetchAPI(link)

    return get(payload, 'results')
  }

  static async postGateWayDogeCoin (address, page, size) {
    const link = `https://api.blockchair.com/dogecoin/dashboards/address/${address}?limit=${size}&offset=${(page - 1) * size}`

    const payload = await axios.get(link)
    if (getLength(get(payload, `data.data[${address}].transactions`)) > 0) {
      const arrTxsHash = payload.data.data[address].transactions

      const transactionExist = await TransactionDetail.find({ txHash: { $in: arrTxsHash }, chain: chainType.dogecoin })
      const arrTxExist = transactionExist.map(it => it.txHash)

      const arrTxFetch = arrTxsHash.filter(it => !arrTxExist.includes(it))

      const arrTxsSplit = []
      let arrTxs = transactionExist.map(it => it.transaction)

      while (arrTxFetch.length) {
        arrTxsSplit.push(arrTxFetch.splice(0, 10))
      }

      await arrTxsSplit.reduce(async (chain, item, index) => {
        const txsString = item.join(',')
        const txsLink = `https://api.blockchair.com/dogecoin/dashboards/transactions/${txsString}`

        const arrTxsDetailPayload = await axios.get(txsLink)

        if (arrTxsDetailPayload) {
          const txsDetailObject = arrTxsDetailPayload.data.data
          const arrTxsFetched = Object.values(txsDetailObject)
          arrTxsFetched.reduce((chain, item) => {
            TransactionDetail.create({ txHash: item.transaction.hash, transaction: item, chain: chainType.dogecoin })
          }, [])
          arrTxs = [...arrTxs, ...Object.values(txsDetailObject)]
        }
      }, [])
      return arrTxs
    } else {
      return []
    }
  }

  static async postGateWayOMG (address, page, size, token) {
    const link = 'https://watcher-info.mainnet.v1.omg.network/transaction.all'
    let currPage = 1
    let arrTxs = []

    while (arrTxs.length < page * size && currPage !== -1) {
      const res = await axios({
        method: 'POST',
        url: link,
        data: {
          page: currPage,
          limit: 100,
          address: address
        }
      })

      if (res.data && getLength(res.data.data) > 0) {
        const arrFiltered = res.data.data.filter(it => {
          const foundInputs = it.inputs.find(input => input.owner === address)
          const foundOutput = it.outputs.find(output => output.owner === address)

          if (foundInputs) {
            if (foundInputs.currency === token) {
              return true
            }
          } else {
            if (foundOutput.currency === token) {
              return true
            }
          }
          return false
        })
        arrTxs = [...arrTxs, ...arrFiltered]
        currPage++
      }
      currPage = -1
    }
    return arrTxs
  }

  /// not use
  static async postGateWayHelium (address, page, size) {
    let link = `https://api.helium.io/v1/hotspots/${address}/activity`
    let data = []
    while (getLength(data) < page * size) {
      const payload = await axios.get(link)
      if (payload && getLength(payload.data.data)) {
        const cursor = payload.data.cursor
        link = `https://api.helium.io/v1/hotspots/${address}/activity?cursor=${cursor}`
        data = [...data, ...payload.data.data]
      }
    }
    return data.slice((page - 1) * size, page * size)
  }

  static async postGateWayKardia (address, page, size) {
    const link = `https://backend.kardiachain.io/api/v1/addresses/${address}/txs?page=${page}&limit=${size}`

    const fetch = await axios.get(link)

    const data = fetch.data.data
    return data.data
  }

  static async postGateWayKardiaTokens (address, page, size, token) {
    let currentPage = 1
    const link = `https://backend.kardiachain.io/api/v1/token/txs?address=${address}&page=${currentPage}&limit=100`
    const arrTokensTxs = []
    while (arrTokensTxs.length < page * size) {
      const fetch = await axios.get(link)
      if (fetch.data) {
        const arrTxs = fetch.data.data.data
        arrTxs.reduce((chain, item, index) => {
          if (item.tokenAddress === token) {
            arrTokensTxs.push(item)
          }
        }, [])
      }
      currentPage++

      if (currentPage * 100 > fetch.data.data.total) {
        break
      }
    }
    return arrTokensTxs.slice((page - 1) * size, page * size)
  }

  static async postGateWayElrond (address, page, size) {
    const link = `https://beta-api.elrond.com/transactions?from=${(page - 1) * size}&size=${page * size}&sender=${address}&receiver=${address}&condition=should&fields=txHash,receiver,receiverShard,sender,senderShard,status,timestamp,value`
    const res = await axios.get(link)

    if (res) {
      return res.data
    } else {
      return []
    }
  }

  static async postGateWayXDai (address, page, size) {
    let link = `https://blockscout.com/xdai/mainnet/address/${address}/transactions?type=JSON`
    let arrTxs = []

    for (let i = 0; i < Math.ceil(page * size / 50); i++) {
      const res = await fetch(link)
      const resJSon = await res.json()

      const resData = resJSon.items.map(it => {
        const ele = cheerio.load(it)
        return {
          hash: ele('.text-truncate').text().split('\n').filter(it => it.length > 20)[0],
          from: ele('.d-md-none').text().slice(0, 42),
          to: ele('.d-md-none').text().slice(42, 84),
          timeStamp: (new Date(ele('.order-2').attr()['data-from-now'])).getTime() / 1000,
          amount: ele('.tile-title').html().replace('\n', '').replace('\n', '').replace('xDAI', '').trim()
        }
      })
      link = `https://blockscout.com/xdai/mainnet${resJSon.next_page_path}&type=JSON`
      arrTxs = arrTxs.concat(resData)
    }
    return arrTxs.slice((page - 1) * size, page * size)
  }

  static async postGateWayBinance (address, page, size, asset) {
    const link = `https://explorer.binance.org/api/v1/txs?page=${page}&rows=${size}&address=${address}&asset=${asset}`
    const data = await fetchAPI(link)
    return data
  }

  static async postGateWayNear (address, page, token) {
    if (token) {
      const link = `https://api.nearblocks.io/v1/account/${token}/txns?from=${address}&order=desc&page=${page}&per_page=25`
      const data = await fetchAPI(link)

      if (data && getLength(data.txns) > 0) {
        return data.txns.map(txs => {
          const isTransfer = it.actions.find(at => at.method === 'ft_transfer')
          return {
            hash: txs.transaction_hash,
            signerId: txs.predecessor_account_id,
            receiverId: txs.receiver_account_id,
            blockTimestamp: Math.round(txs.block_timestamp / 1000000),
            amount: isTransfer ? txs.actions_agg.deposit : 0
          }
        })
      }
      return []
    }
    const link = `https://nearscan-api.octopus-network.workers.dev/txns/${address}/${page}/50`
    const data = fetchAPI(link)
    if (data) {
      return data
    }
    return []
  }

  static async postGateWayAvaxX (address, page, size) {
    let link = 'https://explorerapi.avax.network/v2/transactions'
    const dataAxios = {
      address: address,
      chainID: [
        '2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM'
      ],
      sort: [
        'timestamp-desc'
      ],
      disableCount: [
        '1'
      ],
      disableGenesis: [
        'false'
      ]
    }
    let result
    const timeFetch = page * size / 20
    for (let i = 0; i < timeFetch; i++) {
      if (i === 0) {
        result = await axios({
          method: 'post',
          url: link,
          data: dataAxios
        })
        if (result.data && result.data.next) {
          link = `https://explorerapi.avax.network/v2/transactions?${result.data.next}`
        }
      } else {
        result = await axios.get(link)
        if (result.data && result.data.next) {
          link = `https://explorerapi.avax.network/v2/transactions?${result.data.next}`
        } else if (i === page - 1) {
          break
        } else {
          result = []
          break
        }
      }
    }
    if (result.data && getLength(result.data.transactions) > 0) {
      return result.data.transactions.slice((page - 1) * size, page * size)
    } else {
      return []
    }
  }

  static async postGateWayAvaxXSingleAddress (address, page, size) {
    const link = `https://explorerapi.avax.network/v2/transactions?address=${address}&sort=timestamp-desc&limit=1000`

    const payload = await axios.get(link)

    if (payload.data && payload.data.transactions) {
      return payload.data.transactions.filter(it => it.chainID === '2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM').slice((page - 1) * size, page * size)
    } else {
      return []
    }
  }

  static async postGateWayCeloAvax (address, page, size, chain) {
    try {
      const timeFetch = Math.ceil(page * size / 50)
      let link = `${explorerLink[chain]}/address/${address}/transactions?type=JSON`
      const transactions = []
      for (let index = 0; index < timeFetch; index++) {
        const data = await fetchAPI(link)
        transactions.push(data.items)
        link = `${explorerLink[chain]}${data.next_page_path}&type=JSON`
      }

      const transactionsData = transactions.flat().slice((page - 1) * size, page * size)

      const formatedTransaction = transactionsData.map(it => {
        const ele = cheerio.load(it)
        return {
          hash: ele('a[data-test=transaction_hash_link]').text().trim(),
          from: ele('.d-xl-inline').text().slice(0, 42),
          to: ele('.d-xl-inline').text().slice(42, 84),
          amount: ele('.tile-title').text().replace(`${chain.toUpperCase()}`, '').trim(),
          timeStamp: new Date(ele('.order-2').attr()['data-from-now']).getTime() / 1000
        }
      })

      return formatedTransaction
    } catch (error) {
      return []
    }
  }

  static async postGateWayCeloAvaxToken (address, page, size, chain, token) {
    let arrTxs = []
    let link = `${explorerLink[chain]}/address/${address}/token-transfers?type=JSON`
    while (getLength(arrTxs) < page * size && link) {
      const data = await fetchAPI(link)
      if (data.next_page_path) {
        link = `${explorerLink[chain]}${data.next_page_path}&type=JSON`
      } else {
        link = false
      }

      const arrTokenTxs = data.items.filter(it => it.includes(token.toLowerCase()))
      arrTxs = arrTxs.concat(arrTokenTxs)
    }
    const arrFormated = arrTxs.reduce((chain, item) => {
      const ele = cheerio.load(item)

      const arrValue = ele('.ml-sm-0').toString().split('\n').filter(it => getLength(it.trim()) > 0)
      const findTokenIndex = arrValue.findIndex(it => it.includes(token.toLowerCase()))
      // const value = arrValue[findTokenIndex - 1]

      const txs = {
        hash: ele('a[data-test=transaction_hash_link]').text().trim(),
        from: ele('.d-xl-inline').text().slice(0, 42),
        to: ele('.d-xl-inline').text().slice(42, 84),
        amount: arrValue[findTokenIndex - 1].replace(/,/g, ''),
        timeStamp: new Date(ele('.order-2').attr()['data-from-now']).getTime() / 1000
      }
      chain.push(txs)
      return chain
    }, [])
    return arrFormated.splice((page - 1) * size, page * size)
  }

  static async postGateWayPersistence (address, page, size) {
    let currentFrom = 0
    const fetchTime = page * size / 50
    let arrTxs = []

    for (let index = 0; index < fetchTime; index++) {
      const serverUrl = `https://api-persistence.cosmostation.io/v1/account/new_txs/${address}?from=${currentFrom}&limit=50`
      const response = await fetch(serverUrl)

      const responseJson = await response.json()
      if (getLength(responseJson) > 0) {
        arrTxs = [...arrTxs, ...responseJson]
        currentFrom = responseJson[responseJson.length - 1].header.id
      }
    }

    const data = arrTxs.slice((page - 1) * size, page * size).map(it => it.data.txhash)
    const time = arrTxs.slice((page - 1) * size, page * size).map(it => new Date(it.header.timestamp).getTime() / 1000)

    const payloadTransactionDetail = await TransactionDetail.find({ txHash: { $in: data }, chain: chainType.persistence })

    const res = await data.reduce(async (chain, item, index) => {
      const found = payloadTransactionDetail.find(it => it.txHash === item)
      const data = await chain
      if (found) {
        data.push({ hash: item, transaction: found.transaction, timeStamp: time[index] })
      } else {
        const txsLink = `https://explorer.persistence.one/component/transactionMessages?txHash=${item}`
        const txsfetch = await axios.get(txsLink)
        const txsData = txsfetch.data
        data.push({ hash: item, transaction: txsData, timeStamp: time[index] })
        TransactionDetail.create({ txHash: item, chain: chainType.persistence, transaction: txsData })
      }
      return data
    }, [])

    const arrTransactionFormated = res.map((item, index) => {
      const eleTxs = cheerio.load(item.transaction)
      const txsGetData = eleTxs('.infoRowValue').text().split('\n').filter(it => it.length > 10)
      return {
        hash: item.hash,
        timeStamp: item.timeStamp,
        from: txsGetData[0],
        to: txsGetData[1],
        amount: txsGetData[2] ? txsGetData[2].slice(8).split(' ')[0].length > 30 ? 0 : txsGetData[2].slice(8).split(' ')[0] : 0
      }
    })
    // const res = await data.reduce(async (chain, item, index) => {
    //   const txsLink = `https://explorer.persistence.one/component/transactionMessages?txHash=${item}`
    //   const txsfetch = await axios.get(txsLink)
    //   const txsData = txsfetch.data
    //   const eleTxs = cheerio.load(txsData)
    //   const txsGetData = eleTxs('.infoRowValue').text().split('\n').filter(it => it.length > 10)
    //   const data = await chain
    //   data.push({
    //     hash: returnHistory[index].hash,
    //     timeStamp: returnHistory[index].timeStamp,
    //     from: txsGetData[0],
    //     to: txsGetData[1],
    //     amount: txsGetData[2].slice(8).split(' ')[0]
    //   })
    //   return data
    // }, [])
    // return res
    return arrTransactionFormated
  }

  static async postGateWayMatic (address, page, size) {
    let link = `https://polygon-explorer-mainnet.chainstacklabs.com/address/${address}/transactions?type=JSON`
    let arrTxs = []

    for (let i = 0; i < Math.ceil(page * size / 50); i++) {
      const res = await fetch(link)
      const resJSon = await res.json()

      const resData = resJSon.items.map(it => {
        const ele = cheerio.load(it)
        return {
          hash: ele('.text-truncate').attr().href.replace('/tx/', ''),
          from: ele('.d-md-none').text().slice(0, 42),
          to: ele('.d-md-none').text().slice(42, 84),
          timeStamp: (new Date(ele('.order-2').attr()['data-from-now'])).getTime() / 1000,
          amount: ele('.tile-title').html().replace('\n', '').replace('\n', '').replace('MATIC', '').trim()
        }
      })
      link = `https://polygon-explorer-mainnet.chainstacklabs.com${resJSon.next_page_path}&type=JSON`
      arrTxs = arrTxs.concat(resData)
    }
    return arrTxs.slice((page - 1) * size, page * size)
  }

  static async postGateWayFantom (address, page, limit, token) {
    const link = await createHttpLink({ uri: 'https://xapi31.fantom.network/api', fetch })
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: link
    })
    let i = 0
    let isMax = false
    let nextCusor = null
    let res
    let arrTxs = []
    while ((token ? arrTxs.length < page * limit : i < page) && !isMax) {
      res = await client.query({
        query: gql`
      query AccountByAddress($address: Address!, $cursor: Cursor, $count: Int!) {
        account(address: $address) {
          address
        
          txCount
          txList(cursor: $cursor, count: $count) {
            pageInfo {
              first
              last
              hasNext
              hasPrevious
              __typename
            }
            totalCount
            edges {
              cursor
              transaction {
                hash
                from
                to
                value
                gasUsed
                contractAddress
                inputData
                block {
                  number
                  timestamp
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        
          
          __typename
        }
      }
        `,
        variables: {
          address: address,
          count: limit - 1,
          cursor: nextCusor
        }
      })
      i++
      isMax = !res.data.account.txList.pageInfo.hasNext
      nextCusor = res.data.account.txList.pageInfo.last
      const filteredTxs = res.data.account.txList.edges.filter(it => (it.transaction.to === token || it.transaction.from === token))
      arrTxs = [...arrTxs, ...filteredTxs]
    }
    return token ? arrTxs.slice((page - 1) * limit, page * limit) : res.data.account.txList.edges
  }

  static async postGateWayBand (address, page, size) {
    let currentFrom = 0
    const fetchTime = page * size / 50
    let arrTxs = []

    for (let index = 0; index < fetchTime; index++) {
      const serverUrl = `https://api-band.cosmostation.io/v1/account/new_txs/${address}?from=${currentFrom}&limit=50`
      const response = await axios.get(serverUrl)

      if (getLength(response.data) > 0) {
        arrTxs = [...arrTxs, ...response.data]
        currentFrom = response.data[response.data.length - 1].header.id
      }
    }

    if (getLength(arrTxs) > 0) {
      return arrTxs.slice((page - 1) * size, page * size)
    }
    return null
  }

  static async postGateWayKava (address, page, size) {
    return []
    // let currentFrom = 0
    // const fetchTime = page * size / 50
    // let arrTxs = []

    // for (let index = 0; index < fetchTime; index++) {
    //   const serverUrl = `https://api-kava.cosmostation.io/v1/account/new_txs/${address}?from=${currentFrom}&limit=50`
    //   const response = await fetch(serverUrl)

    //   const responseJson = await response.json()
    //   if (getLength(responseJson) > 0) {
    //     arrTxs = [...arrTxs, ...responseJson]
    //     currentFrom = responseJson[responseJson.length - 1].header.id
    //   }
    // }

    // if (getLength(arrTxs) > 0) {
    //   return arrTxs.slice((page - 1) * size, page * size)
    // }
    // return null
  }

  static async postGateWayTerra (address, page, limit = 100) {
    let offset = 0
    let isMax = false
    let i = 1
    let response
    let responseJson

    while (i <= page && !isMax) {
      const serverUrl = `https://fcd.terra.dev/v1/txs?offset=${offset}&limit=${limit}&account=${address}&chainId=columbus-4`
      response = await fetch(serverUrl)
      responseJson = await response.json()
      if (responseJson.next) {
        i++
        offset = responseJson.next
      } else {
        isMax = true
      }
    }

    if (response.status === 200) {
      return responseJson
    }
    return null
  }

  static async postGateWayTron (address, page, limit, contractAddress) {
    try {
      let serverUrl = `https://apilist.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=${limit}&start=${page}&address=${address}&tokens=_`

      if (contractAddress) {
        serverUrl = `https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${page}&sort=-timestamp&count=true&tokens=${contractAddress}&relatedAddress=${address}`
      }

      const params = {
        method: REQUEST_TYPE.GET,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      var response = await fetch(serverUrl, params)
      const responJson = await response.json()

      if (response.status === 200) {
        return contractAddress ? responJson.token_transfers : responJson.data
      }

      if (response.status === 400) {
        return null
      }
      return null
    } catch (error) {
      return null
    }
  }

  static async postGateWayOkex (address, page, size, tokenAddress) {
    const time = new Date().getTime()
    let link = `https://www.oklink.com/api/explorer/v1/okexchain/addresses/${address}/transactions/condition?t=${time}&offset=${(page - 1) * size}&limit=${size}`
    if (tokenAddress) {
      link = `https://www.oklink.com/api/explorer/v1/okexchain/addresses/${address}/transfers/condition?t=${time}&offset=${(page - 1) * size}&limit=${size}&tokenAddress=${tokenAddress}&tokenType=OIP20`
    }

    const payload = await axios.get(link)

    if (payload.data) {
      return payload.data.data
    } else {
      return []
    }
  }

  static async postGateWayThor (address, page) {
    try {
      const serverUrl = `https://api.viewblock.io/thorchain/addresses/${address}?network=chaosnet&page=${page}`
      const params = {
        method: REQUEST_TYPE.GET,
        headers: {
          Origin: 'https://viewblock.io',
          Accept: 'application/json'
        }
      }
      const response = await fetch(serverUrl, params)
      const responseJson = await response.json()
      if (response.status === 200) {
        return responseJson.txs.docs
      }
      return null
    } catch (err) {
      return null
    }
  }

  static async postGateWayFunctionX (address, page, size) {
    try {
      const serverUrl = 'https://explorer.functionx.io/explorer/graphql'
      const params = {
        method: REQUEST_TYPE.POST,
        body: JSON.stringify({
          query: `{\n  txPage(chainId: null, height: null, operateAddress: null, accountAddress: "${address}", page: { index: ${page}, size: ${size} }) {\n  txs {\n  txTime\n hash\n  msgs {\n  amount\n  symbol\n  from\n to\n  }\n  result\n }\n  }\n}`
        })
      }

      const response = await fetch(serverUrl, params)

      const responseJson = await response.json()

      if (getLength(responseJson.data.txPage.txs) > 0) {
        const data = responseJson.data.txPage.txs.map(it => {
          const msgx = it.msgs[0]

          return {
            hash: it.hash,
            from: msgx.from,
            to: msgx.to,
            amount: convertWeiToBalance(msgx.amount),
            timestamp: it.txTime

          }
        })
        return data
      }

      return []
    } catch (error) {
      clog('FunctionX history error ', error)
      return []
    }
  }

  static async postGateWayComos (address, page, size) {
    try {
      const fetchTime = page * size / 50
      let arrTxs = []
      let currentFrom = 0

      for (let index = 0; index < fetchTime; index++) {
        const serverUrl = `https://api.cosmostation.io/v1/account/new_txs/${address}?from=${currentFrom}&limit=50`
        const response = await fetch(serverUrl)

        const responseJson = await response.json()
        if (getLength(responseJson) > 0) {
          arrTxs = [...arrTxs, ...responseJson]
          currentFrom = responseJson[responseJson.length - 1].header.id
        } else {
          break
        }
      }

      if (getLength(arrTxs) > 0) {
        return arrTxs.slice((page - 1) * size, page * size)
      }
      return null
    } catch (error) {
      return null
    }
  }

  static async postGateWayPolkadot (address, page, size, chain) {
    try {
      const serverUrl = `https://explorer-32.polkascan.io/api/v1/${chain}/extrinsic?filter[address]=${address}&page[size]=${size}&page[num]=${page}`
      const serverUrlTransfer = `https://explorer-32.polkascan.io/api/v1/${chain}/balances/transfer?filter[address]=${address}&page[size]=${size}&page[num]=${page}`

      var response = await fetch(serverUrl)
      var responseTransfer = await fetch(serverUrlTransfer)

      const responJson = await response.json()
      const responJsonTransfer = await responseTransfer.json()

      if (response.status === 200) {
        return { data: responJson.data, transfer: responJsonTransfer.data }
      }

      if (response.status === 400) {
        return null
      }
      return null
    } catch (error) {
      return null
    }
  }

  static async postGateWayThetaNetwork (address, chain, token, page, size) {
    try {
      const isGetToken = getLength(token) > 0
      if (isGetToken) {
        const currPage = 1
        const url = `https://explorer.thetatoken.org:8443/api/account/tokenTx/${address}?type=TNT-20&pageNumber=${currPage}&limit=100`
        let arrTokenTxs = []
        while (getLength(arrTokenTxs) < parseInt(page) * parseInt(size)) {
          const response = await fetch(url)
          const responseJson = await response.json()

          const arrFetchTokenTxs = responseJson.body.filter(it => it.contract_address === lowerCase(token))
          arrTokenTxs = arrTokenTxs.concat(arrFetchTokenTxs)
          const totalPage = responseJson.totalPageNumber

          if (currPage === totalPage) break
        }
        const arrFinalTokenTxs = arrTokenTxs.slice((parseInt(page) - 1) * parseInt(size), parseInt(page) * parseInt(size))

        if (getLength(arrFinalTokenTxs) === 0) {
          return []
        }

        return arrFinalTokenTxs.map(it => {
          return {
            hash: it.hash,
            from: it.from,
            to: it.to,
            timestamp: it.timestamp,
            amount: convertWeiToBalance(it.value, 18)
          }
        })
      } else {
        const url = `https://explorer.thetatoken.org:8443/api/accounttx/${address}?type=-1&pageNumber=${page}&limitNumber=${size}&isEqualType=true&types=["2","7"]`
        const response = await fetch(url)
        const responseJson = await response.json()
        const finalData = responseJson.body.map((it, index) => {
          const isGetFirst = it.type === 2
          const getValue = chain === chainType.theta ? 'thetawei' : 'tfuelwei'
          if (!isGetFirst) {
            const foundValue = Object.values(it.data).filter(data => data.address).find(data => lowerCase(data.address) === lowerCase(address))
            const fromData = (it.data.from)
            const toData = (it.data.to)
            return {
              hash: it.hash,
              timeStamp: it.timestamp,
              from: fromData.address,
              to: toData.address,
              amount: convertWeiToBalance(foundValue.coins[getValue], 18)
            }
          } else {
            const foundValue = Object.values(it.data).filter(data => (data[0] && data[0].address)).find(data => lowerCase(data[0].address) === lowerCase(address))
            const fromData = it.data.inputs[0]
            const toData = it.data.outputs[0]
            return {
              hash: it.hash,
              timeStamp: it.timestamp,
              from: fromData.address,
              to: toData.address,
              amount: convertWeiToBalance(foundValue[0].coins[getValue], 18)
            }
          }
        })
        return finalData
      }
    } catch (error) {
      return []
    }
  }

  static async postGateWayPlaton (address, token, page, size) {
    const isGetToken = getLength(token) > 0

    if (isGetToken) {
      const currPage = 1
      const url = 'https://scan.platon.network/browser-server/token/arc20-tx/list'
      let arrTokenTxs = []
      while (getLength(arrTokenTxs) < parseInt(page) * parseInt(size)) {
        const payload = await axios.post(url, { pageNo: currPage, pageSize: 10, txType: '', address: address })

        const arrFetchTokenTxs = payload.data.data.filter(it => it.contract === lowerCase(token))
        arrTokenTxs = arrTokenTxs.concat(arrFetchTokenTxs)
        const totalPage = payload.data.totalPages

        if (currPage === totalPage) break
      }
      const arrFinalTokenTxs = arrTokenTxs.slice((parseInt(page) - 1) * parseInt(size), parseInt(page) * parseInt(size))

      if (getLength(arrFinalTokenTxs) === 0) {
        return []
      }

      return arrFinalTokenTxs.map(it => {
        return {
          hash: it.txHash,
          from: it.txFrom,
          to: it.transferTo,
          timestamp: it.blockTimestamp,
          amount: it.value
        }
      })
    } else {
      const url = 'https://scan.platon.network/browser-server/transaction/transactionListByAddress'
      const payload = await axios.post(url, { pageNo: page, pageSize: size, txType: '', address: address })

      return payload.data.data.map(it => {
        return {
          hash: it.txHash,
          from: it.from,
          to: it.to,
          timestamp: it.timestamp,
          value: it.value
        }
      })
    }
  }

  static async postGateWayCasper (address, page, size) {
    const convertAddress = Buffer.from(
      uint8ArrayPkToAccountHash(publicKeyFromPkHex(address))
    ).toString('hex')

    const url = `https://event-store-api-clarity-mainnet.make.services/accounts/${convertAddress}/transfers?page=${page}&limit=${size}&with_extended_info=1`

    const response = await fetch(url)
    const responseJson = await response.json()

    return responseJson.data.map(it => {
      return {
        hash: get(it, 'deployHash', ''),
        from: get(it, 'fromAccountPublicKey', ''),
        to: get(it, 'toAccountPublicKey', ''),
        timeStamp: get(it, 'timestamp', ''),
        amount: convertWeiToBalance(get(it, 'amount', ''), 9)
      }
    })
  }

  static async postGateWayTon (address, page, size) {
    const url = `https://toncenter.com/api/v2/getTransactions?address=${address}&limit=${page * size}&to_lt=0&archival=false`

    const response = await fetch(url)
    const responseJson = await response.json()

    return responseJson.result.slice((parseInt(page) - 1) * parseInt(size), parseInt(page) * parseInt(size)).map(it => {
      return {
        hash: get(it, '.transaction_id.hash', ''),
        from: get(it, '.in_msg.source', ''),
        to: get(it, '.in_msg.destination', ''),
        timeStamp: get(it, 'utime', ''),
        amount: convertWeiToBalance(get(it, '.in_msg.value', ''), 9)
      }
    })
  }

  static async postGateWayEther (action, queryStr = '', chain) {
    try {
      const serverUrl = LINK_EXPLORER_API[chain]
      const params = {
        method: REQUEST_TYPE.GET,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      var response = await fetch(serverUrl + action + queryStr, params)
      const responJson = await response.json()
      if (response.status === 200) {
        return responJson
      }

      if (response.status === 400) {
        return responJson
      }
      return null
    } catch (error) {
      return null
    }
  }

  static async postGateWay (url, method = REQUEST_TYPE.GET, body, queryBody) {
    try {
      const params = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      if (body) {
        params.body = JSON.stringify(body)
      }

      let queryStr = ''

      if (queryBody) {
        queryStr = '?' + QueryString.stringify(queryBody)
      }
      const response = await fetch('https://scan.tomochain.com/api/' + url + queryStr, params)
      const responJson = await response.json()
      if (response.status === 200) {
        return responJson.items
      }

      if (response.status === 400) {
        return responJson
      }
      return null
    } catch (error) {
      return null
    }
  }

  static async formatTransactionV2Cosmos (arrTxs, usrAddr) {
    return arrTxs.map(it => {
      const stateOutput = {
        chain: chainType.cosmos,
        input: '',
        timeStatmp: (new Date(it.header.timestamp)).getTime() / 1000,
        hash: it.data.txhash
      }
      const arrMessages = it.data.tx.body.messages
      const foundMessage = it.data.tx.body.messages.find(it => (it.from_address === usrAddr || it.to_address === usrAddr || it.validator_address === usrAddr || it.delegator_address === usrAddr))
      stateOutput.tx = it.data.tx.body.messages[0]
      const txType = arrMessages[0]['@type'].split('.')[3]
      stateOutput.type = 'callContract'

      switch (txType) {
      case 'MsgSend': {
        const from = foundMessage.from_address
        const to = foundMessage.to_address
        stateOutput.type = from === to ? 'self' : (usrAddr === from ? 'send' : 'receive')
        stateOutput.from = from
        stateOutput.to = to
        stateOutput.amount = convertWeiToBalance(foundMessage.amount[0].amount, 6)
        break
      }
      case 'MsgSwapWithinBatch': {
        stateOutput.type = 'swap'
        stateOutput.from = usrAddr
        stateOutput.amount = convertWeiToBalance(it.data.tx.body.messages[0].offer_coin.amount, 6)
        break
      }
      case 'MsgDepositWithinBatch': {
        const depositeAtom = it.data.tx.body.messages[0].deposit_coins.find(it => it.denom === 'uatom')
        stateOutput.type = 'depositWithinBatch'
        stateOutput.from = usrAddr
        stateOutput.amount = convertWeiToBalance(depositeAtom ? depositeAtom.amount : 0, 6)
        break
      }
      case 'MsgVote': {
        stateOutput.from = usrAddr
        break
      }
      default: {
        const from = foundMessage ? foundMessage.delegator_address : it.data.tx.body.messages[0].delegator_address
        const to = foundMessage ? foundMessage.validator_address : it.data.tx.body.messages[0].validator_address
        const amount = foundMessage ? foundMessage.amount[0] ? foundMessage.amount[0].amount : foundMessage.amount ? foundMessage.amount.amount : 0 : 0
        stateOutput.from = from
        stateOutput.to = to
        stateOutput.amount = convertWeiToBalance(amount, 6)
      }
      }
      return stateOutput
    })
  }

  static async formatTransactionV2Kava (arrTxs, usrAddr) {
    return arrTxs.map(it => {
      const stateOutput = {
        chain: chainType.kava,
        input: '',
        timeStatmp: (new Date(it.header.timestamp)).getTime() / 1000,
        hash: it.data.txhash,
        type: 'callContract'
      }
      const type = it.data.tx.value.msg[0].type.split('/')[1]
      stateOutput.txType = type
      stateOutput.tx = it.data.tx.value.msg[0].value
      const message = it.data.tx.value.msg[0].value
      switch (type) {
      case 'MsgSend': {
        stateOutput.type = message.from_address === message.to_address ? 'self' : (usrAddr === message.from_address ? 'send' : 'receive')
        stateOutput.from = message.from_address
        stateOutput.to = message.to_address
        stateOutput.amount = convertWeiToBalance(message.amount[0].amount, 6)
        break
      }
      case 'MsgRepayDeb': {
        const amount = message.payment.amount
        stateOutput.from = message.sender
        stateOutput.amount = convertWeiToBalance(amount, 6)
        break
      }
      default: {
        const from = message.delegator_address || message.sender || message.depositor
        const to = message.validator_address
        const amount = message.amount ? message.amount[0] ? message.amount[0].amount : message.amount.amount : 0
        stateOutput.from = from
        stateOutput.to = to
        stateOutput.amount = convertWeiToBalance(amount, 6)
      }
      }

      return stateOutput
    })
  }
}
