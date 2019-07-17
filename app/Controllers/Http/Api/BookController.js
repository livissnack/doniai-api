'use strict'
const Config = use("Config");
const AliOss = use("ali-oss");
const Helpers = use('Helpers');
const ossConfig = Config.get("oss.ali");
const Book = use("App/Models/Book");
const {formatDate} = require("../../../Utils/Helpers");

class BookController {
    async index({request, response}) {
        const {page, pageSize} = request.only(['page', 'pageSize']);
        const isRecommend = request.input('is_recommend', 0);
        try {
            const data = await Book.query()
                .where('is_recommend', isRecommend)
                .paginate(page, pageSize);
            return response.json({
                status: "success",
                msg: "书籍列表数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "书籍列表数据获取失败",
                data: error.toString()
            });
        }
    }

    async store({request, response}) {
        const data = request.only(['name', 'intro', 'is_recommend']);
        const image = request.file('image', {types: ['image'], size: '2mb'});
        try {
            const filepath = await image.move(Helpers.tmpPath('uploads'), {name: image.clientName, overwrite: true});
            const store = AliOss(ossConfig);
            const ossPutObj = await store.put(`uploads/${formatDate(new Date(), "YYYY-MM-DD")}/${filepath.clientName}`, filepath);
            const ossObjUrl = await store.getObjectUrl(ossPutObj.name, Config.get("oss.cdn").domian);
            const book = new Book();
            book.fill(data);
            book.merge(book, ossObjUrl);
            const result = await book.save();
            return response.json({
                status: "success",
                msg: "书籍保存成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "书籍保存失败",
                data: error.toString()
            });
        }
    }

    async show({params, response}) {
        const {id} = params;
        try {
            const data = await Book.query()
                .where("id", id)
                .fetch();
            return response.json({
                status: "success",
                msg: "书籍数据获取成功",
                data: data
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "书籍数据获取失败",
                data: error.toString()
            });
        }
    }

    async update({params, request, response}) {
        const {id} = params;
        const data = request.only(['name', 'intro', 'is_recommend', 'image']);
        try {
            const result = await Comment.query().where('id', id).update(data);
            return response.json({
                status: "success",
                msg: "书籍数据修改成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "书籍数据修改失败",
                data: error.toString()
            });
        }

    }

    async destroy({params, response}) {
        const {id} = params;
        try {
            const book = await Book.find(id);
            const result = await book.delete();
            return response.json({
                status: "success",
                msg: "书籍数据删除成功",
                data: result
            });
        } catch (error) {
            return response.json({
                status: "failure",
                msg: "书籍数据删除失败",
                data: error.toString()
            });
        }
    }
}

module.exports = BookController
