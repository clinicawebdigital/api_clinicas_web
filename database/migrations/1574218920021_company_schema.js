'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      // dados da empresa
      table.string('name')
      table.string('company_name')
      table.string('cnpj')
      table.string('cnes')
      table.string('logo_url')
      // dados de endereço
      table.string('cep')
      table.string('street')
      table.string('number')
      table.string('neighborhood')
      table.string('county')
      // dados de contato da empresa
      table.string('telephone')
      table.string('cellphone')
      table.string('email')
    
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
