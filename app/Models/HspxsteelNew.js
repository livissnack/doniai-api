'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HspxsteelNew extends Model {
  static get computed() {
    return ['type_text', 'status_text']
  }

  getTypeText({ type }) {
    const mapText = ['未知', '行业新闻', '品信新闻']
    return mapText[type]
  }

  getStatusText({ status }) {
    return status === 0 ? '草稿' : '发布'
  }
}

module.exports = HspxsteelNew
