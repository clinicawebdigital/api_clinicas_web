"use strict";
const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    const { username, password } = request.all();

    const token = await auth.attempt(username, password);
    const user = await User.query()
      .where("username", username)
      .with("professional", builder =>
        builder.with("role").select("id", "name", "role_id")
      )

      .select("id", "username", "professional_id")
      .first();

    return {
      token,
      user
    };
  }
}

module.exports = SessionController;
