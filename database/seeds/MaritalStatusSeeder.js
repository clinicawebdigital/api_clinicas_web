"use strict";
const MaritalStatus = use("App/Models/MaritalStatus");

class MaritalStatusSeeder {
  async run() {
    const data = [
      {
        name: "Solteiro"
      },
      {
        name: "Casado"
      },
      {
        name: "Separado"
      },
      {
        name: "Divorciado"
      },
      {
        name: "Viúvo"
      }
    ];
    await MaritalStatus.createMany(data);
  }
}

module.exports = MaritalStatusSeeder;
