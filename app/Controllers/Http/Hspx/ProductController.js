'use strict'
const HspxsteelProduct = use('App/Models/HspxsteelProduct')
const { isEmpty } = require('../../../Utils/Helpers')

class ProductController {
  /**
   * 品信产品列表获取
   * @param {object} request
   * @param {object} response
   */
  async index({ request, response }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { product_type_id: type })
      }
      const status = request.input('status', 1)
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status })
      }
      const lang = request.input('lang')
      if (!['ar', 'zh', 'tr', 'ko', 'ja', 'en'].includes(lang)) {
        throw new Error('lang no support')
      }
      if (!isEmpty(lang)) {
        var content_str = `${lang}` === 'zh' ? 'content' : 'en_content'
      }
      const data = await HspxsteelProduct.query()
        .where(iWhere)
        .select(
          'id',
          'image',
          'instock',
          'product_type_id',
          'status',
          'created_at',
          'updated_at',
          'name',
          content_str,
          'width',
          'thickness',
          'length'
        )
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async all({ request, response }) {
    try {
      let iWhere = {}
      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { product_type_id: type })
      }
      const status = request.input('status', 1)
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status })
      }
      const lang = request.input('lang')
      if (!['ar', 'zh', 'tr', 'ko', 'ja', 'en'].includes(lang)) {
        throw new Error('lang no support')
      }
      if (!isEmpty(lang)) {
        var content_str = `${lang}` === 'zh' ? 'content' : 'en_content'
      }
      const data = await HspxsteelProduct.query()
        .where(iWhere)
        .select(
          'id',
          'image',
          'instock',
          'product_type_id',
          'status',
          'created_at',
          'updated_at',
          'name',
          content_str,
          'width',
          'thickness',
          'length'
        )
        .fetch()
      return data
    } catch (error) {
      return error.toString()
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
      'instock',
      'product_type_id',
      'status',
      'name',
      'content',
      'en_content',
      'width',
      'thickness',
      'length'
    ])
    try {
      const hspxsteelProduct = new HspxsteelProduct()
      hspxsteelProduct.fill(data)
      const result = await hspxsteelProduct.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params, response }) {
    const { id } = params
    try {
      const data = await HspxsteelProduct.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '获取失败',
        data: error.toString()
      })
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const result = await HspxsteelProduct.find(id).delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = ProductController
