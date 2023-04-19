import express from 'express'
import Worker from '../../worker/test'

const router = express.Router()
router.use('/test', Worker.editPortal)

module.exports = router
