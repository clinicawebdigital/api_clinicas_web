"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProfessionalSchedule extends Model {
  professional() {
    return this.belongsTo("App/Models/Professional");
  }
  room() {
    return this.belongsTo("App/Models/Room");
  }
}

module.exports = ProfessionalSchedule;
