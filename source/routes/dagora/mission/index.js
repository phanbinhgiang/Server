import express from 'express'
import partner from './partner'

const router = express.Router()
router.use('/', partner)

module.exports = router
