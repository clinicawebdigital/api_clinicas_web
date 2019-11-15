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
// Route.get('/scholarity', 'ScholarityController.in')
// Route.get('/scholarity', 'ScholarityController.index')
// Route.get('/scholarity', 'ScholarityyController.index')


Route.resource('indications', 'IndicationController').apiOnly()
    
