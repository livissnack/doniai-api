"use strict";

class Article {
  get rules() {
    return {
      page: "integer|min:1|max:100000000",
      pageSize: "integer|min:1|max:100",
      articleType: "integer|min:1|max:30"
    };
  }

  get messages() {
    return {
      "page.integer": "当前页码必须为整数",
      "page.min": "当前页码最小为1",
      "page.max": "当前页码最大为100000000",
      "pageSize.integer": "每页显示条数必须为整数",
      "pageSize.min": "每页显示条数最小为1",
      "pageSize.max": "每页显示条数最大为100",
      "articleType.integer": "文章类别必须为整数",
      "articleType.min": "文章类别最小为1",
      "articleType.max": "文章类别最大为30"
    };
  }
}

module.exports = Article;
