"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
Route.get("/", () => "Hello world");
Route.get("/test", "TestController.test");
Route.get("/download", "TestController.download");
Route.get("/attachment", "TestController.attachment");

/*
|--------------------------------------------------------------------------
| Routes discuss website
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //user login route
  Route.post("login", "UserController.login")
    .middleware("guest")
    .validator("User");
  //user register route
  Route.post("register", "UserController.register")
    .middleware("guest")
    .validator("User");
  //user logout route
  Route.get("logout", "UserController.logout");

  //user detail route
  Route.get("users/:id", "UserController.detail").middleware("auth");

  //article resource route only index,store,show,update and destroy method
  Route.get("/articles", "ArticleController.index").validator("Article");
  Route.post("/articles", "ArticleController.store");
  Route.get("/articles/:id", "ArticleController.show");
  Route.put("/articles/:id", "ArticleController.update");
  Route.delete("/articles/:id", "ArticleController.destroy");

  //black list resource route only index,store,show,update and destroy method
  Route.get("/blacklists", "BlackListController.index");
  Route.post("/blacklists", "BlackListController.store");
  Route.get("/blacklists/:id", "BlackListController.show");
  Route.put("/blacklists/:id", "BlackListController.update");
  Route.delete("/blacklists/:id", "BlackListController.destroy");

  //book resource route only index,store,show,update and destroy method
  Route.get("/books", "BookController.index");
  Route.post("/books", "BookController.store");
  Route.get("/books/:id", "BookController.show");
  Route.put("/books/:id", "BookController.update");
  Route.delete("/books/:id", "BookController.destroy");

  //comment resource route only index,store,show,update and destroy method
  Route.get("/comments", "CommentController.index");
  Route.post("/comments", "CommentController.store");
  Route.get("/comments/:id", "CommentController.show");
  Route.put("/comments/:id", "CommentController.update");
  Route.delete("/comments/:id", "CommentController.destroy");

  //course resource route only index,store,show,update and destroy method
  Route.get("/courses", "CourseController.index");
  Route.post("/courses", "CourseController.store");
  Route.get("/courses/:id", "CourseController.show");
  Route.put("/courses/:id", "CourseController.update");
  Route.delete("/courses/:id", "CourseController.destroy");

  //link resource route only index,store,show,update and destroy method
  Route.get("/links", "LinkController.index");
  Route.post("/links", "LinkController.store");
  Route.get("/links/:id", "LinkController.show");
  Route.put("/links/:id", "LinkController.update");
  Route.delete("/links/:id", "LinkController.destroy");

  //question resource route only index,store,show,update and destroy method
  Route.get("/questions", "QuestionController.index");
  Route.post("/questions", "QuestionController.store");
  Route.get("/questions/:id", "QuestionController.show");
  Route.put("/questions/:id", "QuestionController.update");
  Route.delete("/questions/:id", "QuestionController.destroy");

  //replay resource route only index,store,show,update and destroy method
  Route.get("/replays", "ReplayController.index");
  Route.post("/replays", "ReplayController.store");
  Route.get("/replays/:id", "ReplayController.show");
  Route.put("/replays/:id", "ReplayController.update");
  Route.delete("/replays/:id", "ReplayController.destroy");

  //user resource route only index,store,show,update and destroy method
  Route.get("/users", "UserController.index");
  Route.post("/users", "UserController.store");
  Route.get("/users/:id", "UserController.show");
  Route.put("/users/:id", "UserController.update");
  Route.delete("/users/:id", "UserController.destroy");

  //video resource route only index,store,show,update and destroy method
  Route.get("/videos", "VideoController.index");
  Route.post("/videos", "VideoController.store");
  Route.get("/videos/:id", "VideoController.show");
  Route.put("/videos/:id", "VideoController.update");
  Route.delete("/videos/:id", "VideoController.destroy");
})
  .namespace("Api")
  .prefix("api/v1");

/*
|--------------------------------------------------------------------------
| Routes ali oss bucket
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //oss bucket operations
  Route.get("/listBuckets", "OssController.listBuckets");
  Route.put("/putBucket", "OssController.putBucket");
  Route.delete("/deleteBucket", "OssController.deleteBucket");
  Route.get("/useBucket", "OssController.useBucket");
  Route.get("/getBucketInfo", "OssController.getBucketInfo");
  Route.get("/getBucketLocation", "OssController.getBucketLocation");
  Route.put("/putBucketAcl", "OssController.putBucketAcl");
  Route.get("/getBucketAcl", "OssController.getBucketAcl");
  Route.put("/putBucketLog", "OssController.putBucketLog");
  Route.get("/getBucketLog", "OssController.getBucketLog");
  Route.delete("/deleteBucketLog", "OssController.deleteBucketLog");
  Route.put("/putBucketWebsite", "OssController.putBucketWebsite");
  Route.post("/put", "OssController.put");
  Route.put("/putStream", "OssController.putStream");
  Route.post("/append", "OssController.append");
  Route.get("/getObjectUrl", "OssController.getObjectUrl");
  Route.get("/generateObjectUrl", "OssController.generateObjectUrl");
  Route.get("/get", "OssController.get");
  Route.get("/getStream", "OssController.getStream");
  Route.delete("/delete", "OssController.delete");
  Route.post("/copy", "OssController.copy");
  Route.put("/putMeta", "OssController.putMeta");
  Route.delete("/deleteMulti", "OssController.deleteMulti");
  Route.get("/list", "OssController.list");
  Route.get("/signatureUrl", "OssController.signatureUrl");
  Route.put("/putACL", "OssController.putACL");
  Route.get("/getACL", "OssController.getACL");
  Route.post("/restore", "OssController.restore");
  Route.post("/initMultipartUpload", "OssController.initMultipartUpload");
  Route.post("/uploadPart", "OssController.uploadPart");
  Route.post("/uploadPartCopy", "OssController.uploadPartCopy");
  Route.post(
    "/completeMultipartUpload",
    "OssController.completeMultipartUpload"
  );
  Route.post("/multipartUpload", "OssController.multipartUpload");
  Route.post("/multipartUploadCopy", "OssController.multipartUploadCopy");
  Route.get("/listParts", "OssController.listParts");
  Route.get("/listUploads", "OssController.listUploads");
  Route.get("/abortMultipartUpload", "OssController.abortMultipartUpload");
  Route.put("/putChannel", "OssController.putChannel");
  Route.get("/getChannel", "OssController.getChannel");
  Route.delete("/deleteChannel", "OssController.deleteChannel");
  Route.put("/putChannelStatus", "OssController.putChannelStatus");
  Route.get("/getChannelStatus", "OssController.getChannelStatus");
  Route.get("/listChannels", "OssController.listChannels");
  Route.get("/getChannelHistory", "OssController.getChannelHistory");
  Route.post("/createVod", "OssController.createVod");
  Route.get("/getRtmpUrl", "OssController.getRtmpUrl");
  Route.get("/getImg", "OssController.getImg");
})
  .namespace("Utils")
  .prefix("api/v1/oss");

/*
|--------------------------------------------------------------------------
| Routes crawler net data
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //crawler news data
  Route.get("/baidu", "CrawlerController.crawlerBaiduHotNews");
  Route.get("/toutiao", "CrawlerController.crawlerToutiaoHotNews");
})
  .namespace("Utils")
  .prefix("api/v1/crawler");

/*
|--------------------------------------------------------------------------
| Routes captcha all methods
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //geetest register method
  Route.get("/register-click", "GeetestController.geetest");
  //geetest validate method
  Route.post("/validate-click", "GeetestController.validate");
})
  .namespace("Utils")
  .prefix("api/v1/captcha");

/*
|--------------------------------------------------------------------------
| Routes banwagong server all methods
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get("/getServiceInfo", "BanwaController.getServiceInfo");
  Route.post("/snapshot", "BanwaController.snapshot");
  Route.post("/restartVps", "BanwaController.restartVps");
  Route.post("/setPtrRecord", "BanwaController.setPtrRecord");
})
  .namespace("Utils")
  .prefix("api/v1/server");

/*
|--------------------------------------------------------------------------
| Routes generate password string
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get("/password", "PasswdController.generate");
})
  .namespace("Utils")
  .prefix("api/v1/string");

/*
|--------------------------------------------------------------------------
| Routes send sms
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get("/query", "SmsController.query");
  Route.post("/send", "SmsController.send");
  Route.post("/sendBatch", "SmsController.sendBatch");
})
  .namespace("Utils")
  .prefix("api/v1/sms");

/*
|--------------------------------------------------------------------------
| Routes send email
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get("/send", "EmailController.send");
})
  .namespace("Utils")
  .prefix("api/v1/email");
