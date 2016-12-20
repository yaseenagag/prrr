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

  getUserByGithubId(githubId){
    return this.knex
      .select('*')
      .from('users')
      .where('github_id', githubId)
      .first()
  }

  pullRequests(){
    return this.knex
      .select('*')
      .from('pull_requests')
      .orderBy('created_at', 'asc')
  }

}
