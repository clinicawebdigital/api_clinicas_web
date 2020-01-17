"use strict";

const Patient = use("App/Models/Patient");

const { format } = require("date-fns");

class PatientController {
  async index({ request }) {
    const { page } = request.get();
    const patients = await Patient.query()
      .select("id", "name", "cpf", "date_birth", "first_phone", "second_phone")
      .fetch(page);
    return patients;
  }

  async options() {
    const options = await Patient.query()
      .select("id as value ", "name as label", "first_phone")
      .fetch();

    const parseOptions = options.toJSON().map(option => {
      return {
        value: option.value,
        label: `${option.label} | ${option.first_phone}`
      };
    });

    return parseOptions;
  }

  async store({ request, response }) {
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
      "race_id",
      "marital_status_id",
      "schooling_id"
    ]);

    const patientExists = await Indication.query()
      .where("first_phone", data.first_phone)
      .orWhere("second_phone", data.second_phone)
      .first();

    if (!patientExists) {
      const { id, name, date_birth, first_phone } = await Patient.create(data);

      return {
        value: id,
        label: `${name} - ${format(
          new Date(date_birth),
          "dd/MM/yyyy"
        )} | ${first_phone}`
      };
    } else {
      return response.status(400).send({
        err: {
          message:
            "Esse telefone já está associado com um paciente já cadastrado."
        }
      });
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
        "race_id",
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
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse paciente não existe." } });
    }
  }
}

module.exports = PatientController;
