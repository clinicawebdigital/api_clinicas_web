"use strict";

const Procedure = use("App/Models/Procedure");

class ProcedureController {
  async index({ request }) {
    const { id } = request.get();

    const procedures = await Procedure.query()
      .where("partnership_id", id)
      .orderBy("id", "desc")
      .fetch();

    return procedures;
  }

  async store({ request, response }) {
    const data = request.only([
      "partnership_id",
      "code",
      "name",
      "description",
      "observation",
      "value",
      "value_transferred"
    ]);

    const procedureExists = await Procedure.query()
      .where("name", data.name)
      .andWhere("partnership_id", data.partnership_id)
      .first();

    if (!procedureExists) {
      const procedure = await Procedure.create(data);

      return procedure;
    } else {
      return response.status(400).send({
        err: {
          message: "Essa procedimento já está cadastrada para esse convênio."
        }
      });
    }
  }

  async show({ response, params }) {
    try {
      const procedure = await Procedure.findOrFail(params.id);
      return procedure;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse procedimento não existe." } });
    }
  }

  async status({ response, params }) {
    try {
      const procedure = await Procedure.findOrFail(params.id);
      procedure.status = !procedure.status;
      await procedure.save();
      return procedure;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse procedimento não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const procedure = await Procedure.findOrFail(params.id);
      const data = request.only([
        "code",
        "name",
        "description",
        "observation",
        "value",
        "value_transferred"
      ]);

      procedure.merge(data);
      await procedure.save();
      return procedure;
    } catch (err) {
      return response.status(err.status).send({
        err: {
          message: "Esse procedimento nao está presente no banco de dados."
        }
      });
    }
  }
}

module.exports = ProcedureController;
