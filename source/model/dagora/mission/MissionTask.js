import { createSchema, defaultModel } from '../..'

export default createSchema({
  missionId: defaultModel.string,
  taskTypeId: defaultModel.string,
  order: defaultModel.string,
  taskContent: defaultModel.object,
  isActive: defaultModel.boolean
}, 'MissionTask', null, null)
