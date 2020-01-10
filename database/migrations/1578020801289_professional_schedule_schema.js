"use strict";

const Schema = use("Schema");

class ProfessionalScheduleSchema extends Schema {
  up() {
    this.create("professional_schedules", table => {
      table.increments();
      table.string("day");
      table
        .integer("professional_id")
        .unsigned()
        .references("id")
        .inTable("professionals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("start");
      table.string("end");
      table.string("duration");
      table.string("quantity");
      table
        .integer("room_id")
        .unsigned()
        .references("id")
        .inTable("rooms")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("professional_schedules");
  }
}

module.exports = ProfessionalScheduleSchema;
