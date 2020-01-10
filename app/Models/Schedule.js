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
}

module.exports = Schedule;
