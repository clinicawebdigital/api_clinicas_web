"use strict";

const MovementCategory = use("App/Models/MovementCategory");

class MovementCategoryController {
  async index() {
    const movementCategories = await MovementCategory.all();
    return movementCategories;
  }

  async options() {
    const movementCategories = await MovementCategory.query()
      .select("id as value", "name as label")
      .fetch();

    return movementCategories;
  }

  async store({ request, response }) {
    const data = request.only(["name", "descriptions"]);

    const movementCategoryExists = await MovementCategory.findBy(
      "name",
      data.name
    );

    if (!movementCategoryExists) {
      const movementCategory = await MovementCategory.create(data);
      return { value: movementCategory.id, label: movementCategory.name };
    } else {
      return response.status(400).send({
        err: { message: "Essa opção de movimentação já está cadastrada." }
      });
    }
  }

  async show({ params, response }) {
    try {
      const movementCategory = await MovementCategory.findOrFail(params.id);
      return movementCategory;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa opção de movimentação  não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const movementCategory = await MovementCategory.findOrFail(params.id);

      const data = request.only(["name", "description"]);
      const movementCategoryExists = await MovementCategory.findBy(
        "name",
        data.name
      );

      if (!movementCategoryExists) {
        movementCategory.merge(data);

        await movementCategory.save();
        return movementCategory;
      } else {
        return response
          .status(400)
          .send({ err: { message: "Essa opção de movimentação  já existe" } });
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa opção de movimentação  não existe" } });
    }
  }
}

module.exports = MovementCategoryController;
