"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OcupationSchema extends Schema {
  up() {
    this.create("ocupations", table => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("ocupations");
  }
}

module.exports = OcupationSchema;
