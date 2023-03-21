import Web3 from 'web3'
import { CHAIN_DATA, MAIN_COIN_AMM } from '../constants'
import { blockTimechain, providerWeb3 } from './constants'
import ERC20 from './abi/ERC20'
import ERC721 from './abi/ERC721'
import { tradeType } from '../../../common/constants'
import { convertBalanceToWei, convertDecimalToHex, convertHexToDecimal } from '../../../common/function'
import { recoverPersonalSignature } from 'eth-sig-util'
import { ethers } from 'ethers'
const tradeTypeByChain = {
  binanceSmart: tradeType.pancakeSwapV2,
  heco: tradeType.htMDex,
  baryon: 'baryon'
}

const CONFIG_CONTRACT = {
  starship: {
    version: '0.1.0', name: 'Starship'
  },
  dagoraLaunchpad: {
    name: 'Launchpad',
    version: '1'
  }
}
export default class EVMServices {
  static async signWhiteList ({ contract, chain, user, type }) {
    const signer = new ethers.Wallet(process.env.AUTHORITY_SIGNATURE_KEY)

    const chainSelected = chain === 'tesnet' ? { numChainId: 97 } : CHAIN_DATA[chain]

    const domain = {
      name: CONFIG_CONTRACT[type].name,
      version: CONFIG_CONTRACT[type].version,
      chainId: chainSelected.numChainId,
      verifyingContract: contract
    }

    const types = {
      Whitelist: [{ name: 'user', type: 'address' }]
    }
    const value = {
      user
    }

    const signMess = await signer._signTypedData(domain, types, value)
    return signMess
  }

  static decodeSignature (msg, sig) {
    return lowerCase(recoverPersonalSignature({
      data: `0x${Buffer.from(msg, 'utf8').toString('hex')}`,
      sig
    }))
  }

  static genWeb3 (chain) {
    const provider = providerWeb3[chain]
    if (!provider) return false
    const web3 = new Web3()
    web3.setProvider(new web3.providers.HttpProvider(provider))
    return web3
  }

  static genContract (web3, minABI, contractAddress) {
    return new web3.eth.Contract(minABI, contractAddress)
  }

  static convertCheckSUM (address) {
    try {
      return Web3.utils.toChecksumAddress(address)
    } catch (error) {
      return address
    }
  }

  static checkSumAddress (address) {
    try {
      return Web3.utils.isAddress(address)
    } catch (error) {
      return false
    }
  }

  static async getTokenOnchain (tokenAddress, chain) {
    const web3 = EVMServices.genWeb3(chain)
    const contract = EVMServices.genContract(web3, ERC20, tokenAddress)

    const namePromise = contract.methods.name().call()
    const decimalsPromise = contract.methods.decimals().call()
    const symbolPromise = contract.methods.symbol().call()
    const [name, decimals, symbol] = await Promise.all([namePromise, decimalsPromise, symbolPromise])
    return { name, decimals, symbol, address: tokenAddress, id: '' }
  }

  static async getNFTContractData (contractAddress, chain) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const contract = EVMServices.genContract(web3, ERC721, contractAddress)

      const namePromise = contract.methods.name().call()
      const symbolPromise = contract.methods.symbol().call()
      const [name, symbol] = await Promise.all([namePromise, symbolPromise])
      return { name, symbol, address: contractAddress }
    } catch (error) {
      return false
    }
  }

  static async getNFTContractDataFunc (contractAddress, chain, funcName) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const contract = EVMServices.genContract(web3, ERC721, contractAddress)
      const data = await contract.methods[funcName]().call()
      return data
    } catch (error) {
      return false
    }
  }

  static async getErc20TokenBalanceOfAddress (address, token, chain) {
    const web3 = EVMServices.genWeb3(chain)
    const contract = EVMServices.genContract(web3, ERC20, token)
    const balance = await contract.methods.balanceOf(address).call()
    return balance
  }

  static async getTxsByHashRequest (chain, hash, count = 1) {
    try {
      const web3EVM = EVMServices.genWeb3(chain)
      return await web3EVM.eth.getTransaction(hash)
    } catch (error) {
      if (count > 10) {
        return false
      } else {
        return EVMServices.getTxsByHashRequest(chain, hash, count + 1)
      }
    }
  }

  static async getTxsByHash (chain, hash) {
    try {
      const web3EVM = EVMServices.genWeb3(chain)
      return await web3EVM.eth.getTransaction(hash)
    } catch (error) {
      return false
    }
  }

  static async getTxsReceiptByHash (chain, hash) {
    const web3EVM = EVMServices.genWeb3(chain)
    return await web3EVM.eth.getTransactionReceipt(hash)
  }

  static async getTokenDecimal (chain, contractAddress) {
    return new Promise(async (resolve, reject) => {
      const web3EVM = EVMServices.genWeb3(chain)
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
      const contract = new web3EVM.eth.Contract(minABI, contractAddress)
      contract.methods.decimals().call().then(decimal => {
        resolve(decimal || 18)
      }).catch(() => {
        resolve(18)
      })
    })
  }

  static async estimateGasTxs (rawTransaction, web3, chain, defaultValue, chainCustom) {
    return new Promise(async (resolve, reject) => {
      const web3Run = web3 || EVMServices.genWeb3(chain, false, chainCustom)

      web3Run.eth.estimateGas(rawTransaction).then(res => {
        console.log('Estimate Gas', res)
        const limitGas = 21000
        resolve(res < limitGas ? limitGas : res)
      }).catch((err) => {
        console.log('🚀 ~ file: index.js:172 ~ EVMServices ~ web3Run.eth.estimateGas ~ err:', err)
        try {
          const convertErr = err.toString()
          if (convertErr.includes('max fee per gas')) {
            const splitGas = convertErr.match(/[0-9]+/g)
            const gasEst = splitGas[splitGas.length - 2]

            rawTransaction.gasPrice = convertDecimalToHex((gasEst * 1.05).toFixed(0))
            this.estimateGasTxs(rawTransaction, web3, chain, defaultValue).then(res => {
              console.log('Estimate Gas', res)
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          } else {
            if (convertErr.includes('chainId')) {
              delete rawTransaction.chainId
              this.estimateGasTxs(rawTransaction, web3, chain, defaultValue).then(res => {
                console.log('Estimate Gas', res)
                resolve(res)
              }).catch(err => {
                reject(err)
              })
            } else {
              if (defaultValue) {
                return resolve(defaultValue)
              }
              return resolve(false)
            }
          }
        } catch (error) {
          console.log('🚀 ~ file: index.js:202 ~ EVMServices ~ web3Run.eth.estimateGas ~ error:', error)
          reject(err)
        }
      })
    })
  }

  static async postBaseSendTxs (web3, chain, privateKey, to, data, value, isWaitDone) {
    return new Promise(async (resolve, reject) => {
      try {
        // check wallet return
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey)
        const nonce = await web3.eth.getTransactionCount(wallet.address)
        const chainSelected = chain === 'rinkeby' ? { chainId: '0x61' } : CHAIN_DATA[chain]

        const gasPrice = await web3.eth.getGasPrice()

        const rawTransaction = {
          nonce,
          to,
          from: wallet.address,
          data,
          value: '0x0',
          gasPrice,
          chainId: chainSelected.chainId
        }

        console.log({ rawTransaction })

        const estGas = await EVMServices.estimateGasTxs(Object.assign({}, rawTransaction), web3)

        if (!estGas) {
          return resolve(false)
        }
        const gas = convertDecimalToHex(estGas.toFixed(0))

        const stateObject = { gas }

        if (rawTransaction.chainId) {
          rawTransaction.chainId = convertHexToDecimal(rawTransaction.chainId)
        }
        // Send from Dapps
        if (value) {
          stateObject.value = convertDecimalToHex(convertBalanceToWei(value))
        }
        const rawHashTxs = await web3.eth.accounts.signTransaction(Object.assign(rawTransaction, stateObject), privateKey)

        console.log(rawHashTxs.rawTransaction)

        const signedTransaction = rawHashTxs.rawTransaction

        // sign txs error
        const runSignedTxs = () => {
          const returnData = { hash: '', gasLimit: rawTransaction.gasLimit, data: rawTransaction.data }
          web3.eth.sendSignedTransaction(signedTransaction, (err, hash) => {
            console.log('Hash txs ', hash)
            if (err) {
              reject(err)
            } else {
              returnData.hash = hash
              !isWaitDone && resolve(hash)
            }
          }).then((responseFinal) => {
            isWaitDone && resolve(returnData.hash)
          }).catch(() => {
            isWaitDone && resolve(returnData.hash)
          })
        }
        return runSignedTxs()
      } catch (err) {
        console.log('🚀 ~ file: index.js:271 ~ EVMServices ~ returnnewPromise ~ err:', err)
        reject(err)
      }
    })
  }

  static async getBlockTimestamp (blockNumber, chain) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const blockData = await web3.eth.getBlock(blockNumber)
      return blockData.timestamp
    } catch (error) {
      return false
    }
  }

  static getTimestampByBlock (block, time, calcBlock, chain) {
    return time - (block - calcBlock) * blockTimechain[chain]
  }

  static async decodeBase64ToJson (base64) {
    try {
      const blobFile = await fetch(base64).then((res) => res.blob())
      const urlTwat = URL.createObjectURL(blobFile)
      const data = await fetch(urlTwat).then((res) => res.json())
      console.log({ data })
      return data
    } catch (err) {
      return {}
    }
  }
}
