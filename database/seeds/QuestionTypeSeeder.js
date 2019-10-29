'use strict'

/*
|--------------------------------------------------------------------------
| QuestionTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class QuestionTypeSeeder {
  async run() {
    const question_types = await Factory.model(
      'App/Models/QuestionType'
    ).createMany(100)
  }
}

module.exports = QuestionTypeSeeder
