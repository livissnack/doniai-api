'use strict'

const Task = use('Task')
const Moment = use('moment')
const QueryString = use('querystring')
const Constellation = use('App/Models/Constellation')
const {
  astro
} = require('../Utils/Helpers');

class Crawler extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    const baseUrl = 'http://astro.click108.com.tw'
    const current_time = Moment().format('YYYY-MM-DD')
    for(i = 0; i <= 11; i++) {
      const params = {
        iAcDay: current_time,
        iAstro: i
      }
      const querystring = QueryString.stringify(params)
      const url = `${baseUrl}/daily_${i}.php?${querystring}`
      const res = await astro(url)
      const constellation = new Constellation()
      constellation.title = res.title
      constellation.content = typeof res.content === 'object' ? res.content.toString() : res.content
      constellation.status = 0
      await user.save()
    }
  }
}

module.exports = Crawler
