'use strict'

const BlackList = use('App/Models/BlackList')
const { isEmpty } = require('../../../Utils/Helpers')

class BlackListController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const ip = request.input('ip')
      if (!isEmpty(ip)) {
        Object.assign(iWhere, { ip: ip })
      }
      const status = request.input('status')
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status })
      }
      const data = await BlackList.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request }) {
    const data = request.only([
      'ip',
      'status',
      'release_start_time',
      'release_end_time'
    ])
    try {
      const blackList = new BlackList()
      blackList.fill(data)
      const result = await blackList.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params }) {
    const { id } = params
    try {
      const data = await BlackList.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request }) {
    const { id } = params
    const data = request.only([
      'ip',
      'status',
      'release_start_time',
      'release_end_time'
    ])
    try {
      const result = await BlackList.query()
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
      const book = await BlackList.find(id)
      const result = await book.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = BlackListController
