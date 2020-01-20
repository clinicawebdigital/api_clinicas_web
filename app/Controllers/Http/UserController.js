"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request }) {
    const data = request.only(["username", "password", "professional_id"]);

    const user = await User.create(data);

    return user;
  }

  async options() {
    const options = await User.query()

      .with("professional")
      .fetch();

    const parseOptions = options.toJSON().map(item => {
      return {
        value: item.id,
        label: item.professional.name
      };
    });

    return parseOptions;
  }

  async show({ params, response }) {
    try {
      const user = await User.query()
        .where("professional_id", params.id)
        .first();
      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Esse usuário não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      const data = request.only(["username", "password"]);

      user.merge(data);
      await user.save();
      return user;
    } catch (err) {
      return response.status(err.status).send({
        err: { message: "Esse usuário nao está presente no banco de dados." }
      });
    }
  }
}

module.exports = UserController;
