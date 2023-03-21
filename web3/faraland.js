import axios from 'axios'

export default class FaralandServices {
  static async getAllAsset (req, res) {
    const { ownerAddress, page = 1, size = 10 } = req.query
    const address = ownerAddress.toLowerCase()
    const link = 'https://service.faraland.io/api/hero/filter'

    const payload = await axios({
      method: 'POST',
      url: link,
      data: {
        owner: address,
        orderBy: {
          listedPrice: 'asc'
        },
        page: page,
        itemPerPage: size
      }
    })

    if (payload && payload.data && payload.data.data) {
      const arrToken = payload.data.data.list
      const total = payload.data.data.total[0].count

      const arrTokenFormated = arrToken.map(it => {
        return {
          token: it,
          image: `https://service.faraland.io/images/heroes/${it.id}.png`
        }
      })
      res.json({ data: arrTokenFormated, total: total })
    } else {
      res.json({ data: [], total: 0 })
    }
  }
}
