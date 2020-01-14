"use strict";

const Schedule = use("App/Models/Schedule");
const ProfessionalSchedule = use("App/Models/ProfessionalSchedule");

const { addMinutes, format, getISODay, parseISO } = require("date-fns");
const { ptBR } = require("date-fns/locale");

class ScheduleController {
  async index({ request }) {
    // configuração globais
    const options = { locale: ptBR };

    // seleciona a data selecionada
    const data = request.only(["date"]);

    // pegar o número do dia selecionado
    const currentIsoDay = await getISODay(parseISO(data.date), options);

    // pega os agendamento já existente do dia selecionada

    const currentDate = new Date();

    const currentSchedule = await Schedule.query()
      .where("date", currentDate)
      .with("professional")
      .with("room")
      .with("procedure", builder => builder.with("partnership"))
      .fetch();

    // pega as agenda dos médicos desse dia

    const currentDoctorSchedule = await ProfessionalSchedule.query()
      .where("day", currentIsoDay)
      .with("professional")
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
          professional_id: item.professional.id
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

      if (verify) {
        item.checked = "Marcado";
        item.room = verify.room.name;
        item.date = format(verify.date, "dd/MM/yyyy", {
          options
        });
        item.procedure =
          verify.procedure.partnership.name + " - " + verify.procedure.name;
      } else {
        item.checked = "Liberado";
        item.room = "";
        item.date = "";
        item.procedure = "";
      }

      return item;
    });

    return newSchedule;
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ScheduleController;
