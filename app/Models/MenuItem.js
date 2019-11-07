'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenuItem extends Model {
  menuGroup() {
    return this.belongsTo('App/Models/MenuGroup')
  }
}

module.exports = MenuItem
