"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Procedure extends Model {
  partnership() {
    return this.belongsTo("App/Models/Partnership");
  }
}

module.exports = Procedure;
