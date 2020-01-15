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

  async options({ request }) {
    const { professional_id, partnership_id } = request.get();

    const options = await Database.select("*")
      .table("procedure_professionals")
      .innerJoin("procedures", function() {
        this.on("procedures.id", "procedure_professionals.procedure_id");
      })
      .where("professional_id", professional_id)
      .andWhere("partnership_id", partnership_id);

    const parseOptions = options.map(option => {
      return {
        value: option.procedure_id,
        label: option.name
      };
    });

    return parseOptions;
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
