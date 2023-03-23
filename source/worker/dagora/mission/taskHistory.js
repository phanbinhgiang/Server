import TaskHistory from '../../../model/dagora/mission/TaskHistory'
import UserProfile from '../../../model/user/UserProfile'
import { checkInvalidRequireField, genUpdate } from '../../function'
import MissionTask from '../../../model/dagora/mission/MissionTask'

export default class TaskHistoryWorker {
  static async createTaskHistory (req, res, next) {
    const requiredFields = [
      'nftProfileAddress',
      'missionTasksId',
      'tasksData'
    ]

    const missingRequireField = checkInvalidRequireField(requiredFields, req.body)
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const { nftProfileAddress } = req.body
    const countUsers = await UserProfile.countDocuments({ id: nftProfileAddress })
    if (!countUsers) {
      req.response = { errMess: 'nftProfileAddressIdNotFound' }
      return next()
    }

    const { missionTasksId } = req.body
    const countMissionTasks = await MissionTask.countDocuments({ _id: missionTasksId })
    if (!countMissionTasks) {
      req.response = { errMess: 'missionTasksIdNotFound' }
      return next()
    }

    const body = genUpdate(req.body, [
      'nftProfileAddress',
      'missionTasksId',
      'tasksData',
      'updateTime',
      'isActive',
      'completed'
    ])

    const findTaskHistory = await TaskHistory.findOne({ nftProfileAddress, missionTasksId })
    if (findTaskHistory) {
      req.response = { errMess: 'taskHistoryIsExisted' }
      return next()
    }
    const data = await TaskHistory.create(body)
    req.response = data
    next()
  }

  static async updateTaskHistory (req, res, next) {
    const { id } = req.body

    if (!id) {
      req.response = { errMess: 'requiredId' }
      return next()
    }

    const findTaskHistory = await TaskHistory.findOne({ _id: id })
    if (!findTaskHistory) {
      req.response = { errMess: 'notFoundTaskHistory' }
      return next()
    }

    const { nftProfileAddress } = req.body
    if (nftProfileAddress && nftProfileAddress !== findTaskHistory.nftProfileAddress) {
      req.response = { errMess: 'nftProfileAddressInvalid' }
      return next()
    }

    const { missionTasksId } = req.body
    if (missionTasksId && missionTasksId !== findTaskHistory.missionTasksId) {
      req.response = { errMess: 'missionTasksIdInvalid' }
      return next()
    }

    const updatedFiled = genUpdate(req.body, [
      'nftProfileAddress',
      'missionTasksId',
      'tasksData',
      'updateTime',
      'completed'
    ])

    await findTaskHistory.updateOne(updatedFiled)
    req.response = true
    next()
  }
}
