'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment')

class BlackList extends Model {
  static get computed() {
    return ['status_text']
  }

  getReleaseStartTime(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

  getReleaseEndTime(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

  getStatusText({ status }) {
    return status === 0 ? '放行' : '禁止访问'
  }
}

module.exports = BlackList
