import _ from 'lodash'
import axios from 'axios'

const REST_API_COSMOS = {
  sei: 'https://rest-sei-test.ecostake.com/'
}

const MSG_TYPE = {
  '/cosmos.bank.v1beta1.MsgSend': 'send'
}

export default class CosmosServices {
  static async syncHistory (address, chain) {
    const receiveApi = `${REST_API_COSMOS[chain]}/cosmos/tx/v1beta1/txs?events=coin_received.receiver=%27${address}%27`
    const sendApi = `${REST_API_COSMOS[chain]}/cosmos/tx/v1beta1/txs?events=message.sender=%27${address}%27`

    let finalData = []

    try {
      const [resReceive, resSend] = await Promise.all([axios.get(receiveApi), axios.get(sendApi)])

      const arrReceive = resReceive.data.tx_responses || []
      const arrSend = resSend.data.tx_responses || []

      finalData = _.uniqBy(_.concat(arrReceive, arrSend), it => JSON.stringify(it))
    } catch (e) {
      return []
    }

    finalData = finalData.map(it => {
      const tx = _.first(it.tx.body.messages)
      const msgType = _.get(tx, '@type')

      let txType = 'executeContract'
      if (MSG_TYPE[msgType] === 'send') {
        if (tx.from_address === tx.to_address) {
          txType = 'self'
        } else if (tx.from_address === address) {
          txType = 'send'
        } else {
          txType = 'receive'
        }
      }

      return {
        from: tx.from_address,
        to: tx.to_address,
        hash: it.txhash,
        chain,
        amount: get(_.first(tx.amount), 'amount'),
        type: txType,
        timestamp: it.timestamp
      }
    })

    return finalData.flat()
  }
}
