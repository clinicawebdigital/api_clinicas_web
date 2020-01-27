"use strict";

const Database = use("Database");

class MarketingReportController {
  async index({ request }) {
    const data = request.only([
      "startDate",
      "endDate",
      "professional_id",
      "status"
    ]);

    const reportQuery = Database.select(
      "professionals.name as profissional",
      "procedures.name as procedimento",
      "indications.name as indicacao"
    )
      .count("schedules.indication_id as quantidade")
      .table("schedules")
      .innerJoin("professionals", function() {
        this.on("professionals.id", "schedules.professional_id");
      })
      .innerJoin("procedures", function() {
        this.on("procedures.id", "schedules.procedure_id");
      })
      .innerJoin("indications", function() {
        this.on("schedules.indication_id", "indications.id");
      })
      .groupBy("indications.name", "professionals.name", "procedures.name");

    if (data.professional_id) {
      reportQuery.where("professional_id", data.professional_id);
    }

    if (data.status) {
      reportQuery.andWhere("status", data.status);
    }

    if (data.startDate && data.endDate) {
      reportQuery.whereBetween("date", [data.startDate, data.endDate]);
    }

    const report = await reportQuery.orderBy("professionals.name");

    /* 
    let result = [];

    for (let i = 0; i < report.length; i++) {
      var professionalExists = false;
      for (let j = 0; j < i; j++) {
        if (result[j] && report[i].profissional == result[j].profissional) {
          result[j].indicacoes.push({
            indicacao: report[i].indicacao,
            quantidade: report[i].quantidade
          });
          professionalExists = true;
          break;
        }
      }

      if (!professionalExists) {
        result.push({
          profissional: report[i].profissional,
          indicacoes: [
            {
              indicacao: report[i].indicacao,
              quantidade: report[i].quantidade
            }
          ]
        });
      }
    }
    
    return {
      data: report,
      pdf: result
    };*/

    return report;
  }
}
module.exports = MarketingReportController;
