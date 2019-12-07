'use strict'

const Model = use('Model')

class Partnership extends Model {
  procedures() {
    return this.hasMany('App/Models/Procedure')
  }
}



module.exports = Partnership
