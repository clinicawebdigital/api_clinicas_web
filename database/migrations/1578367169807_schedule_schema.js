"use strict";

const Schema = use("Schema");

class ScheduleSchema extends Schema {
  up() {
    this.create("schedules", table => {
      table.increments();
      table.date("date");
      table.string("start");
      table.float("value");
      table
        .integer("procedure_id")
        .unsigned()
        .references("id")
        .inTable("procedures")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("professional_id")
        .unsigned()
        .references("id")
        .inTable("professionals")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("responsible_id")
        .unsigned()
        .references("id")
        .inTable("professionals")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("room_id")
        .unsigned()
        .references("id")
        .inTable("rooms")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.text("observations");
      table.timestamps();
    });
  }

  down() {
    this.drop("schedules");
  }
}

module.exports = ScheduleSchema;
