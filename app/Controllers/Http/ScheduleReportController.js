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
      "form_payment_id",
      "user_id"
    ]);

    let querySchedule = Schedule.query()
      .with("professional")
      .with("patient")
      .with("procedure")
      .with("user", builder =>
        builder.with("professional").setHidden(["password"])
      )
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

    if (data.user_id) {
      querySchedule.andWhere("user_id", data.user_id);
    }

    const schedule = await querySchedule.fetch();

    const parseSchedule = schedule.toJSON().map(item => {
      return {
        date: format(item.date, "dd/MM/yyyy"),
        professional_name: item.professional.name,
        status: item.status,
        value_transferred: item.value_transferred,
        patient_name: item.patient.name,
        procedure_name: item.procedure.name,
        value_payment: item.value_payment,
        form_payment: item.formPayment ? item.formPayment.name : "--",
        observations_payment: item.observations_payment,
        user_name: item.user.professional.name
      };
    });

    return parseSchedule;
  }
}
module.exports = ScheduleReportController;
