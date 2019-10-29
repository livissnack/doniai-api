'use strict'

/*
|--------------------------------------------------------------------------
| ArticleTagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ArticleTagSeeder {
  async run() {
    const article_tags = await Factory.model(
      'App/Models/ArticleTag'
    ).createMany(100)
  }
}

module.exports = ArticleTagSeeder
