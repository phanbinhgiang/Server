import Mission from '../../../model/dagora/mission/Mission'
import MissionTask from '../../../model/dagora/mission/MissionTask'
import Partner from '../../../model/dagora/mission/Partner'
import ParticipantsMission from '../../../model/dagora/mission/ParticipantsMission'
import { checkInvalidRequireField, createSlug, genUpdate, genSkipNum } from '../../function'

export default class MissionWorker {
  static async getAllMission (req, res, next) {
    const {
      page = 1, size = 10, key, chain, createdAt = -1, type, requirements, status
    } = req.query

    const matchQuery = {
      isActive: true
    }

    if (key) {
      matchQuery.missionName = { $regex: key, $options: 'i' }
    }

    if (chain) {
      matchQuery.chain = chain
    }

    if (type) {
      switch (type) {
      case 'active':
        matchQuery.startTime = { $lte: new Date() }
        matchQuery.endTime = { $gte: new Date() }
        break

      case 'upcoming':
        matchQuery.startTime = { $gt: new Date() }
        break

      case 'ended':
        matchQuery.endTime = { $lt: new Date() }
        break

      default:
        break
      }
    }

    if (requirements) {
      const missionTasks = await MissionTask.aggregate([
        {
          $match: {
            taskTypeId: requirements
          }
        },
        {
          $group: {
            _id: '$missionId'
          }
        }
      ])

      if (!missionTasks.length) {
        req.response = {
          data: [],
          total: 0,
          totalPage: 0,
          currentPage: parseInt(page)
        }
        return next()
      }

      matchQuery._id = { $in: missionTasks.map(task => task._id) }
    }

    if (status) {
      const participantsMissions = await ParticipantsMission.aggregate([
        {
          $match: {
            status
          }
        },
        {
          $group: {
            _id: '$missionId'
          }
        }
      ])

      if (!participantsMissions.length) {
        req.response = {
          data: [],
          total: 0,
          totalPage: 0,
          currentPage: parseInt(page)
        }
        return next()
      }

      if (matchQuery._id) {
        const listMissionIdsRequirements = matchQuery._id.$in || []
        const listMissionIdsStatus = participantsMissions.map(task => task._id)
        matchQuery._id = { $in: listMissionIdsStatus.filter(item => listMissionIdsRequirements.includes(item)) }
      } else {
        matchQuery._id = { $in: participantsMissions.map(task => task._id) }
      }
    }

    const totalData = await Mission.countDocuments(matchQuery)
    const payload = await Mission.find(matchQuery)
      .sort({ createdAt })
      .skip(genSkipNum(page, size))
      .limit(parseInt(size))
      .lean()

    req.response = {
      data: payload,
      total: totalData,
      totalPage: Math.ceil(totalData / parseInt(size)),
      currentPage: parseInt(page)
    }
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
      'chain',
      'startTime',
      'endTime'
    ]

    const missingRequireField = checkInvalidRequireField(requiredFields, req.body)
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const { partnerId } = req.body
    const findPartnerId = await Partner.countDocuments({ _id: partnerId })
    if (!findPartnerId) {
      req.response = { errMess: 'notFoundPartnerId' }
      return next()
    }

    const { missionName } = req.body
    const id = createSlug(missionName)
    const findMission = await Mission.findOne({ id })
    if (findMission) {
      req.response = { errMess: 'missionNameExists' }
      return next()
    }

    const body = genUpdate(req.body, [
      'partnerId',
      'collectionAddress',
      'missionName',
      'missionDescription',
      'missionAvatar',
      'rewardImageExample',
      'rewardDescription',
      'rewardUri',
      'totalRewards',
      'chain',
      'startTime',
      'endTime'
    ])
    const data = await Mission.create({ id, ...body })
    req.response = data
    next()
  }

  static async updateMission (req, res, next) {
    const {
      id,
      missionName
    } = req.body

    if (!id) {
      req.response = { errMess: 'RequiredId' }
      return next()
    }

    if (missionName) {
      const genSlug = createSlug(missionName)
      const countSlugExists = await Mission.countDocuments({ id: genSlug, _id: { $ne: id } })
      if (countSlugExists) {
        req.response = { errMess: 'slugExists' }
        return next()
      }
    }

    const findMission = await Mission.findOne({ _id: id })
    if (!findMission) {
      req.response = { errMess: 'notFoundMission' }
      return next()
    }

    const updatedFiled = genUpdate(req.body, [
      'partnerId',
      'collectionAddress',
      'missionName',
      'missionDescription',
      'missionAvatar',
      'rewardImageExample',
      'rewardDescription',
      'rewardUri',
      'totalRewards',
      'chain',
      'startTime',
      'endTime'
    ])
    if (missionName) {
      updatedFiled.id = createSlug(missionName)
    }

    await findMission.updateOne(updatedFiled)
    req.response = true
    next()
  }

  static async deleteMissionById (req, res, next) {
    const { id } = req.params
    const mission = await Mission.findOne({ _id: id })
    if (!mission) {
      req.response = { errMess: `notFoundDocumentId:${id}` }
      return next()
    }

    if (!mission.isActive) {
      req.response = { errMess: 'documentIsDeleted' }
      return next()
    }

    await mission.updateOne({ isActive: false })
    req.response = true
    next()
  }

  // User
  // static async getAllMissionUser (req, res, next) {
  //   const {
  //     page = 1, size = 10, key, createAt = -1, chain, type, requirements, status, userAddress
  //   } = req.query
  //   const matchQuery = {
  //     isActive: true
  //   }
  //   // if (key) {
  //   //   matchQuery.missionName = { $regex: key, $options: 'i' }
  //   // }
  //   // if (chain) {
  //   //   matchQuery.chain = chain
  //   // }

  //   // const listMissionId = await ParticipantsMission.find({ nftProfileAddress: userAddress }, { _id: 0, missionId: 1 }).lean()

  //   // const totalData = await Mission.countDocuments(matchQuery)
  //   // const payload = await Mission.find(matchQuery)
  //   //   .sort({ createdAt: -1 })
  //   //   .skip(genSkipNum(page, size))
  //   //   .limit(parseInt(size))
  //   //   .lean()

  //   // req.response = {
  //   //   data: payload,
  //   //   total: totalData,
  //   //   totalPage: Math.ceil(totalData / parseInt(size)),
  //   //   currentPage: parseInt(page)
  //   // }

  //   req.response = participantsMissions
  //   next()
  // }
}
