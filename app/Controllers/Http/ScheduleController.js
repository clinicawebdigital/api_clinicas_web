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

    let queryCurrentSchedule = Schedule.query()

      .where("date", data.date)

      .with("professional")

      .with("room")
      .with("patient")

      .with("user", builder =>
        builder.with("professional").setHidden(["password"])
      )
      .with("procedure", builder => builder.with("partnership"));

    if (data.professional_id) {
      queryCurrentSchedule.andWhere("professional_id", data.professional_id);
    }

    const currentSchedule = await queryCurrentSchedule.fetch();

    // pega as agenda dos médicos desse dia

    let parseCurrentSchedule = currentSchedule.toJSON();

    const queryCurrentDoctorSchedule = ProfessionalSchedule.query()
      .where("day", currentIsoDay)
      .with("professional")
      .with("room");

    if (data.professional_id) {
      queryCurrentDoctorSchedule.andWhere(
        "professional_id",
        data.professional_id
      );
    }

    const currentDoctorSchedule = await queryCurrentDoctorSchedule.fetch();

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
        i <
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentEnd[0],
          currentEnd[1]
        )
      ) {
        if (format(addMinutes(i, duration), "HH:mm", { options }) <= item.end) {
          newSchedule.push({
            start: format(i, "HH:mm", {
              options
            }),
            professional_name: item.professional.name,
            professional_id: item.professional.id,
            room_id: item.room.id,
            room: item.room.name
          });
        }
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

    // retirar horários com mesmo valor no final do dia

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
        item.responsible = verify.user.professional.name;
        item.value_payment = verify.value_payment;
        item.observations_payment = verify.observations_payment;
        item.id = verify.id;
        item.patient_id = verify.patient.id;
        item.patient_name = verify.patient.name;
        item.status = verify.status;
        item.room = verify.room.name;
        item.date = format(verify.date, "dd/MM/yyyy", {
          timeZone: "America/Sao_Paulo"
        });

        item.procedure =
          verify.procedure.partnership.name +
          " - " +
          verify.procedure.name +
          " | " +
          new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL"
          }).format(verify.procedure.value);
        item.created_at = format(new Date(verify.created_at), "dd/MM/yyyy", {
          options
        });
        item.first_phone = verify.patient.first_phone;
        item.key = Math.random();
        item.observations = verify.observations;

        parseCurrentSchedule = parseCurrentSchedule.filter(
          row => row.id !== verify.id
        );
      } else {
        item.patient_name = "";
        item.responsible = "";
        item.id = null;
        item.status = "Liberado";
        item.date = "";
        item.procedure = "";
        item.created_at = "";
        item.first_phone = "";
        item.key = Math.random();
        item.observations = "";
        item.value_payment = "";
        item.observations_payment = "";
      }

      return item;
    });

    const parseCurrentScheduleTratamento = parseCurrentSchedule.map(item => {
      item.responsible = item.user.professional.name;
      item.professional_name = item.professional.name;
      item.professional_id = item.professional.id;
      item.value_payment = item.value_payment;
      item.observations_payment = item.observations_payment;
      item.id = item.id;
      item.patient_name = item.patient.name;
      item.status = item.status;
      item.room = item.room.name;
      item.date = format(item.date, "dd/MM/yyyy", {
        timeZone: "America/Sao_Paulo"
      });

      item.procedure =
        item.procedure.partnership.name +
        " - " +
        item.procedure.name +
        " | " +
        new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL"
        }).format(item.procedure.value);
      item.created_at = format(new Date(item.created_at), "dd/MM/yyyy", {
        options
      });
      item.first_phone = item.patient.first_phone;
      item.key = Math.random();
      item.observations = item.observations;
      return item;
    });

    return [...newSchedule, ...parseCurrentScheduleTratamento];
  }

  async saveScheduleManually({ request, auth }) {
    const data = request.only([
      "date",
      "professional_id",
      "start",
      "room_id",

      "patient_id",

      "procedure_id",
      "value",
      "value_transferred",

      "observations"
    ]);

    const user = await auth.getUser();
    const schedule = Schedule.create({
      ...data,
      status: "Agendado",
      user_id: user.id
    });

    return schedule;
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
      .andWhere("professional_id", user.professional_id)
      .with("professional")
      .with("room")
      .with("patient")
      .with("procedure", builder => builder.with("partnership"))
      .with("user", builder => builder.with("professional"))
      .fetch();

    const parseOptions = currentSchedule.toJSON().map(item => {
      item.responsible = item.user.professional.name;
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
      item.professional_id = item.professional.id;
      item.first_phone = item.patient.first_phone;
      item.key = Math.random();
      item.professional_name = item.professional.name;
      item.patient_name = item.patient.name;

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
      "observations",
      "indication_id"
    ]);

    const user = await auth.getUser();
    const schedule = Schedule.create({
      ...data,
      status: "Agendado",
      user_id: user.id
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

  async handlePreConfirm({ params, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);

      schedule.merge({
        status: "Pré-Confirmado"
      });

      await schedule.save();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existente." } });
    }
  }

  async show({ params }) {
    try {
      const schedule = await Schedule.query()
        .where("id", params.id)
        .with("procedure", builder => builder.with("partnership"))
        .with("patient")
        .with("indication")
        .first();
      return schedule;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Agendamento não existente." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);

      const data = request.only([
        "observations",
        "procedure_id",
        "value",
        "value_transferred",
        "value_payment",
        "patient_id",
        "indication_id"
      ]);

      schedule.merge(data);
      await schedule.save();
      return schedule;
    } catch (err) {
      return response.status(err.status).send({
        err: { message: "Esse registro nao está presente no banco de dados." }
      });
    }
  }

  async status({ params, request, response }) {}

  async destroy({ params, response }) {
    try {
      const schedule = await Schedule.findOrFail(params.id);
      await schedule.delete();
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse agendamento não existe" } });
    }
  }
}

module.exports = ScheduleController;
