"use strict";

const Race = use("App/Models/Race");

class RaceSeeder {
  async run() {
    const data = [
      {
        id: 1,
        name: "Pardo"
      },
      {
        id: 2,
        name: "Branco"
      },
      {
        id: 3,
        name: "Indígena"
      },
      {
        id: 4,
        name: "Preto"
      },
      {
        id: 5,
        name: "Amarelo"
      }
    ];
    await Race.createMany(data);
  }
}

module.exports = RaceSeeder;
