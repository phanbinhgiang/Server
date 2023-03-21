import UserWorker from '../../worker/system/user'
export default class KnowledgeServices {
  static async migrateAuthorToDataLocal (arrData) {
    const arrAuthor = await UserWorker.getByListLocal(arrData.map(it => it.author), { name: 1, image: 1 })
    return arrData.map(it => {
      const foundAuthor = arrAuthor.find(usr => usr.id === it.author)
      return Object.assign(it, { author: foundAuthor || { id: it.author } })
    })
  }
}
