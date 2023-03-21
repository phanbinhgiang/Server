import cryptoBladesABI from './cryptoBladesABI'
import Web3 from 'web3'
const web3Binance = new Web3('https://bsc-dataseed.binance.org/')

export default class CryptoBladesServices {
  static async getContract (type) {
    const contractAddressType = {
      weapon: '0x7e091b0a220356b157131c831258a9c98ac8031a',
      shield: '0xf9E9F6019631bBE7db1B71Ec4262778eb6C3c520',
      character: '0xc6f252c2CdD4087e30608A35c022ce490B58179b'
    }
    return new web3Binance.eth.Contract(cryptoBladesABI, contractAddressType[type])
  }

  static async getAllAsset (req, res) {
    const { ownerAddress, type, page = 1, size = 10 } = req.query
    const arrAsset = type !== 'all' ? [type] : ['weapon', 'shield', 'character']

    const payload = {}

    for (const asset of arrAsset) {
      const assetContract = await CryptoBladesServices.getContract(asset)
      const address = ownerAddress.toLowerCase()
      const totalAsset = await assetContract.methods.balanceOf(address).call()
      const arrID = []
      const startNum = (page - 1) * size
      const endNum = page * size < totalAsset ? page * size : totalAsset
      for (let i = startNum; i < endNum; i++) {
        const payload = await assetContract.methods.tokenOfOwnerByIndex(address, i).call()
        arrID.push(payload)
      }
      payload[asset] = arrID
    }
    res.json(payload)
  }
}
