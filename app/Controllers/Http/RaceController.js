"use strict";

const Race = use("App/Models/Race");

class RaceController {
  async index() {
    const races = await Race.all();
    const parseOptions = races.toJSON().map(race => {
      return {
        value: race.id,
        label: race.name
      };
    });

    return parseOptions;
  }
}

module.exports = RaceController;
