"use strict";

const User = use("App/Models/User");
const Question = use("App/Models/Question");
const { isEmpty } = require("../../../../Utils/Helpers");

class QuestionController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const username = request.input("username");
      if (!isEmpty(username)) {
        const userData = await User.findBy("username", username);
        Object.assign(iWhere, { id: userData.id });
      }
      const question = request.input("question");
      if (!isEmpty(question)) {
        Object.assign(iWhere, { content: question });
      }
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
      const data = await Question.find(id);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async update({ params, request }) {
    const { id } = params;
    const data = request.only(["content"]);
    try {
      const result = await Question.query()
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
      const question = await Question.find(id);
      const result = await question.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = QuestionController;
