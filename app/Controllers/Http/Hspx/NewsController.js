'use strict'
const HspxsteelNew = use('App/Models/HspxsteelNew')

class NewsController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(['page', 'pageSize'])
      let iWhere = {}
      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type })
      }
      const lang = request.input('lang')
      if (!['ar', 'zh', 'tr', 'ko', 'ja', 'en'].includes(lang)) {
        throw new Error('lang no support')
      }
      if (!isEmpty(lang)) {
        var title_str = `${lang}_title`
        var content_str = `${lang}_content`
      }
      const data = await HspxsteelNew.query()
        .where(iWhere)
        .select(
          'image',
          'announcer',
          'type',
          'status',
          'created_at',
          'updated_at',
          title_str,
          content_str
        )
        .paginate(page, pageSize)
      return response.json({
        status: 'success',
        msg: '获取成功',
        data: data
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '获取失败',
        data: error.toString()
      })
    }
  }

  async hot({ request, response }) {
    try {
      const lang = request.input('lang')
      if (!['ar', 'zh', 'tr', 'ko', 'ja', 'en'].includes(lang)) {
        throw new Error('lang no support')
      }
      if (!isEmpty(lang)) {
        var title_str = `${lang}_title`
        var content_str = `${lang}_content`
      }
      const result = await HspxsteelNew.query()
        .where('status', 1)
        .select(
          'image',
          'announcer',
          'type',
          'status',
          'created_at',
          'updated_at',
          title_str,
          content_str
        )
        .orderBy('created_at', 'desc')
        .pick(6)
      return response.json({
        status: 'success',
        msg: '获取成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '获取失败',
        data: error.toString()
      })
    }
  }
}

module.exports = NewsController
