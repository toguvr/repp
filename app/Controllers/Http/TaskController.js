'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params, request, response, view }) {
    const tasks = await Task.query().where('project_id', params.projects_id).with('payer').with('receiver').with('project').fetch()

    return tasks
  }

  async store ({ params, request, auth }) {
    const data = request.only([
      'project_id',
      'receiver_id',
      'title',
      'amount',
      'value',
      'description',
      'due_date',
      'file_id',
      'set_date'
    ])

    const task = await Task.create({ ...data, project_id: params.projects_id, payer_id: auth.user.id })

    return task
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    const data = request.only([
      'project_id',
      'receiver_id',
      'title',
      'amount',
      'value',
      'description',
      'due_date',
      'file_id',
      'set_date'
    ])

    task.merge(data)

    await task.save()

    return task
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
