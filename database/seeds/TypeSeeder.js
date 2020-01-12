"use strict";

const Type = use("App/Models/Type");

class TypeSeeder {
  async run() {
    const data = [
      {
        name: "Variável"
      },
      {
        name: "Fixo"
      }
    ];
    await Type.createMany(data);
  }
}

module.exports = TypeSeeder;
