import express from 'express'
import mission from './dagora/mission'

const router = express.Router()
router.use('/', mission)

module.exports = router
