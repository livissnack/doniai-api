"use strict";

const HspxsteelInquiry = use("App/Models/HspxsteelInquiry");
const { isEmpty } = require("../../../../Utils/Helpers");

class InquiryController {
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
      const name = request.input("name");
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name });
      }
      const data = await HspxsteelInquiry.query()
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
      const data = await HspxsteelInquiry.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async destroy({ params }) {
    const { id } = params;
    try {
      const hspxsteelInquiry = await HspxsteelInquiry.find(id);
      const result = await hspxsteelInquiry.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = InquiryController;
