exports.up = knex =>
  Promise.all([

    knex.schema.createTable('users', table => {
      table.increments('id').primary()
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
      table.unique(['repository', 'number'])
      table.timestamps()
    }),

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pull_requests'),
  ])

