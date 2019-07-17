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
const ArticleTag = use('App/Models/ArticleTag')

class ArticleTagSeeder {
  async run () {
    const articleTags = [{
      value: 'php',
    },
      {
        value: 'vue',
      },
      {
        value: 'react',
      },
      {
        value: 'javascript',
      },
      {
        value: 'golang',
      },
      {
        value: 'laravel',
      },
      {
        value: 'swoole',
      },
      {
        value: 'nodejs',
      },
      {
        value: 'nginx',
      },
      {
        value: 'linux',
      },
      {
        value: 'mysql',
      },
      {
        value: 'mongodb',
      },
      {
        value: 'server',
      },
      {
        value: 'redis',
      },
      {
        value: 'memecached',
      },
      {
        value: 'sailsjs',
      },
      {
        value: 'eggjs',
      },
      {
        value: 'koa',
      },
      {
        value: 'adonisjs',
      },
      {
        value: 'express',
      },
      {
        value: 'markdown',
      },
      {
        value: 'yii2',
      },
      {
        value: 'thinkphp',
      },
      {
        value: 'lumen',
      },
      {
        value: 'electron',
      },
      {
        value: 'c',
      },
      {
        value: 'c++',
      },
      {
        value: 'python',
      },
      {
        value: 'html',
      },
      {
        value: 'css',
      },
    ]
    await ArticleTag.createMany(articleTags)
  }
}

module.exports = ArticleTagSeeder