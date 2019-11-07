'use strict'
const MenuGroup = use('App/Models/MenuGroup')

class MenuController {
  async index({ request, response }) {
    const data = await MenuGroup.query()
      .with('items')
      .fetch()
    return data
  }
}

module.exports = MenuController
