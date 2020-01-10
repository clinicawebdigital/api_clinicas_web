"use strict";
const MaritalStatus = use("App/Models/MaritalStatus");

class MaritalStatusSeeder {
  async run() {
    const data = [
      {
        id: 1,
        name: "Solteiro"
      },
      {
        id: 2,
        name: "Casado"
      },
      {
        id: 3,
        name: "Separado"
      },
      {
        id: 4,
        name: "Divorciado"
      },
      {
        id: 5,
        name: "Viúvo"
      }
    ];
    await MaritalStatus.createMany(data);
  }
}

module.exports = MaritalStatusSeeder;
