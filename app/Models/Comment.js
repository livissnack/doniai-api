'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  children() {
    return this.hasMany('App/Models/Comment', 'id', 'pid')
  }

  allChildren() {
    return this.children().with('allChildren')
  }
}

module.exports = Comment
