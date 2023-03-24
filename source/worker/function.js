import { PublicKey } from '@solana/web3.js'
import bigdecimal from 'bigdecimal'
import redis from 'redis'
import numeral from 'numbro'
import slug from 'slug'
const clientRedis = redis.createClient()

export const validatePassword = (pw) => {
  const re = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/
  return re.test(pw)
}

export const validateAddressWeb3 = (address, chain) => {
  try {
    PublicKey(it.id)
    return true
  } catch (error) {
    return false
  }
}
export const getLength = (value) => {
  return value ? value.length : 0
}

export const checkInvalidRequireField = (arrKey, object) => {
  return arrKey.find(key => getLength(object[key]) === 0)
}

export const checkJSon = (value) => {
  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }
  return true
}

export const saveStorage = (key, value) => {
  const newValue = checkJSon(value) ? value : JSON.stringify(value)
  clientRedis.set(key, newValue)
}

export const deleteStore = (key) => {
  clientRedis.del(key)
}

export const getStorage = async (key) => {
  return new Promise((resolve, reject) => {
    clientRedis.get(key, (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(data ? JSON.parse(data) : null)
      }
    })
  })
}
export const createSlug = (text) => {
  return slug(text)
}

export const calculateDiffDate = (date1 = new Date(), date2, type) => {
  const dateNow = moment(date1)
  const dateTxs = moment(date2)
  const payload = dateNow.diff(dateTxs, type)
  return payload
}

export const genUpdate = (data, arrValue) => {
  const genObject = {}
  arrValue.map(itm => {
    if (data[itm] !== undefined && data[itm] !== null) {
      genObject[itm] = data[itm]
    }
  })
  return Object.keys(genObject)[0] ? genObject : false
}

export const fetchCacheRedis = async (key, req, next, time = 30000, func) => {
  const currentTime = Date.now()

  const getData = await getStorage(key)
  if (getData && getData.data && ((currentTime - getData.time) <= time)) {
    req.response = getData.data
    return next()
  }
  const isCacheData = get(getData, 'data')
  if (isCacheData) {
    req.response = getData.data
    next()
  }
  func().then(payload => {
    saveStorage(key, { data: payload, time: currentTime })
    if (!isCacheData) {
      req.response = payload
      next()
    }
  }).catch(() => {
    next()
  })
}

export const fetchCacheRedisLocal = async (key, time = 30000, func) => {
  try {
    const currentTime = Date.now()

    const getData = await getStorage(key)
    if (getData && getData.data) {
      if ((currentTime - getData.time) > time) {
        const payload = await func()
        saveStorage(key, JSON.stringify({ data: payload, time: currentTime }))
      }

      return getData.data
    }

    const payload = await func()
    saveStorage(key, JSON.stringify({ data: payload, time: currentTime }))
    return payload
  } catch (error) {
    return null
  }
}

export const fetchAPI = async (apiurl, headers) => {
  try {
    const response = await fetch(apiurl, headers)

    if (response.status === 200) {
      const responJson = await response.json()
      return responJson
    }

    if (response.status === 429) {
      return await fetchAPI(apiurl, headers)
    }
    if (response.status === 500) {
      return false
    }

    const responJson = await response.json()
    return responJson
  } catch (error) {
    console.log('error', error)
    return false
  }
}

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const convertWeiToBalance = (strValue, iDecimal = 18) => {
  try {
    if (strValue) {
      var multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal))
      var convertValue = new bigdecimal.BigDecimal(String(strValue))

      return convertValue.divide(multiplyNum).toString()
    }
    return 0
  } catch (error) {
    return 0
  }
}

export const upperCase = (value) => {
  return value ? value.toUpperCase() : value
}
export const lowerCase = (value) => {
  return value && typeof (value) === 'string' ? value.toLowerCase() : ''
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const convertDateMoment = (date, type) => {
  const dateFormat = new Date(date)
  const strTime = moment(dateFormat).format(type)
  return strTime
}

export const genSkipNum = (page, size) => {
  return (parseInt(page) - 1) * parseInt(size)
}

export const generateID = (number = 16) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < number; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const countDots = (strString, strLetter) => {
  const string = strString.toString()
  return (string.match(RegExp(strLetter, 'g')) || []).length
}

export const formatNumberBro = ({
  number,
  mantissa = 4,
  isReturnNaN = false,
  textNa = '',
  trimMantissa = true,
  isMoreThan = false
}) => {
  if (
    number !== false &&
    number !== 'null' &&
    !(number === null) &&
    !isNaN(number) &&
    !(number === undefined) &&
    number !== 'NaN' &&
    number !== Infinity
  ) {
    if (number.toString().length > 0 && !isMoreThan) {
      // eslint-disable-next-line no-useless-escape
      return numeral(number.toString().replace(/\,/g, '')).format({
        trimMantissa,
        thousandSeparated: true,
        mantissa
      })
    }

    // isMoreThan ...
    if (number.toString().length > 0 && isMoreThan) {
      // eslint-disable-next-line no-useless-escape
      const newNumber = numeral(number.toString().replace(/\,/g, '')).format({
        trimMantissa,
        thousandSeparated: true,
        mantissa
      })
      const indexE = number.toString().indexOf('e')
      const dotsCount = countDots(number.toString(), '\\.')
      let decimalCount = 0
      if (dotsCount === 1) {
        decimalCount =
          number.toString().length - number.toString().indexOf('.') - 1
      }

      if (
        (newNumber.toString() === '0' && indexE !== -1) ||
        (newNumber.toString() === '0' && mantissa < decimalCount)
      ) {
        return parseInt(newNumber).toFixed(mantissa) + '...'
      }
      return newNumber
    }
  }
  return isReturnNaN ? textNa || 'N/A' : 0
}

export const getStatusTime = (startTime, endTime) => {
  const currentTime = new Date()
  if (currentTime < startTime) {
    return 'upcoming'
  } else if (currentTime > endTime && endTime) {
    return 'ended'
  } else {
    return 'active'
  }
}
