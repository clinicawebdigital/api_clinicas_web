"use strict";

const Type = use("App/Models/Type");

class TypeController {
  async index({ request, response, view }) {}

  async options() {
    const types = await Type.query()
      .select("id as value", "name as label")
      .fetch();

    return types;
  }

  async create({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = TypeController;
