import { createSchema, defaultModel } from '../..'

export default createSchema({
  nftProfileAddress: defaultModel.string,
  missionTasksId: defaultModel.string,
  tasksData: defaultModel.object,
  updateTime: defaultModel.date
}, 'TaskHistory', null, null)
