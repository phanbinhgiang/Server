import { KEY_EXPLORER_API, LINK_EXPLORER_API } from '../../../common/constants'
import axios from 'axios'
import sample from 'lodash/sample'
import get from 'lodash/get'
import QueryString from 'query-string'
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
const axiosInstance = axios.create(config)

export default class EVMScanServices {
  static fetchUrlEVMScan (chain, queryValue) {
    const linkScan = LINK_EXPLORER_API[chain]
    const apiKey = sample(KEY_EXPLORER_API[chain])
    const queryString = QueryString.stringify(Object.assign({ apiKey }, queryValue))
    return linkScan + queryString
  }

  static async fetchEVMScan (chain, queryValue) {
    const linkScan = EVMScanServices.fetchUrlEVMScan(chain, queryValue)
    const payload = await axiosInstance.get(linkScan)
    return get(payload, 'data')
  }
}
