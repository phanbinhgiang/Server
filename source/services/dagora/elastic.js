import chunk from 'lodash/chunk'
import { chainType } from '../../worker/constants'
import { getLength } from '../../worker/function'
import { dagoraElasticIndex, dagoraElasticIndexMapping, dagoraType } from './constants'
// elastic search client
const client = elasticClient
export default class DagoraElasticServices {
  static async addDataToElasticBulk (arrData, index = dagoraElasticIndex.market) {
    const chunkData = chunk(arrData, 200)
    await chunkData.reduce(async (total, payload) => {
      await total.then(async () => {
        const body = payload.map(it => {
          return [{ create: { _index: index, _type: dagoraType } },
            it]
        })
        const result = await client.bulk({
          body: body.flat()
        })
        return result
      })
    }, Promise.resolve())
  }

  static async deleteDataByArrId (arrId, index = dagoraElasticIndex.activity) {
    const chunkData = chunk(arrId, 100)
    await chunkData.reduce(async (total, payload) => {
      await total.then(async () => {
        const body = payload.map(it => {
          return { delete: { _index: index, _type: dagoraType, _id: it } }
        })
        const result = await client.bulk({
          body: body.flat()
        })
        return result
      })
    }, Promise.resolve())
  }

  static async updateDataById (updateData, index) {
    const chunkData = chunk(updateData, 200)
    await chunkData.reduce(async (total, payload) => {
      await total.then(async () => {
        const body = payload.map(it => {
          return [{ update: { _id: it._id, _index: index, _type: dagoraType } },
            { doc: { price: it.currentPrice } }]
        })
        const result = await client.bulk({
          body: body.flat()
        })
        return result
      })
    }, Promise.resolve())
  }

  static async updateDataByQuery ({ index, query, data }) {
    const payload = await DagoraElasticServices.searchElasticLocal({
      index,
      query
    })
    const foundExists = payload.hits.hits[0] || false
    if (foundExists) {
      await client.update({
        index,
        id: foundExists._id,
        doc: data
      })
    } else {
      await client.index({
        index,
        document: data
      })
    }
  }

  static async callBulkData (body) {
    const result = await client.bulk({
      body: body
    })
    return result
  }

  static async createNewDataLocal (index, data) {
    const payload = await client.index({
      index: index,
      type: dagoraType,
      document: data
    })
    return payload
  }

  static async searchElasticLocal ({ index, query, sort, page = 1, size = 10000 }) {
    try {
      const queryData = {
        index,
        query: query,
        from: (parseInt(page) - 1) * parseInt(size),
        size: parseInt(size)
      }
      if (sort) {
        queryData.sort = sort
      }
      const payload = await client.search(queryData)

      return payload
    } catch (error) {
      console.log('🚀 ~ file: elastic.js:106 ~ DagoraElasticServices ~ searchElasticLocal ~ error', error)
      return { hits: { hits: [] } }
    }
  }

  static async aggregateElasticLocal ({ index, aggs, query = { bool: { must: [] } } }) {
    const payload = await client.search({
      index,
      query,
      aggs: aggs
    })

    return payload
  }

  static async countDataIndexLocal ({ index, query }) {
    try {
      const payload = await client.count({
        index,
        query
      })
      return payload
    } catch (error) {
      return 0
    }
  }

  static async createIndex (index) {
    const createData = { index }
    const mappingData = dagoraElasticIndexMapping[index]
    if (mappingData) {
      createData.body = mappingData
    }
    await client.indices.create(createData)
    return true
  }

  static async deleteDataByQueryLocal ({ index, query }) {
    try {
      const payload = await client.deleteByQuery({
        index,
        body: {
          query
        }
      })
      return payload
    } catch (error) {
      return false
    }
  }

  static async deleteAlldataIndexLocal (type) {
    const result = await client.indices.delete({
      index: dagoraElasticIndex[type]
    })
    await DagoraElasticServices.createIndex(dagoraElasticIndex[type])
    return result
  }

  static genQueryNFT ({ keyword, chain, minPrice = 0, maxPrice = 100000000, tokens, address = '', from, expireAt = moment().unix(), collectionKey = '', isExplore = true }) {
    const bool = {
      must: [
        {
          range: {
            time: {
              lte: moment().unix()
            }
          }
        }
      ]
    }
    if (isExplore) {
      bool.must_not = [
        {
          term: {
            isEndBidSuccess: true
          }
        }
      ]
    }
    if (expireAt) {
      bool.must = bool.must.concat({
        range: {
          expireAt: {
            gte: expireAt
          }
        }
      })
    }

    if (getLength(keyword) > 0) {
      bool.must = bool.must.concat({
        bool: {
          should: [
            {
              query_string: {
                query: `*${keyword}*`,
                fields: [
                  'name'
                ]
              }
            },
            {
              match: {
                id: {
                  query: keyword
                }
              }
            }
          ]
        }
      })
    }

    if (getLength(chain) > 0) {
      const arrChain = chain.split(',')
      bool.must = bool.must.concat({
        bool: {
          should: arrChain.map(it => ({
            match: {
              chain: {
                query: it
              }
            }
          }))
        }
      })
    }

    if (getLength(from) > 0) {
      bool.must = bool.must.concat({
        match: {
          from: from
        }
      })
    }

    if (minPrice && maxPrice) {
      bool.must = bool.must.concat({
        range: {
          price: {
            gte: minPrice,
            lte: maxPrice
          }
        }
      })
    }

    if (getLength(address) > 0 || getLength(collectionKey) > 0) {
      const arrAddress = address.split(',')
      const arrCollectionKey = collectionKey.split(',')
      const arrShouldAddress = arrAddress.map(it => ({
        match: {
          address: {
            query: it
          }
        }
      }))
      const arrShouldCollectionKey = arrCollectionKey.map(it => ({
        match: {
          collectionKey: {
            query: it
          }
        }
      }))
      bool.must = bool.must.concat({
        bool: {
          should: [].concat(arrShouldAddress, arrShouldCollectionKey)
        }
      })
    }

    if (getLength(tokens) > 0) {
      const arrTokenAddress = tokens.split(',')
      bool.filter = {
        bool: {
          should: arrTokenAddress.map(it => {
            return { match: { 'tokenId.keyword': { query: it, minimum_should_match: '100%' } } }
          })
        }
      }
    }
    return { bool }
  }

  static genQueryArrNFT (arrNft) {
    return {
      bool: {
        should: arrNft.map(it => {
          if (it.chain !== chainType.solana) {
            return {
              bool: {
                must: [
                  { match: { chain: it.chain } },
                  { match: { address: it.address } },
                  {
                    bool: {
                      should: [
                        { match: { id: it.id.toString() } },
                        { match: { id: it.id } }
                      ]
                    }
                  }
                ]
              }
            }
          } else {
            return {
              bool: {
                must: [
                  { match: { chain: it.chain } },
                  { match: { address: it.address } }
                ]
              }
            }
          }
        })
      }
    }
  }

  static genQueryArrBundle (bundle) {
    return {
      bool: {
        should: bundle.map(it => {
          return {
            bool: {
              must: [
                {
                  match: {
                    id: {
                      query: it.id,
                      minimum_should_match: '100%'
                    }
                  }
                },
                { match: { chain: it.chain } }
              ]
            }
          }
        })
      }
    }
  }

  static genSortState (sortString) {
    return sortString[0] === '-' ? { [sortString.substring(1)]: 'desc' } : { [sortString]: 'asc' }
  }
}
