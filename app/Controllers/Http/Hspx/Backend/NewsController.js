"use strict";

const HspxsteelNew = use("App/Models/HspxsteelNew");
const { isEmpty } = require("../../../../Utils/Helpers");

class NewsController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const id = request.input("id");
      if (!isEmpty(id)) {
        Object.assign(iWhere, { id: id });
      }
      const status = request.input("status");
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status });
      }
      const type = request.input("type");
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type });
      }
      const data = await HspxsteelNew.query()
        .where(iWhere)
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
    const data = request.only([
      "image",
      "zh_title",
      "zh_content",
      "tr_title",
      "tr_content",
      "ko_title",
      "ko_content",
      "ja_title",
      "ja_content",
      "en_title",
      "en_content",
      "ar_title",
      "ar_content",
      "type"
    ]);
    try {
      const hspxsteelNew = new HspxsteelNew();
      hspxsteelNew.fill(data);
      const result = await hspxsteelNew.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await HspxsteelNew.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async update({ params, request }) {
    const { id } = params;
    const data = request.only(["image", "zh_title", "zh_content", "type"]);
    try {
      const result = await HspxsteelNew.query()
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
      const hspxsteelNew = await HspxsteelNew.find(id);
      const result = await hspxsteelNew.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = NewsController;
