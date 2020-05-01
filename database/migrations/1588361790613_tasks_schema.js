'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.timestamp('set_date')
    })
  }

  down () {
    this.table('tasks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TasksSchema
