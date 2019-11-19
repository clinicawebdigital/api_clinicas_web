'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientAddressesSchema extends Schema {
  up () {
    this.create('patients_addresses', (table) => {
      table.increments()
      table.string('cep')
      table.string('street')
      table.string('number')
      table.string('complement')
      table.string('neighborhood')
      table.string('county')
      table
      .integer('patient_id')
      .unsigned()
      .references('id')
      .inTable('patients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('patients_addresses')
  }
}

module.exports = PatientAddressesSchema
