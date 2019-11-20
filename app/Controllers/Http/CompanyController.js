'use strict'

const Company = use('App/Models/Company')

class CompanyController {
  
  async show ({ params, response }) {
    try{
      const company = await Company.findOrFail(params.id)
      return company
    }catch(err){
      return response
        .status(err.status)
        .send({ err: { message: 'Essa empresa nao está presente no banco de dados.'}})
    }
  }

  async update ({ params, request, response }) {
    try{
      const company = await Company.findOrFail(params.id)
      const data = request.only(
          [
          'name',
          'company_name',
          'cnpj',
          'cnes',
          'street',
          'number',
          'neighborhood',
          'cep',
          'telephone',
          'cellphone',
          'email',
          'county',
          'logo_url'
        ])

        company.merge(data)
        await company.save()
        return company

      }catch(err){
        return response
          .status(err.status)
          .send({ err: { message: 'Essa empresa nao está presente no banco de dados.'}}) 
      }
  }

 
}

module.exports = CompanyController
