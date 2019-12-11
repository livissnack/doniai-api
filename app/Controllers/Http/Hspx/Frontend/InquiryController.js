"use strict";
const HspxsteelInquiry = use("App/Models/HspxsteelInquiry");

class InquiryController {
  async create({ request }) {
    const data = request.only([
      "name",
      "company",
      "address",
      "email",
      "phone",
      "question"
    ]);
    try {
      const hspxsteelInquiry = new HspxsteelInquiry();
      hspxsteelInquiry.fill(data);
      const result = await hspxsteelInquiry.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = InquiryController;
