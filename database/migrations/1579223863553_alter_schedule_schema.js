"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterScheduleSchema extends Schema {
  up() {
    this.alter("schedules", table => {
      table.dropColumn("responsible_id");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    });
  }

  down() {
    this.drop("schedules");
  }
}

module.exports = AlterScheduleSchema;
