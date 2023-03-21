import axios from 'axios'
import { chainType, tradeType } from '../common/constants'
import { convertBalanceToWei, convertWeiToBalance } from '../common/function'

export default class SolanaServices {
  static async getTxsDetail (txHash) {
    const link = `https://api.solscan.io/transaction?tx=${txHash}`
    const payload = await axios.get(link)
    if (payload.data) {
      return payload.data
    } else {
      return null
    }
  }

  static formatTransactionSolana (transaction, userAddress) {
    const stateOutput = {
      chain: chainType.solana,
      hash: transaction.txHash,
      timeStamp: transaction.blockTime * 1000,
      type: 'callContract',
      from: userAddress
    }
    const type = transaction.parsedInstruction[0].type
    switch (type) {
    case 'sol-transfer': {
      stateOutput.form = transaction.parsedInstruction[0].params.source
      stateOutput.to = transaction.parsedInstruction[0].params.destination
      stateOutput.value = convertWeiToBalance(transaction.parsedInstruction[0].params.amount, 9)
      stateOutput.type = transaction.parsedInstruction[0].params.source === transaction.parsedInstruction[0].params.destination ? 'self' : (transaction.parsedInstruction[0].params.destination === userAddress ? 'receive' : 'send')
      break
    }

    case 'spl-transfer': {
      stateOutput.form = transaction.parsedInstruction[0].params.source
      stateOutput.to = transaction.parsedInstruction[0].params.destination
      stateOutput.value = convertWeiToBalance(transaction.parsedInstruction[0].params.amount, transaction.parsedInstruction[0].extra.decimal)
      stateOutput.type = transaction.parsedInstruction[0].params.source === transaction.parsedInstruction[0].params.destination ? 'self' : (transaction.parsedInstruction[0].params.destination === userAddress ? 'receive' : 'send')
      stateOutput.contractAddress = transaction.parsedInstruction[0].extra.tokenAddress
      break
    }

    case 'newOrderV3': {
      // make new order
      const tokenTrade = transaction.tokenBalanes.find(it => it.token.symbol === transaction.serum_transactions[0].newOrder.baseTokenSymbol)

      stateOutput.type = 'swap'
      stateOutput.value = convertBalanceToWei(transaction.serum_transactions[0].newOrder.amount, tokenTrade.token.decimals)
      stateOutput.from = userAddress
      stateOutput.swapType = tradeType.serumDEXV3
      stateOutput.fromContractAddress = transaction.serum_transactions[0].newOrder.baseTokenAddress
      stateOutput.contractAddress = transaction.serum_transactions[0].newOrder.quoteTokenAddress

      // order complete
      if (transaction.serum_transactions && transaction.serum_transactions[1]) {
        stateOutput.value = transaction.serum_transactions[0].newOrder.event[0].amount
        stateOutput.fromContractAddress = transaction.serum_transactions[0].newOrder.event[0].tokenAddress
        const toTransfer = transaction.serum_transactions[1].settleFunds.transfers.filter(it => it.symbol === transaction.serum_transactions[0].newOrder.quoteTokenSymbol)
        const toValue = toTransfer.reduce((total, item) => +total + +item.amount, 0)
        stateOutput.toValue = toValue
      }
      break
    }
    default: {
      break
    }
    }
    return stateOutput
  }
}
