'use strict'

/*
|--------------------------------------------------------------------------
| HspxsteelProductTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HspxsteelProductTypeSeeder {
  async run() {
    const product_types = await Factory.model(
      'App/Models/HspxsteelProductType'
    ).createMany(4)
  }
}

module.exports = HspxsteelProductTypeSeeder
