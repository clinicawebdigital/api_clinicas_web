"use strict";

const Race = use("App/Models/Race");

class RaceSeeder {
  async run() {
    const data = [
      {
        name: "Pardo"
      },
      {
        name: "Branco"
      },
      {
        name: "Indígena"
      },
      {
        name: "Preto"
      },
      {
        name: "Amarelo"
      }
    ];
    await Race.createMany(data);
  }
}

module.exports = RaceSeeder;
