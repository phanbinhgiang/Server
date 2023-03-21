import { createSchema, defaultModel } from '..'

export default createSchema({
  address: defaultModel.stringUnique,
  linkedChain: defaultModel.string,
  nftProfileAddress: defaultModel.string
}, 'UserProfile', null, null)
