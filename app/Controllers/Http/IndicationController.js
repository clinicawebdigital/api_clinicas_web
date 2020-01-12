"use strict";

const Indication = use("App/Models/Indication");

class IndicationController {
  async index({ request }) {
    const { term = "" } = request.get();

    const indications = await Indication.query()
      .select("id as value", "name as label")
      .whereRaw(`name LIKE '%${term}%'`)
      .fetch();

    return indications;
  }

  async store({ request, response }) {
    const data = request.only(["name"]);

    const indicationExists = await Indication.findBy("name", data.name);

    if (!indicationExists) {
      const indication = await Indication.create(data);
      return indication;
    } else {
      return response
        .status(400)
        .send({ err: { message: "Essa indicação já está cadastrada." } });
    }
  }

  async show({ params, response }) {
    try {
      const indication = await Indication.findOrFail(params.id);
      return indication;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa indicação não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const indication = await Indication.findOrFail(params.id);

      const data = request.only(["name"]);
      const indicationExists = await Indication.findBy("name", data.name);

      if (!indicationExists) {
        indication.merge(data);

        await indication.save();
        return indication;
      } else {
        return response
          .status(400)
          .send({ err: { message: "Essa indicação já existe" } });
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa indicação não existe" } });
    }
  }

  async destroy({ params, response }) {
    try {
      const indication = await Indication.findOrFail(params.id);
      await indication.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa indicação não existe" } });
    }
  }
}

module.exports = IndicationController;
