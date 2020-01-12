"use strict";

const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    const data = [
      {
        slug: "administrator",
        name: "Administrador Total"
      },
      {
        slug: "receptionist",
        name: "Recepcionista"
      },
      {
        slug: "cashier_reception",
        name: "Caixa Recepção"
      },
      {
        slug: "nutritionist",
        name: "Nutricionista"
      },
      {
        slug: "physical_educator",
        name: "Educador Físico"
      }
    ];
    await Role.createMany(data);
  }
}

module.exports = RoleSeeder;
