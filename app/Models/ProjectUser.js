'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectUser extends Model {
  user () {
    return this.hasMany('App/Models/User', 'user_id', 'id')
  }

  projects () {
    return this.hasMany('App/Models/Project', 'project_id', 'id')
  }
}

module.exports = ProjectUser
