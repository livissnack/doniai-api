'use strict'

const HspxsteelAccessLog = use('App/Models/HspxsteelAccessLog')
const { isEmpty } = require('../../../../Utils/Helpers')

class AccessLogController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const id = request.input('id')
      if (!isEmpty(id)) {
        Object.assign(iWhere, { id: id })
      }
      const ip = request.input('ip')
      if (!isEmpty(ip)) {
        Object.assign(iWhere, { ip: ip })
      }
      const data = await HspxsteelAccessLog.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params }) {
    const { id } = params
    try {
      const data = await HspxsteelAccessLog.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params }) {
    const { id } = params
    try {
      const hspxsteelAccessLog = await HspxsteelAccessLog.find(id)
      const result = await hspxsteelAccessLog.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = AccessLogController
