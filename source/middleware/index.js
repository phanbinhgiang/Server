import QueryString from 'query-string'
import { mess500, mess404, hashKey, hashMessage, mess401, userAgentWhiteList, dagoraHashMessage } from './constants'
import crypto from 'crypto-js'
import { recoverPersonalSignature } from 'eth-sig-util'
import { PublicKey } from '@solana/web3.js'
import CommonServices from '../services/common'
import { userRole } from '../../common/constants'
import requestIp from 'request-ip'
import { saveStorage, getStorage, getLength } from '../worker/function'
import { COIN98_SYSTEM_KEY } from '../worker/constants'
import { validateEmailRule } from '../../common/function'
import nacl from 'tweetnacl'
import EVMServices from '../services/evm'
import { dagoraContractAddress } from '../services/dagora/constants'
const base58 = require('bs58')
// Free và roll 4s 2 request
// Duration rate limit
const WINDOW_DURATION_IN_SECOND = 5
const MAX_WINDOW_REQUEST_COUNT = 3

const WINDOW_LOG_DURATION_IN_SECOND = 1

// Banned
const WINDOW_REQUEST_BANNED = 5
const BANNED_IP_TIME_IN_SECOND = 60 * 60
const encodeFunction = new TextEncoder()

export default class MiddlewareServices {
  static async verifyReCaptchaLogin (req, res, next) {
    const isValidCaptcha = await CommonServices.recaptchaVerify(req)
    if (!isValidCaptcha) return res.status(500).send(mess500)
    return next()
  }

  static async verifyReCaptchaLoginV2 (req, res, next) {
    const isValidCaptcha = await CommonServices.recaptchaVerify(req, process.env.RE_CAPTCHA_SITE_KEY_V2)
    if (!isValidCaptcha) return res.status(500).send(mess500)
    return next()
  }

  static async countSpamIP (req, res, next) {
    const clientIp = requestIp.getClientIp(req)

    const isSpamIP = await CommonServices.countSpam(clientIp, 5000)
    if (isSpamIP) return res.status(429).send('Rate Limit')
    return next()
  }

  static async checkBotRequest (req, res, next) {
    const agent = req.useragent

    if (!agent.isBot) {
      if (agent.isDesktop || agent.isMobile || userAgentWhiteList.includes(agent.browser)) {
        return next()
      }
    }

    if (agent && agent.browser === 'axios' && COIN98_SYSTEM_KEY[req.get('source')]) {
      return next()
    }

    if (process.env.IS_DEV && COIN98_SYSTEM_KEY[req.get('source')]) {
      return next()
    }

    return res.status(500).send(mess500)
    // next()
  }

  static checkPublicRequest (req, res, next) {
    if (
      req.get('Accept') === 'undefined' || req.get('Accept') === undefined ||
      req.get('Version') === 'undefined' || req.get('Version') === undefined ||
      // req.get('Authorization') === 'undefined' || req.get('Authorization') === undefined ||
      // req.get('Source') === 'undefined' || req.get('Source') === undefined || req.get('Source') !== systemID) {
      req.get('Source') === 'undefined' || req.get('Source') === undefined) {
      return res.status(404).send('Your requested URL not found')
    }
    return next()
  }

  static async authorizationVerify (req, res, next) {
    if (!req.get('verify') || !req.get('authorization')) return res.status(404).send(mess404)
    const token = req.get('verify').replace('Bearer ', '')

    if (CommonServices.verifyToken(token, process.env.SECRET_TOKEN_VERIFY)) {
      const authenToken = req.get('authorization').replace('Bearer ', '')

      const { id, token: oToken } = CommonServices.decodeToken(token)
      if (oToken === authenToken) {
        const user = lowerCase(id)
        req.user = user

        const getBlock = await getStorage('BLOCK_USER')
        if (getLength(getBlock) > 0 && getBlock.includes(user)) return res.status(404).send(mess404)
        if (!validateEmailRule(user)) return res.status(404).send(mess404)
        return next()
      } else {
        res.status(404).send(mess404)
      }
    } else {
      res.status(404).send(mess404)
    }
  }

  static async authorizationAPIMigrate (req, res, next) {
    if (!req.get('authorization')) return res.status(404).send(mess404)
    const token = req.get('authorization').replace('Bearer ', '')
    if (CommonServices.verifyToken(token, process.env.SECRET_TOKEN) || CommonServices.verifyToken(token, process.env.SECRET_TOKEN_APDATER)) {
      const { id } = CommonServices.decodeToken(token)
      const user = lowerCase(id)

      const getBlock = await getStorage('BLOCK_USER')
      if (getLength(getBlock) > 0 && getBlock.includes(user)) return res.status(404).send(mess404)
      if (!validateEmailRule(user)) return res.status(404).send(mess404)

      req.user = user
      return next()
    } else {
      res.status(404).send(mess404)
    }
  }

  static async authorizationAdmin (req, res, next) {
    if (!req.user) return res.status(404).send(mess404)
    const user = await User.findOne({ id: req.user }, { role: 1, _id: 0 })
    if (!user) return res.status(404).send(mess404)
    if (user.role !== userRole.member) return next()
  }

  static async authorizationAPI (req, res, next) {
    if (!req.get('authorization')) return res.status(404).send(mess404)

    const checkSignature = (user, userAddress) => {
      // const stringSignature = req.get('signature')

      // let passwordHash

      // if (req.method !== 'GET' && req.method !== 'DELETE') {
      //   passwordHash = JSON.stringify(req.body)
      // } else {
      //   const lengthObject = Object.keys(req.query).length
      //   passwordHash = lengthObject > 0 ? QueryString.stringify(req.query) : {}
      // }
      // var hashPassword = crypto.HmacSHA256(passwordHash, hashKey).toString()
      // if ((getLength(Object.keys(req.query)) === 0 && crypto.HmacSHA256(QueryString.stringify({}), hashKey).toString())) {
      req.user = user
      req.userAddress = userAddress
      return next()
      // } else {
      //   res.status(404).send(mess404)
      // }
    }

    const tokenAuthen = req.get('authorization').replace('Bearer ', '')

    const decodeToken = CommonServices.decodeToken(tokenAuthen)

    // Expired token
    if (moment().unix() > get(decodeToken, 'exp')) {
      return res.status(401).send(mess401)
    }

    if (CommonServices.verifyToken(tokenAuthen, process.env.SECRET_TOKEN_APDATER)) {
      const user = lowerCase(decodeToken.id)
      const userAddress = decodeToken.id

      const getBlock = await getStorage('BLOCK_USER')
      if (getLength(getBlock) > 0 && getBlock.includes(user)) return res.status(404).send(mess404)

      if (!validateEmailRule(user)) return res.status(404).send(mess404)
      const userPayload = await User.findOne({ id: user }, { role: 1 }).lean()
      if (userPayload && userPayload.role !== 'member') {
        req.user = user
        return next()
      }
      checkSignature(user, userAddress)
    } else {
      res.status(404).send(mess404)
    }
  }

  static async authorizationAPIAdmin (req, res, next) {
    if (!req.get('authorization')) return res.status(404).send(mess404)

    const tokenAuthen = req.get('authorization').replace('Bearer ', '')

    const decodeToken = CommonServices.decodeToken(tokenAuthen)

    // Expired token
    if (moment().unix() > get(decodeToken, 'exp')) {
      return res.status(401).send(mess401)
    }

    if (CommonServices.verifyToken(tokenAuthen, process.env.SECRET_TOKEN_APDATER)) {
      const user = lowerCase(decodeToken.id)

      const getBlock = await getStorage('BLOCK_USER')
      if (getLength(getBlock) > 0 && getBlock.includes(user)) return res.status(404).send(mess404)
      if (!validateEmailRule(user)) return res.status(404).send(mess404)
      req.user = user
      next()
    } else {
      res.status(404).send(mess404)
    }
  }

  static async validateUserOnchain (req, res, next) {
    const decodeData = req.user
    if (!decodeData) return res.status(404).send(mess404)

    const [address, chain] = decodeData.split('-')

    if (getLength(address) === 0 || getLength(chain) === 0) return res.status(404).send(mess404)

    next()
  }

  static decodeAddressFromSig (req, res, next) {
    const msg = hashMessage
    const sig = req.get('onChainSignature')

    const address = recoverPersonalSignature({
      data: `0x${Buffer.from(msg, 'utf8').toString('hex')}`,
      sig
    })

    req.address = lowerCase(address)

    next()
  }

  static async blockIPandUser (req, res, next) {
    const bannedListIP = await getStorage('BLOCK_USER_IP')
    if (getLength(bannedListIP) > 0) {
      const clientIp = requestIp.getClientIp(req)

      if (bannedListIP.find(it => clientIp.includes(it))) return res.status(429).send('Rate Limit')
    }
    return next()
  }

  static async customLimiter (req, res, next) {
    const clientIp = requestIp.getClientIp(req)

    const RATE_LIMIT_WHILE_LIST_IP = ['115.78.227.213', process.env.WHITELIST_IP, process.env.WHITELIST_IP_2, '18.139.31.98']

    if (RATE_LIMIT_WHILE_LIST_IP.includes(clientIp)) {
      return next()
    }

    const bannedIpKey = 'RATE_LIMIT_BANNED_LIST_IP'
    const bannedListIP = await getStorage(bannedIpKey)

    if (bannedListIP) {
      const filterBannedIP = bannedListIP.filter(banned => banned.ip === clientIp).sort((a, b) => b.bannedAt - a.bannedAt)
      const newestBanned = filterBannedIP[0]
      if (newestBanned && ((moment().unix() - newestBanned.bannedAt) < BANNED_IP_TIME_IN_SECOND)) {
        return res.status(429).send('Rate Limit')
      }
    }

    const currentTime = moment()
    const key = clientIp + '_' + req.originalUrl
    const record = await getStorage(key)
    if (record) {
      const data = record.slice(0)
      const windowBeginTimestamp = moment().unix() - WINDOW_DURATION_IN_SECOND

      const requestsinWindow = data.filter(entry => {
        return entry.requestTimeStamp >= windowBeginTimestamp
      })

      const totalWindowRequestsCount = requestsinWindow.reduce((accumulator, entry) => {
        return accumulator + entry.requestCount
      }, 0)
      // if maximum number of requests is exceeded then an error is returned

      // When the number of requests made are less than the maximum the a new entry is logged
      const lastRequestLog = Object.assign({}, data[data.length - 1])

      const potentialCurrentWindowIntervalStartTimeStamp = currentTime.unix() - WINDOW_LOG_DURATION_IN_SECOND

      // When the interval has not passed from the last request, then the counter increments
      if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
        lastRequestLog.requestCount = lastRequestLog.requestCount + 1
        data[data.length - 1] = lastRequestLog
      } else {
        // When the interval has passed, a new entry for current user and timestamp is logged
        data.push({
          requestTimeStamp: currentTime.unix(),
          requestCount: 1
        })
      }

      saveStorage(key, JSON.stringify(data.filter(entry => entry.requestTimeStamp > windowBeginTimestamp - (WINDOW_DURATION_IN_SECOND * 5))))
      if ((totalWindowRequestsCount + 1) >= MAX_WINDOW_REQUEST_COUNT) {
        if (totalWindowRequestsCount >= WINDOW_REQUEST_BANNED) {
          const newBannedListIP = (bannedListIP || []).concat([{ ip: clientIp, bannedAt: moment().unix() }]).filter(banned => banned.bannedAt > (moment().unix() - BANNED_IP_TIME_IN_SECOND))
          saveStorage(bannedIpKey, newBannedListIP)
        }
        return res
          .status(429)
          .send(
            'Rate limit'
          )
      } else {
        next()
      }
    } else {
      const newRecord = []
      const requestLog = {
        requestTimeStamp: currentTime.unix(),
        requestCount: 1
      }
      newRecord.push(requestLog)
      saveStorage(key, newRecord)
      next()
    }
  }

  //! DAGORA
  static authorizationDagora (req, res, next) {
    const onchainSignature = req.get('onchainSignature')

    if (getLength(onchainSignature) === 0) {
      return res.status(404).send({
        success: false,
        data: { errMess: 'missingOnchainsignature' },
        status: 404
      })
    }

    const isEvm = getLength(onchainSignature.split('-')) === 1

    const decodeAddress = isEvm ? MiddlewareServices.decodeEVMAddressDagoraLocal(onchainSignature, dagoraHashMessage)
      : MiddlewareServices.validateSolanaAddressLocal(onchainSignature.split('-')[0], onchainSignature.split('-')[1])

    if (getLength(decodeAddress) === 0) {
      return res.status(404).send({
        success: false,
        data: { errMess: 'missingOnchainsignature' },
        status: 404
      })
    }
    req.address = isEvm ? decodeAddress : onchainSignature.split('-')[1]

    return next()
  }

  static async decodeAddressFromSigSuperApp (req, res, next) {
    const onchainSignature = req.get('onchainSignature')

    const chain = req.query.chain
    if (chain === chainType.solana) {
      req.address = req.params.address
    } else {
      req.address = MiddlewareServices.decodeEVMAddressDagoraLocal(onchainSignature, hashMessage)
    }

    return next()
  }

  static async decodeAddressFromSigDagora (req, res, next) {
    const onchainSignature = req.get('onchainSignature')

    if (!onchainSignature) {
      req.address = ''
      return next()
    } else {
      const isWallet = COIN98_SYSTEM_KEY[req.get('source')] === 'wallet'
      const isEvm = getLength(onchainSignature.split('-')) === 1

      const decodeAddress = isEvm ? MiddlewareServices.decodeEVMAddressDagoraLocal(onchainSignature, isWallet ? hashMessage : dagoraHashMessage)
        : MiddlewareServices.validateSolanaAddressLocal(onchainSignature.split('-')[0], onchainSignature.split('-')[1])

      req.address = isEvm ? decodeAddress : decodeAddress ? onchainSignature.split('-')[1] : false
      return next()
    }
  }

  static decodeEVMAddressDagoraLocal (sig, msg) {
    try {
      const address = recoverPersonalSignature({
        data: `0x${Buffer.from(msg, 'utf8').toString('hex')}`,
        sig
      })
      return address
    } catch (err) {
      return ''
    }
  }

  static validateSolanaAddressLocal (sig, address) {
    try {
      const encodeFunction = new TextEncoder()
      const addressWallet = new PublicKey(address)
      const signatureDecode = base58.decode(sig)
      const messageEncoded = encodeFunction.encode(dagoraHashMessage)
      const verifySign = nacl.sign.detached.verify(
        messageEncoded,
        signatureDecode,
        addressWallet.toBuffer()
      )
      return verifySign
    } catch (error) {
      return false
    }
  }

  static validateSupportedChainDagora (req, res, next) {
    const method = req.method

    const { chain } = method === 'GET' ? req.query : req.body

    if (!chain) {
      return next()
    }

    if (chain.includes(',')) {
      const notValidChainIndex = chain.split(',').map(chain => dagoraContractAddress[chain]).findIndex(it => it === undefined)
      if (notValidChainIndex > -1) {
        return res.status(500).send(false)
      }
      return next()
    }

    // check support chain by contract Address
    const contractAddresschain = dagoraContractAddress[chain]

    if (!contractAddresschain) {
      return res.status(500).send(false)
    } else {
      return next()
    }
  }
}
