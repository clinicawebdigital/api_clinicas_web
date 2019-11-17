'use strict'

const MaritalStatus = use('App/Models/MaritalStatus')

class MaritalStatusController {
 
  async index () {
    const maritalStatus = await MaritalStatus.all()
    return maritalStatus 
  }
  
  async store ({ request, response }) {

    const data = request.only(['name'])
    const maritalStatus = await MaritalStatus.findBy('name', data.name)

    if(!maritalStatus){
      const maritalStatus = await MaritalStatus.create(data)

      return maritalStatus
    }else{
      return response
        .status(400)
        .send({err: { message: 'Esse estado civil já está cadastrado.' }})
    }
  }
  
  async show ({ params, response }) {
    try{

      const maritalStatus = await MaritalStatus.findOrFail(params.id)
      return maritalStatus

    }catch(err){
      return response
        .status(err.status)
        .send({err: { message: 'Esse estado civil não existe.' }})
    }
  }

  async update ({ params, request, response }) {
    try{
      const maritalStatus = await MaritalStatus.findOrFail(params.id)
      
      const data = request.only('name')

      const maritalStatusExists = await MaritalStatus.findBy('name', data.name)

      if(!maritalStatusExists){
        maritalStatus.merge(data)

        await maritalStatus.save()
        return maritalStatus
      }else{
        return response 
          .status(400)
          .send({ err: { message: 'Esse estado civil já existe.' }})
      }
    }
    catch(err){
      return response
        .status(err.status)
        .send({ err: { message: 'Esse identificador não existe.' }})
    } 
  }

  async destroy ({ params, response }) {
    try{
      const maritalStatus = await MaritalStatus.findOrFail(params.id)
      maritalStatus.delete()
    }
    catch(err){
      return response
        .status(err.status)
        .send({ err: { message:'Esse estado civil não existe.' }})
    }
  }
}

module.exports = MaritalStatusController
