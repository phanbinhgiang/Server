import express from 'express'
import partner from './partner'
import mission from './mission'
import missionTask from './missionTask'

const router = express.Router()
router.use('/partner', partner)
router.use('/mission', mission)
router.use('/mission/task', missionTask)

module.exports = router
