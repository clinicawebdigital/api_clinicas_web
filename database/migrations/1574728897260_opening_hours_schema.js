'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OpeningHoursSchema extends Schema {
  up () {
    this.create('opening_hours', (table) => {
      table.increments()
      table.string('day')
      table.string('description')
      table.string('start')
      table.string('end')
      table
      .integer('company_id')
      .unsigned()
      .references('id')
      .inTable('companies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('opening_hours')
  }
}

module.exports = OpeningHoursSchema
