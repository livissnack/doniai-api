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

class ArticleTypeSeeder {
    async run() {
        const article_types = await Factory.model('App/Models/ArticleType').createMany(100)
    }
}

module.exports = ArticleTypeSeeder
