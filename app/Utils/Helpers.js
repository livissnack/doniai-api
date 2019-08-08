/*!
 * <https://github.com/livissnack>
 *
 * Copyright (c) 2017-2019, Livis Snack.
 * Released under the MIT License.
 */

"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
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
          console.log(err);
          reject(`数据抓取失败 - ${err}`);
        } else {
          resolve({ status: "ok", data: res.text });
        }
      });
    });
  },

  /**
   * @method httpTlsGet
   * 发起一个https的get请求
   * @param {url} string
   * @param {keyPath} string
   * @param {certPath} string
   */
  httpTlsGet(url, keyPath, certPath) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(keyPath)) {
        reject(`ssl key file not exists.`);
      }
      if (!fs.existsSync(certPath)) {
        reject(`ssl cert file not exists.`);
      }
      let key = fs.readFileSync(keyPath);
      let cert = fs.readFileSync(certPath);
      superagent
        .get(url)
        .key(key)
        .cert(cert)
        .end((err, res) => {
          if (err) {
            console.log(err);
            reject(`数据抓取失败 - ${err}`);
          } else {
            resolve({ status: "ok", data: res.text });
          }
        });
    });
  },

  /**
   * 获取百度Ai的access token
   * @param {url} string
   */
  getBaiduAiAccessToken(url) {
    return new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        if (err) {
          console.log(err);
          reject(`数据获取失败 - ${err}`);
        } else {
          resolve({ status: "ok", data: JSON.parse(res.text) });
        }
      });
    });
  },

  /**
   * http post request
   * @param {url} string 
   * @param {data} object 
   * @param {headers} object 
   */
  httpPost(url, data, headers) {
    return new Promise((resolve, reject) => {
      superagent.post(url).send(data).set(headers).end((err, res) => {
        if (err) {
          console.log(err);
          reject(`数据获取失败 - ${err}`);
        } else {
          resolve({ status: "ok", data: (JSON.parse(res.text)).result });
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
   * @method parseFreeProxy
   * 解析免费代理
   * @param {html} data
   */
  parseFreeProxy(html /*, html*/) {
    return new Promise((resolve, reject) => {
      let proxy_list = [];
      let $ = cheerio.load(html);
      $("table#proxy_list tbody tr td").each((idx, ele) => {
        let proxy_data = {
          title: $(ele).text(),
          href: $(ele).attr("href")
        };
        proxy_list.push(proxy_data);
        resolve(proxy_list);
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

  /**
   * @method formatDate
   * 格式化时间
   * @param {value} string
   * @param {format} string
   */
  formatDate(value, format = "YYYY-MM-DD HH:mm:ss") {
    return value ? moment(value).format(format) : "";
  },

  /**
   * @method controllerPath
   * app/Controllers路径
   * @param {toFile} string
   */
  controllerPath(toFile = "") {
    return path.join("", "app/Controllers", toFile);
  },

  /**
   * @method httpPath
   * app/Controllers/Http路径
   * @param {toFile} string
   */
  httpPath(toFile = "") {
    return path.join("", "app/Controllers/Http", toFile);
  },

  /**
   * @method httpApiPath
   * app/Controllers/Http/Api路径
   * @param {toFile} string
   */
  httpApiPath(toFile = "") {
    return path.join("", "app/Controllers/Http/Api", toFile);
  },

  /**
   * @method httpUtilsPath
   * app/Controllers/Http/Utils路径
   * @param {toFile} string
   */
  httpUtilsPath(toFile = "") {
    return path.join("", "app/Controllers/Http/Utils", toFile);
  },

  /**
   * @method utilsPath
   * app/Utils路径
   * @param {toFile} string
   */
  utilsPath(toFile = "") {
    return path.join("", "app/Utils", toFile);
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
   * @method randomFileName
   * 生成md5加密文件名称
   * @param {file} filePath
   */
  securtFileName(file) {
    if (!fs.existsSync(file)) {
      throw new Error("file not found");
    }
    const extname = path.extname(file);
    const filename = path.basename(file).split(".")[0];
    return `${crypto
      .createHash("md5")
      .update(filename)
      .digest("hex")}${extname}`;
  },

  isEmpty(value) {
    return (
      value === null || value === "" || value === undefined || value === {}
    );
  },

  searchWhere(obj) {
    if (_.isObject(obj) && !_.isEmpty(obj)) {
      let iWhere = {};
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          console.log(prop, obj['prop']);
          Object.assign(iWhere, {prop: obj['prop']});
        }
      }
      return iWhere;
    } else {
      throw new Error("data not object");
    }
  },
};
