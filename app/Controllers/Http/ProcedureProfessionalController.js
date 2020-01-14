"use strict";

const ProcedureProfessional = use("App/Models/ProcedureProfessional");
const Database = use("Database");

class ProcedureProfessionalController {
  async index({ request }) {
    const { id } = request.get();
    const proceduresProfessionals = await ProcedureProfessional.query()
      .where("procedure_id", id)
      .with("professional", builder => {
        builder.with("ocupation");
      })
      .fetch();

    const parseData = proceduresProfessionals.toJSON().map(item => {
      return {
        id: item.id,
        name: ` ${item.professional.name} - ( ${item.professional.ocupation &&
          item.professional.ocupation.name} )`
      };
    });

    return parseData;
  }

  async getProceduresProfissionals({ request }) {
    const { id: partnership_id, id_prof: professional_id } = request.get();

    // procedimentos do professional
    const subquery = Database.from("procedures").where(
      "partnership_id",
      partnership_id
    );

    const result = await Database.from("procedure_professionals").whereIn(
      "procedure_id",
      subquery
    );

    return result;
  }

  async store({ request, response }) {
    const data = request.only(["professional_id", "procedure_id"]);

    const procedureProfessionalExists = await ProcedureProfessional.query()
      .where("professional_id", data.professional_id)
      .andWhere("procedure_id", data.procedure_id)
      .first();

    if (!procedureProfessionalExists) {
      const procedureProfessional = await ProcedureProfessional.create(data);

      return procedureProfessional;
    } else {
      return response.status(400).send({
        err: {
          message: "Esse profissional já está vinculado para esse procedimento."
        }
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const procedureProfessional = await ProcedureProfessional.findOrFail(
        params.id
      );
      procedureProfessional.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse registro não existe." } });
    }
  }
}

module.exports = ProcedureProfessionalController;
