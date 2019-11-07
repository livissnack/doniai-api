'use strict'

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
const Route = use('Route')
Route.get('/', () => 'Hello world')
Route.get('/test', 'TestController.test')
Route.get('/encrypt', 'TestController.encrypt')
Route.get('/decrypt', 'TestController.decrypt')
Route.get('/download', 'TestController.download')
Route.get('/attachment', 'TestController.attachment')
Route.get('/baidu', 'TestController.filterText')

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
  Route.post('login', 'UserController.login').middleware('guest')
  //user register route
  Route.post('register', 'UserController.register')
    .middleware('guest')
    .validator('User')
  //user logout route
  Route.get('logout', 'UserController.logout')

  //user detail route
  Route.get('users/:id', 'UserController.detail').middleware('auth')

  //article resource route only index,store,show,update and destroy method
  Route.get('/articles', 'ArticleController.index').validator('Article')
  Route.post('/articles', 'ArticleController.store')
  Route.get('/articles/:id', 'ArticleController.show')
  Route.put('/articles/:id', 'ArticleController.update')
  Route.delete('/articles/:id', 'ArticleController.destroy')
  Route.delete('/articles', 'ArticleController.batchDel')
  Route.get('/export/articles', 'ArticleController.export')

  //black list resource route only index,store,show,update and destroy method
  Route.get('/blacklists', 'BlackListController.index')
  Route.post('/blacklists', 'BlackListController.store')
  Route.get('/blacklists/:id', 'BlackListController.show')
  Route.put('/blacklists/:id', 'BlackListController.update')
  Route.delete('/blacklists/:id', 'BlackListController.destroy')

  //book resource route only index,store,show,update and destroy method
  Route.get('/books', 'BookController.index')
  Route.post('/books', 'BookController.store')
  Route.get('/books/:id', 'BookController.show')
  Route.put('/books/:id', 'BookController.update')
  Route.delete('/books/:id', 'BookController.destroy')

  //comment resource route only index,store,show,update and destroy method
  Route.get('/comments', 'CommentController.index')
  Route.post('/comments', 'CommentController.store')
  Route.get('/comments/:id', 'CommentController.show')
  Route.put('/comments/:id', 'CommentController.update')
  Route.delete('/comments/:id', 'CommentController.destroy')

  //course resource route only index,store,show,update and destroy method
  Route.get('/courses', 'CourseController.index')
  Route.post('/courses', 'CourseController.store')
  Route.get('/courses/:id', 'CourseController.show')
  Route.put('/courses/:id', 'CourseController.update')
  Route.delete('/courses/:id', 'CourseController.destroy')

  //link resource route only index,store,show,update and destroy method
  Route.get('/links', 'LinkController.index')
  Route.post('/links', 'LinkController.store')
  Route.get('/links/:id', 'LinkController.show')
  Route.put('/links/:id', 'LinkController.update')
  Route.delete('/links/:id', 'LinkController.destroy')

  //question resource route only index,store,show,update and destroy method
  Route.get('/questions', 'QuestionController.index')
  Route.post('/questions', 'QuestionController.store')
  Route.get('/questions/:id', 'QuestionController.show')
  Route.put('/questions/:id', 'QuestionController.update')
  Route.delete('/questions/:id', 'QuestionController.destroy')

  //replay resource route only index,store,show,update and destroy method
  Route.get('/replays', 'ReplayController.index')
  Route.post('/replays', 'ReplayController.store')
  Route.get('/replays/:id', 'ReplayController.show')
  Route.put('/replays/:id', 'ReplayController.update')
  Route.delete('/replays/:id', 'ReplayController.destroy')

  //user resource route only index,store,show,update and destroy method
  Route.get('/users', 'UserController.index')
  Route.post('/users', 'UserController.store')
  Route.get('/users/:id', 'UserController.show')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.destroy')

  //video resource route only index,store,show,update and destroy method
  Route.get('/videos', 'VideoController.index')
  Route.post('/videos', 'VideoController.store')
  Route.get('/videos/:id', 'VideoController.show')
  Route.put('/videos/:id', 'VideoController.update')
  Route.delete('/videos/:id', 'VideoController.destroy')

  //enum route only getArticleTypes,getArticleTags,getQuestionTypes,getQuestionTags and getCourseTypes method
  Route.get('/article_types', 'EnumController.getArticleTypes')
  Route.get('/article_tags', 'EnumController.getArticleTags')
  Route.get('/question_types', 'EnumController.getQuestionTypes')
  Route.get('/question_tags', 'EnumController.getQuestionTags')
  Route.get('/course_types', 'EnumController.getCourseTypes')

  //menu management
  Route.get('/menus', 'MenuController.index')
})
  .namespace('Api')
  .prefix('api/v1')

/*
|--------------------------------------------------------------------------
| Routes get alioss bucket config
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.get('/getBucketConfig', 'OssController.getBucketConfig')
  Route.get('/getImgOssConfig', 'OssController.getImgOssConfig')
})
  .namespace('Utils')
  .prefix('api/v1/oss')

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
  Route.get('/baidu', 'CrawlerController.crawlerBaiduHotNews')
  Route.get('/toutiao', 'CrawlerController.crawlerToutiaoHotNews')
  Route.get('/astro', 'CrawlerController.astro')
})
  .namespace('Utils')
  .prefix('api/v1/crawler')

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
  Route.get('/register-click', 'GeetestController.geetest')
  //geetest validate method
  Route.post('/validate-click', 'GeetestController.validate')
})
  .namespace('Utils')
  .prefix('api/v1/captcha')

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
  Route.get('/getServiceInfo', 'BanwaController.getServiceInfo')
  Route.post('/snapshot', 'BanwaController.snapshot')
  Route.post('/restartVps', 'BanwaController.restartVps')
  Route.post('/setPtrRecord', 'BanwaController.setPtrRecord')
})
  .namespace('Utils')
  .prefix('api/v1/server')

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
  Route.get('/password', 'PasswdController.generate')
})
  .namespace('Utils')
  .prefix('api/v1/string')

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
  Route.get('/query', 'SmsController.query')
  Route.post('/send', 'SmsController.send')
  Route.post('/sendBatch', 'SmsController.sendBatch')
})
  .namespace('Utils')
  .prefix('api/v1/sms')

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
  Route.get('/send', 'EmailController.send')
})
  .namespace('Utils')
  .prefix('api/v1/email')

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
  Route.get('/query', 'TicketController.query')
  Route.get('/price', 'TicketController.price')
  Route.get('/train', 'TicketController.train')
  Route.get('/order', 'TicketController.order')
  Route.get('/login', 'TicketController.login')
  Route.get('/check', 'TicketController.check')
  Route.get('/station', 'TicketController.station')
})
  .namespace('Utils')
  .prefix('api/v1/ticket')

/* ---------------------------------以下是hspx站点接口-------------------------------------------- */

/*
|--------------------------------------------------------------------------
| Routes hspx company website
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/
Route.group(() => {
  Route.post('/inquiry', 'InquiryController.create')

  Route.get('/news', 'NewsController.index')
  Route.get('/news/hot', 'NewsController.hot')
  Route.post('/news', 'NewsController.store')
  Route.get('/news/:id', 'NewsController.show')
  Route.put('/news/:id', 'NewsController.update')
  Route.delete('/news/:id', 'NewsController.destroy')
  Route.get('/news/read_count/:id', 'NewsController.readNums')

  Route.get('/product', 'ProductController.index')
  Route.get('/product/all', 'ProductController.all')
  Route.post('/product', 'ProductController.store')
  Route.get('/product/:id', 'ProductController.show')
  Route.delete('/product/:id', 'ProductController.destroy')

  Route.get('/product_type', 'ProductTypeController.index')
  Route.post('/product_type', 'ProductTypeController.store')
  Route.delete('/product_type/:id', 'ProductController.destroy')

  Route.post('/access_count', 'AccessLogController.access_count')

  Route.post('/login', 'UserController.login')
  Route.post('/register', 'UserController.register')
  Route.get('/logout', 'UserController.logout')
})
  .namespace('Hspx')
  .prefix('api/v1/hspx')
