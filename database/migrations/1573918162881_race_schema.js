'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RaceSchema extends Schema {
  up () {
    this.create('races', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('races')
  }
}

module.exports = RaceSchema
