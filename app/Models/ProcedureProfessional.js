"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProcedureProfessional extends Model {
  professional() {
    return this.belongsTo("App/Models/Professional");
  }
}

module.exports = ProcedureProfessional;
