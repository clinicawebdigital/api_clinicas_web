"use strict";

const Financial = use("App/Models/Financial");

class FinancialController {
  async index({ request }) {
<<<<<<< HEAD
    const { value_top, value_down, is_input } = request;
    const { page } = request.get();
    const financial = await Financial.query()
      .where(function() {
        if (is_input) {
          // se o Valor do filtro for colocado como máximo?
          this.whereBetween("value", [value_down, value_top]),
            this.where("input", is_input);
        } else {
          this.whereBetween("value", [value_down, value_top]);
        }
        this.whereBetween("value", [value_down, value_top]),
          this.where("input", is_input);
=======
    const { value_top, value_down, is_input, date_down, date_top } = request
    const { page } = request.get()
    const financial = await Financial.query()
      .where(function(){
        if(is_input){
          this.where('input', is_input)
        }
        if(value_top === MAX){
          this.whereBetween('value', [value_down, 1000000000])
        }else{
          this.whereBetween('value', [value_down, value_top])
        }
        if(date_down && date_top){
          this.whereBetween('date', [date_down, date_top])
        }else if(date_down){
          this.whereBetween('date', [date_down, new Date()])
        }else if(date_top){
          this.whereBetween('date', ['1500-00-00', date_top])
        }
        // if(is_input){ // se o Valor do filtro for colocado como máximo?
        //   this.whereBetween('value', [value_down, value_top]),
        //   this.where('input', is_input)
        // }else{
        //   this.whereBetween('value', [value_down, value_top])
        // }
        // this.whereBetween('value', [value_down, value_top]),
        // this.where('input', is_input)
>>>>>>> 10e241fd29b6e7c98241d5b1c0eb20345487ba2f
      })
      .paginate(page);

    return financial;
  }

  async store({ request }) {
    const data = request.only(["description", "value", "is_input"]);
    const financial = await Financial.create(data);
    return financial;
  }

  async show({ params, response }) {
    try {
      const financial = await Financial.findOrFail(params.id);
      return financial;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa operação financeira não existe." } });
    }
  }

  async update({ params, request, response }) {
    try {
      const financial = await financial.findOrFail(params.id);

      const data = request.only(["description", "value", "is_input"]);
      // const indicationExists = await Indication.findBy('name', data.name)

      financial.merge(data);
      await financial.save();
      return financial;
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: "Essa indicação não existe" } });
    }
  }
}

module.exports = FinancialController;
