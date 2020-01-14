"use strict";

const Room = use("App/Models/Room");

class RoomController {
  async index() {
    const rooms = Room.all();
    return rooms;
  }

  async store({ request }) {
    const data = request.only(["name", "observations"]);

    const room = await Room.create(data);
    return room;
  }

  async options() {
    const options = await Room.query()
      .select("id as value", "name as label")
      .where("active", true)
      .fetch();

    return options;
  }

  async show({ params }) {
    try {
      const room = await Room.findOrFail(params.id);
      return room;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Sala não existente." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const room = await Room.findOrFail(params.id);
      const data = request.only(["name", "observations"]);

      room.merge(data);
      await room.save();
      return room;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa sala não existe" } });
    }
  }

  async status({ response, params }) {
    try {
      const room = await Room.findOrFail(params.id);
      room.active = !room.active;
      await room.save();
      return room;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa sala não existe." } });
    }
  }
}

module.exports = RoomController;
