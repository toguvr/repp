'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('password', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.get('users', 'UserController.show')
  Route.put('users', 'UserController.update')
  Route.post('/files', 'FileController.store')
  Route.get('/members', 'ProjectUserController.show')
  Route.get('/projectmembers/:id', 'ProjectUserController.index')
  Route.post('/members/:projects_id', 'ProjectUserController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    ))

  Route.resource('projects.tasks', 'TaskController').apiOnly()
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Task']
        ]
      ]
    ))
}).middleware(['auth'])
