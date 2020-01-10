"use strict";

const Company = use("App/Models/Company");

class CompanySeeder {
  async run() {
    const company = await Company.create({
      id: 1,
      name: "Minha empresa"
    });

    await company.openingHours().createMany([
      {
        id: 1,
        day: "1",
        description: "Segunda-feira",
        start: "",
        end: ""
      },
      {
        id: 2,
        day: "2",
        description: "Terça-feira",
        start: "",
        end: ""
      },
      {
        id: 3,
        day: "3",
        description: "Quarta-feira",
        start: "",
        end: ""
      },
      {
        id: 4,
        day: "4",
        description: "Quinta-feira",
        start: "",
        end: ""
      },
      {
        id: 5,
        day: "5",
        description: "Sexta-feira",
        start: "",
        end: ""
      },
      {
        id: 6,
        day: "6",
        description: "Sábado-feira",
        start: "",
        end: ""
      },
      {
        id: 7,
        day: "7",
        description: "Domingo",
        start: "",
        end: ""
      }
    ]);
  }
}

module.exports = CompanySeeder;
