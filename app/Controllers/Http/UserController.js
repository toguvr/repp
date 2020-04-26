'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show ({ request, auth }) {
    const user = await User.query().where('id', auth.user.id).with('file').fetch()

    return user
  }

  async update ({ params, request, response, auth }) {
    const project = await User.findOrFail(auth.user.id)
    const data = request.only(['file_id', 'username'])

    project.merge(data)

    await project.save()
    return project
  }
}

module.exports = UserController
