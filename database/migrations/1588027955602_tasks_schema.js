'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table
        .decimal('amount')
        .unsigned()
        .notNullable().alter()
      table.decimal('value').alter()
    })
  }

  down () {
    this.table('tasks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TasksSchema
