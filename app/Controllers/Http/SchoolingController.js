'use strict'

const Schooling = use('App/Models/Schooling')

class SchoolingController {

  async index() {
    const schooling = await Schooling.all()
    return schooling
  }

  async store({ request, response }) {
    const data = request.only(['name'])

    const schoolingExists = await Schooling.findBy('name', data.name);

    if (!schoolingExists) {
      const schooling = await Schooling.create(data)
      return schooling
    } else {
      return response
        .status(400)
        .send({ err: { message: 'Essa escolaridade já existe' } })
    }
  }

  async show({ params, response }) {
    try {
      const schooling = await Schooling.findOrFail(params.id)
      return schooling
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa escolaridade não existe' } })
    }
  }

  async update({ params, request, response }) {
    try {

      const schooling = await Schooling.findOrFail(params.id);

      const data = request.only(['name'])
      const schoolingExists = await Schooling.findBy('name', data.name);
      
      if (!schoolingExists) {
        schooling.merge(data)

        await schooling.save();

        return schooling
      } else {
        return response
          .status(400)
          .send({ err: { message: 'Essa escolaridade já existe' } })
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa escolaridade não existe' } })
    }
  }

  async destroy({ params, response }) {
    try {
      const schooling = await Schooling.findOrFail(params.id)
      
      await schooling.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Essa escolaridade não existe' } })
    }
  }
}

module.exports = SchoolingController
