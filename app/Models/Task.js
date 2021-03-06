'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  payer () {
    return this.belongsTo('App/Models/User', 'payer_id', 'id')
  }

  receiver () {
    return this.belongsTo('App/Models/User', 'receiver_id', 'id')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
