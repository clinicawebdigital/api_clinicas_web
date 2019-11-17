'use strict'

const Route = use('Route')

/*
Route.post('/indications', 'IndicationController.store')
Route.get('/indications', 'IndicationController.index')
Route.get('/indications/:id', 'IndicationController.show')
Route.put('/indications/:id', 'IndicationController.update')
Route.delete('/indications/:id', 'IndicationController.destroy')
*/

Route.resource('indications', 'IndicationController').apiOnly()
Route.resource('schooling', 'SchoolingController').apiOnly()
Route.resource('maritalStatus', 'MaritalStatusController').apiOnly()
Route.resource('races', 'RaceController').apiOnly()
    
