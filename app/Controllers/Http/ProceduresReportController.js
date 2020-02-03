"use strict";

const Database = use("Database");

class ProceduresReportController {
  async index({ request }) {
    const data = request.only([
      "startDate",
      "endDate",
      "professional_id",
      "procedure_id",
      "status"
    ]);

    const reportQuery = Database.select(
      "professionals.name as profissional",
      "procedures.name as procedimento",
      Database.raw("SUM (COALESCE(value_payment, 0)) AS total")
    )
      .count("* as qtd")
      .table("schedules")
      .innerJoin("professionals", function() {
        this.on("professionals.id", "schedules.professional_id");
      })
      .innerJoin("procedures", function() {
        this.on("procedures.id", "schedules.procedure_id");
      })
      .where("schedules.professional_id", data.professional_id)
      .whereBetween("schedules.date", [data.startDate, data.endDate]);

    if (data.procedure_id)
      reportQuery.andWhere("schedules.procedure_id", data.procedure_id);

    if (data.status) reportQuery.andWhere("schedules.status", data.status);

    const report = await reportQuery
      .groupBy("professionals.name", "procedures.name")
      .orderBy("professionals.name");

    const parseData = report.map(item => {
      item.id = Math.random();
      return item;
    });
    return parseData;
  }
}
module.exports = ProceduresReportController;
