import Mission from '../../../model/dagora/mission/Mission'
import MissionTask from '../../../model/dagora/mission/MissionTask'
import Partner from '../../../model/dagora/mission/Partner'
import ParticipantsMission from '../../../model/dagora/mission/ParticipantsMission'
import { checkInvalidRequireField, createSlug, genUpdate, genSkipNum, getStatusTime, ObjectId } from '../../function'
import { get } from 'lodash'
import TaskHistory from '../../../model/dagora/mission/TaskHistory'
import { CHECK_STATUS } from '../../constants'
import { COLLECTION_NAME } from '../../../../common/constants'
import { id } from 'ethers/lib/utils'
export default class MissionWorker {
  static async setupMissionAndTasks (req, res, next) {
    const { inSequence, mission, tasks } = req.body

    // Setup Mission
    if (!mission) {
      req.response = { errMess: 'requiredMission' }
      return next()
    }

    const requiredFieldsMission = [
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

    const missingRequireFieldMission = checkInvalidRequireField(requiredFieldsMission, mission)
    if (missingRequireFieldMission) {
      req.response = { errMess: `missingRequireFieldMission:${missingRequireFieldMission}` }
      return next()
    }

    const { partnerId } = mission
    const findPartnerId = await Partner.countDocuments({ _id: partnerId })
    if (!findPartnerId) {
      req.response = { errMess: 'notFoundPartnerId' }
      return next()
    }

    const { missionName } = mission
    const missionId = createSlug(missionName)
    const findMission = await Mission.findOne({ id: missionId })
    if (findMission) {
      req.response = { errMess: 'missionNameExists' }
      return next()
    }

    const bodyMission = genUpdate(mission, [
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

    bodyMission.id = missionId

    // Setup Tasks
    if (!get(tasks, 'length')) {
      req.response = { errMess: 'requiredTasks' }
      return next()
    }

    const requiredFieldsTask = [
      'taskTypeId',
      'taskContent'
    ]

    const missingRequireFieldTask = tasks.find(task => checkInvalidRequireField(requiredFieldsTask, task))

    if (missingRequireFieldTask) {
      req.response = { errMess: 'missingRequireFieldTask' }
      return next()
    }

    // Create Mission and Tasks
    const createMission = await Mission.create(bodyMission)

    const bodyTasks = tasks.map((task, index) => {
      const bodyTask = genUpdate(task, [
        'taskTypeId',
        'taskContent'
      ])

      bodyTask.missionId = createMission._id.toString()

      if (inSequence) {
        bodyTask.order = index + 1
      }

      return bodyTask
    })
    await MissionTask.insertMany(bodyTasks)

    req.response = true
    next()
  }

  static async updateMissionAndTasksById (req, res, next) {
    const { id } = req.params
    const { inSequence, mission, tasks } = req.body

    if (!id) {
      req.response = { errMess: 'requiredId' }
      return next()
    }

    if (mission) {
      const { missionName } = mission
      if (missionName) {
        const genSlug = createSlug(missionName)
        const countSlugExists = await Mission.countDocuments({ id: genSlug, _id: { $ne: id } })
        if (countSlugExists) {
          req.response = { errMess: 'missionNameExists' }
          return next()
        }
      }
    }

    const findMission = await Mission.findOne({ _id: id })
    if (!findMission) {
      req.response = { errMess: `notFoundMissionId:${id}` }
      return next()
    }

    // Update Tasks
    if (get(tasks, 'length')) {
      const requiredFieldsTask = [
        'taskTypeId',
        'taskContent'
      ]

      const missingRequireFieldTask = tasks.find(task => checkInvalidRequireField(requiredFieldsTask, task))

      if (missingRequireFieldTask) {
        req.response = { errMess: 'missingRequireFieldTask' }
        return next()
      }

      await MissionTask.deleteMany({ missionId: id })

      const bodyTasks = tasks.map((task, index) => {
        const bodyTask = genUpdate(task, [
          'taskTypeId',
          'taskContent'
        ])

        bodyTask.missionId = id

        if (inSequence) {
          bodyTask.order = index + 1
        }

        return bodyTask
      })
      await MissionTask.insertMany(bodyTasks)
    }

    // Update Mission
    if (mission) {
      const updatedFiled = genUpdate(mission, [
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

      const { missionName } = mission
      if (missionName) {
        updatedFiled.id = createSlug(missionName)
      }
      await findMission.updateOne(updatedFiled)
    }

    req.response = true
    next()
  }

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
      const arrChain = chain.replaceAll(' ', '').split(',').filter(item => item)
      matchQuery.chain = { $in: arrChain }
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

      matchQuery._id = { $in: missionTasks.map(task => new ObjectId(task._id)) }
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
        const listMissionIdsRequirements = matchQuery._id.$in.map(item => item.toString())
        const listMissionIdsStatus = participantsMissions.map(task => task._id.toString())
        matchQuery._id = { $in: listMissionIdsStatus.filter(item => listMissionIdsRequirements.includes(item)).map(item => new ObjectId(item)) }
      } else {
        matchQuery._id = { $in: participantsMissions.map(task => new ObjectId(task._id)) }
      }
    }

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
      endTime: 1,
      // isActive: 1,
      createdAt: 1
      // updatedAt: 1
    }
    // const payload = await Mission.find(matchQuery, fieldsResponse)
    //   .sort({ createdAt })
    //   .skip(genSkipNum(page, size))
    //   .limit(parseInt(size))
    //   .lean()

    const lookupMissionTasks = {
      from: COLLECTION_NAME.MissionTask,
      let: { refId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$missionId', { $toString: '$$refId' }] }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 }
          }
        }
      ],
      as: 'tasks'
    }
    const skip = genSkipNum(page, size)
    const limit = parseInt(size)
    const payload = await Mission.aggregate([
      { $match: matchQuery },
      { $project: fieldsResponse },
      { $lookup: lookupMissionTasks },
      { $sort: { createdAt: parseInt(createdAt) } },
      { $skip: skip },
      { $limit: limit }
    ])

    if (!payload.length) {
      req.response = {
        data: [],
        total: 0,
        totalPage: 0,
        currentPage: parseInt(page)
      }
      return next()
    }

    let payloadFilterStatus = payload.map(item => ({ ...item, status: getStatusTime(item.startTime, item.endTime) }))

    if (type) {
      const arrType = type.replaceAll(' ', '').split(',').map(item => CHECK_STATUS[item]).filter((value, index, self) => value && self.indexOf(value) === index)
      if (arrType.length) {
        payloadFilterStatus = payloadFilterStatus.filter(item => arrType.includes(item.status))
      }

      if (!payloadFilterStatus.length) {
        req.response = {
          data: [],
          total: 0,
          totalPage: 0,
          currentPage: parseInt(page)
        }
        return next()
      }
    }

    const payloadFormat = payloadFilterStatus.map(item => ({
      _id: item._id,
      missionName: item.missionName,
      missionAvatar: item.missionAvatar,
      rewardImage: item.rewardImageExample,
      chain: item.chain,
      totalTasks: get(item.tasks[0], 'total', 0),
      status: item.status
    }))

    req.response = {
      data: payloadFormat,
      total: payloadFormat.length,
      totalPage: Math.ceil(payloadFormat.length / parseInt(size)),
      currentPage: parseInt(page)
    }
    next()
  }

  static async getMissionById (req, res, next) {
    const { id } = req.params
    const { userAddress } = req.query
    const missionPromise = await Mission.aggregate([
      {
        $match: { _id: new ObjectId(id), isActive: true }
      },
      {
        $lookup: {
          from: COLLECTION_NAME.MissionTask,
          let: { refId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$missionId', { $toString: '$$refId' }] }
              }
            },
            {
              $project: {
                order: 1,
                taskContent: 1
              }
            }
          ],
          as: 'tasks'
        }
      }
    ])
    const participantsPromise = ParticipantsMission.countDocuments({ missionId: id })
    const totalNftMintedPromise = ParticipantsMission.countDocuments({ missionId: id, minted: true })

    const [arrMission, participants, totalNftMinted] = await Promise.all([missionPromise, participantsPromise, totalNftMintedPromise])
    const mission = arrMission[0]
    if (!mission) {
      req.response = { errMess: `notFoundMissionId:${id}` }
      return next()
    }
    const tasks = {}
    const missionTasks = get(mission, 'tasks', [])
    tasks.data = missionTasks
    tasks.totalTasks = missionTasks.length
    if (userAddress && tasks.data.length) {
      const userCompletedTasks = await TaskHistory.find({ nftProfileAddress: userAddress, completed: true, isActive: true }, { missionTasksId: 1 }).lean()
      tasks.data = tasks.data.map(task => ({ ...task, completed: !!userCompletedTasks.find(item => item.missionTasksId === task._id.toString()) }))
      tasks.totalTasksCompleted = tasks.data.filter(task => task.completed).length
    }
    req.response = {
      tasks,
      mission: {
        _id: mission._id.toString(),
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
