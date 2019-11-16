'use strict'

const Route = use('Route')

/*
Route.post('/indications', 'IndicationController.store')
Route.get('/indications', 'IndicationController.index')
Route.get('/indications/:id', 'IndicationController.show')
Route.put('/indications/:id', 'IndicationController.update')
Route.delete('/indications/:id', 'IndicationController.destroy')
*/

Route.post('/schooling', 'SchoolingController.store')
Route.get('/schooling', 'SchoolingController.index')
Route.get('/scholarity', 'SchoolingController.show')
Route.get('/scholarity', 'SchoolingController.update')
Route.get('/scholarity', 'SchoolingController.destroy')

Route.resource('indications', 'IndicationController').apiOnly()
    
