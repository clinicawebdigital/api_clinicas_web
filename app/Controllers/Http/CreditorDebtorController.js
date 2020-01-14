"use strict";

const CreditorDebtor = use("App/Models/CreditorDebtor");

class CreditorDebtorController {
  async index({ request, response, view }) {}

  async options() {
    const creditors = await CreditorDebtor.query()
      .select("id as value", "name as label")
      .fetch();

    return creditors;
  }

  async store({ request, response }) {
    const data = request.only(["name"]);

    const creditorExists = await CreditorDebtor.findBy("name", data.name);

    if (!creditorExists) {
      const creditor = await CreditorDebtor.create(data);
      return { value: creditor.id, label: creditor.name };
    } else {
      return response
        .status(400)
        .send({ err: { message: "Esse credor já está cadastrada." } });
    }
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = CreditorDebtorController;
