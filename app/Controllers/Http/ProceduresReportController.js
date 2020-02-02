"use strict";

const Database = use("Database");

class ProceduresReportController {
  async index({ request }) {
    const data = request.only(["professional_id", "procedure_id", "status"]);

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
      .where("schedules.professional_id", data.professional_id);

    if (data.procedure_id)
      reportQuery.andWhere("schedules.procedure_id", data.procedure_id);

    if (data.status) reportQuery.andWhere("schedules.status", data.status);

    const report = await reportQuery
      .groupBy("professionals.name", "procedures.name")
      .orderBy("professionals.name");

    return report;
  }
}
module.exports = ProceduresReportController;
