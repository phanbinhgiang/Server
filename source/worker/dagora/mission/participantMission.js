import { checkInvalidRequireField, genUpdate } from '../../function'
import UserProfile from '../../../model/user/UserProfile'
import Mission from '../../../model/dagora/mission/Mission'
import ParticipantsMission from '../../../model/dagora/mission/ParticipantsMission'
import { MISSION_PARTICIPANT_STATUS } from '../../../../common/constants'

export default class ParticipantMissionWorker {
  static async createParticipantMission (req, res, next) {
    const requiredFields = [
      'nftProfileAddress',
      'missionId'
    ]

    const missingRequireField = checkInvalidRequireField(requiredFields, req.body)
    if (missingRequireField) {
      req.response = { errMess: `missingRequireField:${missingRequireField}` }
      return next()
    }

    const { nftProfileAddress, missionId } = req.body

    const findNftProfileAddressPromise = UserProfile.findOne({ id: nftProfileAddress })
    const findMissionIdPromise = Mission.findOne({ _id: missionId })
    const findParticipantMissionPromise = ParticipantsMission.findOne({ nftProfileAddress, missionId })

    const [findNftProfileAddress, findMissionId, findParticipantMission] = await Promise.all([findNftProfileAddressPromise, findMissionIdPromise, findParticipantMissionPromise])
    if (!findNftProfileAddress) {
      req.response = { errMess: 'NftProfileAddressNotFound' }
      return next()
    }
    if (!findMissionId) {
      req.response = { errMess: 'MissionIdNotFound' }
      return next()
    }
    if (findParticipantMission) {
      req.response = { errMess: 'ParticipantMissionExisted' }
      return next()
    }

    const bodyParticipantMission = genUpdate(req.body, [
      'nftProfileAddress',
      'missionId',
      'verifiedTasks',
      'transactionHash',
      'hashIsVerified'
    ])

    bodyParticipantMission.status = MISSION_PARTICIPANT_STATUS.inProgress

    const data = await ParticipantsMission.create(bodyParticipantMission)
    req.response = data
    next()
  }
}
