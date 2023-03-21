import express from 'express'
import { PartnerWorker } from '../../../worker'
const router = express.Router()

router.get('/admx/partner', PartnerWorker.getAllPartner)
router.get('/admx/partner/item/:id', PartnerWorker.getPartnerById)
router.post('/admx/partner', PartnerWorker.createPartner)
router.put('/admx/partner', PartnerWorker.updatePartner)
router.delete('/admx/partner/item/:id', PartnerWorker.deletePartnerById)

export default router
