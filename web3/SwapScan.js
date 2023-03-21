import { fetchAPI } from '../common/function'

export default class SwapScan {
  static async getSwapRemain (address) {
    const result = await this.getData(`swaps_from/sol/${address}`)
    return result
  }

  static async getData (path) {
    const result = await this.postGateWay('GET', path)
    return result
  }

  static async getSwapInfo (coin, address, isETH) {
    const stateGet = {
      blockchain: isETH ? 'eth' : 'sol',
      address
    }
    if (coin) stateGet.coin = coin

    const result = await this.postGateWay(
      'POST',
      'swap_to',
      stateGet
    )
    return result
  }

  static async postGateWay (method, path, body) {
    const headers = {}
    const params = { headers, method }
    if (method === 'GET') {
      params.cache = 'no-cache'
    } else if (body) {
      headers['Content-Type'] = 'application/json'
      params.body = JSON.stringify(body)
    }

    const resp = await fetchAPI(`https://swap.sollet.io/api/${path}`, params)
    return resp
  }
}
