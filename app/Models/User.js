'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  isMember () {
    return this.belongsToMany('App/Models/Project')
  }

  projects () {
    return this.hasMany('App/Models/Project')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }

  payer () {
    return this.hasOne('App/Models/Task')
  }

  receiver () {
    return this.hasOne('App/Models/Task')
  }
}

module.exports = User
