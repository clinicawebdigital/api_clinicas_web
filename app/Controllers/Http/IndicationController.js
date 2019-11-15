'use strict'

const Indication = use('App/Models/Indication')

class IndicationController {

  // request.only
  // ?page=1 request.get
  // params request.params

  async index ({ request, response }) {
    const { page } = request.get()
    const indications = await Indication.query().paginate(page)
    return indications
  }

  async store ({ request, response }) {
    const data = request.only(['name'])
    const indication = await Indication.create(data)
    return indication
  }
  
  async show ({ params, request, response }) {
    try {
      const indication = await Indication.findOrFail(params.id)
      return indication
    } catch(err) {
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }
  }

  async update ({ params, request, response }) {
    try{
      const indication = await Indication.findOrFail(params.id) // indication do banco 
      const data = request.only(['name']) // dados do formulario

      indication.merge(data) // faz mesclagem

      await indication.save(); 

      return indication
      

    }catch(err){
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }
     
  }

  async destroy ({ params, request, response }) {
    try {
      const indication = await Indication.findOrFail(params.id)
      await indication.delete()
    } catch(err) {
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }
   
  }
}

module.exports = IndicationController
