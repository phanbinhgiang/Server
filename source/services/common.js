/// Common Services for third-party library
/// Include for captcha, onesignal, sendgrid .....
import jwt from 'jsonwebtoken'
import { HOSTNAME_CAPTCHA, SENDGRID_ID, SENDGRID_ID_AMBER, SENDGRID_ID_OLD } from './constants'
import RequestPromise from 'request-promise'
import { getStorage, saveStorage } from '../../common/function'
const request = require('request')

export default class CommonServices {
  static verifyToken (token, password) {
    return jwt.verify(token, password, (err) => !err)
  }

  static decodeToken (token) {
    const decodeToken = jwt.decode(token)
    return decodeToken
  }

  static generateJWTLogin (email, source) {
    return jwt.sign({ id: email, source }, process.env.SECRET_TOKEN_APDATER, { expiresIn: 60 * 60 })
  }

  static generateJWTVerify (email, token, code) {
    return jwt.sign({ id: email, token }, code || process.env.SECRET_TOKEN_VERIFY, { expiresIn: '365d' })
  }

  static async countSpam (id, time) {
    if (['115.78.227.213', process.env.WHITELIST_IP, process.env.WHITELIST_IP_2, '18.139.31.98'].includes(id)) {
      return true
    }

    const current = moment().valueOf()
    const spamTime = await getStorage('SPAM_' + id)

    // Validate time rate limit
    if (spamTime && (current - spamTime) < time) {
      return true
    }
    await saveStorage('SPAM_' + id, current)

    return false
  }

  static async sendEmailVerificationCode (to, code, lang, isAmberBlocks, realCode) {
    return new Promise(async (resolve, reject) => {
      const generateCode = jwt.sign({ code }, process.env.SECRET_TOKEN_OTP, { expiresIn: 300 })

      const sendgridSelected = isAmberBlocks ? SENDGRID_ID_AMBER : SENDGRID_ID_OLD

      const options = {
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers:
        {
          'content-type': 'application/json',
          authorization: 'Bearer ' + process.env.SENDGRID_API_KEY
        },
        body:
        {
          personalizations:
            [{
              to: [{ email: to }],
              dynamic_template_data: {
                subject: (isAmberBlocks ? 'AmberBlocks' : 'Coin98') + ' Verify Email',
                code: isAmberBlocks ? generateCode : realCode
              }
            }],
          from: { email: `no-reply@${isAmberBlocks ? 'amberblocks.com' : 'coin98.com'}` },
          template_id: sendgridSelected[lang] || sendgridSelected.en
        },
        json: true
      }
      RequestPromise(options, async (error, response) => {
        const resJson = await response.toJSON()
        if (get(resJson, 'statusCode') === 400) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  static async recaptchaVerify (req, key) {
    return new Promise(async (resolve, reject) => {
      try {
        const captCode = req.body.captchaCode
        if (captCode === undefined || captCode === '' || captCode === null) {
          return resolve(false)
        }
        if (!key) return resolve(true)

        const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + key + '&response=' + captCode + '&remoteip=' + req.connection.remoteAddress

        request(verificationURL, (error, response, body) => {
          if (error) resolve(false)
          body = JSON.parse(body)

          clog('body', body)

          if (body.success && body.hostname && (body.score ? parseFloat(body.score) > 0.7 : true) && HOSTNAME_CAPTCHA.find(h => body.hostname.includes(h))) {
            return resolve(true)
          }
          resolve(false)
        })
      } catch (error) {
        resolve(false)
      }
    })
  }
}
