"use strict";

const Model = use("Model");

class CreditorDebtor extends Model {
  static get table() {
    return "creditors_debtors";
  }
}

module.exports = CreditorDebtor;
