'use strict'

const Company = use('App/Models/Company')

class CompanySeeder {
  async run () {
    await Company.create({
     name: 'Minha Empresa'
    })
  }
}

module.exports = CompanySeeder
