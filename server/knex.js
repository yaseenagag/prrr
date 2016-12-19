import Knex from 'knex'
const config = require('../../knexfile')[process.env.NODE_ENV]
const knex = Knex(config)

export default knex
