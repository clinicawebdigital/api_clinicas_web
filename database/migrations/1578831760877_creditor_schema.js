'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreditorSchema extends Schema {
  up () {
    this.create('creditors', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('creditors')
  }
}

module.exports = CreditorSchema
