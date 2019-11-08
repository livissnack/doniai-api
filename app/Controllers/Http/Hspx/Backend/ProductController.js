'use strict'

const HspxsteelProduct = use('App/Models/HspxsteelProduct')
const { isEmpty } = require('../../../../Utils/Helpers')

class ProductController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const id = request.input('id')
      if (!isEmpty(id)) {
        Object.assign(iWhere, { id: id })
      }
      const status = request.input('status')
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status })
      }
      const name = request.input('name')
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name })
      }
      const data = await HspxsteelProduct.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request }) {
    const data = request.only([
      'image',
      'name',
      'content',
      'en_content',
      'instock',
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

  async show({ params }) {
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

  async update({ params, request }) {
    const { id } = params
    const data = request.only(['image', 'zh_title', 'zh_content', 'type'])
    try {
      const result = await HspxsteelProduct.query()
        .where('id', id)
        .update(data)
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params }) {
    const { id } = params
    try {
      const hspxsteelProduct = await HspxsteelProduct.find(id)
      const result = await hspxsteelProduct.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = ProductController
