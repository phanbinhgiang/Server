import chunk from 'lodash/chunk'
const client = elasticClient

export default class ElasticSearchServices {
  static async addAllDatatoElastic (arrData, index) {
    const chunkData = chunk(arrData, 10000)
    await chunkData.reduce(async (total, payload) => {
      await total.then(async () => {
        const body = payload.map(it => {
          return [{ create: { _index: index } },
            it]
        })
        const result = await client.bulk({
          body: body.flat()
        })
        return result
      })
    }, Promise.resolve())
  }
}
