"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormPaymentSchema extends Schema {
  up() {
    this.create("form_payments", table => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("form_payments");
  }
}

module.exports = FormPaymentSchema;
