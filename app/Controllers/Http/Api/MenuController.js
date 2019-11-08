'use strict'
const MenuGroup = use('App/Models/MenuGroup')
const MenuItem = use('App/Models/MenuItem')

class MenuController {
  async index() {
    const data = await MenuGroup.query()
      .with('items')
      .fetch()
    return data
  }

  async groups({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      const data = await MenuGroup.query().paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async items({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      const data = await MenuItem.query().paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = MenuController
