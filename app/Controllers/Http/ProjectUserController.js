'use strict'

const ProjectUser = use('App/Models/ProjectUser')

class ProjectUserController {
  async show ({ params, auth }) {
    const projects = await ProjectUser
      .query()
      .with('projects')
      .with('user')
      .where('user_id', auth.user.id)
      .fetch()

    return projects
  }

  async store ({ request, response, params, auth }) {
    const data = request.only(['title', 'description'])

    await ProjectUser.create({ user_id: auth.user.id, project_id: params.projects_id })

    return project
  }
}

module.exports = ProjectUserController
