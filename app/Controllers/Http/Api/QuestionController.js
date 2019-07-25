'use strict'
const Question = use("App/Models/Question");

class QuestionController {
    async index({ request, response }) {
        const { page, pageSize } = request.only(["page", "pageSize"]);
        const userId = request.input("user_id", 0);
        const iWhere = { user_id: userId };
        try {
            const data = await Question.query()
                .where(iWhere)
                .with("user")
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "问题数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({ request, response }) {
        const data = request.only([
            "content",
            "user_id"
        ]);
        try {
            const question = new Question();
            question.fill(data);
            const result = await question.save();
            return response.json({
                status: "success",
                msg: "问题保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题保存失败",
                data: error.toString()
            });
        }
    }

    async show({ params, response }) {
        const { id } = params;
        try {
            const data = await Question.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "问题数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({ params, request, response }) {
        const { id } = params;
        const data = request.only([
            "content"
        ]);
        try {
            const result = await Question.query()
                .where("id", id)
                .update(data);
            return response.json({
                status: "success",
                msg: "问题数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题数据修改失败",
                data: error.toString()
            });
        }
    }

    async destroy({ params, response }) {
        const { id } = params;
        try {
            const question = await Question.find(id);
            const result = await question.delete();
            return response.json({
                status: "success",
                msg: "问题数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "问题数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = QuestionController
