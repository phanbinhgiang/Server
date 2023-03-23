import { createSchema, defaultModel } from '..'

export default createSchema({
  id: defaultModel.stringUnique,
  // Update for insight
  quote: defaultModel.string,
  name: defaultModel.string,
  userName: defaultModel.string, // name slug
  image: defaultModel.string,
  background: defaultModel.string,
  email: defaultModel.string,
  social: defaultModel.object,
  nftVerifiedId: defaultModel.string,
  isActive: defaultModel.boolean

}, '-UserProfile', null, null)
