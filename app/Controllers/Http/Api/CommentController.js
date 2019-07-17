'use strict';
const Comment = use("App/Models/Comment");

class CommentController {
    async index({request, response}) {
        const {page, pageSize} = request.only(['page', 'pageSize']);
        try {
            const data = await Comment.query()
                .where({})
                .with("user")
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "评论列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "评论列表数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({request, response}) {
        const data = request.only(['comment_id', 'comment_type', 'user_id', 'content']);
        try {
            const comment = new Comment();
            comment.fill(data);
            const commentResult = await comment.save();
            const commentRelation = new CommentRelation();
            commentRelation.parent_id = data.comment_id;
            commentRelation.child_id = commentResult;
            const commentRelationResult = await commentRelation.save();
            return response.json({
                status: "success",
                msg: "评论保存成功",
                data: Object.assign({ result1: commentResult, result2: commentRelationResult })
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "评论保存失败",
                data: error.toString()
            });
        }
    }

    async show({params, response}) {
        const {id} = params;
        try {
            const data = await Comment.query()
                .where("id", id)
                .with("user")
                .fetch();
            return response.json({
                status: "success",
                msg: "评论数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "评论数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({params, request, response}) {
        const {id} = params;
        const content = request.input('content');
        try {
            const result = await Comment.query().where('id', id).update({content: content});
            return response.json({
                status: "success",
                msg: "评论数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "评论数据修改失败",
                data: error.toString()
            });
        }

    }

    async destroy({params, response}) {
        const {id} = params;
        try {
            const comment = await Comment.find(id);
            const result = await comment.delete();
            return response.json({
                status: "success",
                msg: "评论数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "评论数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = CommentController;
