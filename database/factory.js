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

Factory.blueprint('App/Models/User', (faker) => {
    return {
        username: faker.username(),
        nikename: faker.name(),
        email: faker.email(),
        phone: faker.phone,
        password: Hash.make( faker.string({ pool: 'abcd' }) ),
        intro: faker.paragraph(),
        githup: faker.url(),
        sina: facker.url(),
        access_nums: faker.integer({ min: 0, max: 10000000 }),
        empiric_value: faker.integer(),
        status: faker.integer({ min: 0, max: 1 }),
        type: faker.faker.integer({ min: 0, max: 2 }),
        website: faker.domain(),
        referral_code: faker.string(),
        avatar: faker.avatar(),
        wechat_receipt_qr: faker.url(),
        alipay_receipt_qr: faker.url(),
    }
})

Factory.blueprint('App/Models/Article', (faker) => {
    return {
        title: faker.sentence(),
        user_id: faker.integer({ min: 1, max: 100000 }),
        article_type_id: faker.integer({ min: 1, max: 10 }),
        article_tag_id: faker.integer({ min: 1, max: 30 }),
        content: faker.paragraph(),
        publish_at: faker.timestamp()
    }
})

Factory.blueprint('App/Models/ArticleTag', (faker) => {
    return {
        value: faker.word(),
    }
})

Factory.blueprint('App/Models/ArticleType', (faker) => {
    return {
        value: faker.word(),
    }
})

Factory.blueprint('App/Models/Comment', (faker) => {
    return {
        comment_id: faker.integer({ min: 1, max: 1000 }),
        comment_type: faker.integer({ min: 1, max: 2 }),
        user_id: faker.integer({ min: 1, max: 100000 }),
        content: facker.paragraph(),
    }
})

Factory.blueprint('App/Models/CommentRelation', (faker) => {
    return {
        parent_id: faker.integer({ min: 1, max: 1000 }),
        child_id: faker.integer({ min: 1, max: 1000 }),
    }
})

Factory.blueprint('App/Models/Course', (faker) => {
    return {
        title: faker.sentence(),
        intro: faker.paragraph(),
        image: faker.avatar({fileExtension: 'jpg'}),
        discuss_qq_group: faker.string({ pool: '499324462' }),
        support_wechat: faker.string({ pool: 'wei_23239231321' }),
        course_type_id: faker.integer({ min: 1, max: 10 }),
        course_status: faker.integer({ min: 0, max: 1 }),
        is_free: faker.integer({ min: 0, max: 1 }),
        price: faker.integer({ min: 100, max: 1000 }),
    }
})

Factory.blueprint('App/Models/CourseType', (faker) => {
    return {
        value: faker.word(),
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

Factory.blueprint('App/Models/Question', (faker) => {
    return {
        value: faker.sentence(),
        user_id: faker.integer({ min: 1, max: 100000 }),
    }
})

Factory.blueprint('App/Models/Reply', (faker) => {
    return {
        reply_id: faker.integer({ min: 1, max: 100 }),
        reply_user_id: faker.integer({ min: 1, max: 100000 }),
        content: faker.paragraph(),
    }
})

Factory.blueprint('App/Models/QuestionReplyRelation', (faker) => {
    return {
        parent_id: faker.integer({ min: 1, max: 1000 }),
        child_id: faker.integer({ min: 1, max: 1000 }),
    }
})

Factory.blueprint('App/Models/Book', (faker) => {
    return {
        name: faker.name(),
        intro: faker.paragraph(),
        image: faker.avatar({fileExtension: 'jpg'}),
        is_recommend: faker.integer({ min: 0, max: 1 }),
    }
})

Factory.blueprint('App/Models/Video', (faker) => {
    return {
        course_id: faker.integer({ min: 1, max: 11 }),
        name: faker.name(),
        intro: faker.paragraph(),
        image: faker.avatar({fileExtension: 'jpg'}),
        duration: faker.minute(),
        publish_at: faker.timestamp(),
        url: faker.url(),
        video_status: faker.integer({ min: 0, max: 1 }),
        is_free: faker.integer({ min: 0, max: 1 }),
    }
})