/*!
 * <https://github.com/livissnack>
 *
 * Copyright (c) 2017-2019, Livis Snack.
 * Released under the MIT License.
 */

"use strict";
const crypto = require("crypto");

module.exports = {
  /**
   * @method httpPath
   * app/Controllers/Http路径
   * @param {toFile} string
   */
  httpPath(toFile = "") {
    return path.join("", "app/Controllers/Http", toFile);
  },

  /**
   * @method md5
   * md5 crypto
   * @param {content} string
   * @param {salt} string
   */
  md5(content, salt = "doniai") {
    return crypto
      .createHash("md5")
      .update(content + salt)
      .digest("hex");
  },

  /**
   * @method hash
   * hash crypto
   * @param {content} string
   * @param {salt} string
   */
  hash(content, salt = "doniai") {
    return crypto
      .createHash("sha256")
      .update(content + salt)
      .digest("hex");
  },

  /**
   * @method isEmpty
   * @param {any} value
   */
  isEmpty(value) {
    return (
      value === null || value === "" || value === undefined || value === {}
    );
  },

  /**
   * @method betweenDiffTime
   * @param {string} currentTime
   * @param {string} lastTime
   * @param {boolean} isText
   */
  betweenDiffTime(currentTime, lastTime, isText = true) {
    const currentUpdateTime = new Date(currentTime);
    const lastUpdateTime = new Date(lastTime);
    const diffSeconds =
      (currentUpdateTime.getTime() - lastUpdateTime.getTime()) / 1000;
    const days = Math.floor(diffSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffSeconds - days * 24 * 60 * 60) / (60 * 60));
    const mins = Math.floor(
      (diffSeconds - days * 24 * 60 * 60 - hours * 60 * 60) / 60
    );
    const seconds =
      diffSeconds - days * 24 * 60 * 60 - hours * 60 * 60 - mins * 60;
    return isText
      ? `相差：${days}天${hours}时${mins}分${seconds}秒`
      : { days: days, hours: hours, mins: mins, seconds: seconds };
  }
};
