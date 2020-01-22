"use strict";

const Schedule = use("App/Models/Schedule");
const { format } = require("date-fns");

class MarketingReportController {
  async index({ request }) {
    const data = request.only(["startDate", "endDate", , "indication_id"]);

    let querySchedule = Schedule.query()
      .with("patient", builder => {
        let subQuery = builder.with("indication");

        return subQuery;
      })
      .with("professional")
      .with("procedure", builder => builder.with("partnership"));

    /* if (data.date_birth_start && data.date_birth_end) {
      querySchedule.whereBetween("date", [
        data.date_birth_start,
        data.date_birth_end
      ]);
    } */

    const schedule = await querySchedule.orderBy("patient_id", "asc").fetch();

    let filterSchedule = schedule.toJSON();

    if (data.indication_id) {
      filterSchedule = filterSchedule.filter(
        item =>
          item.patient.indication &&
          item.patient.indication.id == data.indication_id
      );
    }

    let count = 0;
    const parseSchedule = filterSchedule.map(item => {
      count++;
      return {
        count,
        id: item.id,
        status: item.status,
        start: item.start,
        date: item.date ? format(item.date, "dd/MM/yyyy") : "--",
        professional_name: item.professional.name,
        neighborhood: item.patient.neighborhood,
        patient_name: item.patient.name,
        patient_date_birth: item.patient.date_birth
          ? format(item.patient.date_birth, "dd/MM/yyyy")
          : "--",

        patient_email: item.patient.email,
        patient_first_phone: item.patient.first_phone,
        patient_second_phone: item.patient.second_phone,

        patient_instagram: item.patient.instagram,
        patient_whatsapp: item.patient.whatsapp,

        indication_name: item.patient.indication
          ? item.patient.indication.name
          : "--",
        procedure_name: item.procedure
          ? item.procedure.name + " | " + item.procedure.partnership.name
          : "--"
      };
    });

    return parseSchedule;
  }
}
module.exports = MarketingReportController;
