"use strict";

const Race = use("App/Models/Race");

class RaceController {
  async index() {
    const races = await Race.query()
      .select("id as value", "name as label")
      .fetch();

    return races;
  }
}

module.exports = RaceController;
