"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProcedureSchema extends Schema {
  up() {
    this.create("procedures", table => {
      table.increments();
      table
        .integer("partnership_id")
        .unsigned()
        .references("id")
        .inTable("partnerships")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.string("code");
      table.string("name").notNullable();
      table.string("description");
      table.float("value");
      table.float("value_transferred");
      table.text("observation");
      table.boolean("status").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("procedures");
  }
}

module.exports = ProcedureSchema;
