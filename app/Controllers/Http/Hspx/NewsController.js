'use strict'
const HspxsteelNew = use('App/Models/HspxsteelNew')
const { isEmpty } = require('../../../Utils/Helpers')

class NewsController {
  /**
   * 品信新闻列表获取
   * @param {object} request
   */
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
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
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  /**
   * 品信热门新闻获取
   * @param {object} request
   */
  async hot({ request }) {
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
        .where({ status: 1, type: 1 })
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
      return result
    } catch (error) {
      return error.toString()
    }
  }

  /**
   * 品信新闻创建
   * @param {object} request
   */
  async store({ request }) {
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
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params }) {
    const { id } = params
    try {
      const data = await HspxsteelNew.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request }) {
    const { id } = params
    const key = request.input('key')
    const value = request.input('value')
    try {
      const result = await HspxsteelNew.query()
        .where('id', id)
        .update(key, value)
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params }) {
    const { id } = params
    try {
      const result = await HspxsteelNew.find(id).delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async readNums({ params }) {
    const { id } = params
    try {
      const hspxsteelNew = await HspxsteelNew.find(id)
      hspxsteelNew.read_count += 1
      await hspxsteelNew.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = NewsController
