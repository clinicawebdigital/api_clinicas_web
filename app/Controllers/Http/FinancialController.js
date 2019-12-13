'use strict'

const Financial = use('App/Models/Financial')

class FinancialController {

  async index({ request }) {
    const { value_top, value_down, is_input } = request
    const { page } = request.get()
    const financial = await Financial.query()
      .where(function(){
        if(is_input){ // se o Valor do filtro for colocado como máximo?
          this.whereBetween('value', [value_down, value_top]),
          this.where('input', is_input)
        }else{
          this.whereBetween('value', [value_down, value_top])
        }
        this.whereBetween('value', [value_down, value_top]),
        this.where('input', is_input)
      })
      .paginate(page)

    return financial
  }

  async store({ request }) {
    const data = request.only(['description', 'value', 'is_input'])
    const financial = await Financial.create(data)
    return financial
  }

  async show({ params, response }) {
    try {
      const financial = await Financial.findOrFail(params.id)
      return financial
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa operação financeira não existe.' } })
    }
  }

  async update({ params, request, response }) {
    try {
      const financial = await financial.findOrFail(params.id)

      const data = request.only(['description', 'value', 'is_input'])
      // const indicationExists = await Indication.findBy('name', data.name)

      financial.merge(data)
      await financial.save();
      return financial

    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa indicação não existe' } })
    }
  }

}

module.exports = FinancialController
