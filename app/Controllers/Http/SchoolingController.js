"use strict";

const Schooling = use("App/Models/Schooling");

class SchoolingController {
  async index() {
    const schooling = await Schooling.query()
      .select("id as value", "name as label")
      .fetch();
    return schooling;
  }
}

module.exports = SchoolingController;
