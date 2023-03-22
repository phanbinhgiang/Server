import express from 'express'
import { MissionTaskWorker } from '../../../worker'
const router = express.Router()

router.get('/admx/', MissionTaskWorker.getAllMissionTask)
router.post('/admx', MissionTaskWorker.createMissionTask)
router.put('/admx', MissionTaskWorker.updateMissionTask)
router.delete('/admx/item/:id', MissionTaskWorker.deleteMissionTaskById)

export default router
