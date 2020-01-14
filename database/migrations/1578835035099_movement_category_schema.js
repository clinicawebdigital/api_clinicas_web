"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MovementCategorySchema extends Schema {
  up() {
    this.create("movement_categories", table => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("movement_categories");
  }
}

module.exports = MovementCategorySchema;
