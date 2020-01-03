"use strict";

const Professional = use("App/Models/Professional");

const Database = use("Database");

class ProfessionalController {
  async index() {
    const professionals = await Database.select(
      "professionals.id",
      "professionals.name",
      "professionals.cpf",
      "professionals.first_phone",
      "roles.name as role"
    )
      .from("professionals")
      .innerJoin("roles", "professionals.role_id", "roles.id");

    return professionals;
  }

  async store({ request }) {
    const data = request.only([
      "role_id",
      // dados do profissional
      "name",
      "email",
      "date_birth",
      "sexo",
      "council",
      "registration_number",
      "ocupation_id",
      "cpf",
      // permissões
      "can_selected",
      "can_schedule",
      // dados de residência
      "cep",
      "street",
      "number",
      "neighborhood",
      "county",
      "complement",
      // dados de contato
      "first_phone",
      "second_phone",
      // dados de login

      // curriculum
      "curriculum"
    ]);

    const professional = await Professional.create(data);
    return professional;
  }

  async show({ params, response }) {
    try {
      const professional = await Professional.query()
        .where("id", params.id)
        .with("ocupation", builder => builder.select("id", "name as label"))
        .with("role", builder => builder.select("id", "name as label"))
        .setHidden(["created_at", "updated_at"])
        .first();

      return professional;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse profissional não existe." } });
    }
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ProfessionalController;
