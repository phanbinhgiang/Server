
import Web3 from 'web3'
import { ethers } from 'ethers'
import converter from 'hex2dec'
import {
  convertWeiToBalance, convertBalanceToWei, logDebug,
  generateDataToken,
  getLength,
  generateID,
  fetchAPI
} from '../common/function'
import random from 'lodash/random'

import { connect, keyStores } from 'near-api-js'
import moment from 'moment'
import tokenApprove from './tokenApprove'
import abiReward from './abiReward'
import abiUpDown from './abiUpDown'
import abiLottery from './abiLottery'
import abiSwap from './abiSwap'
import BaseAPI from '../controller'
import { Wallet } from '../model'
import LotteryServices from '../controller/lottery'
import ConfigServices from '../controller/config'
import { isMain, CONTRACT_UP_DOWN, CONTRACT_SWAP_COIN, CONTRACT_BUY_ADDRESS, CONTRACT_TICKET_GAME, chainType, CHAIN_DATA } from '../common/constants'
import * as bip39 from 'bip39'
import nacl from 'tweetnacl'
import * as web3Solana from '@solana/web3.js'
import { Base64 } from 'js-base64'
import * as BufferLayout from 'buffer-layout'
import SolanaServices from '../source/services/solana/index'
const TronWeb = require('tronweb')

export const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  solidityNode: 'https://api.trongrid.io',
  eventServer: 'https://api.trongrid.io',
  privateKey: 'd1299bf83d9819560b90957253b6e481faf54f88374f0525b660dfa63a2b4b5c'
})

const connectionSolana = new web3Solana.Connection('https://solana-api.projectserum.com', 'recent')

const networkId = 'mainnet'

const config = {
  networkId,
  keyStore: new keyStores.InMemoryKeyStore(),
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://wallet.${networkId}.near.org`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://explorer.${networkId}.near.org`
}

let near

connect(config).then(resultData => {
  near = resultData
})

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(isMain ? 'https://rpc.tomochain.com' : 'https://testnet.tomochain.com'))
const web3Provider = new ethers.providers.Web3Provider(web3.currentProvider)

const addressBalances = {
  ether: '0xb1F8e55c7f64D203C1400B9D8555d050F94aDF39',
  binanceSmart: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
  heco: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
  tomo: '0x82D4AF55a1fd48A3EDEa63be462C3D07940c4C9e',
  avax: '0xf7eee3a8363731c611a24cddfcbcade9c153cfe8'
}

const rpcLink = {
  avax: 'https://api.avax.network/ext/bc/C/rpc',
  ether: 'https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570',
  binanceSmart: 'https://bsc-dataseed.binance.org/',
  heco: 'https://http-mainnet.hecochain.com',
  tomo: 'https://rpc.tomochain.com'
}

export const blankAddr = '0x0000000000000000000000000000000000000000'
const blankCode = '0x0000000000000000000000000000000000000000000000000000000000000000'

const solanWeb3Link = 'https://solana-api.projectserum.com'

const TOKEN_PROGRAM_ID = new web3Solana.PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
)

const LAYOUT = BufferLayout.union(BufferLayout.u8('instruction'))
LAYOUT.addVariant(
  0,
  BufferLayout.struct([
    BufferLayout.u8('decimals'),
    BufferLayout.blob(32, 'mintAuthority'),
    BufferLayout.u8('freezeAuthorityOption'),
    BufferLayout.blob(32, 'freezeAuthority')
  ]),
  'initializeMint'
)
LAYOUT.addVariant(1, BufferLayout.struct([]), 'initializeAccount')
LAYOUT.addVariant(
  3,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'transfer'
)
LAYOUT.addVariant(
  7,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'mintTo'
)
LAYOUT.addVariant(
  8,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'burn'
)

const instructionMaxSpan = Math.max(
  ...Object.values(LAYOUT.registry).map((r) => r.span)
)

const encodeTokenInstructionData = (instruction) => {
  const b = Buffer.alloc(instructionMaxSpan)
  const span = LAYOUT.encode(instruction, b)
  return b.slice(0, span)
}

const transfer = ({ source, destination, amount, owner }) => {
  const keys = [
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: true, isWritable: false }
  ]
  return new web3Solana.TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      transfer: { amount }
    }),
    programId: TOKEN_PROGRAM_ID
  })
}

export const genWeb3 = (chain, isProvider, isRandom) => {
  let provider = chain === 'rinkeby' ? 'https://data-seed-prebsc-1-s1.binance.org:8545' : CHAIN_DATA[chain].rpcURL

  if (isRandom) {
    const isBNB = chain === chainType.binanceSmart

    if (isBNB) {
      const listArr = [
        'https://bsc-mainnet.nodereal.io/v1/68ac333c4bc646df8ef23fe996dd6d83',
        'https://bsc-mainnet.nodereal.io/v1/5c4ed7c647c0479f9ae118b0b62c745c',
        'https://bsc-dataseed1.binance.org/',
        'https://bsc-dataseed2.binance.org/',
        'https://bsc-dataseed3.binance.org/',
        'https://bsc-dataseed4.binance.org/'
      ]

      const idx = random(0, 5)
      provider = listArr[idx]
    } else if (chain === chainType.ether) {
      const listArr = [
        'https://eth-mainnet.nodereal.io/v1/0e036bbd184b4d5999bb756ad0caadf0',
        'https://nd-882-009-235.p2pify.com/f2cfb8777ba44e372c9ab251b51980d8',
        'https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570'
      ]

      const idx = random(0, 2)
      provider = listArr[idx]
    }
  }

  const web3Generate = new Web3()
  web3Generate.setProvider(new web3.providers.HttpProvider(provider))
  return isProvider
    ? {
      web3Generate,
      provider: new ethers.providers.Web3Provider(web3Generate.currentProvider)
    } : web3Generate
}

export default class Web3Services {
  static async getTxsReceipt (hash, chain) {
    return new Promise((resolve, reject) => {
      try {
        const web3 = genWeb3(chain)
        web3.eth.getTransactionReceipt(hash, (err, receipt) => {
          if (!err && receipt) {
            return resolve({
              status: receipt.status
            })
          }
          console.log(err, hash)
          resolve(null)
        })
      } catch (error) {
        console.log(error)
        resolve(null)
      }
    })
  }

  static async trackingSolanaTxs (
    txid
  ) {
    try {
      const connectionSolana = SolanaServices.genConnectionLocal()

      const signatureStatuses = await connectionSolana.getSignatureStatuses([
        txid
      ])
      const result = signatureStatuses && signatureStatuses.value[0]
      if (!result) {
        return false
      } else if (result.err) {
        return { status: false }
      } else if (!result.confirmations) {
        return { status: true }
      } else {
        return { status: true }
      }
    } catch (error) {
      return { status: false }
    }
  }

  static async trackingTxs () {
    // const provider = 'wss://mainnet.infura.io/ws/v3/92d53cee52834368b0fabb42fa1b5570'

    // var web3 = new Web3(new Web3.providers.WebsocketProvider(provider))
    // const web3 = genWeb3(chainType.ether)

    // var subscription = web3.eth.subscribe('logs', {
    //   address: '0x4E281AdD1E87F5aa0fD9c39D8Bcfd7C1a6da61fD'
    // }, function (error, result) {
    //   console.log(error)
    //   if (!error) { console.log(result) }
    // })
    //   .on('data', function (log) {
    //     console.log(log)
    //   })
    //   .on('changed', function (log) {
    //   })
  }

  static async checkKeyInfura (req, res) {
    const resp = await fetchAPI(`https://mainnet.infura.io/v3/${req.params.id}`, { method: 'POST' })
    res.json(!!resp)
  }

  static async sendTokenSolana (to, amount, tokenAddress) {
    return new Promise(async (resolve, reject) => {
      const connectionSolana = new web3Solana.Connection(solanWeb3Link, 'recent')

      const seed = await bip39.mnemonicToSeed('episode lens glory amateur near pave actual top excite clutch absorb worry')

      const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32))
      const account = new web3Solana.Account(keyPair.secretKey)
      if (getLength(tokenAddress) > 0) {
        const transaction = new web3Solana.Transaction().add(
          transfer({
            source: new web3Solana.PublicKey(tokenAddress),
            destination: new web3Solana.PublicKey(to),
            owner: account.publicKey,
            amount: convertBalanceToWei(amount, 6)
          })
        )

        connectionSolana.sendTransaction(transaction, [account], { preflightCommitment: 'single' }).then(async (hash) => {
          try {
            await this.awaitTransactionSignatureConfirmation(hash)
            resolve(hash)
          } catch (error) {
            reject(error)
          }
        }).catch((error) => {
          reject(error.toString())
        })
      }
    })
  }

  static async getTokenInfo (contractAddress, chain = chainType.ether) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            inputs: [

            ],
            name: 'decimals',
            outputs: [
              {
                internalType: 'uint8',
                name: '',
                type: 'uint8'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          },
          {
            inputs: [

            ],
            name: 'name',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          },
          {
            inputs: [],
            name: 'symbol',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ]

        const web3 = genWeb3(chain)

        const contract = new web3.eth.Contract(minABI, contractAddress)

        const symbol = await contract.methods.symbol().call()
        const name = await contract.methods.name().call()
        const decimals = await contract.methods.decimals().call()

        resolve({ name, decimals, symbol })
      } catch (error) {
        resolve(false)
      }
    })
  }

  static convertCheckSUM (address) {
    try {
      return Web3.utils.toChecksumAddress(address)
    } catch (error) {
      return address
    }
  }

  static async awaitTransactionSignatureConfirmation (
    txid,
    timeout = 15000
  ) {
    const connectionSolana = new web3Solana.Connection(solanWeb3Link, 'recent')

    let done = false
    const result = await new Promise((resolve, reject) => {
      (async () => {
        setTimeout(() => {
          if (done) {
            return
          }
          done = true
          console.log('Timed out for txid', txid)
          reject({ timeout: true })
        }, timeout)
        try {
          connectionSolana.onSignature(
            txid,
            (result) => {
              console.log('WS confirmed', txid, result)
              done = true
              if (result.err) {
                logDebug(result.err)
                reject('messErr')
              } else {
                resolve(result)
              }
            },
            'recent'
          )
          console.log('Set up WS connection', txid)
        } catch (e) {
          done = true
          console.log('WS error in setup', txid, e)
        }
        while (!done) {
          // eslint-disable-next-line no-loop-func
          (async () => {
            try {
              const signatureStatuses = await connectionSolana.getSignatureStatuses([
                txid
              ])
              const result = signatureStatuses && signatureStatuses.value[0]
              if (!done) {
                if (!result) {
                  console.log('REST null result for', txid, result)
                } else if (result.err) {
                  logDebug(result.err)
                  console.log('REST error for', txid, result)
                  done = true
                  reject('error')
                } else if (!result.confirmations) {
                  console.log('REST no confirmations for', txid, result)
                  done = true
                  resolve(result)
                } else {
                  console.log('REST confirmation for', txid, result)
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

  static async getPolkadotChainBalance (chain, address) {
    const resp = await fetchAPI(`http://127.0.0.1:3056/web3/polkadot/${chain}/${address}`)
    return resp
  }

  static async getTokenBalanceByChain (contractAddress, address, decimalToken, chain = chainType.solana, solTokenAddress) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        }
      ]

      if (chain === chainType.tron) {
        tronWeb.contract().at(contractAddress).then(contract => {
          contract.balanceOf(address).call().then(balance => {
            const tokenBalance = convertWeiToBalance(balance, decimalToken)
            resolve(tokenBalance)
          }).catch(() => resolve(0))
        }).catch(() => resolve(0))
      } else if (chain === chainType.solana) {
        const fetchToken = await Web3Services.checkTokenSolanaExist({ address: contractAddress, decimal: decimalToken }, address, solTokenAddress)
        resolve(fetchToken ? fetchToken.amount : 0)
      } else {
        const web3 = genWeb3(chain)

        const contract = new web3.eth.Contract(minABI, contractAddress)

        contract.methods.balanceOf(address).call().then(balance => {
          if (decimalToken) {
            const tokenBalance = convertWeiToBalance(balance, decimalToken)
            resolve(tokenBalance)
          } else {
            contract.methods.decimals().call().then(decimal => {
              const tokenBalance = convertWeiToBalance(balance, decimal)
              resolve(tokenBalance)
            }).catch(err => {
              logDebug(err)
              const tokenBalance = convertWeiToBalance(balance, 18)
              resolve(tokenBalance)
            })
          }
        }).catch(err => {
          logDebug(err)
          resolve(0)
        })
      }
    })
  }

  static async getETHBalance (address, chain = chainType.tomo) {
    return new Promise(async (resolve, reject) => {
      if (chain === chainType.tomo) {
        web3.eth.getBalance(address).then(async (response) => {
          resolve(convertWeiToBalance(response))
        }).catch(err => {
          reject(err)
        })
      } else if (chain === chainType.solana) {
        const balance = await connectionSolana.getBalance(new web3Solana.PublicKey(address))
        resolve(convertWeiToBalance(balance, 9))
      } else if (chain === chainType.celo) {
        const web3Celo = new Web3()
        web3Celo.setProvider(new web3.providers.HttpProvider('https://rc1-forno.celo-testnet.org'))

        web3Celo.eth.getBalance(address).then(async (response) => {
          resolve(convertWeiToBalance(response))
        }).catch(err => {
          reject(err)
        })
      } else if (chain === chainType.tron) {
        tronWeb.trx.getBalance(address).then(response => {
          resolve(convertWeiToBalance(response, 6))
        }).catch(() => resolve(0))
      } else if (chain === chainType.binance) {
        resolve(0)
      }
    })
  }

  static async fetchBalanceSolana (secKey) {
    const seed = await bip39.mnemonicToSeed(Base64.decode(secKey))
    const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32))
    const account = new web3Solana.Account(keyPair.secretKey)
    // const balance = await connectionSolana.getConfirmedSignaturesForAddress(account.publicKey, 0, 10000)
    const balance = await connectionSolana.getBalance(account.publicKey)
    return convertWeiToBalance(balance, 9)
  }

  static async getNounce (address) {
    const nounce = await web3.eth.getTransactionCount(address)
    return nounce
  }

  static async createContractAPI (contractABI, contractAddress) {
    return new web3.eth.Contract(contractABI, contractAddress)
  }

  static async getAddressCode (address) {
    const code = await web3.eth.getCode(address)
    return code
  }

  static async checkIsContract (address) {
    const code = await web3.eth.getCode(address)
    return code !== '0x'
  }

  static async getBuyerInfo (rewardID) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)
      contractBuy.methods.getBuyerInfo(this.convertToAscii(rewardID)).call().then(result => {
        const convertResult = {
          buyerID: result.buyerID.map(itm => itm),
          timeBuyList: result.timeBuyList
        }
        resolve(convertResult)
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async getTokenSupply (contractAddress) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const contractReward = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)

      contract.methods.totalSupply().call().then(totalSupply => {
        contractReward.methods.totalDonate().call().then(totalDonate => {
          resolve({ supply: convertWeiToBalance(totalSupply), donate: convertWeiToBalance(totalDonate) })
        }).catch(err => {
          logDebug(err)
          reject(err)
        })
      }).catch(err => {
        logDebug(err)
        reject(err)
      })
    })
  }

  static async web3GetOrder (req, res) {
    BaseAPI.authorizationAPI(req, res, async () => {
      const orderSetting = await Web3Services.getOrderInformation()
      const period = await Web3Services.getPeriodPlay()
      res.json({
        orderSetting,
        period
      })
    })
  }

  static async getLotteryConfig (req, res) {
    BaseAPI.authorizationAPI(req, res, async () => {
      const lotterySetting = await Web3Services.getLotteryInformation()
      const period = await Web3Services.getPeriodLottery()
      res.json({
        lotterySetting,
        period
      })
    })
  }

  static async getTicketDetail (ticketID) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiLottery, CONTRACT_TICKET_GAME)
      contractBuy.methods.Tickets(Web3Services.convertToAscii(ticketID)).call().then(result => {
        resolve(result)
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async getLotteryInformation () {
    return new Promise(async (resolve, reject) => {
      const contractGame = new web3.eth.Contract(abiLottery, CONTRACT_TICKET_GAME)

      contractGame.methods.winnerRatio().call().then(winnerRatio => {
        contractGame.methods.highlightFee().call().then(highlightFee => {
          contractGame.methods.anonymousFee().call().then(anonymousFee => {
            contractGame.methods.refRatio().call().then(refRatio => {
              contractGame.methods.refRatioAfter().call().then(refRatioAfter => {
                contractGame.methods.charityRatio().call().then(charityRatio => {
                  contractGame.methods.ticketPrice().call().then(ticketPrice => {
                    resolve({
                      ticketPrice: convertWeiToBalance(ticketPrice),
                      highlight: convertWeiToBalance(highlightFee),
                      anonymous: convertWeiToBalance(anonymousFee),
                      winnerRatio: winnerRatio / 1000,
                      refRatio: refRatio / 1000,
                      refRatioAfter: refRatioAfter / 1000,
                      charityRatio: charityRatio / 1000
                    })
                  }).catch(() => {
                    resolve(null)
                  })
                }).catch(() => {
                  resolve(null)
                })
              }).catch(() => {
                resolve(null)
              })
            }).catch(() => {
              resolve(null)
            })
          }).catch(() => {
            resolve(null)
          })
        }).catch(() => {
          resolve(null)
        })
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async sendSetLottery (req, res) {
    const { isMega, privateKey, lotteryID } = req.body
    try {
      const newLotteryID = generateID()

      const lotterySetting = await ConfigServices.getLocal('lotterySetting')

      const timeClose = moment(lotterySetting.timeSetting[isMega ? 'mega' : 'daily'])

      const timeEnd = moment()
      const timeStart = moment()
      const hoursClose = timeClose.hours()
      const minutesClose = timeClose.minutes()

      if (hoursClose === 0 && minutesClose === 0) {
        timeEnd.set('hours', 24)
        timeEnd.set('minutes', 0)
        timeEnd.set('seconds', 0)
      } else {
        timeEnd.set('hours', hoursClose)
        timeEnd.set('minutes', minutesClose)
        timeEnd.set('seconds', 0)
      }

      if (new Date() > timeEnd) {
        timeEnd.add(1, 'days')
      }

      // const contractGame = new web3.eth.Contract(abiLottery, CONTRACT_TICKET_GAME)
      // const dataTx = lotteryID
      //   ? contractGame.methods.resetTimeCloseMega(Web3Services.convertToAscii(lotteryID), timeEnd.unix()).encodeABI()
      //   : contractGame.methods.setNewLottery(Web3Services.convertToAscii(newLotteryID), timeStart.unix(), timeEnd.unix(), isMega).encodeABI()

      // const setTxsData = {
      //   to: CONTRACT_TICKET_GAME,
      //   data: dataTx,
      //   value: 0
      // }

      const callback = (hash) => {
        lotteryID
          ? LotteryServices.updateNewGame(lotteryID, new Date(timeEnd))
          : LotteryServices.createNewGame(newLotteryID, hash, new Date(timeEnd), isMega)
      }

      const findActive = await LotteryServices.checkAgainActive(isMega)

      if (lotteryID || !findActive) {
        callback()
        // Web3Services.postBaseSendTxs([setTxsData], false, callback, privateKey).then(response => {
        //   res.json({ hash: response[0], id: newLotteryID })
        // }).catch((error) => {
        //   console.log(error)
        //   res.json(null)
        // })
      } else {
        res.json(null)
      }
    } catch (error) {
      console.log(error)
      res.json(null)
    }
  }

  static async checkEthDataV2 (address, tokenAddress, chain = chainType.ether, decimal) {
    return new Promise(async (resolve, reject) => {
      const web3Ether = new Web3()
      web3Ether.setProvider(new web3.providers.HttpProvider(rpcLink[chain]))

      const abi = [{
        constant: true,
        inputs: [{ name: 'user', type: 'address' }, { name: 'token', type: 'address' }],
        name: 'tokenBalance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }, {
        constant: true,
        inputs: [{ name: 'users', type: 'address[]' }, { name: 'tokens', type: 'address[]' }],
        name: 'balances',
        outputs: [{ name: '', type: 'uint256[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }, { payable: true, stateMutability: 'payable', type: 'fallback' }]

      const contractWeb3 = new web3Ether.eth.Contract(abi, addressBalances[chain])

      contractWeb3.methods.balances(address, [tokenAddress]).call().then(resultData => {
        const mapData = resultData.map((item, index) => {
          const formatBalance = parseFloat(item)
          if (formatBalance >= 10) {
            const addressCheck = address[index]
            return {
              address: addressCheck,
              balance: parseFloat(convertWeiToBalance(formatBalance, decimal))
            }
          } else {
            return null
          }
        })

        resolve(mapData.filter(item => item))
      }).catch((err) => {
        resolve(err)
      })
    })
  }

  static async checkEthData (address, tokenData, chain = chainType.ether) {
    return new Promise(async (resolve, reject) => {
      const web3Ether = new Web3()
      web3Ether.setProvider(new web3.providers.HttpProvider(rpcLink[chain]))

      const abi = [{
        constant: true,
        inputs: [{ name: 'user', type: 'address' }, { name: 'token', type: 'address' }],
        name: 'tokenBalance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }, {
        constant: true,
        inputs: [{ name: 'users', type: 'address[]' }, { name: 'tokens', type: 'address[]' }],
        name: 'balances',
        outputs: [{ name: '', type: 'uint256[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }, { payable: true, stateMutability: 'payable', type: 'fallback' }]

      const contractWeb3 = new web3Ether.eth.Contract(abi, addressBalances[chain])

      contractWeb3.methods.balances([address], tokenData.map(item => item.address)).call().then(resultData => {
        const mapData = resultData.map((item, index) => {
          const formatBalance = parseFloat(item)
          if (formatBalance > 0) {
            const tokenCheck = tokenData[index]
            return {
              balance: convertWeiToBalance(formatBalance, tokenCheck.decimal),
              tokenInfo: {
                cgkId: tokenCheck.cgkId,
                address: tokenCheck.address,
                symbol: tokenCheck.symbol,
                name: tokenCheck.name,
                decimals: tokenCheck.decimal,
                image: tokenCheck.image
              }
            }
          } else {
            return null
          }
        })

        resolve(mapData.filter(item => item))
      }).catch((err) => {
        resolve(err)
      })
    })
  }

  static async checkTimeClose (lotteryID) {
    const getLottery = await LotteryServices.getById(lotteryID)

    const unitTimeStamp = new Date().getTime()

    const fetchPrice = await fetchAPI(`https://api.binance.com/api/v3/aggTrades?startTime=${unitTimeStamp - (6000 * 3)}&endTime=${unitTimeStamp}&symbol=BTCUSDT`)
    console.log(fetchPrice)
    if (getLength(fetchPrice) > 0) {
      const arrTimeList = fetchPrice.map(item => item.T)

      var closest = arrTimeList.reduce(function (prev, curr) {
        return (Math.abs(curr - unitTimeStamp) < Math.abs(prev - unitTimeStamp) ? curr : prev)
      })

      const findMatchingIndex = arrTimeList.indexOf(closest)
      console.log(fetchPrice[findMatchingIndex])
      const closePrice = parseFloat(fetchPrice[findMatchingIndex].p)
    }
  }

  static async getPeriodPlay () {
    return new Promise(async (resolve, reject) => {
      const contractGame = new web3.eth.Contract(abiUpDown, CONTRACT_UP_DOWN)
      contractGame.methods.periodPlay().call().then(periodPlay => {
        contractGame.methods.periodCountDown().call().then(periodCountDown => {
          resolve({
            periodPlay,
            periodCountDown
          })
        }).catch(() => {
          resolve(null)
        })
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async sendUpdateGameContract (req, res) {
    return new Promise(async (resolve, reject) => {
      const { name, params, params2 } = req.body
      try {
        const contractReward = new web3.eth.Contract(abiUpDown, CONTRACT_UP_DOWN)

        let param = params
        if (name === 'changeAnonymous' || name === 'changeHighlightFee') {
          param = convertBalanceToWei(param)
        }

        let dataTx = contractReward.methods[name](param).encodeABI()

        if (params2) {
          dataTx = contractReward.methods[name](convertBalanceToWei(params), convertBalanceToWei(params2)).encodeABI()
        }

        const setPriceData = {
          to: CONTRACT_UP_DOWN,
          data: dataTx
        }
        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendUpdateGameLottery (req, res) {
    return new Promise(async (resolve, reject) => {
      const { name, params, params2 } = req.body
      try {
        const contractReward = new web3.eth.Contract(abiLottery, CONTRACT_TICKET_GAME)

        let param = params
        if (name === 'changeAnonymous' || name === 'changeHighlightFee') {
          param = convertBalanceToWei(param)
        }

        const dataTx = contractReward.methods[name](param, params2).encodeABI()

        const setPriceData = {
          to: CONTRACT_TICKET_GAME,
          data: dataTx
        }
        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async getLotteryDetailNet (req, res) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiLottery, CONTRACT_TICKET_GAME)
      contractBuy.methods.Lotteries(Web3Services.convertToAscii(req.body.id)).call().then(result => {
        console.log(result)
        res.json(result)
      }).catch(() => {
        res.json(null)
      })
    })
  }

  static async getOrderDetailNet (req, res) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiUpDown, CONTRACT_UP_DOWN)
      contractBuy.methods.Orders(Web3Services.convertToAscii(req.body.orderId)).call().then(result => {
        console.log(result)
        res.json(result)
      }).catch(() => {
        res.json(null)
      })
    })
  }

  static async getOrderDetail (orderId) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiUpDown, CONTRACT_UP_DOWN)
      contractBuy.methods.Orders(Web3Services.convertToAscii(orderId)).call().then(result => {
        resolve(result)
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async updateStatusSend (privateKey, isSending) {
    await Wallet.findOneAndUpdate({ privateKey }, { isSending }, { new: true }, (err, result) => {
      if (result || !err) {
        return result
      } else {
        return false
      }
    })
  }

  static async getTokenBalance (contractAddress, address, decimalToken, chain) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        }
      ]

      if (chain === chainType.tron) {
        tronWeb.contract().at(contractAddress).then(contract => {
          contract.balanceOf(address).call().then(balance => {
            const tokenBalance = convertWeiToBalance(balance, decimalToken)
            resolve(tokenBalance)
          }).catch(() => resolve(0))
        }).catch(() => resolve(0))
      } else {
        let web3Run = web3
        if (chain === chainType.celo) {
          const web3Celo = new Web3()
          web3Celo.setProvider(new web3.providers.HttpProvider('https://rc1-forno.celo-testnet.org'))
          web3Run = web3Celo
        }

        const contract = new web3Run.eth.Contract(minABI, contractAddress)

        contract.methods.balanceOf(address).call().then(balance => {
          if (decimalToken) {
            const tokenBalance = convertWeiToBalance(balance, decimalToken)
            resolve(tokenBalance)
          } else {
            contract.methods.decimals().call().then(decimal => {
              const tokenBalance = convertWeiToBalance(balance, decimal)
              resolve(tokenBalance)
            }).catch(err => {
              logDebug(err)
              const tokenBalance = convertWeiToBalance(balance, 18)
              resolve(tokenBalance)
            })
          }
        }).catch(err => {
          logDebug(err)
          reject(err)
        })
      }
    })
  }

  static async getTokenName (contractAddress) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [
            {
              name: '',
              type: 'string'
            }
          ],
          payable: false,
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(minABI, contractAddress)

      contract.methods.name().call().then(name => {
        resolve(name)
      }).catch(err => {
        logDebug(err)
        reject(err)
      })
    })
  }

  static async getTokenDecimalName (contractAddress) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        },
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [
            {
              name: '',
              type: 'string'
            }
          ],
          payable: false,
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(minABI, contractAddress)
      contract.methods.decimals().call().then(decimal => {
        contract.methods.symbol().call().then(name => {
          resolve({
            name, decimal
          })
        }).catch(() => {
          resolve(null)
        })
      }).catch(() => {
        resolve(null)
      })
    })
  }

  static async getTokenDecimal (contractAddress) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(minABI, contractAddress)
      contract.methods.decimals().call().then(decimal => {
        resolve(decimal)
      }).catch(() => {
        resolve(18)
      })
    })
  }

  static convertToAscii (code) {
    return Web3.utils.asciiToHex(code)
  }

  static convertAsciiToString (code) {
    return Web3.utils.hexToAscii(code)
  }

  static convertHextoDec (code) {
    return Web3.utils.hexToNumberString(code)
  }

  static async getPriceReward (req, res) {
    return new Promise(async (resolve, reject) => {
      const contractBuy = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)
      contractBuy.methods.getPrice(Web3Services.convertToAscii(req.body.id)).call().then(result => {
        const { price, quantity, brand, code, buyerLength } = result

        const convertResult = {
          price: convertWeiToBalance(price),
          quantity,
          brand: brand,
          code: code === blankCode ? '' : code,
          percent_Charity: result.percent_Charity,
          buyerLength: parseInt(buyerLength)
        }
        console.log(convertResult)
        res.json(convertResult)
      }).catch((err) => {
        console.log(err)
        res.json(null)
      })
    })
  }

  static async sendWidthrawC98 (req, res) {
    return new Promise((resolve, reject) => {
      try {
        const contractSwap = new web3.eth.Contract(abiSwap, CONTRACT_SWAP_COIN)

        const dataTx = contractSwap.methods.withdrawC98(convertBalanceToWei(req.body.amount)).encodeABI()

        const setPriceData = {
          to: CONTRACT_SWAP_COIN,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendWidthrawTomo (req, res) {
    return new Promise((resolve, reject) => {
      try {
        const contractSwap = new web3.eth.Contract(abiSwap, CONTRACT_SWAP_COIN)

        const dataTx = contractSwap.methods.withdrawTomo(convertBalanceToWei(req.body.amount)).encodeABI()

        const setPriceData = {
          to: CONTRACT_SWAP_COIN,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendOnOffSwap (req, res) {
    return new Promise((resolve, reject) => {
      try {
        const { tomo, c98 } = req.body
        const contractSwap = new web3.eth.Contract(abiSwap, CONTRACT_SWAP_COIN)

        const dataTx = contractSwap.methods.changeOnOffC(tomo, c98).encodeABI()

        const setPriceData = {
          to: CONTRACT_SWAP_COIN,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendUpdateFee (req, res) {
    return new Promise((resolve, reject) => {
      try {
        const { tomo, c98 } = req.body
        const contractSwap = new web3.eth.Contract(abiSwap, CONTRACT_SWAP_COIN)
        console.log(tomo)
        console.log(c98)
        const dataTx = contractSwap.methods.changeFee(tomo * 10, c98 * 10).encodeABI()

        const setPriceData = {
          to: CONTRACT_SWAP_COIN,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        res.json(false)
      }
    })
  }

  static async sendUpdateCharityAddress (req, res) {
    return new Promise(async (resolve, reject) => {
      const { address } = req.body
      try {
        const contractReward = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)

        const dataTx = contractReward.methods.changeCharity(address).encodeABI()

        const setPriceData = {
          to: CONTRACT_BUY_ADDRESS,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendUpdatePeriodToBuy (req, res) {
    return new Promise(async (resolve, reject) => {
      const { periodToBuy } = req.body
      try {
        const contractReward = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)

        const dataTx = contractReward.methods.changePeriodToBuy(periodToBuy).encodeABI()

        const setPriceData = {
          to: CONTRACT_BUY_ADDRESS,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendChangePriceSwap (req, res) {
    return new Promise(async (resolve, reject) => {
      const { c98, tomo } = req.body
      try {
        const contractSwap = new web3.eth.Contract(abiSwap, CONTRACT_SWAP_COIN)

        const dataTx = contractSwap.methods.changeRate(c98 * 1000, tomo * 1000).encodeABI()

        const setPriceData = {
          to: CONTRACT_SWAP_COIN,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendChangePriceReward (req, res) {
    return new Promise(async (resolve, reject) => {
      const { price } = req.body
      try {
        const contract = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)
        const dataTx = contract.methods.changeRateC98(price * 1000).encodeABI()

        const setPriceData = {
          to: CONTRACT_BUY_ADDRESS,
          data: dataTx
        }

        Web3Services.postBaseSendTxs([setPriceData], false, false, req.body.privatekey).then(hash => {
          res.json(hash[0])
        }).catch(() => {
          res.json(false)
        })
      } catch (error) {
        console.log(error)
        res.json(false)
      }
    })
  }

  static async sendSetPriceReward (rewardID, price, brand, code, quantity) {
    return new Promise((resolve, reject) => {
      try {
        const contract = new web3.eth.Contract(abiReward, CONTRACT_BUY_ADDRESS)
        const priceConvert = convertBalanceToWei(price)
        const dataTx = contract.methods.setPrice(Web3Services.convertToAscii(rewardID), converter.decToHex(priceConvert), quantity, brand, code).encodeABI()

        const setPriceData = {
          to: CONTRACT_BUY_ADDRESS,
          data: dataTx,
          value: 0
        }
        logDebug(setPriceData)
        Web3Services.postBaseSendTxs([setPriceData], false, false, process.env.PRIVATE_KEY).then(hash => {
          resolve(true)
        }).catch(() => {
          resolve(false)
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  /*
  For contract just need decimal and address only *Only in send token*
  */
  static async sendEthTokenTxs (toAddress, amount, sendContract, dataHistory) {
    return new Promise(async (resolve, reject) => {
      if (amount > 10) {
        resolve()
      } else {
        let contract = sendContract
        let isETHContract = false
        let dataForSend = ''

        if (!contract) {
          const isETH = await web3.eth.getCode(toAddress) === '0x'
          isETHContract = true
          if (!isETH) {
            contract = {
              address: toAddress,
              decimal: await Web3Services.getTokenDecimal(toAddress)
            }
          }
        }

        if (contract) {
          const amountConvert = convertBalanceToWei(amount, contract.decimal)
          dataForSend = generateDataToken(amountConvert, toAddress)
        }

        const generateTxs = {
          to: contract ? contract.address : toAddress,
          data: dataForSend
        }

        if (!sendContract && isETHContract) {
          generateTxs.value = amount
        }

        resolve(true)
      }
    })
  }

  static encodeApproveTxs (addressApprove, contractApproveForSend, approveValue) {
    const contractTokenApprove = new web3.eth.Contract(tokenApprove.abi, addressApprove)
    const dataTx = contractTokenApprove.methods.approve(contractApproveForSend, approveValue).encodeABI()
    return dataTx
  }

  static async estimateGasTxs (rawTransaction) {
    return new Promise(async (resolve, reject) => {
      web3.eth.estimateGas(rawTransaction).then(res => {
        logDebug('Gas estimate: ', res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  static async postBaseSendTxs (arrSend, isWaitDone, callback, privateKey, callbackDone) {
    return new Promise(async (resolve, reject) => {
      try {
        const ethWallet = new ethers.Wallet(privateKey || process.env.PRIVATE_KEY, web3Provider)

        const nonce = await web3.eth.getTransactionCount(ethWallet.address)
        const gasPrice = 10000000000
        const promise = arrSend.map(async (item, index) => {
          return new Promise(async (resolve, reject) => {
            const { to, data, value, percent, valueNoConvert } = item

            const rawTransaction = {
              nonce: nonce + index,
              to,
              from: ethWallet.address,
              gasPrice,
              data
            }

            if (percent) {
              rawTransaction.gasPrice = gasPrice * percent
            }

            if (value || valueNoConvert) {
              rawTransaction.value = converter.decToHex(valueNoConvert || convertBalanceToWei(value))
            }
            logDebug(rawTransaction)

            Web3Services.estimateGasTxs(rawTransaction).then(async (gasLimit) => {
              rawTransaction.gasLimit = '0x' + gasLimit.toString(16)

              delete rawTransaction.chainId
              delete rawTransaction.from
              console.log(rawTransaction)
              const signedTransaction = await ethWallet.sign(rawTransaction)
              let hashTxs
              web3.eth.sendSignedTransaction(signedTransaction, (error, result) => {
                if (error) {
                  reject(error)
                } else {
                  hashTxs = result
                  callbackDone && callbackDone(result)
                  !isWaitDone && resolve(result)
                }
              }).then(() => {
                setTimeout(() => {
                  callback && callback(hashTxs)
                }, 10000)
                isWaitDone && resolve(hashTxs)
              }).catch(error => {
                logDebug(error)
                isWaitDone && reject(error)
              })
            }).catch((err) => {
              logDebug('Gaslimit err: ' + err)
              reject(err)
            })
          })
        })

        Promise.all(promise).then(result => {
          console.log('Final send result')
          console.log(result)
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
