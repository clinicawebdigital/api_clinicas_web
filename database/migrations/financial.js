'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinancialSchema extends Schema {
  up () {
    this.create('financial', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.Number('value')
      table.boolean('is_input').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('financial')
  }
}

module.exports = FinancialSchema
