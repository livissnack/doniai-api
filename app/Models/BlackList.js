'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { formatDate } = require('../Utils/Helpers')

class BlackList extends Model {
  getReleaseStartTime(value) {
    return formatDate(value)
  }

  getReleaseEndTime(value) {
    return formatDate(value)
  }
}

module.exports = BlackList
