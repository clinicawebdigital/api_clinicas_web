'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnershipSchema extends Schema {
  up() {
    this.create('partnerships', (table) => {
      table.increments()
      table.string('name')
      table.string('company_name')
      table.string('cnpj')
      // dados de endereço
      table.string('cep')
      table.string('street')
      table.string('number')
      table.string('neighborhood')
      table.string('complement')
      table.string('county')
      // dados de contato da empresa
      table.string('telephone')
      table.string('cellphone')
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('partnerships')
  }
}

module.exports = PartnershipSchema
