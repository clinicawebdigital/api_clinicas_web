"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnInUsersSchema extends Schema {
  up() {
    this.alter("users", table => {
      table
        .integer("professional_id")
        .unsigned()
        .references("id")
        .inTable("professionals")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table;
    });
  }

  down() {
    this.table("users", table => {
      // reverse alternations
    });
  }
}

module.exports = AddColumnInUsersSchema;
