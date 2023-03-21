import lodash from 'lodash'
global._ = lodash
/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import mongoose, { Schema } from 'mongoose'
import { defaultModel, chainType } from './common/constants'
import axios from 'axios'
import express from 'express'
import moment from 'moment'
import Web3 from 'web3'
import { Client } from '@elastic/elasticsearch'

const router = express.Router()

const createSchema = (schema, key, options, indexOptions) => {
  const schemaModel = new Schema(schema, options ? Object.assign(options, { versionKey: false, timestamps: true }) : { versionKey: false, timestamps: true })
  if (indexOptions) {
    schemaModel.index(indexOptions.field, indexOptions.options)
  }

  return mongoose.model(key, schemaModel)
}

const client = new Client({
  node: process.env.SEARCH_SERVER,
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD
  }
})

global.elasticClient = client
global.model = defaultModel
global.Schema = createSchema
global.convertSUM = (a) => Web3.utils.toChecksumAddress(a)

global.chainType = chainType
global.moment = moment
global.has = lodash.has
global.clog = console.log

global.router = router
global.axios = axios
global.size = (value) => {
  return value ? value.length : 0
}
global.get = lodash.get
