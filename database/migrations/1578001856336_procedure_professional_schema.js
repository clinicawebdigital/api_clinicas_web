"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProcedureProfessionalSchema extends Schema {
  up() {
    this.create("procedure_professionals", table => {
      table.increments();
      table
        .integer("professional_id")
        .unsigned()
        .references("id")
        .inTable("professionals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("procedure_id")
        .unsigned()
        .references("id")
        .inTable("procedures")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("procedure_professionals");
  }
}

module.exports = ProcedureProfessionalSchema;
