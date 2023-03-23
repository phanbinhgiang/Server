import MissionTask from '../../../model/dagora/mission/MissionTask'
import Mission from '../../../model/dagora/mission/Mission'
import { checkInvalidRequireField, genUpdate, genSkipNum } from '../../function'

export default class MissionWorker {
  static async getAllMissionTask (req, res, next) {
    const {
      page = 1, size = 10, missionId
    } = req.query
    const matchQuery = {
      isActive: true
    }
    if (missionId) {
      matchQuery.missionId = missionId
    }

    const totalData = await MissionTask.countDocuments(matchQuery).lean()
    const payload = await MissionTask.find(matchQuery)
      .sort({ createdAt: -1 })
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

  static async createMissionTask (req, res, next) {
    const requiredFields = [
      'missionId',
      'taskTypeId',
      'order',
      'taskContent'
    ]

    const missingRequireField = checkInvalidRequireField(requiredFields, req.body)
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const { missionId } = req.body
    const countMissions = await Mission.countDocuments({ _id: missionId })
    if (!countMissions) {
      req.response = { errMess: 'missionIdNotFound' }
      return next()
    }

    const body = genUpdate(req.body, [
      'missionId',
      'taskTypeId',
      'order',
      'taskContent'
    ])
    const data = await MissionTask.create(body)
    req.response = data
    next()
  }

  static async updateMissionTask (req, res, next) {
    const { id } = req.body

    if (!id) {
      req.response = { errMess: 'requiredId' }
      return next()
    }

    const findMissionTask = await MissionTask.findOne({ _id: id })
    if (!findMissionTask) {
      req.response = { errMess: 'notFoundMissionTask' }
      return next()
    }

    const { missionId } = req.body
    if (missionId && missionId !== findMissionTask.missionId) {
      req.response = { errMess: 'missionIdInvalid' }
      return next()
    }

    const updatedFiled = genUpdate(req.body, [
      'taskTypeId',
      'order',
      'taskContent',
      'isActive'
    ])

    await findMissionTask.updateOne(updatedFiled)
    req.response = true
    next()
  }

  static async deleteMissionTaskById (req, res, next) {
    const { id } = req.params
    const missionTask = await MissionTask.findOne({ _id: id })
    if (!missionTask) {
      req.response = { errMess: `notFoundDocumentId:${id}` }
      return next()
    }

    if (!missionTask.isActive) {
      req.response = { errMess: 'documentIsDeleted' }
      return next()
    }

    await missionTask.updateOne({ isActive: false })
    req.response = true
    next()
  }
}
