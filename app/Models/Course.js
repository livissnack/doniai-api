"use strict";
const Video = use("App/Models/Video");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Course extends Model {
  static get computed() {
    return ["longtime", "nums"];
  }

  courseType() {
    return this.belongsTo("App/Models/CourseType");
  }

  setPrice(price) {
    return price * 100;
  }

  getPrice(price) {
    return price / 100;
  }

  async getLongtime({ id }) {
    const data = await Video.query()
      .where("course_id", id)
      .getSum("duration");
    return Number(data);
  }

  async getNums({ id }) {
    const data = await Video.query()
      .where("course_id", id)
      .getCount();
    return Number(data);
  }
}

module.exports = Course;
