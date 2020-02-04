"use strict";

const Database = use("Database");

class BirthdaysReportController {
  async index({ request }) {
    const month = request.input("month");

    const patients = await Database.raw(
      "select BTRIM(email) as email, id from patients where email is not null and EXTRACT(MONTH FROM date_birth) = ?",
      [month]
    );

    return patients.rows;
  }
}

module.exports = BirthdaysReportController;
