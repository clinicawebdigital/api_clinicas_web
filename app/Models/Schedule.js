"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Schedule extends Model {
  professional() {
    return this.belongsTo("App/Models/Professional");
  }
  room() {
    return this.belongsTo("App/Models/Room");
  }
  procedure() {
    return this.belongsTo("App/Models/Procedure");
  }

  patient() {
    return this.belongsTo("App/Models/Patient");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  formPayment() {
    return this.belongsTo("App/Models/FormPayment");
  }
}

module.exports = Schedule;
