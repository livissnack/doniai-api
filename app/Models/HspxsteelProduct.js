'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HspxsteelProduct extends Model {
  productType() {
    return this.belongsTo(
      'App/Models/HspxsteelProductType',
      'product_type_id',
      'id'
    )
  }
}

module.exports = HspxsteelProduct
