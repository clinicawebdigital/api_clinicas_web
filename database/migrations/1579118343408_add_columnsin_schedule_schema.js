"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnsinScheduleSchema extends Schema {
  up() {
    this.alter("schedules", table => {
      table
        .integer("patient_id")
        .unsigned()
        .references("id")
        .inTable("patients")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.float("value_transferred");
      table.string("status");
    });
  }

  down() {
    this.table("schedules", table => {
      // reverse alternations
    });
  }
}

module.exports = AddColumnsinScheduleSchema;
