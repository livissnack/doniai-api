'use strict'

const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const { isEmpty } = require('../../../../Utils/Helpers')

class CommentController {
  async index({ request }) {
    try {
      const { page, perPage } = request.only(['page', 'perPage'])
      let iWhere = {}
      const username = request.input('username')
      if (!isEmpty(username)) {
        const userData = await User.findBy('username', username)
        Object.assign(iWhere, { user_id: userData.id })
      }
      const pid = request.input('pid')
      if (!isEmpty(pid)) {
        Object.assign(iWhere, { pid: pid })
      }
      const type = request.input('type')
      if (!isEmpty(type)) {
        Object.assign(iWhere, { type: type })
      }
      const data = await Comment.query()
        .where(iWhere)
        .with('user')
        .paginate(page, perPage)
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async store({ request }) {
    const data = request.only([
      'comment_id',
      'comment_type',
      'user_id',
      'content'
    ])
    try {
      const comment = new Comment()
      comment.fill(data)
      const commentResult = await comment.save()
      const commentRelation = new CommentRelation()
      commentRelation.parent_id = data.comment_id
      commentRelation.child_id = commentResult
      const commentRelationResult = await commentRelation.save()
      return Object.assign({
        result1: commentResult,
        result2: commentRelationResult
      })
    } catch (error) {
      return error.toString()
    }
  }

  async show({ params }) {
    const { id } = params
    try {
      const data = await Comment.query()
        .where('id', id)
        .with('user')
        .fetch()
      return data
    } catch (error) {
      return error.toString()
    }
  }

  async update({ params, request }) {
    const { id } = params
    const content = request.input('content')
    try {
      const result = await Comment.query()
        .where('id', id)
        .update({ content: content })
      return result
    } catch (error) {
      return error.toString()
    }
  }

  async destroy({ params }) {
    const { id } = params
    try {
      const comment = await Comment.find(id)
      const result = await comment.delete()
      return result
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = CommentController
