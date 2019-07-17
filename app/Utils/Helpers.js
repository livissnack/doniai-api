/*!
 * <https://github.com/livissnack>
 *
 * Copyright (c) 2017-2019, Livis Snack.
 * Released under the MIT License.
 */

"use strict";
const moment = require("moment");
const cheerio = require("cheerio");
const superagent = require("superagent");

module.exports = {
  /**
   * @method httpGet
   * 发起一个http的get请求
   * @param {url} string
   */
  httpGet(url /*, url*/) {
    return new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        if (err) {
          reject(`数据抓取失败 - ${err}`);
        } else {
          resolve({ status: "ok", data: res.text });
        }
      });
    });
  },
  /**
   * @method parseBaiduHotNews
   * 解析百度热门新闻
   * @param {html} data
   */
  parseBaiduHotNews(html /*, html*/) {
    return new Promise((resolve, reject) => {
      let hotNews = [];
      let $ = cheerio.load(html);
      $("div#pane-news ul li a").each((idx, ele) => {
        let news = {
          title: $(ele).text(),
          href: $(ele).attr("href")
        };
        hotNews.push(news);
        resolve(hotNews);
      });
    });
  },
  /**
   * @method parseToutiaoHotNews
   * 解析头条热门新闻
   * @param {html} data
   */
  parseToutiaoHotNews(html /*, html*/) {
    return new Promise((resolve, reject) => {
      let hotNews = [];
      let $ = cheerio.load(html);
      $("div.wcommonFeed ul li a").each((idx, ele) => {
        let news = {
          title: $(ele).text(),
          href: $(ele).attr("href")
        };
        hotNews.push(news);
        resolve(hotNews);
      });
    });
  },
  /**
   * @method isOk
   * 检查成功返回状态
   * @param {state} string
   */
  isOk(state /*, state*/) {
    return state.toLowerCase() === "ok" ? true : false;
  },
  /**
   * @method isNo
   * 检查失败返回状态
   * @param {state} string
   */
  isNo(state /*, state*/) {
    return state.toLowerCase() === "no" ? true : false;
  },

  formatDate(value, format = 'YYYY-MM-DD HH:mm:ss') {
    return value ? moment(value).format(format) : '';
  }
};
