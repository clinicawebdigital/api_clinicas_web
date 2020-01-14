"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */ const Schema = use(
  "Schema"
);

class FinancialSchema extends Schema {
  up() {
    this.create("financials", table => {
      table.increments();
      table.float("value").notNullable();
      table.date("date").notNullable();
      table
        .integer("creditor_debtor_id")
        .unsigned()
        .references("id")
        .inTable("creditors_debtors")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("types")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("movement_category_id")
        .unsigned()
        .references("id")
        .inTable("movement_categories")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("account_id")
        .unsigned()
        .references("id")
        .inTable("accounts")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.text("observations");
      // 1 is input - 2 is output
      table.string("transaction_type");
      table.timestamps();
    });
  }

  down() {
    this.drop("financials");
  }
}

module.exports = FinancialSchema;
