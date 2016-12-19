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

export default {
  users,
  getUserById,
}
