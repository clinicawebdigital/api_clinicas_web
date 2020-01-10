"use strict";

const Model = use("Model");

class Professional extends Model {
  role() {
    return this.belongsTo("App/Models/Role");
  }

  ocupation() {
    return this.belongsTo("App/Models/Ocupation");
  }
}

module.exports = Professional;
