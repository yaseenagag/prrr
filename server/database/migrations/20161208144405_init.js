exports.up = knex =>
  Promise.all([

    knex.schema.createTable('users', table => {
      table.string('email').notNullable().unique()
      table.integer('github_id').notNullable().unique()
      table.string('name').notNullable()
      table.string('avatar_url')
      table.timestamps()
    }),

    knex.schema.createTable('pull_requests', table => {
      table.increments('id').primary()
      table.string('repository').notNullable()
      table.integer('number').notNullable()
      table.integer('requested_by').notNullable() // github_id
      table.integer('claimed_by') // github_id
      table.timestamp('claimed_at') // github_id
      table.timestamps()
      table.unique(['repository', 'number'])
    }),

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pull_requests'),
  ])

