"use strict";

const User = use("App/Models/User");
const Replay = use("App/Models/Replay");
const Question = use("App/Models/Question");
const { isEmpty } = require("../../../../Utils/Helpers");

class ReplayController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(["page", "perPage"]);
      let iWhere = {};
      const question = request.input("question");
      if (!isEmpty(question)) {
        const questionData = await Question.findBy("content", question);
        Object.assign(iWhere, { question_id: questionData.id });
      }
      const username = request.input("username");
      if (!isEmpty(username)) {
        const userData = await User.findBy("username", username);
        Object.assign(iWhere, { id: userData.id });
      }
      const pid = request.input("pid");
      if (!isEmpty(pid)) {
        Object.assign(iWhere, { pid: pid });
      }

      const replay = request.input("replay");
      if (!isEmpty(replay)) {
        Object.assign(iWhere, { content: replay });
      }

      const data = await Replay.query()
        .where(iWhere)
        .with("user")
        .paginate(page, perPage);
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async store({ request }) {
    const data = request.only(["question_id", "pid", "user_id", "content"]);
    try {
      const replay = new Replay();
      replay.fill(data);
      const result = await replay.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async show({ params }) {
    const { id } = params;
    try {
      const data = await Replay.query()
        .where("id", id)
        .fetch();
      return data;
    } catch (error) {
      return error.toString();
    }
  }

  async update({ params, request }) {
    const { id } = params;
    const data = request.only(["content"]);
    try {
      const result = await Replay.query()
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
      const replay = await Replay.find(id);
      const result = await replay.delete();
      return result;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = ReplayController;
