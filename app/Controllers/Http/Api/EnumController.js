'use strict'

const Redis = use('Redis');
const ArticleType = use("App/Models/ArticleType");
const ArticleTag = use("App/Models/ArticleTag");
const QuestionType = use("App/Models/QuestionType");
const QuestionTag = use("App/Models/QuestionTag");
const CourseType = use("App/Models/CourseType");

class EnumController {
  async getArticleTypes() {
    const cachedArticleTypes = await Redis.get('article_types')
    if (cachedArticleTypes) {
      return JSON.parse(cachedArticleTypes)
    }
    const articleTypes = await ArticleType.all();
    await Redis.set('article_types', JSON.stringify(articleTypes))
    return articleTypes;
  }

  async getArticleTags() {
    const cachedArticleTags = await Redis.get('article_tags')
    if (cachedArticleTags) {
      return JSON.parse(cachedArticleTags)
    }
    const articleTags = await ArticleTag.all();
    await Redis.set('article_tags', JSON.stringify(articleTags))
    return articleTags;
  }

  async getQuestionTypes() {
    const cachedQuestionTypes = await Redis.get('question_types')
    if (cachedQuestionTypes) {
      return JSON.parse(cachedQuestionTypes)
    }
    const questionTypes = await QuestionType.all();
    await Redis.set('question_types', JSON.stringify(questionTypes))
    return questionTypes;
  }

  async getQuestionTags() {
    const cachedQuestionTags = await Redis.get('question_tags')
    if (cachedQuestionTags) {
      return JSON.parse(cachedQuestionTags)
    }
    const questionTags = await QuestionTag.all();
    await Redis.set('question_tags', JSON.stringify(questionTags))
    return questionTags;
  }

  async getCourseTypes() {
    const cachedCourseTypes = await Redis.get('course_types')
    if (cachedCourseTypes) {
      return JSON.parse(cachedCourseTypes)
    }
    const courseTypes = await CourseType.all();
    await Redis.set('course_types', JSON.stringify(courseTypes))
    return courseTypes;
  }
}

module.exports = EnumController
