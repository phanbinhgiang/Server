import express from 'express'
import { MissionWorker } from '../../../worker'
const router = express.Router()

router.get('/admx/', MissionWorker.getAllMission)
router.get('/admx/item/:id', MissionWorker.getMissionById)
router.post('/admx', MissionWorker.createMission)
router.put('/admx', MissionWorker.updateMission)
router.delete('/admx/item/:id', MissionWorker.deleteMissionById)

export default router
