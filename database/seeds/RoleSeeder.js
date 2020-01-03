"use strict";

const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    const data = [
      {
        id: 1,
        slug: "administrator",
        name: "Administrador Total"
      },
      {
        id: 2,
        slug: "receptionist",
        name: "Recepcionista"
      },
      {
        id: 3,
        slug: "cashier_reception",
        name: "Caixa Recepção"
      },
      {
        id: 4,
        slug: "nutritionist",
        name: "Nutricionista"
      },
      {
        id: 5,
        slug: "physical_educator",
        name: "Educador Físico"
      }
    ];
    await Role.createMany(data);
  }
}

module.exports = RoleSeeder;
