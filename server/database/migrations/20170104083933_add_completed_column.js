exports.up = knex =>
  knex.schema.table('pull_request_review_requests', table => {
    table.string('completed_at')
  })

exports.down = knex =>
  knex.schema.table('pull_request_review_requests', table => {
    table.dropColumn('completed_at')
  })

