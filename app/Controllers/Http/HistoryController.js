"use strict";

const Schedule = use("App/Models/Schedule");
const { format } = require("date-fns");
const { ptBR } = require("date-fns/locale");

const options = { locale: ptBR };

class HistoryController {
  async index({ params, response }) {
    try {
      const schedule = await Schedule.query()
        .with("professional", builder => builder.select("id", "name"))
        .with("room", builder => builder.select("id", "name"))
        .with("patient", builder =>
          builder.select("id", "name", "cpf", "first_phone", "second_phone")
        )
        .with("procedure", builder => builder.select("id", "name"))
        .with("patient", builder =>
          builder.select("id", "name", "cpf", "first_phone")
        )
        .where("patient_id", params.id)
        .select(
          "id",
          "professional_id",
          "patient_id",
          "room_id",
          "procedure_id",
          "date",
          "value",
          "start",
          "status",
          "observations",
          "value"
        )
        .orderBy("date", "desc")
        .fetch();

      const parseData = schedule.toJSON().map(item => {
        return {
          ...item,

          patient: `${item.patient.name} | ${
            item.patient.cpf ? item.patient.cpf : "--"
          } | ${item.patient.first_phone}`,
          date: item.date
            ? format(item.date, "dd 'de' MMMM 'de' yyyy", options)
            : "--"
        };
      });
      return parseData;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Paciente não existente." } });
    }
  }
}

module.exports = HistoryController;
