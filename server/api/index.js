import express from 'express'
import Commands from '../commands'
import Queries from '../queries'

const router = new express.Router()

router.use((req, res, next) => {
  req.queries = new Queries(req.user)
  req.commands = new Commands(req.user)
  console.log(req.queries)
  next()
})

router.get('/session', (req, res, next) => {
  res.json({
    user: req.user
  })
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.json(null)
});


router.get('/pull-requests', (req, res, next) => {
  req.queries.pullRequests()
    .then(pullRequests => {
      res.json(pullRequests)
    })
    .catch(next)
});

router.post('/pull-requests', (req, res, next) => {
  req.commands.addPullRequest({
    repository: req.body.repository,
    number: Number(req.body.number),
  })
    .then(pullRequest => {
      res.json(pullRequest)
    })
    .catch(next)
});

// error handlers

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  const stack = process.env.NODE_ENV === 'development'
    ? error.stack
    : null
  res.status(error.status || 500);
  const json = {
    error: {},
  }
  Object.assign(json.error, error)
  json.error.message = error.message
  json.error.stack = stack
  res.json(json);
});

module.exports = router
