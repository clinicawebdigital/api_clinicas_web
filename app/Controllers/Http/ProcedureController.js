'use strict'


const Procedure = use('App/Models/Procedure')


class ProcedureController {
  async index({ request }) {
    const { term = '' } = request.get()
    const procedures = await Procedure.query().where("name", "LIKE", "%" + term + "%").fetch()
    return procedures
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'partnership_id',
      'description',
      'value',
      'value_transferred',
      'observation'
    ])

    console.log(data)
    const procedureExists = await Procedure.query()
      .where('name', data.name)
      .andWhere('partnership_id', data.partnership_id)
      .first()

    if (!procedureExists) {
      const procedure = await Procedure.create(data)
      return procedure
    } else {
      return response
        .status(400)
        .send({ err: { message: 'Essa procedimento já está cadastrada para esse convênio.' } })
    }
  }

}

module.exports = ProcedureController
