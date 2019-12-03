"use strict";

const Question = use("App/Models/Question");

class QuestionController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const data = await Question.query()
        .where(iWhere)
        .with("user")
        .with("questionTag")
        .with("questionType")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
    const data = request.only(["content", "user_id"]);
    try {
      const question = new Question();
      question.fill(data);
      const result = await question.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await Question.query()
        .where("id", id)
        .fetch();
      return data;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = QuestionController;
