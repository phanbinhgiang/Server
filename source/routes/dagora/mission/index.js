import express from 'express'
import partner from './partner'
import mission from './mission'
import missionTask from './missionTask'
import taskHistory from './taskHistory'
import participant from './participantMission'

const router = express.Router()
router.use('/partner', partner)
router.use('/mission', mission)
router.use('/mission/task', missionTask)
router.use('/mission/task', taskHistory)
router.use('/participant', participant)

module.exports = router
