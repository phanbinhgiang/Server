import EVMServices from '.'
import BaryonPoolABI from './abi/BaryonPool'
import BaryonFarmABI from './abi/BaryonStake'
const InputDataDecoder = require('ethereum-input-data-decoder')

export default class BaryonServices {
  static async getPoolLpInfo (poolAddress, chain) {
    try {
      const web3 = EVMServices.genWeb3(chain)
      const contract = EVMServices.genContract(web3, BaryonPoolABI, poolAddress)
      const reserversPromise = contract.methods.getReserves().call()
      const totalSupplyPromise = contract.methods.totalSupply().call()

      const [reservers, totalSupply] = await Promise.all([reserversPromise, totalSupplyPromise])
      return { token0Amount: reservers[0], token1Amount: reservers[1], totalSupply }
    } catch (error) {
      return {}
    }
  }

  static async getFarmLpAmount (userAddress, pid, chain, contractAddress) {
    const web3 = EVMServices.genWeb3(chain)
    const contract = EVMServices.genContract(web3, BaryonFarmABI, contractAddress)

    const userInfo = await contract.methods.userInfo(pid, userAddress).call()

    return userInfo ? userInfo.amount : 0
  }

  static decodeDataStake (input) {
    const decoder = new InputDataDecoder(BaryonFarmABI)
    const resultDecode = decoder.decodeData(input)
    return resultDecode
  }
}
