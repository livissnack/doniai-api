'use strict'

/*
|--------------------------------------------------------------------------
| ReplaySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ReplaySeeder {
  async run () {
    const replays = await Factory.model('App/Models/Replay').createMany(100)
  }
}

module.exports = ReplaySeeder
