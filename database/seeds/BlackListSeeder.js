'use strict'

/*
|--------------------------------------------------------------------------
| BlackListSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class BlackListSeeder {
  async run() {
    const black_lists = await Factory.model('App/Models/BlackList').createMany(
      100
    )
  }
}

module.exports = BlackListSeeder
