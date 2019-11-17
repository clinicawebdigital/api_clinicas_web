'use strict'

const Race = use('App/Models/Race')

class RaceController {
 
  async index() {
    const race = await Race.all()
    return race
  }

  async store({ request, response }) {
    const data = request.only(['name'])

    const raceExists = await Race.findBy('name', data.name);

    if (!raceExists) {
      const race = await Race.create(data)
      return race
    } else {
      return response
        .status(401)
        .send({ err: { message: 'Essa raça já existe' } })
    }
  }

  async show({ params, response }) {
    try {
      const race = await Race.findOrFail(params.id)
      return race
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa raça não existe' } })
    }
  }

  async update({ params, request, response }) {
    try {

      const race = await Race.findOrFail(params.id);

      const data = request.only(['name'])
      const raceExists = await Race.findBy('name', data.name);

      if (!raceExists) {

        race.merge(data)
        await race.save();

        return race
      } else {
        return response
          .status(401)
          .send({ err: { message: 'Essa raça já existe' } })
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa raça não existe' } })
    }

  }

  async destroy({ params, response }) {
    try {
      const race = await Race.findOrFail(params.id)
      await race.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa raça não existe' } })
    }
  }
}

module.exports = RaceController
