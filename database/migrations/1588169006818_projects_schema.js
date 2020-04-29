'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.decimal('totalValue')
    })
  }

  down () {
    this.table('projects', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProjectsSchema
