"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

const { format } = require("date-fns");

class Financial extends Model {
  account() {
    return this.belongsTo("App/Models/Account");
  }

  type() {
    return this.belongsTo("App/Models/Type");
  }
  movement_category() {
    return this.belongsTo("App/Models/MovementCategory");
  }
  creditor_debtor() {
    return this.belongsTo("App/Models/CreditorDebtor");
  }
}

module.exports = Financial;
