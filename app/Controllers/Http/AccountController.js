"use strict";

const Account = use("App/Models/Account");

class AccountController {
  async index() {
    const accounts = await Account.all();
    return accounts;
  }

  async options() {
    const accounts = await Account.query()
      .select("id as value", "name as label")
      .fetch();

    return accounts;
  }

  async store({ request, response }) {
    const data = request.only(["name", "descriptions"]);

    const accountExists = await Account.findBy("name", data.name);

    if (!accountExists) {
      const account = await Account.create(data);
      return account;
    } else {
      return response
        .status(400)
        .send({ err: { message: "Essa conta já está cadastrada." } });
    }
  }

  async show({ params, response }) {
    try {
      const account = await Account.findOrFail(params.id);
      return account;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa conta não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const account = await Account.findOrFail(params.id);

      const data = request.only(["name", "description"]);
      const accountExists = await Account.findBy("name", data.name);

      if (!accountExists) {
        account.merge(data);

        await account.save();
        return account;
      } else {
        return response
          .status(400)
          .send({ err: { message: "Essa conta já existe" } });
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa conta não existe" } });
    }
  }
}

module.exports = AccountController;
