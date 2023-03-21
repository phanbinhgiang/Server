import { createSchema, defaultModel } from '../..'

export default createSchema({
  id: defaultModel.stringUnique,
  partnerName: defaultModel.string,
  partnerLogo: defaultModel.string,
  partnerDescription: defaultModel.string,
  isActive: defaultModel.boolean
}, 'Partner', null, null)
