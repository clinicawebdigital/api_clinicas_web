'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndicationSchema extends Schema {
  up () {
    this.create('indications', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('indications')
  }
}

module.exports = IndicationSchema
