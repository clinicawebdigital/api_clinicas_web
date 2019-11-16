'use strict'

const Schooling = use('App/Models/Schooling')

class SchoolingController {
  
  async index ({ request, response }) {
    const { page } = request.get()
    const schooling = await Indication.query().paginate(page)
    return schooling
  }

  async show ({ params, request, response, view }) {
    try {
      const schooling = await Schooling.findOrFail(params.id)
      return schooling
    } catch(err) {
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }
  }
 
  async update ({ params, request, response }) {
    try{
      const schooling = await Schooling.findOrFail(params.id) 
      const data = request.only(['name']) 
      schooling.merge(data) 
      await schooling.save(); 
      return schooling
    }catch(err){
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }
  }

  async destroy ({ params, request, response }) {
    try {
      const schooling = await Schooling.findOrFail(params.id)
      await schooling.delete()
    } catch(err) {
      return response
      .status(err.status)
      .send({ err: { message: 'Essa indicação não existe' } })
    }  
  }
}

module.exports = SchoolingController
