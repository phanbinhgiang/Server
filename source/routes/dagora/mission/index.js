import express from 'express'
import partner from './partner'
import mission from './mission'
import missionTask from './missionTask'
import taskHistory from './taskHistory'

const router = express.Router()
router.use('/partner', partner)
router.use('/mission', mission)
router.use('/mission/task', missionTask)
router.use('/mission/task', taskHistory)

module.exports = router
