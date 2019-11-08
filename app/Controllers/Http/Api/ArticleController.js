'use strict'

const Excel = use('exceljs')
const User = use('App/Models/User')
const Article = use('App/Models/Article')
const ArticleTag = use('App/Models/ArticleTag')
const ArticleType = use('App/Models/ArticleType')
const { isEmpty, formatDate } = require('../../../Utils/Helpers')

class ArticleController {
  async index({ request, response }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const articleType = request.input('article_type')
      if (!isEmpty(articleType)) {
        const articleTypeData = await ArticleType.findBy('value', articleType)
        Object.assign(iWhere, { article_type_id: articleTypeData.id })
      }
      const articleTag = request.input('article_tag')
      if (!isEmpty(articleTag)) {
        const articleTagData = await ArticleTag.findBy('value', articleTag)
        Object.assign(iWhere, { article_tag_id: articleTagData.id })
      }
      const username = request.input('username')
      if (!isEmpty(username)) {
        const userData = await User.findBy('username', username)
        Object.assign(iWhere, { id: userData.id })
      }
      const data = await Article.query()
        .where(iWhere)
        .with('user')
        .with('articleTag')
        .with('articleType')
        .paginate(page, perPage)
      return data
    } catch (error) {
      error.toString()
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'title',
      'image',
      'user_id',
      'article_type_id',
      'article_tag_id',
      'content'
    ])
    try {
      const article = new Article()
      article.fill(data)
      article.merge({ publish_at: formatDate(new Date()) })
      const result = await article.save()
      return response.json({
        status: 'success',
        msg: '文章保存成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '文章保存失败',
        data: error.toString()
      })
    }
  }

  async show({ params, response }) {
    const articleId = params.id
    try {
      const data = await Article.query()
        .where('id', articleId)
        .with('user')
        .with('articleTag')
        .with('articleType')
        .fetch()
      return response.json({
        status: 'success',
        msg: '文章数据获取成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '文章数据获取失败',
        data: error.toString()
      })
    }
  }

  async update({ params, request, response }) {
    const { id } = params
    const content = request.input('content')
    try {
      const result = await Article.query()
        .where('id', id)
        .update({ content: content })
      return response.json({
        status: 'success',
        msg: '文章修改成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '文章修改失败',
        data: error.toString()
      })
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const article = await Article.find(id)
      const result = await article.delete()
      return response.json({
        status: 'success',
        msg: '文章删除成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '文章删除失败',
        data: error.toString()
      })
    }
  }

  async batchDel({ request, response }) {
    try {
      const ids = request.input('ids')
      const result = await Article.query()
        .whereIn('id', ids)
        .delete()
      return response.json({
        status: 'success',
        msg: '文章删除成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '文章删除失败',
        data: error.toString()
      })
    }
  }

  async export({ request, response }) {
    try {
      const workbook = new Excel.Workbook()
      const worksheet = workbook.addWorksheet('Sales Data')

      const data = [
        { product: 'Product A', week1: 5, week2: 10, week3: 27 },
        { product: 'Product B', week1: 5, week2: 5, week3: 11 },
        { product: 'Product C', week1: 1, week2: 2, week3: 3 },
        { product: 'Product D', week1: 6, week2: 1, week3: 2 }
      ]

      const headers = [
        { header: 'Product ID', key: 'product', width: 20 },
        { header: 'Week 1', key: 'week1', width: 10 },
        { header: 'Week 2', key: 'week2', width: 10 },
        { header: 'Week 3', key: 'week3', width: 10 },
        { header: 'Product Totals', key: 'productTotals', width: 12 }
      ]

      data.forEach((item, index) => {
        worksheet.addRow({
          ...item
          // productTotals: generateProductTotalsCell(worksheet, index + 1)
        })
      })

      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });

      // worksheet.views = [
      //   { state: 'frozen', xSplit: 1, ySplit: 1, activeCell: 'B2' },
      // ];

      await workbook.xlsx.writeFile('sales-report.xlsx')
    } catch (error) {
      console.log(error)
      return response.json({
        status: 'failure',
        msg: '文章删除失败',
        data: error.toString()
      })
    }
  }
}

module.exports = ArticleController
