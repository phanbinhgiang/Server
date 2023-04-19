import mongoose from 'mongoose'
import { checkInvalidRequireField, genUpdate } from '../function'
import PortalCategory from '../../model/insight/PortalCategory'
import PortalSubCategory from '../../model/insight/PortalSubCategory'
import PortalArticle from '../../model/insight/PortalArticle'

const ObjectId = mongoose.Types.ObjectId

export default class TestWorker {
  static async editPortal (req, res, next) {
    const {
      categories,
      subCates,
      articles
    } = req.body

    if (!(categories || subCates || articles)) {
      req.response = { errMess: 'requestBodyInvalid' }
      return next()
    }

    const newCategories = categories ? categories.filter(category => category.type === 'new') : []
    const updateCategories = categories ? categories.filter(category => category.type === 'update') : []
    const deleteCategories = categories ? categories.filter(category => category.type === 'delete') : []

    const newSubCates = subCates ? subCates.filter(subCate => subCate.type === 'new') : []
    const updateSubCates = subCates ? subCates.filter(subCate => subCate.type === 'update') : []
    const deleteSubCates = subCates ? subCates.filter(subCate => subCate.type === 'delete') : []

    const newArticles = articles ? articles.filter(article => article.type === 'new') : []
    const updateArticles = articles ? articles.filter(article => article.type === 'update') : []
    const deleteArticles = articles ? articles.filter(article => article.type === 'delete') : []

    let bodyNewPortalCategories = []
    let bodyNewPortalSubCategories = []
    let bodyNewPortalArticles = []

    let bodyUpdatePortalCategories = []
    let bodyUpdatePortalSubCategories = []
    let bodyUpdatePortalArticles = []

    const errorMessage = []

    if (newCategories.length) {
      for (let index = 0; index < newCategories.length; index++) {
        const category = newCategories[index]

        category._id = new ObjectId()

        let findNewSubCates = newSubCates.filter(subCate => subCate.categoryId === category.id)
        if (!findNewSubCates.length) {
          errorMessage.push('notFoundNewSubCates')
          break
        }
        findNewSubCates = findNewSubCates.map(subCate => ({
          _id: new ObjectId(),
          id: subCate.id,
          title: subCate.data.title,
          order: subCate.order,
          isActive: true,
          categoryId: category._id
        }))

        let findNewArticles = newArticles.filter(article => findNewSubCates.find(subCate => subCate.id === article.subCategoryId))
        if (!findNewArticles.length) {
          errorMessage.push('notFoundNewArticles')
          break
        }
        findNewArticles = findNewArticles.map(article => ({
          _id: new ObjectId(),
          id: article.id,
          subCategoryId: findNewSubCates.find(subCate => subCate.id === article.subCategoryId)._id,
          data: article.data,
          isActive: true
        }))

        bodyNewPortalCategories = [...bodyNewPortalCategories, {
          _id: category._id,
          title: category.data.title,
          order: category.order,
          subCates: findNewSubCates,
          isActive: true
        }]
        bodyNewPortalSubCategories = [...bodyNewPortalSubCategories, ...findNewSubCates]
        bodyNewPortalArticles = [...bodyNewPortalArticles, ...findNewArticles]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    if (newSubCates.length) {
      let filteredNewSubCates = newSubCates
      if (bodyNewPortalSubCategories.length) {
        const arrIdSubCates = bodyNewPortalSubCategories.map(item => item.id)
        filteredNewSubCates = filteredNewSubCates.filter(item => !arrIdSubCates.includes(item.id))
      }

      for (let index = 0; index < filteredNewSubCates.length; index++) {
        const subCategory = filteredNewSubCates[index]
        subCategory._id = new ObjectId()

        if (!subCategory.categoryId || !mongoose.isValidObjectId(subCategory.categoryId)) {
          errorMessage.push(`IsNotObjectId: ${subCategory.categoryId}`)
          break
        }

        const findPortalCategory = await PortalCategory.findOne({ _id: subCategory.categoryId })
        if (!findPortalCategory) {
          errorMessage.push(`notFoundCategoryId: ${subCategory.categoryId}`)
          break
        }

        let findArticles = newArticles.filter(item => item.subCategoryId === subCategory.id)
        if (!findArticles.length) {
          errorMessage.push('notFoundArticles')
          break
        }

        findArticles = findArticles.map(article => ({
          _id: new ObjectId(),
          id: article.id,
          subCategoryId: subCategory._id,
          data: article.data,
          isActive: true
        }))

        bodyNewPortalSubCategories = [...bodyNewPortalSubCategories, {
          _id: subCategory._id,
          id: subCategory.id,
          title: subCategory.data.title,
          order: subCategory.order,
          isActive: true,
          categoryId: subCategory.categoryId
        }]
        bodyNewPortalArticles = [...bodyNewPortalArticles, ...findArticles]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    if (newArticles.length) {
      let filteredNewArticles = newArticles
      if (bodyNewPortalArticles.length) {
        const arrIdArticles = bodyNewPortalArticles.map(item => item.id)
        filteredNewArticles = filteredNewArticles.filter(item => !arrIdArticles.includes(item.id))
      }

      for (let index = 0; index < filteredNewArticles.length; index++) {
        const article = filteredNewArticles[index]
        articles._id = new ObjectId()

        if (!article.subCategoryId || !mongoose.isValidObjectId(article.subCategoryId)) {
          errorMessage.push(`IsNotObjectId: ${article.subCategoryId}`)
          break
        }

        const findPortalSubCategory = await PortalSubCategory.findOne({ _id: article.subCategoryId })
        if (!findPortalSubCategory) {
          errorMessage.push(`notFoundCategoryId: ${article.subCategoryId}`)
          break
        }

        bodyNewPortalArticles = [...bodyNewPortalArticles, {
          _id: article._id,
          id: article.id,
          subCategoryId: article.subCategoryId,
          data: article.data,
          isActive: true

        }]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    if (updateCategories.length) {
      for (let index = 0; index < updateCategories.length; index++) {
        const category = updateCategories[index]

        if (!category.id || !mongoose.isValidObjectId(category.id)) {
          errorMessage.push(`IsNotObjectId: ${category.id}`)
        }

        const findPortalCategory = await PortalCategory.findOne({ _id: category.id, isActive: true })
        if (!findPortalCategory) {
          errorMessage.push(`notFoundPortalCategory: ${category.id}`)
          break
        }

        const bodyUpdatePortalCategory = genUpdate(category, ['data', 'order'])
        bodyUpdatePortalCategories = [...bodyUpdatePortalCategories, { findPortalCategory, ...bodyUpdatePortalCategory }]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    if (updateSubCates.length) {
      for (let index = 0; index < updateSubCates.length; index++) {
        const subCategory = updateSubCates[index]

        if (!subCategory.id || !mongoose.isValidObjectId(subCategory.id)) {
          errorMessage.push(`IsNotObjectId: ${subCategory.id}`)
          break
        }

        const findPortalSubCategory = await PortalSubCategory.findOne({ _id: subCategory.id, isActive: true })
        if (!findPortalSubCategory) {
          errorMessage.push(`notFoundPortalSubCategory: ${subCategory.id}`)
          break
        }

        const bodyUpdatePortalSubCategory = genUpdate(subCategory, ['data', 'order'])
        bodyUpdatePortalSubCategories = [...bodyUpdatePortalSubCategories, { findPortalSubCategory, ...bodyUpdatePortalSubCategory }]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    if (updateArticles.length) {
      for (let index = 0; index < updateArticles.length; index++) {
        const article = updateArticles[index]

        if (!article.id || !mongoose.isValidObjectId(article.id)) {
          errorMessage.push(`IsNotObjectId: ${article.id}`)
          break
        }

        const findPortalArticle = await PortalArticle.findOne({ _id: article.id, isActive: true })
        if (!findPortalArticle) {
          errorMessage.push(`notFoundPortalArticle: ${article.id}`)
          break
        }

        const bodyUpdatePortalArticle = genUpdate(article, ['data'])
        bodyUpdatePortalArticles = [...bodyUpdatePortalArticles, { findPortalArticle, ...bodyUpdatePortalArticle }]
      }

      if (errorMessage.length) {
        req.response = { errMess: errorMessage.join(', ') }
        return next()
      }
    }

    // // Create Portal
    // if (bodyNewPortalArticles.length) {
    //   await Promise.all([
    //     PortalCategory.insertMany(bodyNewPortalCategories),
    //     PortalSubCategory.insertMany(bodyNewPortalSubCategories),
    //     PortalArticle.insertMany(bodyNewPortalArticles)
    //   ])
    // }

    // // Update PortalCategory
    // if (bodyUpdatePortalCategories.length) {
    //   await Promise.all(bodyUpdatePortalCategories.map(async item => {
    //     const { findPortalCategory, data, order } = item
    //     await findPortalCategory.updateOne({ title: data.title, order })
    //   }))
    // }

    // // Update PortalSubCategory
    // if (bodyUpdatePortalSubCategories.length) {
    //   await Promise.all(bodyUpdatePortalSubCategories.map(async item => {
    //     const { findPortalSubCategory, data, order } = item
    //     await findPortalSubCategory.updateOne({ title: data.title, order })
    //   }))
    // }

    // // Update PortalArticles
    // if (bodyUpdatePortalArticles.length) {
    //   await Promise.all(bodyUpdatePortalArticles.map(async item => {
    //     const { findPortalArticle, data } = item
    //     await findPortalArticle.updateOne({ data })
    //   }))
    // }

    req.response = {
      bodyNewPortalCategories,
      bodyNewPortalSubCategories,
      bodyNewPortalArticles
    }
    next()
  }
}
