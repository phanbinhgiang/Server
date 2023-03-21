import express from 'express'
import { PartnerWorker } from '../../../worker'
const router = express.Router()

router.get('/admx/', PartnerWorker.getAllPartner)
router.get('/admx/item/:id', PartnerWorker.getPartnerById)
router.post('/admx', PartnerWorker.createPartner)
router.put('/admx', PartnerWorker.updatePartner)
router.delete('/admx/item/:id', PartnerWorker.deletePartnerById)

export default router
