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
//test method
// Route.get("/test", "OssController.put").namespace("Utils");
// Route.get("/test1", "OssController.list").namespace("Utils");
// Route.get("/test2", "OssController.listBuckets").namespace("Utils");

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
  Route.get("users/:id", "UserController.show").middleware("auth");

  //article resource route only index,store,show,update and destroy method
  Route.get("/articles", "ArticleController.index").validator("Article");
  Route.post("/articles", "ArticleController.store");
  Route.get("/articles/:id", "ArticleController.show");
  Route.put("/articles/:id", "ArticleController.update");
  Route.delete("/articles/:id", "ArticleController.destroy");

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
})
  .namespace("Api")
  .prefix("api/v1");

Route.group(() => {
  //crawler news data
  Route.get("/crawler/baidu", "CrawlerController.crawlerBaiduHotNews");
  Route.get("/crawler/toutiao", "CrawlerController.crawlerToutiaoHotNews");
  //geetest register method
  Route.get("/gt/register-click", "GeetestController.geetest");
  //geetest validate method
  Route.post("/gt/validate-click", "GeetestController.validate");

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
  Route.put("/put", "OssController.put");
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
  .prefix("api/v1");

Route.group(() => {
  Route.get("/test", "BanwaController.getServiceInfo");
})
  .namespace("Utils")
  .prefix("api/v1/service");
