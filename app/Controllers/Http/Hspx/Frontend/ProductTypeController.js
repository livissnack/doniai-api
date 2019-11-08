'use strict'
const HspxsteelProductType = use('App/Models/HspxsteelProductType')

class ProductTypeController {
  async index() {
    try {
      const data = await HspxsteelProductType.query().fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = ProductTypeController
