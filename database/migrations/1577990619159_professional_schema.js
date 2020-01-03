"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProfessionalSchema extends Schema {
  up() {
    this.create("professionals", table => {
      table.increments();
      // Tipo de usuário
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();

      // Dados pessoais
      table.string("name");
      table.string("email");
      table.date("date_birth");
      table.string("sexo");
      table.string("council");
      table.string("registration_number");
      table.string("cpf");
      table
        .integer("ocupation_id")
        .unsigned()
        .references("id")
        .inTable("ocupations")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");

      //permission
      table.bool("can_schedule");
      table.bool("can_selected");

      // endereço
      table.string("cep");
      table.string("street");
      table.string("number");
      table.string("neighborhood");
      table.string("county");
      table.string("complement");

      // contacts
      table.string("first_phone");
      table.string("second_phone");

      // curriculum
      table.text("curriculum");

      table.timestamps();
    });
  }

  down() {
    this.drop("professionals");
  }
}

module.exports = ProfessionalSchema;
