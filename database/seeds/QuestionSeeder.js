'use strict'

/*
|--------------------------------------------------------------------------
| QuestionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class QuestionSeeder {
  async run() {
    const questions = await Factory.model('App/Models/Question').createMany(100)
  }
}

module.exports = QuestionSeeder
