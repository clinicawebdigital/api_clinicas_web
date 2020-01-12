"use strict";

const MaritalStatus = use("App/Models/MaritalStatus");

class MaritalStatusController {
  async index() {
    const maritalStatus = await MaritalStatus.query()
      .select("id as value", "name as label")
      .fetch();
    return maritalStatus;
  }
}

module.exports = MaritalStatusController;
