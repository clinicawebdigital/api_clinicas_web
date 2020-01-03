"use strict";

const Ocupation = use("App/Models/Ocupation");

class OcupationController {
  async index() {
    const ocupations = await Ocupation.all();
    const parseOptions = ocupations.toJSON().map(ocupation => {
      return {
        value: ocupation.id,
        label: ocupation.name
      };
    });

    return parseOptions;
  }

  async store({ request, response }) {
    const data = request.only(["name"]);
    const ocupationExists = await Ocupation.findBy("name", data.name);

    if (!ocupationExists) {
      const ocupation = await Ocupation.create(data);

      return { value: ocupation.id, label: ocupation.name };
    } else {
      return response
        .status(400)
        .send({ err: { message: "Essa ocupação já está cadastrada." } });
    }
  }

  async show({ params, response }) {
    try {
      const ocupation = await Ocupation.findOrFail(params.id);
      return ocupation;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse ocupação não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const ocupation = await ocupation.findOrFail(params.id);

      const data = request.only("name");

      const ocupationExists = await Ocupation.findBy("name", data.name);

      if (!ocupationExists) {
        ocupation.merge(data);

        await ocupation.save();
        return ocupation;
      } else {
        return response
          .status(400)
          .send({ err: { message: "Essa ocupação já existe." } });
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa ocupação não existe." } });
    }
  }

  async destroy({ params, response }) {
    try {
      const ocupation = await ocupation.findOrFail(params.id);
      ocupation.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa ocupação não existe." } });
    }
  }
}

module.exports = OcupationController;
