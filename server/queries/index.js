import knex from '../knex'

function users(){
  return knex
    .select('*')
    .from('users')
}

function getUserById(userId){
  return knex
    .select('*')
    .from('users')
    .where('id', userId)
    .first()
}

function pullRequests(){
  return knex
    .select('*')
    .from('pull_requests')
    .orderBy('created_at', 'asc')
}

export default {
  users,
  getUserById,
  pullRequests,
}
