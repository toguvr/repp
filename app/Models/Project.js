'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  owner () {
    return this.belongsTo('App/Models/User')
  }

  members () {
    return this.hasMany('App/Models/User')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
