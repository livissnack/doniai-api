"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Video extends Model {
    course() {
        return this.belongsTo("App/Models/Course");
    }
}

module.exports = Video;
