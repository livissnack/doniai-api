"use strict";

const User = use("App/Models/User");
const { isEmpty } = require("../../../../Utils/Helpers");

class UserController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = { type: 2 };
      const id = request.input("id");
      if (!isEmpty(id)) {
        Object.assign(iWhere, { id: id });
      }
      const status = request.input("status");
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status });
      }
      const username = request.input("username");
      if (!isEmpty(username)) {
        Object.assign(iWhere, { username: username });
      }
      const data = await User.query()
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
      const data = await User.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async update({ params, request }) {
    const { id } = params;
    const data = request.only(["password", "type", "status"]);
    try {
      const result = await User.query()
        .where("id", id)
        .update(data);
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async destroy({ params }) {
    const { id } = params;
    try {
      const user = await User.find(id);
      const result = await user.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = UserController;
