import { PublicKey } from '@solana/web3.js'
import { BorshCoder } from '@project-serum/anchor'
import { SarosFarmIdl } from './sarosFarmId'
import SolanaServices from '.'
import * as borsh from '@project-serum/borsh'
import BN from 'bn.js'
import Base58 from 'base-58'
import BorshServices from './borsh'
import ElasticSearchServices from '../../../controller/elasticSearch'
import { JSBI, Pair, Percent, Token, TokenAmount } from '@uniswap/sdk'
import { TokenSwapLayout, TOKEN_PROGRAM_LAYOUT } from './layout'
import { convertBalanceToWei, getEvmAddress, scientificToDecimal } from '../../../common/function'
import { stableCoinSolana, stableSolanaMint, tradeTypeData } from '../../worker/saros/constant'
import { fetchCacheRedisLocal, getStorage, onlyUnique } from '../../worker/function'
import { BIPS_BASE, computeTradePriceBreakdown, exactTradeAmount } from '../../../controller/smartRouter'
import { SarosPool, SarosSwap } from '../../../model'

const coder = new BorshCoder(SarosFarmIdl)
const coinSwap98Key = 98
export default class SarosServices {
  static async findUserPoolAddress (
    ownerAddress,
    poolAddress,
    sarosFarmProgramAddress
  ) {
    return PublicKey.findProgramAddress(
      [new PublicKey(ownerAddress).toBytes(), new PublicKey(poolAddress).toBytes()],
      new PublicKey(sarosFarmProgramAddress)
    )
  }

  static decodeUserPoolAccount (
    data
  ) {
    const result = coder.accounts.decode('UserPool', data)
    return result
  }

  static async getTokenAccountInfo (
    address
  ) {
    const connection = SolanaServices.genConnectionLocal()
    const accountInfo = await connection.getAccountInfo(new PublicKey(address))
    if (accountInfo) {
      const data = SarosServices.decodeTokenAccountInfo(accountInfo.data)
      data.address = address
      return data
    }
    return {
      address, mint: 'So11111111111111111111111111111111111111112'
    }
  }

  static async getPoolAccountInfoLocal (
    address
  ) {
    const connection = SolanaServices.genConnectionLocal()
    const accountInfo = await connection.getAccountInfo(new PublicKey(address))
    if (accountInfo) {
      const data = SarosServices.decodePoolAccountInfo(accountInfo.data)
      data.address = address
      return data
    }
    return {
      address, mint: 'So11111111111111111111111111111111111111112'
    }
  }

  static decodeTokenAccountInfo (data) {
    const decodedData = SolanaServices.deserializeLocal(
      TOKEN_PROGRAM_LAYOUT.TOKEN_ACCOUNT,
      data
    )
    return {
      mint: decodedData.mint,
      owner: decodedData.owner,
      amount: decodedData.amount,
      delegate: decodedData.delegateOption === 0 ? null : decodedData.delegate,
      delegatedAmount:
        decodedData.delegateOption === 0
          ? new BN(0)
          : decodedData.delegatedAmount,
      isInitialized: decodedData.state !== 0,
      isFrozen: decodedData.state === 2,
      isNative: decodedData.isNativeOption === 1,
      rentExemptReserve:
        decodedData.isNativeOption === 1 ? decodedData.isNative : null,
      closeAuthority:
        decodedData.closeAuthorityOption === 0
          ? null
          : decodedData.closeAuthority
    }
  }

  static decodePoolAccountInfo (data, owner) {
    const dataDecoded = SolanaServices.deserializeLocal(TokenSwapLayout, data)
    return {
      version: dataDecoded.version,
      isInitialized: dataDecoded.isInitialized !== 0,
      nonce: dataDecoded.bumpSeed,
      tokenProgramId: dataDecoded.tokenProgramId,
      lpTokenMint: dataDecoded.tokenPool,
      feeAccount: dataDecoded.feeAccount,
      token0Mint: dataDecoded.mintA,
      token0Account: dataDecoded.tokenAccountA,
      token1Mint: dataDecoded.mintB,
      token1Account: dataDecoded.tokenAccountB,
      tradeFeeNumerator: dataDecoded.tradeFeeNumerator,
      tradeFeeDenominator: dataDecoded.tradeFeeDenominator,
      ownerTradeFeeNumerator: dataDecoded.ownerTradeFeeNumerator,
      ownerTradeFeeDenominator: dataDecoded.ownerTradeFeeDenominator,
      ownerWithdrawFeeNumerator: dataDecoded.ownerWithdrawFeeNumerator,
      ownerWithdrawFeeDenominator: dataDecoded.ownerWithdrawFeeDenominator,
      hostFeeNumerator: dataDecoded.hostFeeNumerator,
      hostFeeDenominator: dataDecoded.hostFeeDenominator,
      curveType: dataDecoded.curveType,
      curveParameters: dataDecoded.curveParameters,
      owner
    }
  }

  static async getIsNewSwapLocal (transactionData) {
    try {
      const instructions = get(transactionData, 'transaction.message.instructions', [])

      const dataLayout = borsh.struct([
        borsh.u8('instruction'),
        borsh.u64('amountIn'),
        borsh.u64('minimumAmountOut'),
        borsh.u8('keyCoin98')
      ])

      const isCoin98 = instructions.map((item, index) => {
        try {
          const dataTxs = get(item, 'data', '')
          if (getLength(dataTxs) === 0) {
            return false
          }
          const dataBytes = Buffer.from(Base58.decode(dataTxs))

          const dataDecoded = BorshServices.deserialize(dataLayout, dataBytes)
          if (dataDecoded.keyCoin98 === coinSwap98Key) {
            return true
          }
          return false
        } catch (err) {
          return false
        }
      })

      if (getLength(isCoin98.filter(it => it)) > 0) {
        return true
      } else {
        const foundTokenBalanceFeeWallet = transactionData.meta.postTokenBalances.find(tkBl => tkBl.owner === process.env.SAROS_FEE_V2_WALLET)
        if (!foundTokenBalanceFeeWallet) {
          return false
        }
        const signer = transactionData.transaction.message.accountKeys.find(it => it.signer)

        return signer.pubkey !== foundTokenBalanceFeeWallet.owner
      }
    } catch (err) {
      return false
    }
  }

  static async getAmountUsdTokenLocal (token, amount) {
    try {
      if (!token || !token.mintAddress) {
        return 0
      }

      if (stableSolanaMint.includes(token.mintAddress)) {
        return amount
      }

      const sPool = await ElasticSearchServices.getAggregatorSwapLocal(token.mintAddress, stableCoinSolana.mintAddress, 'solana')
      const arrSarosActivePool = await fetchCacheRedisLocal('POOL_ACTIVE_SAROS', 60000, async () => {
        const fPool = await SarosPool.find({
          isActive: true,
          'token0.mintAddress': { $exists: true },
          'token1.mintAddress': { $exists: true },
          'token0.symbol': { $exists: true },
          'token1.symbol': { $exists: true }
        }, { id: 1, _id: 0 })
        return fPool.map(it => it.id)
      })
      const poolFilter = sPool.filter(it => it.token0 && it.token1 && ((arrSarosActivePool.includes(it.id) && it.token0 && it.token1) || (lowerCase(it.tradeType) !== 'saros')))
      const sCash = 'CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT'
      const pool = (await Promise.all(poolFilter.map(async (it) => {
        const token0 = await SolanaServices.getSolanaTokenByMintLocal(it.token0)
        const token1 = await SolanaServices.getSolanaTokenByMintLocal(it.token1)
        if (!token0) {
          console.log(it.token0)
        }
        if (!token1) {
          console.log(it.token1)
        }
        return {
          id: it.id,
          token0Amount: it.token0Amount,
          token0Address: it.token0,
          token1Amount: it.token1Amount,
          token1Address: it.token1Amount,
          totalLiquidity: it.totalLiquidity,
          tradeType: it.tradeType,
          token0,
          token1
        }
      }))).filter(it => it.token0 && it.token1 && it.token0.mintAddress !== sCash && it.token1.mintAddress !== sCash)

      const amountCalculate = await SarosServices.calculatePoolLocal(pool, token, stableCoinSolana, amount, 0)

      return amountCalculate ? parseFloat(amountCalculate.amount) : 0
    } catch (err) {
      return 0
    }
  }

  static async calculatePoolLocal (listPool, token0, token1, amount, slippage) {
    const pool = listPool.slice()
    const mapPool = pool.map(pl => {
      return [pl.token0.mintAddress, pl.token1.mintAddress]
    })

    const uniqAddress = [].concat.apply([], mapPool).filter(onlyUnique)

    const sizeAddress = getLength(uniqAddress)
    const mkAddress = getEvmAddress(sizeAddress)

    const mapFinalKey = uniqAddress.map((ak, idx) => {
      return {
        key: ak,
        address: mkAddress[idx]
      }
    })

    const pairInside = pool.map(pl => {
      const findToken0 = mapFinalKey.find(fn => fn.key === pl.token0.mintAddress)
      const findToken1 = mapFinalKey.find(fn => fn.key === pl.token1.mintAddress)

      try {
        return new Pair(
          new TokenAmount(new Token(1, findToken0.address, pl.token0.decimals, pl.token0.symbol, pl.id), scientificToDecimal(parseFloat(convertBalanceToWei(pl.token0Amount, pl.token0.decimals)).toFixed(0))),
          new TokenAmount(new Token(1, findToken1.address, pl.token1.decimals, pl.token1.symbol, pl.id), scientificToDecimal(parseFloat(convertBalanceToWei(pl.token1Amount, pl.token1.decimals)).toFixed(0))), 1
        )
      } catch (error) {
        return false
      }
    })

    const token0New = mapFinalKey.find(fn => fn.key === token0.mintAddress)

    const token1New = mapFinalKey.find(fn => fn.key === token1.mintAddress)

    if (!token0New || !token1New) {
      return false
    }

    delete token0.address
    delete token1.address

    const newToken0 = {
      address: token0New.address,
      decimals: token0.decimals,
      symbol: token0.symbol,
      name: token0.name
    }
    const newToken1 = {
      address: token1New.address,
      decimals: token1.decimals,
      symbol: token1.symbol,
      name: token1.name
    }

    const tradeBase = exactTradeAmount('ether', pairInside,
      newToken0,
      newToken1, amount, true)

    if (!tradeBase) return false

    const encodeData = []

    const pathRouter = tradeBase.route.path

    const sizePath = getLength(tradeBase.route.pairs)

    const mapRouter = tradeBase.route.pairs.map((pt, idxp) => {
      const currency0Path = pt.tokenAmounts[0].currency

      const isLastPath = idxp === sizePath - 1
      const currency0 = pathRouter[idxp]
      const currency1 = pathRouter[idxp + 1]

      const amountIn = idxp === 0 ? amount : encodeData[idxp - 1]

      const tradeBaseInside = exactTradeAmount('ether', pairInside, currency0, currency1, scientificToDecimal(amountIn), true)

      const findSolToken0 = mapFinalKey.find(fn => fn.address === currency0.address)
      const findSolToken1 = mapFinalKey.find(fn => fn.address === currency1.address)
      const findPool = pool.find(p => p.id === currency0Path.name)

      encodeData.push(tradeBaseInside.outputAmount.toSignificant(6))

      let amountOut = tradeBaseInside.outputAmount.toSignificant(6)

      if (isLastPath) {
        amountOut = tradeBaseInside.minimumAmountOut(new Percent(JSBI.BigInt(Math.floor(slippage)), BIPS_BASE)).toSignificant(6)
      }

      const finalData = {
        amountIn: convertBalanceToWei(amountIn, currency0.decimals),
        amountOut: convertBalanceToWei(amountOut, currency1.decimals),
        address: findPool.id,
        type: tradeTypeData[findPool.tradeType],
        token0: findSolToken0.key,
        token1: findSolToken1.key
      }
      return finalData
    })
    const finalData = {
      amount: tradeBase.outputAmount.toSignificant(6),
      minimumAmount: tradeBase.minimumAmountOut(new Percent(JSBI.BigInt(Math.floor(slippage)), BIPS_BASE)).toSignificant(6),
      impact: computeTradePriceBreakdown(tradeBase).priceImpact.toSignificant(6),
      router: mapRouter,
      token0,
      token1
    }

    return finalData
  }

  static async getPoolTransactionVolumeLocal (poolAddress, startTime, endTime) {
    const matchState = {
      poolAddress: poolAddress,
      time: { $gte: new Date(startTime), $lte: new Date(endTime) },
      type: 'swap'
    }

    const payload = await SarosSwap.aggregate([
      {
        $match: matchState
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amountUSD' }
        }
      }
    ])
    return payload[0] ? payload[0].total : 0
  }
}
