import express from 'express'
import partner from './partner'
import mission from './mission'
import taskHistory from './taskHistory'

const router = express.Router()
router.use('/partner', partner)
router.use('/mission', mission)
router.use('/mission/task', taskHistory)

module.exports = router
