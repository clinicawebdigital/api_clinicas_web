"use strict";

const Patient = use("App/Models/Patient");

const ProcedureProfessional = use("App/Models/ProcedureProfessional");

class PatientController {
  async index({ request }) {
    const { page } = request.get();
    const patients = Patient.query()
      .select("id", "name", "cpf", "date_birth", "first_phone", "second_phone")
      .fetch(page);
    return patients;
  }

  async getMyProcedures({ request }) {
    const { id_professional } = request.get();
    const proceduresProfessionals = await ProcedureProfessional.query()
      .where("professional_id", id_professional)
      .with("professional")
      .fetch();
  }

  async store({ request }) {
    const data = request.only([
      "name",
      "email",
      "date_birth",
      "age",
      "father_name",
      "mother_name",
      "gender",
      // documentos
      "rg",
      "cpf",
      "responsible_document",
      "observations",
      // contatos
      "first_phone",
      "second_phone",
      "whatsapp",
      // endereço
      "cep",
      "street",
      "number",
      "neighborhood",
      "county",
      "complement",
      // dados sociais
      "indication_id",
      "ocupation_id",
      "nationality",
      "instagram",
      "facebook",
      race_id,
      "marital_status_id",
      "schooling_id"
    ]);

    const patientExists = await Patient.findBy("cpf", data.cpf);

    if (!patientExists) {
      const pacient = await Patient.create(data);

      return pacient;
    } else {
      return response
        .status(400)
        .send({ err: { message: "Esse paciente já está cadastrado." } });
    }
  }

  async show({ response, params }) {
    try {
      const patient = await Patient.findOrFail(params.id);
      return patient;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse paciente não existe." } });
    }
  }

  async update({ params, response, request }) {
    try {
      const patient = await Patient.findOrFail(params.id);

      const data = request.only([
        "name",
        "email",
        "date_birth",
        "age",
        "father_name",
        "mother_name",
        "genre",
        // documentos
        "rg",
        "cpf",
        "responsible_rg",
        "observations",
        // contatos
        "first_phone",
        "second_phone",
        "whatsapp",
        // endereço
        "cep",
        "street",
        "number",
        "neighborhood",
        "county",
        "complement",
        // dados sociais
        "nacionalidade",
        "instragram",
        "facebook",
        "marital_status_id",
        "schooling_id"
      ]);

      if (data.cpf) {
        const patientExists = await Patient.findBy("cpf", data.cpf);

        if (!patientExists) {
          patient.merge(data);
          await patient.save();

          return patient;
        } else {
          return response
            .status(400)
            .send({ err: { message: "Esse CPF já está cadastrado." } });
        }
      } else {
        return response
          .status(400)
          .send({ err: { message: "CPF é obrigatório." } });
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse paciente não existe." } });
    }
  }

  async destroy({ params, response }) {
    try {
      const patient = await Patient.findOrFail(params.id);
      await patient.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse paciente não existe." } });
    }
  }
}

module.exports = PatientController;
