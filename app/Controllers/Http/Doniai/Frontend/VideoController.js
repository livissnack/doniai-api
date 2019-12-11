"use strict";

const Video = use("App/Models/Video");

class VideoController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Video.query()
        .where(iWhere)
        .with("course")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await Video.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = VideoController;
