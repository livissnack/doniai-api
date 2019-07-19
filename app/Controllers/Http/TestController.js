'use strict'
const {formatDate} = require("../../Utils/Helpers");

class TestController {
  async test({request, response}) {
    const time = new Date();
    return formatDate(time);
  }
}

module.exports = TestController;
