'use strict'

const Room = use('App/Models/Room')

class RoomController {

  async index ({ request }) {
    const rooms = Room.query().where('active', '=', true).fetch()
    return rooms
  }
 
  async store ({ request, response }) {
    const data = request.only(['name', 'observations'])
    const room = await Room.create(data)
    return room
  }

  async show ({ params, response }) {
    try{
      const room = await Room.findOrFail(params.id)
      return room
    }catch(err){
      return response
        .status(err.status)
        .send({ err: { message: 'Sala não existente.'}})
    }
  }

  async update ({ params, request, response }) {
    try{
      const room = await Room.findOrFail(params.id)
      const data = request.only('name','observations','active')
      
      if(data.name){
        const roomExists = await Room.findBy('name', data.name)

        if(!roomExists){
          room.merge(data)
          await room.save()
          return room 
        } else {
          return response
            .status(400)
            .send({ err: { message: 'Esse nome de sala ja está cadastrado.' } })
        }
      } else {
        return response
          .status(400)
          .send({ err: { message: 'O nome da sala é obrigatório.' } })
      }

      }
    catch(err){
      return response 
        .status(err.status)
        .send({ err: { message: 'Essa sala não existe'}})
    }
  }

  async destroy ({ params, response }) {
    try {
      const room = await Room.findOrFail(params.id)
      await room.delete()
    }catch(err) { 
      return response
      .status(err.status)
      .send({ err: { message: 'Sala não existente.'}})
    }
  }
}

module.exports = RoomController
