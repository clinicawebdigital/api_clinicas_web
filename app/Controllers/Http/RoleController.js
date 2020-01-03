"use strict";

const Role = use("App/Models/Role");

class RoleController {
  async index() {
    const roles = await Role.all();

    const parseOptions = roles.toJSON().map(role => {
      return {
        value: role.id,
        label: role.name
      };
    });

    return parseOptions;
  }
}

module.exports = RoleController;
