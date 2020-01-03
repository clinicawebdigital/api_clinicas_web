"use strict";

const Ocupation = use("App/Models/Ocupation");

class OcupationSeeder {
  async run() {
    const data = [
      {
        id: 1,
        name: "Médico acupunturista	"
      },
      {
        id: 2,
        name: "Médico alergista e imunologista	"
      },
      {
        id: 3,
        name: "Médico anatomopatologista	"
      },
      {
        id: 4,
        name: "Médico anestesiologista	"
      },
      {
        id: 5,
        name: "Médico angiologista	"
      },
      {
        id: 6,
        name: "Médico cardiologista	"
      },
      {
        id: 7,
        name: "Médico cirurgião cardiovascular	"
      },
      {
        id: 8,
        name: "Médico cirurgião de cabeça e pescoço	"
      },
      {
        id: 9,
        name: "Médico cirurgião do aparelho digestivo	"
      },
      {
        id: 10,
        name: "Médico cirurgião geral	"
      },
      {
        id: 11,
        name: "Médico cirurgião pediátrico	"
      },
      {
        id: 12,
        name: "Médico cirurgião plástico	"
      },
      {
        id: 13,
        name: "Médico cirurgião torácico	"
      },
      {
        id: 14,
        name: "Médico citopalogista	"
      },
      {
        id: 15,
        name: "Médico clínico"
      },

      {
        id: 16,
        name: "Médico dermatologista"
      },
      {
        id: 17,
        name: "Médico em endoscopia"
      },
      {
        id: 18,
        name: "Médico fisiatra"
      },
      {
        id: 19,
        name: "Médico foniatra"
      },
      {
        id: 20,
        name: "geriatra"
      },
      {
        id: 21,
        name: "Médico generalista"
      },
      {
        id: 22,
        name: "Médico nutrologista"
      }
    ];
    await Ocupation.createMany(data);
  }
}

module.exports = OcupationSeeder;
