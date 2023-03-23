import Mission from '../../../model/dagora/mission/Mission'
import MissionTask from '../../../model/dagora/mission/MissionTask'
import Partner from '../../../model/dagora/mission/Partner'
import ParticipantsMission from '../../../model/dagora/mission/ParticipantsMission'
import { checkInvalidRequireField, createSlug, genUpdate, genSkipNum, getStatusTime } from '../../function'
import { get } from 'lodash'
import TaskHistory from '../../../model/dagora/mission/TaskHistory'

export default class MissionWorker {
  static async getAllMission (req, res, next) {
    const {
      page = 1, size = 10, key, chain, createdAt = -1, type, requirements, status, userAddress
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
      const currentTime = new Date()
      switch (type) {
      case 'active':
        matchQuery.startTime = { $lte: currentTime }
        matchQuery.endTime = { $gte: currentTime }
        break

      case 'upcoming':
        matchQuery.startTime = { $gt: currentTime }
        break

      case 'ended':
        matchQuery.endTime = { $lt: currentTime }
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

    if (status && userAddress) {
      const participantsMissions = await ParticipantsMission.aggregate([
        {
          $match: {
            nftProfileAddress: userAddress,
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
    const fieldsResponse = {
      // id: 1,
      // partnerId: 1,
      // collectionAddress: 1,
      missionName: 1,
      // missionDescription: 1,
      missionAvatar: 1,
      rewardImageExample: 1,
      // rewardDescription: 1,
      // rewardUri: 1,
      // totalRewards: 1,
      chain: 1,
      startTime: 1,
      endTime: 1
      // isActive: 1,
      // createdAt: 1,
      // updatedAt: 1
    }
    const payload = await Mission.find(matchQuery, fieldsResponse)
      .sort({ createdAt })
      .skip(genSkipNum(page, size))
      .limit(parseInt(size))
      .lean()

    if (!payload.length) {
      req.response = {
        data: [],
        total: 0,
        totalPage: 0,
        currentPage: parseInt(page)
      }
      return next()
    }

    const totalMissingTasks = await MissionTask.aggregate([
      {
        $match: {
          missionId: { $in: payload.map(item => item._id.toString()) }
        }
      },
      {
        $group: {
          _id: '$missionId',
          total: { $sum: 1 }
        }
      }
    ])

    const payloadFormat = payload.map(item => ({
      _id: item._id,
      missionName: item.missionName,
      missionAvatar: item.missionAvatar,
      rewardImage: item.rewardImageExample,
      chain: item.chain,
      totalTasks: totalMissingTasks.length ? get(totalMissingTasks.find(task => task._id === item._id.toString()), 'total', 0) : 0,
      status: getStatusTime(item.startTime, item.endTime)
    }))

    req.response = {
      data: payloadFormat,
      total: totalData,
      totalPage: Math.ceil(totalData / parseInt(size)),
      currentPage: parseInt(page)
    }
    next()
  }

  static async getMissionById (req, res, next) {
    const { id } = req.params
    const { userAddress } = req.query
    const missionPromise = Mission.findOne({ _id: id, isActive: true })
    const missionTasksPromise = MissionTask.find({ missionId: id }, { taskContent: 1 })
    const participantsPromise = ParticipantsMission.countDocuments({ missionId: id })
    const totalNftMintedPromise = ParticipantsMission.countDocuments({ missionId: id, minted: true })

    const [mission, missionTasks, participants, totalNftMinted] = await Promise.all([missionPromise, missionTasksPromise, participantsPromise, totalNftMintedPromise])

    if (!mission) {
      req.response = { errMess: `notFoundMissionId:${id}` }
      return next()
    }
    const tasks = {}
    tasks.data = missionTasks.length ? missionTasks.map(task => ({ _id: task._id, ...get(task, 'taskContent', []) })) : []
    tasks.totalTasks = missionTasks.length
    if (userAddress && tasks.data.length) {
      const userCompletedTasks = await TaskHistory.find({ nftProfileAddress: userAddress, completed: true, isActive: true }, { missionTasksId: 1 }).lean()
      tasks.data = tasks.data.map(task => ({ ...task, completed: !!userCompletedTasks.find(item => item.missionTasksId === task._id.toString()) }))
      tasks.totalTasksCompleted = tasks.data.filter(task => task.completed).length
    }
    req.response = {
      tasks,
      status: getStatusTime(mission.startTime, mission.endTime),
      missionName: mission.missionName,
      missionAvatar: mission.missionAvatar,
      startTime: mission.startTime,
      endTime: mission.endTime,
      chain: mission.chain,
      contractAddress: mission.collectionAddress,
      participants,
      missionDescription: mission.missionDescription,
      rewardDescription: mission.rewardDescription,
      rewardImages: mission.rewardImageExample,
      rewardUrl: mission.rewardUri,
      totalNFT: mission.totalRewards,
      totalNFTMinted: totalNftMinted
    }
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
}
