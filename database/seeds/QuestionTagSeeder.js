'use strict'

/*
|--------------------------------------------------------------------------
| QuestionTagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class QuestionTagSeeder {
  async run () {
    const question_tags = await Factory.model('App/Models/QuestionTag').createMany(100)
  }
}

module.exports = QuestionTagSeeder
