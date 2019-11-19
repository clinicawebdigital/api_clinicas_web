'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PatientAddress extends Model {
    static get table () {
        return 'patients_addresses'
    }

}

module.exports = PatientAddress
