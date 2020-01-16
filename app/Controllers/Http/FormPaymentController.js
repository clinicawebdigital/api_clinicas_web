"use strict";
const FormPayment = use("App/Models/FormPayment");

class FormPaymentController {
  async index({ request, response, view }) {}

  async create({ request, response, view }) {}

  async options() {
    const options = await FormPayment.query()
      .select("id as value", "name as label")
      .fetch();

    return options;
  }

  async store({ request, response }) {
    const data = request.only(["name"]);

    const formPaymentExists = await FormPayment.findBy("name", data.name);

    if (!formPaymentExists) {
      const formPayment = await FormPayment.create(data);
      return { value: formPayment.id, label: formPayment.name };
    } else {
      return response.status(400).send({
        err: { message: "Essa forma de pagamento já está cadastrada." }
      });
    }
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = FormPaymentController;
