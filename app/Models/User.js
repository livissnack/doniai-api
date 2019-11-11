'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get computed() {
    return ['type_text', 'status_text', 'origin_text']
  }

  getTypeText({ type }) {
    const mapText = ['未知', '行业新闻', '品信新闻']
    return mapText[type]
  }

  getStatusText({ status }) {
    return status === 0 ? '激活' : '待激活'
  }

  getOriginText({ origin }) {
    const mapText = ['未知', '多尼爱网站', 'hspx网站']
    return mapText[origin]
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  articles() {
    return this.hasMany('App/Models/Article', 'id', 'user_id')
  }

  /**
   * A relationship on comments is requird.
   *
   * @method comments
   *
   * @return {Object}
   */
  comments() {
    return this.hasMany('App/Models/Comment', 'id', 'user_id')
  }

  /**
   * A relationship on questions is required.
   *
   * @method questions
   *
   * @return {Object}
   */
  questions() {
    return this.hasMany('App/Models/Question', 'id', 'user_id')
  }
}

module.exports = User
