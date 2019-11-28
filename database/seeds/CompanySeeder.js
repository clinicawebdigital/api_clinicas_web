'use strict'

const Company = use('App/Models/Company')

class CompanySeeder {
  async run () {
    const company = await Company.create({
     name: '',
    })

   await company.openingHours().createMany([
      {
        day: '0',
        description: 'Domingo',
        start: '',
        end: '',
      },
      {
        day: '1',
        description: 'Segunda-feira',
        start: '',
        end: '',
      },
      {
        day: '2',
        description: 'Terça-feira',
        start: '',
        end: '',
      },
      {
        day: '3',
        description: 'Quarta-feira',
        start: '',
        end: '',
      },
      {
        day: '4',
        description: 'Quinta-feira',
        start: '',
        end: '',
      }, {
        day: '5',
        description: 'Sexta-feira',
        start: '',
        end: '',
      },
      {
        day: '6',
        description: 'Sábado-feira',
        start: '',
        end: '',
      }
    ])
  }
}

module.exports = CompanySeeder
