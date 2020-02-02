"use strict";

const Database = use("Database");
const { format } = require("date-fns");

const { ptBR } = require("date-fns/locale");

const options = { locale: ptBR };

class FinancialReportController {
  async index({ request }) {
    const data = request.only([
      "startDate",
      "endDate",

      "transaction_type",
      "account_id",
      "creditor_debtor_id",
      "movement_category_id",
      "type_id"
    ]);

    const reportQuery = Database.table("financials")
      .select(
        "financials.id",
        "financials.transaction_type",
        "financials.date",
        "financials.value",
        "types.name as type_name",
        "accounts.name as account_name",
        "movement_categories.name as movement_category_name",
        "creditors_debtors.name as creditor_debtor_name",
        "financials.observations"
      )
      .innerJoin("creditors_debtors", function() {
        this.on("financials.creditor_debtor_id", "creditors_debtors.id");
      })
      .innerJoin("types", function() {
        this.on("financials.type_id", "types.id");
      })
      .innerJoin("movement_categories", function() {
        this.on("financials.movement_category_id", "movement_categories.id");
      })
      .innerJoin("accounts", function() {
        this.on("financials.account_id", "accounts.id");
      })
      .whereBetween("financials.date", [data.startDate, data.endDate]);

    // Verificações da aplicação da filtro
    if (data.transaction_type)
      reportQuery.where("financials.transaction_type", data.transaction_type);

    if (data.account_id)
      reportQuery.where("financials.account_id", data.account_id);

    if (data.type_id) reportQuery.where("financials.type_id", data.type_id);

    if (data.movement_category_id)
      reportQuery.where(
        "financials.movement_category_id",
        data.movement_category_id
      );

    if (data.creditor_debtor_id)
      reportQuery.where(
        "financials.creditor_debtor_id",
        data.creditor_debtor_id
      );

    const report = await reportQuery.orderBy("financials.date");

    const parseData = report.map(item => {
      item.transaction_type =
        item.transaction_type === "1" ? "Entrada" : "Saída";
      item.date = format(item.date, "dd/MM/yyyy", {
        options
      });
      return item;
    });

    return parseData;
  }
}
module.exports = FinancialReportController;
