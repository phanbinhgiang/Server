
export default class ParticipantMissionWorker {
  static async createParticipantMission (req, res, next) {
    // const requiredFields = [
    //   'nftProfileAddress',
    //   'missionId',
    //   'verifiedTasks',
    //   'transactionHash',
    //   'hashIsVerified',
    //   'status',
    //   'minted'
    // ]

    // const missingRequireField = checkInvalidRequireField(requiredFields, req.body)
    // if (missingRequireField) {
    //   req.response = { errMess: `missingRequireField:${missingRequireField}` }
    //   return next()
    // }

    // const { partnerId } = req.body
    // const findPartnerId = await Partner.countDocuments({ _id: partnerId })
    // if (!findPartnerId) {
    //   req.response = { errMess: 'notFoundPartnerId' }
    //   return next()
    // }

    // const { missionName } = req.body
    // const id = createSlug(missionName)
    // const findMission = await Mission.findOne({ id })
    // if (findMission) {
    //   req.response = { errMess: 'missionNameExists' }
    //   return next()
    // }

    // const body = genUpdate(req.body, [
    //   'partnerId',
    //   'collectionAddress',
    //   'missionName',
    //   'missionDescription',
    //   'missionAvatar',
    //   'rewardImageExample',
    //   'rewardDescription',
    //   'rewardUri',
    //   'totalRewards',
    //   'chain',
    //   'startTime',
    //   'endTime'
    // ])
    // const data = await Mission.create({ id, ...body })
    req.response = true
    next()
  }
}
