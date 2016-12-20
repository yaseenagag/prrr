exports.up = knex =>
  Promise.all([

    knex.schema.createTable('users', table => {
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('avatar_url')
      table.integer('github_id').notNullable().unique()
      table.string('github_username').notNullable()
      table.string('github_access_token').notNullable()
      table.string('github_refresh_token')
      table.timestamps()
    }),

    knex.schema.createTable('pull_request_review_requests', table => {
      table.increments('id').primary()
      table.string('owner').notNullable()
      table.string('repo').notNullable()
      table.integer('number').notNullable()
      table.integer('requested_by').notNullable() // github_id
      table.integer('claimed_by') // github_id
      table.timestamp('claimed_at')
      table.timestamps()
      table.unique(['owner', 'repo', 'number'])
    }),

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pull_request_review_requests'),
  ])

