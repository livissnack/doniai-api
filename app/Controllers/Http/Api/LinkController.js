'use strict'

const Link = use('App/Models/Link')
const { isEmpty } = require('../../../Utils/Helpers')

class LinkController {
  async index({ request, response }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const name = request.input('name')
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name })
      }
      const url = request.input('url')
      if (!isEmpty(url)) {
        Object.assign(iWhere, { url: url })
      }
      const is_show = request.input('is_show')
      if (!isEmpty(is_show)) {
        Object.assign(iWhere, { is_show: is_show })
      }
      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type })
      }
      const data = await Link.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request, response }) {
    const data = request.only(['name', 'url', 'is_show', 'type'])
    try {
      const link = new Link()
      link.fill(data)
      const result = await link.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params, response }) {
    const { id } = params
    try {
      const data = await Link.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request, response }) {
    const { id } = params
    const data = request.only(['name', 'url', 'is_show', 'type'])
    try {
      const result = await Link.query()
        .where('id', id)
        .update(data)
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const link = await Link.find(id)
      const result = await link.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = LinkController
