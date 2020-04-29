'use strict'

const Project = use('App/Models/Project')
const ProjectUser = use('App/Models/ProjectUser')

class ProjectController {
  async index ({ request, response, view }) {
    const { page } = request.get()
    const projects = await Project.query().with('owner').with('members', builder => { builder.with('user') }).paginate(page)
    return projects
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, owner_id: auth.user.id, premium: false })
    await ProjectUser.create({ user_id: auth.user.id, project_id: project.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  async update ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description', 'members', 'totalValue'])

    project.merge(data)

    await project.save()
    return project
  }

  async destroy ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
