import knex from '../knex'

export default class Queries {

  constructor(currentUser, _knex=knex){
    this.currentUser = currentUser
    this.knex = _knex
  }

  users(){
    return this.knex
      .select('*')
      .from('users')
  }

  getUserById(userId){
    return this.knex
      .select('*')
      .from('users')
      .where('id', userId)
      .first()
  }

  pullRequests(){
    return this.knex
      .select('*')
      .from('pull_requests')
      .orderBy('created_at', 'asc')
  }

}
