import knex from '../knex'

function firstRecord(records){
  return records[0]
}

function createRecord(table, attributes){
  return knex
    .table(table)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)
}

function createUser(attributes){
  attributes.created_at = attributes.updated_at = new Date
  return createRecord('users', attributes)
}

function findOrCreateUserFromGithubProfile(githubProfile){
  console.log('??', githubProfile)
  const github_id = githubProfile.id
  const userAttributes = {
    github_id: github_id,
    name: githubProfile.displayName,
    email: githubProfile.emails[0].value,
    avatar_url: githubProfile.photos[0].value,
  }
  return knex
    .table('users')
    .where('github_id', github_id)
    .first('*')
    .then(user => user ? user : createUser(userAttributes))
}

function addPullRequest({repository, number}){
  return knex
    .insert({
      repository,
      number,
      created_at: new Date,
      updated_at: new Date,
    })
    .into('pull_requests')
    .catch( error => {
      if (error && error.message.includes('duplicate key value violates unique constraint')){
        const newError = new Error('duplicate')
        newError.originalError = error
        newError.repository = repository
        newError.number = number
        throw newError
      }
      throw error
    })
}

export default {
  findOrCreateUserFromGithubProfile,
  addPullRequest,
}
