"use strict";

const Financial = use("App/Models/Financial");
const Database = use("Database");

const { format } = require("date-fns");

class FinancialController {
  async index() {
    const financials = await Financial.query()
      .with("account")
      .select("value", "transaction_type", "id", "date", "account_id")
      .orderBy("date", "desc")
      .fetch();

    const sumInputs = await Database.from("financials")
      .sum("value")
      .where("transaction_type", 1);

    const sumOutputs = await Database.from("financials")
      .sum("value")
      .where("transaction_type", 2);

    const parseFinancials = financials.toJSON().map(item => {
      item.transaction_type =
        item.transaction_type === "1" ? "Entrada" : "Saída";
      item.date = format(item.date, "dd/MM/yyyy");
      item.account = item.account.name;
      return item;
    });

    return {
      data: parseFinancials,
      inputs: sumInputs ? sumInputs[0].sum : 0,
      outputs: sumOutputs ? sumOutputs[0].sum : 0
    };
  }

  async store({ request }) {
    const data = request.only([
      "transaction_type",
      "account_id",

      "value",
      "date",
      "creditor_debtor_id",
      "movement_category_id",
      "type_id",
      "observations"
    ]);

    const financial = await Financial.create(data);
    return financial;
  }

  async show({ params, response }) {
    try {
      const financial = await Financial.query()
        .where("id", params.id)
        .with("type", builder => builder.select("id ", "name as label"))
        .with("movement_category", builder =>
          builder.select("id ", "name as label")
        )
        .with("creditor_debtor", builder =>
          builder.select("id ", "name as label")
        )
        .with("account", builder => builder.select("id ", "name as label"))
        .setHidden(["created_at", "updated_at"])

        .first();
      return financial;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa movimentação não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only([
        "transaction_type",
        "account_id",
        "value",
        "date",
        "creditor_debtor_id",
        "movement_category_id",
        "type_id",
        "observations"
      ]);

      const financial = await Financial.findOrFail(params.id);

      financial.merge(data);

      await financial.save();

      return financial;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa movimentação não existe" } });
    }
  }

  async destroy({ params, request, response }) {}
}

module.exports = FinancialController;
