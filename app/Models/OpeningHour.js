'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OpeningHour extends Model {
    static get table () {
        return 'opening_hours'
    }
}

module.exports = OpeningHour
