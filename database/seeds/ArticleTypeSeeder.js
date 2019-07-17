'use strict'

/*
|--------------------------------------------------------------------------
| ArticleTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const ArticleType = use('App/Models/ArticleType')

class ArticleTypeSeeder {
  async run () {
    const articleTypes = [{
      value: '知识',
    },
      {
        value: '散文',
      },
      {
        value: '技术',
      },
      {
        value: '智能',
      },
      {
        value: '眼界',
      },
    ]
    await ArticleType.createMany(articleTypes)
  }
}

module.exports = ArticleTypeSeeder
