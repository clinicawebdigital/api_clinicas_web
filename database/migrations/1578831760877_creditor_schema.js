"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreditorDebtorSchema extends Schema {
  up() {
    this.create("creditors_debtors", table => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("creditors_debtors");
  }
}

module.exports = CreditorDebtorSchema;
