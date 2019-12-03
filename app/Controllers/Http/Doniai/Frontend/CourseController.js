"use strict";

const Course = use("App/Models/Course");

class CourseController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Course.query()
        .where(iWhere)
        .with("courseType")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await Course.query()
        .where("id", id)
        .fetch();
      return data;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = CourseController;
