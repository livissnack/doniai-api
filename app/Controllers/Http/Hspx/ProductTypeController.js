'use strict'
const HspxsteelProductType = use('App/Models/HspxsteelProductType')

class ProductTypeController {
  async index({ response }) {
    try {
      const data = await HspxsteelProductType.query().fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'ar_value',
      'en_value',
      'ja_value',
      'ko_value',
      'tr_value',
      'zh_value'
    ])
    try {
      const hspxsteelProductType = new HspxsteelProductType()
      hspxsteelProductType.fill(data)
      const result = await hspxsteelProductType.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const result = await HspxsteelProductType.find(id).delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = ProductTypeController
