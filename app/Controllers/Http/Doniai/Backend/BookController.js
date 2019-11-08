'use strict'

const Book = use('App/Models/Book')
const { isEmpty } = require('../../../../Utils/Helpers')

class BookController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const name = request.input('name')
      if (!isEmpty(name)) {
        Object.assign(iWhere, { name: name })
      }
      const is_recommend = request.input('is_recommend')
      if (!isEmpty(is_recommend)) {
        Object.assign(iWhere, { is_recommend: is_recommend })
      }
      const data = await Book.query()
        .where(iWhere)
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request }) {
    const data = request.only(['name', 'intro', 'is_recommend', 'image'])
    try {
      const book = new Book()
      book.fill(data)
      const result = await book.save()
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params }) {
    const { id } = params
    try {
      const data = await Book.query()
        .where('id', id)
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request }) {
    const { id } = params
    const data = request.only(['name', 'intro', 'is_recommend', 'image'])
    try {
      const result = await Comment.query()
        .where('id', id)
        .update(data)
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params }) {
    const { id } = params
    try {
      const book = await Book.find(id)
      const result = await book.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = BookController
