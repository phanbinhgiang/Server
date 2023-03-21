import Mission from '../../../model/dagora/mission/Mission'
import { checkInvalidRequireField, createSlug } from '../../function'

export default class MissionWorker {
  static async getAllMission (req, res, next) {
    const {
      page = 1, size = 10, key
    } = req.query

    const matchQuery = {}
    if (key) {
      matchQuery.missionName = { $regex: key, $options: 'i' }
    }

    const missions = await Mission.find(matchQuery)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(size)).limit(parseInt(size))
      .lean()
    req.response = missions
    next()
  }

  static async getMissionById (req, res, next) {
    const { id } = req.params
    const mission = await Mission.findOne({ _id: id })

    if (!mission) {
      req.response = { errMess: `notFoundDocumentId:${id}` }
      return next()
    }
    req.response = mission
    next()
  }

  static async createMission (req, res, next) {
    const {
      partnerId,
      collectionAddress,
      missionName,
      missionDescription,
      missionAvatar,
      rewardImageExample,
      rewardDescription,
      rewardUri,
      totalRewards,
      chain,
      startTime,
      endTime
    } = req.body

    const requiredFields = [
      'partnerId',
      'collectionAddress',
      'missionName',
      'missionDescription',
      'missionAvatar',
      'rewardImageExample',
      'rewardDescription',
      'rewardUri',
      'totalRewards',
      'chain'
      // 'startTime',
      // 'endTime'
    ]

    const body = {
      partnerId,
      collectionAddress,
      missionName,
      missionDescription,
      missionAvatar,
      rewardImageExample,
      rewardDescription,
      rewardUri,
      totalRewards,
      chain,
      startTime,
      endTime
    }

    const missingRequireField = checkInvalidRequireField(requiredFields, body)
    console.log('🚀 ~ file: mission.js:82 ~ MissionWorker ~ createMission ~ missingRequireField:', missingRequireField)
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const id = createSlug(missionName)
    const findMission = await Mission.findOne({ id })
    if (findMission) {
      req.response = { errMess: 'missionExists' }
      return next()
    }

    const data = await Mission.create({ id, ...body })
    req.response = data
    next()
  }

  // static async updatePartner (req, res, next) {
  //   const {
  //     id,
  //     partnerName
  //   } = req.body

  //   if (partnerName) {
  //     const genSlug = createSlug(partnerName)
  //     const countSlugExists = await Partner.countDocuments({ id: genSlug, _id: { $ne: id } })
  //     if (countSlugExists) {
  //       req.response = { errMess: 'slugExists' }
  //       return next()
  //     }
  //   }

  //   const findPartner = await Partner.findOne({ _id: id })
  //   if (!findPartner) {
  //     req.response = { errMess: 'notFoundPartner' }
  //     return next()
  //   }

  //   const updatedFiled = genUpdate(req.body, ['partnerName', 'partnerLogo', 'partnerDescription'])
  //   if (partnerName) {
  //     updatedFiled.id = createSlug(partnerName)
  //   }

  //   await findPartner.updateOne(updatedFiled)
  //   req.response = true
  //   next()
  // }

  // static async deletePartnerById (req, res, next) {
  //   const { id } = req.params
  //   const partner = await Partner.findOne({ _id: id })
  //   if (!partner) {
  //     req.response = { errMess: `notFoundDocumentId:${id}` }
  //     return next()
  //   }

  //   if (!partner.isActive) {
  //     req.response = { errMess: 'documentIsDeleted' }
  //     return next()
  //   }

  //   await partner.updateOne({ isActive: false })
  //   req.response = true
  //   next()
  // }
}
