'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenuGroup extends Model {
  items() {
    return this.hasMany('App/Models/MenuItem', 'id', 'group_id')
  }
}

module.exports = MenuGroup
