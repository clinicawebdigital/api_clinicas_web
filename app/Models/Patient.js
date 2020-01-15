"use strict";

const Model = use("Model");
const { addMinutes, format, getISODay, parseISO } = require("date-fns");

class Patient extends Model {
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
