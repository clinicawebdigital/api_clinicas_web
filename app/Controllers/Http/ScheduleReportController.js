"use strict";

const Schedule = use("App/Models/Schedule");
const { format } = require("date-fns");

class ScheduleReportController {
  async index({ request }) {
    const data = request.only([
      "startDate",
      "endDate",
      "professional_id",
      "status",
      "form_payment_id"
    ]);

    let querySchedule = Schedule.query()
      .with("professional")
      .with("formPayment")
      .whereBetween("date", [data.startDate, data.endDate])
      .orderBy("date", "asc");

    if (data.professional_id) {
      querySchedule.andWhere("professional_id", data.professional_id);
    }

    if (data.status) {
      querySchedule.andWhere("status", data.status);
    }

    if (data.form_payment_id) {
      querySchedule.andWhere("form_payment_id", data.form_payment_id);
    }

    const schedule = await querySchedule.fetch();

    console.log(schedule.toJSON());
    const parseSchedule = schedule.toJSON().map(item => {
      return {
        date: format(item.date, "dd/MM/yyyy"),
        professional_name: item.professional.name,
        status: item.status,
        value_transferred: item.value_transferred,
        value_payment: item.value_payment,
        form_payment: item.formPayment ? item.formPayment.name : "--",
        observations_payment: item.observations_payment
      };
    });

    return parseSchedule;
  }
}
module.exports = ScheduleReportController;
