"use strict";

const Ocupation = use("App/Models/Ocupation");

class OcupationSeeder {
  async run() {
    const data = [
      {
        name: "Médico acupunturist"
      },
      {
        name: "Médico alergista e imunologista"
      },
      {
        name: "Médico anatomopatologista"
      },
      {
        name: "Médico anestesiologista"
      },
      {
        name: "Médico angiologista"
      },
      {
        name: "Médico cardiologista"
      },
      {
        name: "Médico cirurgião cardiovascula"
      },
      {
        name: "Médico cirurgião de cabeça e pescoço"
      },
      {
        name: "Médico cirurgião do aparelho digestivo"
      },
      {
        name: "Médico cirurgião geral"
      },
      {
        name: "Médico cirurgião pediátrico"
      },
      {
        name: "Médico cirurgião plástico"
      },
      {
        name: "Médico cirurgião torácico"
      },
      {
        name: "Médico citopalogista"
      },
      {
        name: "Médico clínico"
      },

      {
        name: "Médico dermatologista"
      },
      {
        name: "Médico em endoscopia"
      },
      {
        name: "Médico fisiatra"
      },
      {
        name: "Médico foniatra"
      },
      {
        name: "geriatra"
      },
      {
        name: "Médico generalista"
      },
      {
        name: "Médico nutrologista"
      }
    ];
    await Ocupation.createMany(data);
  }
}

module.exports = OcupationSeeder;
