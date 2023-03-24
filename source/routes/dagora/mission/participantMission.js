import express from 'express'
import { ParticipantMissionWorker } from '../../../worker'
const router = express.Router()

// User
router.post('/user', ParticipantMissionWorker.createParticipantMission)

export default router
