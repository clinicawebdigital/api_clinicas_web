"use strict";

const Schooling = use("App/Models/Schooling");

class SchoolingSeeder {
  async run() {
    const data = [
      {
        name: "Analfabeto"
      },
      {
        name: "Ensino fundamental incompleto"
      },
      {
        name: "Ensino fundamental completo"
      },
      {
        name: "Ensino médio incompleto"
      },
      {
        name: "Ensino médio completo"
      },
      {
        name: "Superior completo"
      },
      {
        name: "Pós-graduação"
      },
      {
        name: "Mestrado"
      },
      {
        name: "Doutorado"
      },
      {
        name: "Pós-Doutorado"
      }
    ];
    await Schooling.createMany(data);
  }
}

module.exports = SchoolingSeeder;
