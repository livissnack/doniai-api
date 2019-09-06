'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const { formatDate } = require("../app/Utils/Helpers");


Factory.blueprint('App/Models/User', (faker) => {
    return {
        username: faker.username(),
        nikename: faker.name(),
        email: faker.email(),
        phone: faker.phone(),
        password: Hash.make( faker.string({ pool: 'abcd' }) ),
        intro: faker.sentence(),
        githup: faker.url(),
        sina: faker.url(),
        access_nums: faker.integer({ min: 0, max: 10000000 }),
        empiric_value: faker.integer({ min: 0, max: 100000 }),
        balance: faker.integer({ min: 0, max: 100000 }),
        status: faker.integer({ min: 0, max: 1 }),
        type: faker.integer({ min: 0, max: 2 }),
        website: faker.domain(),
        referral_code: faker.bb_pin(),
        avatar: faker.avatar(),
        wechat_receipt_qr: faker.url(),
        alipay_receipt_qr: faker.url(),
    }
})

Factory.blueprint('App/Models/Article', (faker) => {
    return {
        title: faker.sentence(),
        user_id: faker.integer({ min: 1, max: 100 }),
        article_type_id: faker.integer({ min: 1, max: 10 }),
        article_tag_id: faker.integer({ min: 1, max: 10 }),
        comment_nums: faker.integer({ min: 1, max: 100 }),
        content: faker.paragraph(),
        image: faker.url({extensions: ['jpg', 'png']}),
        status: faker.integer({ min: 0, max: 1 }),
        is_free: faker.integer({ min: 0, max: 1 }),
        price: faker.integer({ min: 1, max: 100 }),
        publish_at: formatDate(new Date())
    }
})

Factory.blueprint('App/Models/ArticleTag', (faker) => {
    return {
        value: faker.unique(faker.state, 1),
        article_id: faker.integer({ min: 1, max: 10 }),
    }
})

Factory.blueprint('App/Models/Comment', (faker) => {
    return {
        pid: faker.integer({ min: 1, max: 1000 }),
        type: faker.integer({ min: 1, max: 2 }),
        user_id: faker.integer({ min: 1, max: 100 }),
        content: faker.sentence(),
        is_show: faker.integer({ min: 0, max: 1 }),
    }
})


Factory.blueprint('App/Models/ArticleType', (faker) => {
    return {
        value: faker.word(),
        article_id: faker.integer({ min: 1, max: 10 }),
    }
})

Factory.blueprint('App/Models/Video', (faker) => {
    return {
        course_id: faker.integer({ min: 1, max: 11 }),
        name: faker.name(),
        intro: faker.sentence(),
        image: faker.url({extensions: ['jpg', 'png']}),
        duration: faker.minute(),
        comment_nums: faker.integer({ min: 1, max: 110 }),
        publish_at: formatDate(new Date()),
        url: faker.url({extensions: ['mp4', 'avi', 'flv']}),
        status: faker.integer({ min: 0, max: 1 }),
        is_free: faker.integer({ min: 0, max: 1 }),
        price: faker.integer({ min: 1, max: 110 }),
    }
})

Factory.blueprint('App/Models/Course', (faker) => {
    return {
        title: faker.sentence(),
        intro: faker.sentence(),
        image: faker.url({extensions: ['jpg', 'png']}),
        discuss_qq_group: faker.string({ pool: '499324462' }),
        duration: faker.minute(),
        nums: faker.integer({ min: 0, max: 100 }),
        support_wechat: faker.string({ pool: 'wei_23239231321' }),
        course_type_id: faker.integer({ min: 1, max: 10 }),
        status: faker.integer({ min: 0, max: 1 }),
        is_free: faker.integer({ min: 0, max: 1 }),
        price: faker.integer({ min: 100, max: 1000 }),
    }
})

Factory.blueprint('App/Models/QuestionTag', (faker) => {
  return {
      value: faker.word(),
      question_tag_id: faker.integer({ min: 1, max: 10 }),
  }
})

Factory.blueprint('App/Models/CourseType', (faker) => {
    return {
        value: faker.word(),
        course_type_id: faker.integer({ min: 1, max: 10 }),
    }
})

Factory.blueprint('App/Models/Question', (faker) => {
    return {
        title: faker.sentence(),
        content: faker.sentence(),
        user_id: faker.integer({ min: 1, max: 100000 }),
        question_tag_id: faker.integer({ min: 1, max: 10 }),
        question_type_id: faker.integer({ min: 1, max: 10 }),
        user_id: faker.integer({ min: 1, max: 100 }),
        replay_count: faker.integer({ min: 1, max: 100 }),
        is_show: faker.integer({ min: 0, max: 1 }),
    }
})

Factory.blueprint('App/Models/Replay', (faker) => {
    return {
        question_id: faker.integer({ min: 1, max: 100 }),
        pid: faker.integer({ min: 1, max: 100 }),
        user_id: faker.integer({ min: 1, max: 100 }),
        content: faker.sentence(),
        is_show: faker.integer({ min: 0, max: 1 }),
    }
})

Factory.blueprint('App/Models/Book', (faker) => {
    return {
        name: faker.name(),
        intro: faker.sentence(),
        image: faker.url({extensions: ['jpg', 'png']}),
        is_recommend: faker.integer({ min: 0, max: 1 }),
    }
})

Factory.blueprint('App/Models/Link', (faker) => {
    return {
        name: faker.name(),
        url: faker.url(),
        is_show: faker.integer({ min: 0, max: 1 }),
        type: faker.integer({ min: 1, max: 10 }),
    }
})

Factory.blueprint('App/Models/QuestionType', (faker) => {
  return {
      value: faker.word(),
      question_type_id: faker.integer({ min: 1, max: 10 }),
  }
})

Factory.blueprint('App/Models/BlackList', (faker) => {
    return {
        ip: faker.ip(),
        status: faker.integer({ min: 1, max: 10 }),
        release_start_time: formatDate(new Date()),
        release_end_time: formatDate(new Date()),
    }
})





