import slug from 'slug'
export const createSlug = (text) => {
  return slug(lowerCase(text))
}

export const genSortStateMongo = (sortString = '') => {
  if (getLength(sortString) === 0) return { createdAt: -1 }
  const isDesc = sortString[0] === '-'

  return isDesc ? { [sortString.substring(1)]: -1 } : { [sortString]: 1 }
}
