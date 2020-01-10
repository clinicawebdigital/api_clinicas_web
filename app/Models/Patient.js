"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Patient extends Model {
  static formatDates(field, value) {
    if (field === "date_birth") {
      return value.format("DD-MM-YYYY");
    }
    return super.formatDates(field, value);
  }

  indication() {
    return this.belongsTo("App/Models/Indication");
  }

  race() {
    return this.belongsTo("App/Models/Race");
  }

  maritalStatus() {
    return this.belongsTo("App/Models/MaritalStatus");
  }

  schooling() {
    return this.belongsTo("App/Models/Schooling");
  }
}

module.exports = Patient;
