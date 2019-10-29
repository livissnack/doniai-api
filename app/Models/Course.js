'use strict'
const Video = use('App/Models/Video')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {
  courseType() {
    return this.belongsTo('App/Models/CourseType')
  }

  setPrice(price) {
    return price * 100
  }

  getPrice(price) {
    return price / 100
  }
}

module.exports = Course
