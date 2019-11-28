'use strict'

const Patient = use('App/Models/Patient')

class PatientController {

  async index({ request, response }) {
    const { page } = request.get()
    const patients = Patient.query()
      .select('id', 'fullname', 'cpf', 'date_birth', 'first_phone', 'second_phone')
      .paginate(page)
    return patients
  }


  async store({ request }) {
    const data = request.only(['fullname', 'first_phone', 'second_phone', 'date_birth'])
    const address = request.only([
      'cep',
      'street',
      'number',
      'complement',
      'neighborhood',
      'county'
    ])
    const pacient = await Patient.create(data)

    await patient.patientsAddresses().createMany([address])

    return pacient
  }

  async show({ response, params }) {
    try {
      const patient = await Patient.findOrFail(params.id)
      return patient
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Esse paciente não existe.' } })
    }
  }

  async update({ params, response, request }) {
    try {

      const patient = await Patient.findOrFail(params.id)

      const data = request.only(
        [
          'fullname',
          'email',
          'date_birth',
          'father_name',
          'mother_name',
          'gender',
          'cpf',
          'rg',
          'responsible_document',
          'observations',
          'first_phone',
          'second_phone',
          'whatsapp',
          'indication_id',
          'ocupacao',
          'nacionalidade',
          'instragram',
          'facebook',
          'race_id',
          'marital_status_id',
          'schooling_id'
        ]
      )

   

      if (data.cpf) {
        const patientExists = await Patient.findBy('cpf', data.cpf)

        if (!patientExists) {
          patient.merge(data)
          await patient.save()


          return patient
        } else {
          return response
            .status(400)
            .send({ err: { message: 'Esse CPF já está cadastrado.' } })
        }
      } else {
        return response
          .status(400)
          .send({ err: { message: 'CPF é obrigatório.' } })
      }


    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Esse paciente não existe.' } })
    }


  }

  async destroy({ params, response }) {
    try {
      const patient = await Patient.findOrFail(params.id)
      await patient.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'Esse paciente não existe.' } })
    }
  }
}

module.exports = PatientController
