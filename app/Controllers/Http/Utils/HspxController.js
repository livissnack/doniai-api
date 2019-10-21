'use strict'

const moment = require('moment')
const axios = require('axios')
const APPCODE = '515e2ec03bd04b189959b2c64f049843'
const HspxsteelAccessLog = use('App/Models/HspxsteelAccessLog')

class HspxController {
  async access_count({ request, response }) {
    const ip = request.input('ip') || request.ip()
    const { data } = await axios({
      method: 'get',
      url: 'https://api01.aliyun.venuscn.com/ip',
      params: { ip: ip },
      headers: { Authorization: `APPCODE ${APPCODE}` }
    })
    if (data.ret !== 200) {
      return response.json(data)
    } else {
      console.log(data)
      const hspxsteelAccessLog = await HspxsteelAccessLog.findBy('ip', ip)
      if (!hspxsteelAccessLog) {
        const hspxsteelAccessLog = new HspxsteelAccessLog()
        hspxsteelAccessLog.area = data.data.area
        hspxsteelAccessLog.country = data.data.country
        hspxsteelAccessLog.long_ip = data.data.long_ip
        hspxsteelAccessLog.city = data.data.city
        hspxsteelAccessLog.ip = data.data.ip
        hspxsteelAccessLog.isp = data.data.isp
        hspxsteelAccessLog.region_id = data.data.region_id
        hspxsteelAccessLog.region = data.data.region
        hspxsteelAccessLog.country_id = data.data.country_id
        hspxsteelAccessLog.city_id = data.data.city_id
        hspxsteelAccessLog.count = data.data.count
        if (await hspxsteelAccessLog.save()) {
          return response.json({ code: 200, msg: 'access log write success!' })
        } else {
          return response.json({ code: 500, msg: 'access log write faiure!' })
        }
      } else {
        const currentTime = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
        const lastUpdateTime = moment(
          hspxsteelAccessLog.updated_at,
          'YYYY-MM-DD HH:mm:ss'
        )
        const diffSeconds = currentTime.diff(lastUpdateTime)
        if (diffSeconds > 86400) {
          hspxsteelAccessLog.count = hspxsteelAccessLog.account + 1
          if (await hspxsteelAccessLog.save()) {
            return response.json({
              code: 200,
              msg: 'access log write success!'
            })
          } else {
            return response.json({ code: 500, msg: 'access log write faiure!' })
          }
        }
      }
    }
  }
}

module.exports = HspxController
