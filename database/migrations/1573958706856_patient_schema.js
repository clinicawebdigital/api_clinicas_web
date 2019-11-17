'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()
      table.string('fullname').notNullable()
      table.string('email')
      table.date('date_birth').notNullable()
      table.string('father_name')
      table.string('mother_name')
      table.string('gender')
      // documentos 
      table.string('gender').unique()
      table.string('rg')
      table.boolean('responsible_document').defaultTo(false)
      table.text('observations')
      // contatos
      table.string('first_phone').notNullable()
      table.string('second_phone').notNullable()
      table.string('whatsapp')
      table.timestamps()
      // dados sociais
      table
      .integer('indication_id')
      .unsigned()
      .references('id')
      .inTable('indication')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('ocupacao')
      table.string('nacionalidade')
      table.string('instragram')
      table.string('facebook')
      table
      .integer('race_id')
      .unsigned()
      .references('id')
      .inTable('races')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('marital_status_id')
      .unsigned()
      .references('id')
      .inTable('races')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('schooling_id')
      .unsigned()
      .references('id')
      .inTable('schooling')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
