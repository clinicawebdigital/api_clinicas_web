'use strict'

const OpeningHour = use('App/Models/OpeningHour')

class OpeningHourController {

  async index() {
    const openingHour = await OpeningHour.query().orderBy('id', 'asc').fetch()
    return openingHour
  }

  async update({ request }) {
    const data = request.only(['horarios'])
    return await Promise.all(
      data.horarios.map(day => {
        return OpeningHour
          .find(day.id)
          .then(currentDay => {
            currentDay.merge(day)
            currentDay.save()
            return currentDay
          })
      })
    )
  }

}

module.exports = OpeningHourController
