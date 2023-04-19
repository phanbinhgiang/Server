import express from 'express'
import mission from './dagora/mission'
import test from './test'

const router = express.Router()
router.use('/', mission)
router.use('/', test)

module.exports = router
