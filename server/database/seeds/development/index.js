import moment from 'moment'

const users = [
  {
    id: 1,
    email: 'jared@jaredgrippe.com',
    github_id: 8385,
    name: 'Jared Grippe',
    avatar_url: 'https://avatars.githubusercontent.com/u/8385?v=3',
  }
]


exports.seed = (knex) => {

  const batchInsert = (table, records) => {
    if (table === 'skills' || table === 'users'){
      records.forEach(record =>
        record.created_at = record.updated_at = weeksAgo(7)
      )
    }
    return knex
      .table(table)
      .del()
      .then(_ =>
        knex.batchInsert(table, records, 100)
      )
  }

  return Promise.all([
    batchInsert('users', users),
  ])

}
