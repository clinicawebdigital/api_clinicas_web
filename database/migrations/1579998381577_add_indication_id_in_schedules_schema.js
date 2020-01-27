"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddIndicationIdInSchedulesSchema extends Schema {
  up() {
    this.alter("schedules", table => {
      table
        .integer("indication_id")
        .unsigned()
        .references("id")
        .inTable("indications")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    });
  }

  down() {
    this.table("schedules", table => {
      // reverse alternations
    });
  }
}

module.exports = AddIndicationIdInSchedulesSchema;
