import express from 'express'
import { TaskHistoryWorker } from '../../../worker'
const router = express.Router()

router.post('/history', TaskHistoryWorker.createTaskHistory)
router.put('/history', TaskHistoryWorker.updateTaskHistory)

export default router
