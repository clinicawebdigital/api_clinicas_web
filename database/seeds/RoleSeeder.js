"use strict";

const Role = use("App/Models/Role");
const Professional = use("App/Models/Professional");
const User = use("App/Models/User");

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

    const { id } = await Professional.create({
      name: "Senhor admin",
      role_id: 1
    });

    const user = await User.create({
      username: "admin",
      password: "secret",
      professional_id: id
    });
  }
}

module.exports = RoleSeeder;
