"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnsPaymentInScheduleSchema extends Schema {
  up() {
    this.table("schedules", table => {
      table
        .integer("form_payment_id")
        .unsigned()
        .references("id")
        .inTable("form_payments")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.float("value_payment");
      table.string("observations_payment");
    });
    // alter table
  }

  down() {
    this.table("schedules", table => {
      // reverse alternations
    });
  }
}

module.exports = AddColumnsPaymentInScheduleSchema;
