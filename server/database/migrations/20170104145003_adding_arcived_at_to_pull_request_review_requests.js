exports.up = knex =>
  knex.schema.table('pull_request_review_requests', table => {
    table.timestamp('archived_at')
  })

exports.down = knex =>
  knex.schema.table('pull_request_review_requests', table => {
    table.dropColumn('archived_at')
  })

