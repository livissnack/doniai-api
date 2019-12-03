"use strict";

const Link = use("App/Models/Link");

class LinkController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Link.query()
        .where(iWhere)
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = LinkController;
