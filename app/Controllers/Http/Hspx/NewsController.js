'use strict'
const HspxsteelNew = use('App/Models/HspxsteelNew')
const { isEmpty } = require('../../../Utils/Helpers')

class NewsController {
  /**
   * 品信新闻列表获取
   * @param {object} request
   * @param {object} response
   */
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
          'id',
          'image',
          'announcer',
          'read_count',
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

  /**
   * 品信热门新闻获取
   * @param {object} request
   * @param {object} response
   */
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
          'id',
          'image',
          'announcer',
          'read_count',
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

  /**
   * 品信新闻创建
   * @param {object} request
   * @param {object} response
   */
  async store({ request, response }) {
    const data = request.only([
      'image',
      'announcer',
      'read_count',
      'type',
      'status',
      'zh_title',
      'zh_content',
      'tr_title',
      'tr_content',
      'en_title',
      'en_content',
      'ko_title',
      'ko_content',
      'ja_title',
      'ja_content',
      'ar_title',
      'ar_content'
    ])
    try {
      const hspxsteelNew = new HspxsteelNew()
      hspxsteelNew.fill(data)
      const result = await hspxsteelNew.save()
      return response.json({
        status: 'success',
        msg: '保存成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '保存失败',
        data: error.toString()
      })
    }
  }

  async show({ params, response }) {
    const { id } = params
    try {
      const data = await HspxsteelNew.query()
        .where('id', id)
        .fetch()
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

  async update({ params, request, response }) {
    const { id } = params
    const key = request.input('key')
    const value = request.input('value')
    try {
      const result = await HspxsteelNew.query()
        .where('id', id)
        .update(key, value)
      return response.json({
        status: 'success',
        msg: '修改成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '修改失败',
        data: error.toString()
      })
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const result = await Article.find(id).delete()
      return response.json({
        status: 'success',
        msg: '删除成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '删除失败',
        data: error.toString()
      })
    }
  }
}

module.exports = NewsController
