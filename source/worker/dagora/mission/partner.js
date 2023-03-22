import Partner from '../../../model/dagora/mission/Partner'
import { checkInvalidRequireField, createSlug, genUpdate, genSkipNum } from '../../function'

export default class PartnerWorker {
  static async getAllPartner (req, res, next) {
    const {
      page = 1, size = 10, key
    } = req.query

    const matchQuery = {}
    if (key) {
      matchQuery.partnerName = { $regex: key, $options: 'i' }
    }

    const partners = await Partner.find(matchQuery)
      .sort({ createdAt: -1 })
      .skip(genSkipNum(page, size))
      .limit(parseInt(size))
      .lean()
    req.response = partners
    next()
  }

  static async getPartnerById (req, res, next) {
    const { id } = req.params
    const partner = await Partner.findOne({ _id: id })

    if (!partner) {
      req.response = { errMess: `notFoundDocumentId:${id}` }
      return next()
    }
    req.response = partner
    next()
  }

  static async createPartner (req, res, next) {
    const {
      partnerName,
      partnerLogo,
      partnerDescription
    } = req.body

    const missingRequireField = checkInvalidRequireField(['partnerName', 'partnerLogo', 'partnerDescription'], { partnerName, partnerLogo, partnerDescription })
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const id = createSlug(partnerName)
    const findPartner = await Partner.findOne({ id })
    if (findPartner) {
      req.response = { errMess: 'partnerExists' }
      return next()
    }

    const data = await Partner.create({ id, partnerName, partnerLogo, partnerDescription })
    req.response = data
    next()
  }

  static async updatePartner (req, res, next) {
    const {
      id,
      partnerName
    } = req.body

    if (!id) {
      req.response = { errMess: 'RequiredId' }
      return next()
    }

    if (partnerName) {
      const genSlug = createSlug(partnerName)
      const countSlugExists = await Partner.countDocuments({ id: genSlug, _id: { $ne: id } })
      if (countSlugExists) {
        req.response = { errMess: 'slugExists' }
        return next()
      }
    }

    const findPartner = await Partner.findOne({ _id: id })
    if (!findPartner) {
      req.response = { errMess: 'notFoundPartner' }
      return next()
    }

    const updatedFiled = genUpdate(req.body, ['partnerName', 'partnerLogo', 'partnerDescription'])
    if (partnerName) {
      updatedFiled.id = createSlug(partnerName)
    }

    await findPartner.updateOne(updatedFiled)
    req.response = true
    next()
  }

  static async deletePartnerById (req, res, next) {
    const { id } = req.params
    const partner = await Partner.findOne({ _id: id })
    if (!partner) {
      req.response = { errMess: `notFoundDocumentId:${id}` }
      return next()
    }

    if (!partner.isActive) {
      req.response = { errMess: 'documentIsDeleted' }
      return next()
    }

    await partner.updateOne({ isActive: false })
    req.response = true
    next()
  }
}
