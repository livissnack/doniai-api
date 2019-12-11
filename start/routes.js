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
const ApiVersion = "api/v1";

Route.get("/", "TestController.test");

/*
|--------------------------------------------------------------------------
| Routes Doniai Frontend management interface
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/

Route.group(() => {
  //article resource route only index,store,show,update and destroy method
  Route.get("/articles", "ArticleController.index");
  Route.post("/articles", "ArticleController.store");
  Route.get("/articles/:id", "ArticleController.show");
  Route.put("/articles/:id", "ArticleController.update");
  Route.delete("/articles/:id", "ArticleController.destroy");
  Route.delete("/articles", "ArticleController.batchDel");
  Route.get("/export/articles", "ArticleController.export");

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

  //enum route only getArticleTypes,getArticleTags,getQuestionTypes,getQuestionTags and getCourseTypes method
  Route.get("/article_types", "EnumController.getArticleTypes");
  Route.get("/article_tags", "EnumController.getArticleTags");
  Route.get("/question_types", "EnumController.getQuestionTypes");
  Route.get("/question_tags", "EnumController.getQuestionTags");
  Route.get("/course_types", "EnumController.getCourseTypes");
})
  .namespace("Doniai/Backend")
  .prefix(`doniai/backend/${ApiVersion}`);

/*
|--------------------------------------------------------------------------
| Routes Doniai Backend management interface
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get("/courses", "CourseController.index");
  Route.get("/courses/:id", "CourseController.show");

  Route.get("/videos", "VideoController.index");
  Route.get("/videos/:id", "VideoController.show");

  Route.get("/questions", "QuestionController.index");
  Route.post("/questions", "QuestionController.store");
  Route.get("/questions/:id", "QuestionController.show");

  Route.get("/articles", "ArticleController.index");
  Route.post("/articles", "ArticleController.store");
  Route.get("/articles/:id", "ArticleController.show");

  Route.get("/books", "BookController.index");
  Route.get("/books/:id", "BookController.show");

  Route.get("/comments", "CommentController.index");
  Route.post("/comments", "CommentController.store");

  Route.get("/replays", "ReplayController.index");
})
  .namespace("Doniai/Frontend")
  .prefix(`doniai/frontend/${ApiVersion}`);

/* -------------------------------------------------------------------------------------splitline------------------------------------------------------------------------------------*/

/*
|--------------------------------------------------------------------------
| Routes Hspx Backend management interface
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/

Route.group(() => {
  //news resource route only index,store,show,update and destroy method
  Route.get("/news", "NewsController.index");
  Route.post("/news", "NewsController.store");
  Route.get("/news/:id", "NewsController.show");
  Route.put("/news/:id", "NewsController.update");
  Route.delete("/news/:id", "NewsController.destroy");

  //product resource route only index,store,show,update and destroy method
  Route.get("/product", "ProductController.index");
  Route.post("/product", "ProductController.store");
  Route.get("/product/:id", "ProductController.show");
  Route.put("/product/:id", "ProductController.update");
  Route.delete("/product/:id", "ProductController.destroy");

  //user resource route only index,store,show,update and destroy method
  Route.get("/user", "UserController.index");
  Route.get("/user/:id", "UserController.show");
  Route.put("/user/:id", "UserController.update");
  Route.delete("/user/:id", "UserController.destroy");

  //inquiry resource route only index,store,show,update and destroy method
  Route.get("/inquiry", "InquiryController.index");
  Route.get("/inquiry/:id", "InquiryController.show");
  Route.delete("/inquiry/:id", "InquiryController.destroy");

  //accesslog resource route only index,store,show,update and destroy method
  Route.get("/accesslog", "AccessLogController.index");
  Route.get("/accesslog/:id", "AccessLogController.show");
  Route.delete("/accesslog/:id", "AccessLogController.destroy");

  Route.get("/product_type", "ProductTypeController.all");
})
  .namespace("Hspx/Backend")
  .prefix(`hspx/backend/${ApiVersion}`);

/*
|--------------------------------------------------------------------------
| Routes Hspx Frontend management interface
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //article resource route only index,store,show,update and destroy method
  Route.post("/access_count", "AccessLogController.access_count");

  Route.post("/inquiry", "InquiryController.create");

  Route.get("/news", "NewsController.list");
  Route.get("/news/hot", "NewsController.hot");
  Route.get("/news/:id", "NewsController.detail");
  Route.get("/news/read_count/:id", "NewsController.readNums");

  Route.get("/product", "ProductController.list");
  Route.get("/product/all", "ProductController.all");
  Route.get("/product/:id", "ProductController.detail");

  Route.get("/product_type", "ProductTypeController.all");

  Route.post("/login", "UserController.login");
  Route.post("/register", "UserController.register");
  Route.get("/logout", "UserController.logout");
})
  .namespace("Hspx/Frontend")
  .prefix(`hspx/frontend/${ApiVersion}`);

/* -------------------------------------------------------------------------------------splitline------------------------------------------------------------------------------------*/

/*
|--------------------------------------------------------------------------
| Routes System Background management interface
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  //menu management
  Route.get("/menus", "MenuController.index");
  Route.get("/menu/groups", "MenuController.groups");
  Route.get("/menu/items", "MenuController.items");

  //user management
  Route.post("/login", "UserController.login");
  Route.get("/logout", "UserController.logout");
})
  .namespace("System")
  .prefix(`system/${ApiVersion}`);

Route.group(() => {
  //menu management
  Route.get("/tickets", "TicketController.query");
  Route.get("/stations", "TicketController.station");
})
  .namespace("Utils")
  .prefix(`utils/${ApiVersion}`);
