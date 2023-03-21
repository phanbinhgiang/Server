
import Web3 from 'web3'
import { convertWeiToBalance } from '../common/function'
import { isMain } from '../common/constants'

const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(isMain
  ? 'https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570'
  : 'https://kovan.infura.io/v3/92d53cee52834368b0fabb42fa1b5570'
))

export default class Web3ServicesEther {
  static async getETHBalance (address) {
    return new Promise(async (resolve, reject) => {
      web3.eth.getBalance(address).then(async (response) => {
        resolve(convertWeiToBalance(response))
      }).catch(err => {
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
        contract.methods.name().call().then(name => {
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

  static async getTokenBalance (contractAddress, address, decimalToken) {
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
      const contract = new web3.eth.Contract(minABI, contractAddress)

      contract.methods.balanceOf(address).call().then(balance => {
        if (decimalToken) {
          const tokenBalance = convertWeiToBalance(balance, decimalToken)
          resolve(tokenBalance)
        } else {
          contract.methods.decimals().call().then(decimal => {
            const tokenBalance = convertWeiToBalance(balance, decimal)
            resolve(tokenBalance)
          }).catch(() => {
            const tokenBalance = convertWeiToBalance(balance, 18)
            resolve(tokenBalance)
          })
        }
      }).catch(() => {
        resolve(0)
      })
    })
  }
}
