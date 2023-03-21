import { fetchAPI } from '../common/function'

export default class CurrencyCoversion {
  static async getRateCryptoCurrency (ids = 'bitcoin') {
    try {
      const responJson = await fetchAPI(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
      return responJson ? responJson[ids].usd : 0
    } catch (error) {
      console.log(error)
      return 0
    }
  }
}
