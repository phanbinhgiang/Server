import { createSchema, defaultModel } from '..'

export default createSchema({
  nftProfileAddress: defaultModel.string,
  missionId: defaultModel.string,
  verifiedTasks: defaultModel.boolean,
  transactionHash: defaultModel.string,
  hashIsVerified: defaultModel.boolean,
  status: defaultModel.string

}, 'ParticipantsMission', null, null)
