"use strict";

const Partnership = use("App/Models/Partnership");

class PartnershipController {
  async index({ request }) {
    const { term = "" } = request.get();
    const partnerships = Partnership.query()
      .select("id", "name", "status")
      .where("name", "LIKE", "%" + term + "%")
      .orderBy("id", "desc")
      .fetch();
    return partnerships;
  }

  async store({ request }) {
    const data = request.only([
      "name",
      "company_name",
      "cnpj",
      "cep",
      "street",
      "number",
      "neighborhood",
      "complement",
      "county",
      "telephone",
      "cellphone"
    ]);
    const partnership = await Partnership.create(data);

    return partnership;
  }

  async options() {
    const partnerships = Partnership.query()
      .select("id as value", "name as label")
      .where("status", "=", true)
      .orderBy("id", "desc")
      .fetch();
    return partnerships;
  }

  async show({ response, params }) {
    try {
      const partnership = await Partnership.findOrFail(params.id);

      return partnership;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse convênio não existe." } });
    }
  }

  async update({ request, response, params }) {
    try {
      const partnership = await Partnership.findOrFail(params.id);
      const data = request.only([
        "name",
        "company_name",
        "cnpj",
        "cep",
        "street",
        "number",
        "complement",
        "neighborhood",
        "county",
        "telephone",
        "cellphone"
      ]);

      partnership.merge(data);
      await partnership.save();
      return partnership;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse convênio não existe." } });
    }
  }

  async status({ response, params }) {
    try {
      const partnership = await Partnership.findOrFail(params.id);
      partnership.status = !partnership.status;
      await partnership.save();
      return partnership;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse convênio não existe." } });
    }
  }
}

module.exports = PartnershipController;
