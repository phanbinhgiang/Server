import { createSchema, defaultModel } from '..'

export default createSchema({
  id: defaultModel.string,
  missionId: defaultModel.string,
  taskTypeId: defaultModel.string,
  order: defaultModel.string,
  taskContentId: defaultModel.object
}, 'MissionTask', null, null)
