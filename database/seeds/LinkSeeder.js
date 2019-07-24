'use strict'

/*
|--------------------------------------------------------------------------
| LinkSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class LinkSeeder {
  async run () {
    const links = await Factory.model('App/Models/Link').createMany(100)
  }
}

module.exports = LinkSeeder
