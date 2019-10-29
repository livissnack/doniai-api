'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  articleType() {
    return this.hasMany('App/Models/ArticleType')
  }

  articleTag() {
    return this.hasMany('App/Models/ArticleTag')
  }
}

module.exports = Article
