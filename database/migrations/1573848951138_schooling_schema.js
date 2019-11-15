'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchoolingSchema extends Schema {
  up () {
    this.create('schooling', (table) => {
      table.increments()
      table.string("name")
      table.timestamps()
    })
  }

  down () {
    this.drop('schooling')
  }
}

module.exports = SchoolingSchema
