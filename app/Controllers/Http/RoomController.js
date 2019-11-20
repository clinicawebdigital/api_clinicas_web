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
