import express from 'express'
import partner from './partner'
import mission from './mission'

const router = express.Router()
router.use('/partner', partner)
router.use('/mission', mission)

module.exports = router
