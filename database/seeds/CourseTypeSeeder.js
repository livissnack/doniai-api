'use strict'

/*
|--------------------------------------------------------------------------
| CourseTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CourseTypeSeeder {
  async run() {
    const course_types = await Factory.model(
      'App/Models/CourseType'
    ).createMany(100)
  }
}

module.exports = CourseTypeSeeder
