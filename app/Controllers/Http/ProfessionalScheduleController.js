"use strict";

const ProfessionalSchedule = use("App/Models/ProfessionalSchedule");
const OpeningHour = use("App/Models/OpeningHour");

class ProfessionalScheduleController {
  async index({ request }) {
    const { id } = request.get();

    const schedule = await ProfessionalSchedule.query()
      .where("professional_id", id)
      .with("room")
      .orderBy("id", "asc")
      .fetch();

    return schedule;
  }

  async store({ request, response }) {
    const data = request.only([
      "professional_id",
      "start",
      "end",
      "duration",
      "quantity",
      "room_id",
      "day"
    ]);

    const verifyScheduleExists = await OpeningHour.query()
      .where("day", data.day)
      .first();

    const startCompany = verifyScheduleExists.toJSON().start.split(":");

    const startInput = data.start.split(":");

    const currentDate = new Date();

    // verificar se a empresa tem horário nesse dia

    if (!verifyScheduleExists.start || !verifyScheduleExists.end) {
      return response.status(401).send({
        err: {
          message: "A empresa não tem horários disponiveis para esse dia"
        }
      });
    }

    /* Valida se o horário inical informando pelo usuário é menor que o horário inicial da empresa nesse dia */
    if (
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        startCompany[0],
        startCompany[1]
      ) >
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        startInput[0],
        startInput[1]
      )
    ) {
      return response.status(401).send({
        err: {
          message:
            "O horário inicial da empresa nesse dia é : " +
            verifyScheduleExists.toJSON().start
        }
      });
    }

    /* Valida se o horário final informando pelo usuário é maior que o horário final da empresa nesse dia */

    const endCompany = await verifyScheduleExists.toJSON().end.split(":");
    const endInput = data.end.split(":");

    if (
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        endInput[0],
        endInput[1]
      ) >
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        endCompany[0],
        endCompany[1]
      )
    ) {
      return response.status(401).send({
        err: {
          message:
            "O horário final da empresa nesse dia é : " +
            verifyScheduleExists.toJSON().end
        }
      });
    }

    // Valida se o horário já existe pra ele mesmo

    const verifyScheduleInDay = await ProfessionalSchedule.query()
      .where("day", data.day)
      .andWhere("room_id", data.room_id)
      .andWhere("start", data.start)
      .first();

    if (verifyScheduleInDay) {
      return response.status(401).send({
        err: {
          message: "Esse horário inicial já está ocupado"
        }
      });
    }

    const schedule = await ProfessionalSchedule.create(data);
    return schedule;
  }

  async show({ params, response }) {
    try {
      const schedule = await ProfessionalSchedule.query()
        .where("id", params.id)
        .with("room")
        .first();

      return schedule;
    } catch (err) {
      return response.status(err.status).send({
        err: { message: "Essa registro nao está presente no banco de dados." }
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const schedule = await ProfessionalSchedule.query()
        .where("id", params.id)
        .with("room")
        .first();
      const data = request.only([
        "start",
        "end",
        "duration",
        "quantity",
        "room_id",
        "day"
      ]);

      schedule.merge(data);
      await schedule.save();
      return schedule;
    } catch (err) {
      return response.status(err.status).send({
        err: { message: "Essa registro nao está presente no banco de dados." }
      });
    }
  }

  async destroy({ params, request, response }) {}
}

module.exports = ProfessionalScheduleController;
