'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MaritalStatus extends Model {
    static get table () {
        return 'marital_status'
    }
}

module.exports = MaritalStatus
