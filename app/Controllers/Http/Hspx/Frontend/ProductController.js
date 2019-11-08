'use strict'
const HspxsteelProduct = use('App/Models/HspxsteelProduct')
const { isEmpty } = require('../../../../Utils/Helpers')

class ProductController {
  async list({ request }) {
    try {
      const lang = request.input('lang')
      if (!['ar', 'zh', 'tr', 'ko', 'ja', 'en'].includes(lang)) {
        throw new Error('lang no support')
      }
      if (!isEmpty(lang)) {
        var content_str = `${lang}` === 'zh' ? 'content' : 'en_content'
      }
      const data = await HspxsteelProduct.query()
        .where({ status: 1 })
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

  async all({ request }) {
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

  async detail({ params }) {
    const { id } = params
    try {
      const data = await HspxsteelProduct.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = ProductController
