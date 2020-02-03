"use strict";

const Database = use("Database");

const { format } = require("date-fns");

const { ptBR } = require("date-fns/locale");

const options = { locale: ptBR };

class PatientsReportController {
  async index({ request }) {
    const data = request.only([
      "startDate",
      "endDate",
      "professional_id",
      "procedure_id",
      "status"
    ]);

    const reportQuery = Database.select(
      "schedules.id",
      "schedules.created_at as criada",
      "schedules.date as agendada",
      "schedules.status",
      "procedures.name as procedimento",
      "patients.name as paciente",
      "patients.email",
      "patients.date_birth"
    )
      .table("schedules")
      .innerJoin("patients", function() {
        this.on("patients.id", "schedules.patient_id");
      })
      .innerJoin("procedures", function() {
        this.on("procedures.id", "schedules.procedure_id");
      })
      .where("schedules.professional_id", data.professional_id)
      .whereBetween("schedules.date", [data.startDate, data.endDate]);

    if (data.procedure_id)
      reportQuery.andWhere("schedules.procedure_id", data.procedure_id);

    if (data.status) reportQuery.andWhere("schedules.status", data.status);

    const report = await reportQuery.orderBy("patients.name");

    const parseData = report.map(item => {
      item.date_birth = item.date_birth
        ? format(item.date_birth, "dd/MM/yyyy", {
            options
          })
        : "--";
      item.agendada = item.agendada
        ? format(item.agendada, "dd/MM/yyyy", {
            options
          })
        : "--";
      item.criada = item.criada
        ? format(item.criada, "dd/MM/yyyy", {
            options
          })
        : "--";
      return item;
    });

    return parseData;
  }
}
module.exports = PatientsReportController;
