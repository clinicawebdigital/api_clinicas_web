'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaritalStatusSchema extends Schema {
  up () {
    this.create('marital_status', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('marital_status')
  }
}

module.exports = MaritalStatusSchema
