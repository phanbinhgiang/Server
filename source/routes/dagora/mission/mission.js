import express from 'express'
import { MissionWorker, ParticipantMissionWorker } from '../../../worker'

const router = express.Router()

// Admin
router.get('/admx', MissionWorker.getAllMissionAdmin)
router.post('/admx', MissionWorker.setupMissionAndTasks)
router.put('/admx/item/:id', MissionWorker.updateMissionAndTasksById)
router.delete('/admx/item/:id', MissionWorker.deleteMissionById)

// User
router.get('/user/', MissionWorker.getAllMissionUser)
router.get('/user/item/:id', MissionWorker.getMissionUserById)
router.post('/user/participant', ParticipantMissionWorker.createParticipantMission)

export default router
