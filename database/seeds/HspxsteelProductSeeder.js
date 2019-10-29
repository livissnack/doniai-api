'use strict'

/*
|--------------------------------------------------------------------------
| HspxsteelProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HspxsteelProductSeeder {
  async run() {
    const products = await Factory.model(
      'App/Models/HspxsteelProduct'
    ).createMany(100)
  }
}

module.exports = HspxsteelProductSeeder
