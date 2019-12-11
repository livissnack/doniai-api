"use strict";

const Book = use("App/Models/Book");

class BookController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Book.query()
        .where(iWhere)
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await Book.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = BookController;
