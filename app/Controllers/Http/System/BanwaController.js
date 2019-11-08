'use strict'

const Config = use('Config')
const qs = use('querystring')
const banwaConfig = Config.get('banwa.config')
const { httpGet, isOk } = require('../../../Utils/Helpers')

class BanwaController {
  async getServiceInfo() {
    let qstring = qs.stringify({
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    })
    let url = `${banwaConfig.baseUrl}/getServiceInfo?${qstring}`
    try {
      let result = await httpGet(url)
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data)
        return result
      }
    } catch (error) {
      return error.toString()
    }
  }

  async snapshot() {
    let qstring = qs.stringify({
      description: 'Automatic_Snapshot',
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    })
    let url = `${banwaConfig.baseUrl}/snapshot/create?${qstring}`
    try {
      let result = await httpGet(url)
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data)
        return result
      }
    } catch (error) {
      return error.toString()
    }
  }

  async restartVps() {
    let qstring = qs.stringify({
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    })
    let url = `${banwaConfig.baseUrl}/restart?${qstring}`
    try {
      let result = await httpGet(url)
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data)
        return result
      }
    } catch (error) {
      return error.toString()
    }
  }

  async setPtrRecord({ request }) {
    let ip = request.input('ip')
    let ptr = request.input('ptr')
    let qstring = qs.stringify({
      ip: ip,
      ptr: ptr,
      veid: banwaConfig.veid,
      api_key: banwaConfig.api_key
    })
    let url = `${banwaConfig.baseUrl}/setPTR?${qstring}`
    try {
      let result = await httpGet(url)
      if (isOk(result.status)) {
        result.data = JSON.parse(result.data)
        return result
      }
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = BanwaController
