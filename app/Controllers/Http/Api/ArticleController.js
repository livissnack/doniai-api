"use strict";
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use('Helpers');
const {formatDate} = require("../../../Utils/Helpers");
const ossConfig = Config.get("oss.ali");
const Article = use("App/Models/Article");

class ArticleController {
    async index({request, response}) {
        const page = request.input("page", 1);
        const pageSize = request.input("pageSize", 2);
        const articleType = request.input("articleType", 0);
        const iWhere = articleType !== 0 ? {article_type_id: articleType} : {};
        try {
            const data = await Article.query()
                .where(iWhere)
                .with("user")
                .with("articleTag")
                .with("articleType")
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "文章列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "文章列表数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({request, response}) {
        const data = request.only(['title', 'user_id', 'article_type_id', 'article_tag_id', 'content']);
        const image = request.file('image', {types: ['image'], size: '2mb'});
        const publish_at = request.input('publish_at', new Date().getTime());
        try {
            const filepath = await image.move(Helpers.tmpPath('uploads'), {name: image.clientName, overwrite: true});
            const store = AliOss(ossConfig);
            const ossPutObj = await store.put(`uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${filepath.clientName}`, filepath);
            const ossObjUrl = await store.getObjectUrl(ossPutObj.name, Config.get("oss.cdn").domian);
            const article = new Article();
            article.fill(data);
            article.merge(article, ossObjUrl);
            article.merge(article, publish_at);
            const result = await article.save();
            return response.json({status: "success", msg: "文章保存成功", data: result});
        } catch (error) {
            return response.json({status: "failure", msg: "文章保存失败", data: error.toString()});
        }
    }

    async show({params, response}) {
        const articleId = params.id;
        try {
            const data = await Article.query()
                .where("id", articleId)
                .with("user")
                .with("articleTag")
                .with("articleType")
                .fetch();
            return response.json({
                status: "success",
                msg: "文章数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "文章数据获取成功",
                data: error.toString()
            });
        }
    }

    async update({params, request, response}) {
        const {id} = params;
        const content = request.input('content');
        try {
            const result = await Article.query().where('id', id).update({content: content});
            return response.json({
                status: "success",
                msg: "文章修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "文章修改失败",
                data: error.toString()
            });
        }

    }

    async destroy({params, response}) {
        const {id} = params;
        try {
            const article = await Article.find(id);
            const result = await article.delete();
            return response.json({
                status: "success",
                msg: "文章删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "文章删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = ArticleController;
