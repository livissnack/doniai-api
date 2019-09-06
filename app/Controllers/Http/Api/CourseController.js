"use strict";

const Course = use("App/Models/Course");
const CourseType = use("App/Models/CourseType");
const { isEmpty } = require("../../../Utils/Helpers");

class CourseController {
  async index({ request, response }) {
    try {
      const { page, pageSize } = request.only(["page", "pageSize"]);
      let iWhere = {};
      const course_type = request.input("course_type");
      if (!isEmpty(course_type)) {
        const courseTypeData = await CourseType.findBy("value", course_type);
        Object.assign(iWhere, { course_type_id: courseTypeData.id });
      }
      const title = request.input("title");
      if (!isEmpty(title)) {
        Object.assign(iWhere, { title: title });
      }
      const status = request.input("status");
      if (!isEmpty(status)) {
        Object.assign(iWhere, { status: status });
      }
      const is_free = request.input("is_free");
      if (!isEmpty(is_free)) {
        Object.assign(iWhere, { is_free: is_free });
      }
      const price = request.input("price");
      if (!isEmpty(price)) {
        Object.assign(iWhere, { price: price });
      }
      const data = await Course.query()
        .where(iWhere)
        .with("courseType")
        .paginate(page, pageSize);
      return response.json({
        status: "success",
        msg: "课程列表数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "课程列表数据获取失败",
        data: error.toString()
      });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      "title",
      "intro",
      "discuss_qq_group",
      "support_wechat",
      "course_type_id",
      "course_status",
      "is_free",
      "price",
      "image"
    ]);
    try {
      const course = new Course();
      course.fill(data);
      const result = await course.save();
      return response.json({
        status: "success",
        msg: "课程保存成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "课程保存失败",
        data: error.toString()
      });
    }
  }

  async show({ params, response }) {
    const { id } = params;
    try {
      const data = await Course.query()
        .where("id", id)
        .fetch();
      return response.json({
        status: "success",
        msg: "课程数据获取成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "课程数据获取失败",
        data: error.toString()
      });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const data = request.only([
      "title",
      "intro",
      "image",
      "discuss_qq_group",
      "support_wechat",
      "course_type_id",
      "course_status",
      "is_free",
      "price"
    ]);
    try {
      const result = await Course.query()
        .where("id", id)
        .update(data);
      return response.json({
        status: "success",
        msg: "课程数据修改成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "课程数据修改失败",
        data: error.toString()
      });
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const course = await Course.find(id);
      const result = await course.delete();
      return response.json({
        status: "success",
        msg: "课程数据删除成功",
        data: result
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "课程数据删除失败",
        data: error.toString()
      });
    }
  }
}

module.exports = CourseController;
