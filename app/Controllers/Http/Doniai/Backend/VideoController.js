"use strict";

const Video = use("App/Models/Video");
const { isEmpty } = require("../../../../Utils/Helpers");

class VideoController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const course_id = request.input("course_id");
      if (!isEmpty(course_id)) {
        Object.assign(iWhere, { course_id: course_id });
      }

      const name = request.input("name");
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name });
      }

      const duration = request.input("duration");
      if (!isEmpty(duration)) {
        Object.assign(iWhere, { duration: duration });
      }

      const url = request.input("url");
      if (!isEmpty(url)) {
        Object.assign(iWhere, { url: url });
      }
      const status = request.input("status");
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status });
      }
      const is_free = request.input("is_free");
      if (!isEmpty(is_free)) {
        Object.assign(iWhere, { is_free: is_free });
      }
      const data = await Video.query()
        .where(iWhere)
        .with("course")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
    const data = request.only([
      "course_id",
      "name",
      "intro",
      "image",
      "duration",
      "publish_at",
      "url",
      "status",
      "is_free"
    ]);
    try {
      const video = new Video();
      video.fill(data);
      const result = await video.save();
      return result;
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

  async update({ params, request }) {
    const { id } = params;
    const data = request.only([
      "course_id",
      "name",
      "intro",
      "image",
      "duration",
      "publish_at",
      "url",
      "status",
      "is_free"
    ]);
    try {
      const result = await Video.query()
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
      const video = await Video.find(id);
      const result = await video.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = VideoController;
