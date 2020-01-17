"use strict";

const Schema = use("Schema");

class PatientSchema extends Schema {
  up() {
    this.create("patients", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("email");
      table.date("date_birth");
      table.string("age");
      table.string("father_name");
      table.string("mother_name");
      table.string("gender");
      // documentos
      table.string("cpf").unique();
      table.string("rg");
      table.boolean("responsible_document").defaultTo(false);
      table.text("observations");
      // contatos
      table.string("first_phone").notNullable();

      table.string("second_phone");
      table.string("whatsapp");
      //dados de endereco
      table.string("cep");
      table.string("street");
      table.string("number");
      table.string("neighborhood");
      table.string("county");
      table.string("complement");
      // Dados sociais
      table
        .integer("indication_id")
        .unsigned()
        .references("id")
        .inTable("indications")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("ocupation_id")
        .unsigned()
        .references("id")
        .inTable("ocupations")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("nationality");
      table.string("instagram");
      table.string("facebook");
      table
        .integer("race_id")
        .unsigned()
        .references("id")
        .inTable("races")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("marital_status_id")
        .unsigned()
        .references("id")
        .inTable("marital_status")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("schooling_id")
        .unsigned()
        .references("id")
        .inTable("schooling")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("patients");
  }
}

module.exports = PatientSchema;
