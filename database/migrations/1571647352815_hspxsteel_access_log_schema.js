'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HspxsteelAccessLogSchema extends Schema {
  up() {
    this.create('hspxsteel_access_logs', table => {
      table.increments()
      table
        .string('area')
        .notNullable()
        .comment('地区')
      table
        .string('country')
        .notNullable()
        .comment('国家')
      table
        .integer('long_ip')
        .notNullable()
        .comment('长ip')
      table
        .string('city', 200)
        .notNullable()
        .comment('城市')
      table
        .string('ip', 200)
        .notNullable()
        .comment('ip地址')
      table
        .string('isp', 200)
        .notNullable()
        .comment('运营商')
      table
        .integer('region_id', 200)
        .notNullable()
        .comment('省份id')
      table
        .string('region', 200)
        .notNullable()
        .comment('省份')
      table
        .integer('country_id')
        .notNullable()
        .default(0)
        .comment('国家id')
      table
        .integer('city_id')
        .notNullable()
        .default(0)
        .comment('城市id')
      table
        .integer('count')
        .notNullable()
        .default(0)
        .comment('访问次数')
      table.timestamps()
    })
  }

  down() {
    this.drop('hspxsteel_access_logs')
  }
}

module.exports = HspxsteelAccessLogSchema
