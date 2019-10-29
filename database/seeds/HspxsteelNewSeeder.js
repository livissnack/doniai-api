'use strict'

/*
|--------------------------------------------------------------------------
| HspxsteelNewSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HspxsteelNewSeeder {
  async run() {
    const newses = await Factory.model('App/Models/HspxsteelNew').createMany(
      100
    )
  }
}

module.exports = HspxsteelNewSeeder
