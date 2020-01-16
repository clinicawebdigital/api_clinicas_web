"use strict";

const Schedule = use("App/Models/Schedule");
const ProfessionalSchedule = use("App/Models/ProfessionalSchedule");

const { format } = require("date-fns-tz");

const { addMinutes, getISODay, parseISO } = require("date-fns");
const { ptBR } = require("date-fns/locale");

const options = { locale: ptBR };

class ScheduleController {
  async index({ request }) {
    // configuração globais

    // seleciona a data selecionada
    const data = request.only(["date", "professional_id"]);

    // pegar o número do dia selecionado
    const currentIsoDay = await getISODay(parseISO(data.date), options);

    // pega os agendamento já existente do dia selecionada

    const currentDate = new Date();

    const currentSchedule = await Schedule.query()

      .where("date", data.date)

      .with("professional")
      .with("room")
      .with("patient")

      .with("procedure", builder => builder.with("partnership"))
      .fetch();

    // pega as agenda dos médicos desse dia

    const currentDoctorSchedule = await ProfessionalSchedule.query()
      .where("day", currentIsoDay)
      .with("professional")
      .with("room")
      .fetch();

    const newSchedule = [];

    const parseData = currentDoctorSchedule.toJSON();

    parseData.map(item => {
      const currentStart = item.start.split(":");
      const currentEnd = item.end.split(":");
      const [duration] = item.duration.split(":");

      let i = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentStart[0],
        currentStart[1]
      );

      while (
        i <=
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentEnd[0],
          currentEnd[1]
        )
      ) {
        newSchedule.push({
          start: format(i, "HH:mm", {
            options
          }),
          professional_name: item.professional.name,
          professional_id: item.professional.id,
          room_id: item.room.id,
          room: item.room.name
        });
        const parseDate = addMinutes(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            i.getHours(),
            i.getMinutes()
          ),
          duration
        );

        i = parseDate;
      }
    });

    newSchedule.map(item => {
      const verify = currentSchedule
        .toJSON()
        .find(
          row =>
            row.start === item.start &&
            item.professional_id == row.professional.id
        );

      /* busca o responsabel */

      if (verify) {
        item.id = verify.id;
        item.status = verify.status;
        item.room = verify.room.name;
        item.data = format(verify.date, "dd/MM/yyyy HH:mm", {
          timeZone: "America/Sao_Paulo"
        });

        item.procedure =
          verify.procedure.partnership.name + " - " + verify.procedure.name;
        item.created_at = format(new Date(verify.created_at), "dd/MM/yyyy", {
          options
        });
        item.first_phone = verify.patient.first_phone;
        item.key = Math.random();
      } else {
        item.id = null;
        item.status = "Liberado";
        item.date = "";
        item.procedure = "";
        item.created_at = "";
        item.first_phone = "";
        item.key = Math.random();
      }

      return item;
    });

    return newSchedule;
  }

  async mySchedules({ request, auth }) {
    // configuração globais

    const user = await auth.getUser();
    // seleciona a data selecionada
    const data = request.only(["date"]);

    // pegar o número do dia selecionado

    // pega os agendamento já existente do dia selecionada

    const currentSchedule = await Schedule.query()
      .where("date", data.date)
      .andWhere("professional_id", user.id)
      .with("professional")
      .with("room")
      .with("patient")
      .with("procedure", builder => builder.with("partnership"))
      .fetch();

    const parseOptions = currentSchedule.toJSON().map(item => {
      item.id = item.id;
      item.status = item.status;
      item.room = item.room.name;
      item.date = format(item.date, "dd/MM/yyyy", {
        options
      });

      item.procedure =
        item.procedure.partnership.name + " - " + item.procedure.name;
      item.created_at = format(new Date(item.created_at), "dd/MM/yyyy", {
        options
      });
      item.first_phone = item.patient.first_phone;
      item.key = Math.random();
      item.professional_name = item.professional.name;

      return item;
    });
    // pega as agenda dos médicos desse dia

    return parseOptions;
  }

  async store({ request, auth }) {
    const data = request.only([
      "patient_id",
      "professional_id",
      "value",
      "value_transferred",
      "start",
      "date",
      "procedure_id",
      "room_id",
      "date",
      "observations"
    ]);

    const user = await auth.getUser();
    const schedule = Schedule.create({
      ...data,
      status: "Agendado",
      responsible_id: user.id
    });

    return schedule;
  }

  async handleCancel({ params, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);

      schedule.merge({
        status: "Cancelado"
      });

      await schedule.save();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existente." } });
    }
  }

  async handleAuthorization({ params, request, response }) {
    try {
      const data = request.only([
        "form_payment_id",
        "value_payment",
        "observations_payment"
      ]);

      const schedule = await Schedule.findOrFail(params.id);

      schedule.merge({
        ...data,
        status: "Autorizado"
      });

      await schedule.save();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existente." } });
    }
  }

  async handleEnd({ params, request, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);

      schedule.merge({
        status: "Finalizado"
      });

      await schedule.save();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existente." } });
    }
  }

  async handleConfirm({ params, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);

      schedule.merge({
        status: "Confirmado"
      });

      await schedule.save();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existente." } });
    }
  }

  async status({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ScheduleController;
