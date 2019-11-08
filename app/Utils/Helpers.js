/*!
 * <https://github.com/livissnack>
 *
 * Copyright (c) 2017-2019, Livis Snack.
 * Released under the MIT License.
 */

'use strict'
const crypto = require('crypto')

module.exports = {
  /**
   * @method httpPath
   * app/Controllers/Http路径
   * @param {toFile} string
   */
  httpPath(toFile = '') {
    return path.join('', 'app/Controllers/Http', toFile)
  },

  /**
   * @method md5
   * md5 crypto
   * @param {content} string
   * @param {salt} string
   */
  md5(content, salt = 'doniai') {
    return crypto
      .createHash('md5')
      .update(content + salt)
      .digest('hex')
  },

  /**
   * @method hash
   * hash crypto
   * @param {content} string
   * @param {salt} string
   */
  hash(content, salt = 'doniai') {
    return crypto
      .createHash('sha256')
      .update(content + salt)
      .digest('hex')
  },

  isEmpty(value) {
    return value === null || value === '' || value === undefined || value === {}
  }
}
