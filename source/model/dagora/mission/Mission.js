import { createSchema, defaultModel } from '../..'

export default createSchema({
  id: defaultModel.stringUnique,
  partnerId: defaultModel.string,
  collectionAddress: defaultModel.string,
  missionName: defaultModel.string,
  missionDescription: defaultModel.string,
  missionAvatar: defaultModel.string,
  rewardImageExample: defaultModel.string,
  rewardDescription: defaultModel.string,
  rewardUri: defaultModel.string,
  totalRewards: defaultModel.number,
  chain: defaultModel.string,
  startTime: defaultModel.date,
  endTime: defaultModel.date,
  isActive: defaultModel.boolean,
  createdAt: defaultModel.date,
  updatedAt: defaultModel.date

}, '-Mission', null, null)
