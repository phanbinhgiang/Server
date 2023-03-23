import express from 'express'
import { MissionWorker } from '../../../worker'
const router = express.Router()

// Admin
router.post('/admx', MissionWorker.createMission)
router.put('/admx', MissionWorker.updateMission)
router.delete('/admx/item/:id', MissionWorker.deleteMissionById)

// User
router.get('/user/', MissionWorker.getAllMission)
router.get('/user/item/:id', MissionWorker.getMissionById)

export default router
