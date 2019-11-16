'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schooling extends Model {
    static get table () {
        return 'schooling'
    }
}

module.exports = Schooling
