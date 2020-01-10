"use strict";

const Scholarity = use("App/Models/Scholarity");

class ScholaritySeeder {
  async run() {
    const data = [
      {
        id: 1,
        name: "Analfabeto"
      },
      {
        id: 2,
        name: "Ensino fundamental incompleto"
      },
      {
        id: 3,
        name: "Ensino fundamental completo"
      },
      {
        id: 4,
        name: "Ensino médio incompleto"
      },
      {
        id: 5,
        name: "Ensino médio completo"
      },
      {
        id: 6,
        name: "Superior completo"
      },
      {
        id: 7,
        name: "Pós-graduação"
      },
      {
        id: 8,
        name: "Mestrado"
      },
      {
        id: 9,
        name: "Doutorado"
      },
      {
        id: 10,
        name: "Pós-Doutorado"
      }
    ];
    await Scholarity.createMany(data);
  }
}

module.exports = ScholaritySeeder;
