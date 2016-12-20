import express from 'express'
import Commands from '../commands'
import Queries from '../queries'

const router = new express.Router()

router.use((req, res, next) => {
  req.queries = new Queries(req.user)
  req.commands = new Commands(req.user)
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


router.get('/pull-request-review-requests', (req, res, next) => {
  req.queries.getPullRequestReviewRequests()
    .then(pullRequestReviewRequests => {
      res.json(pullRequestReviewRequests)
    })
    .catch(next)
});

router.post('/pull-request-review-requests', (req, res, next) => {
  req.commands.createPullRequestReviewRequest({
    owner: req.body.owner,
    repo: req.body.repo,
    number: Number(req.body.number),
  })
    .then(pullRequest => {
      res.json(pullRequest)
    })
    .catch(next)
});

router.post('/pull-request-review-requests/:pullRequestId/claim', (req, res, next) => {
  const { pullRequestId } = req.params
  req.commands.claimPullRequestReviewRequest(pullRequestId)
    .then(pullRequest => {
      res.json(pullRequest)
    })
    .catch(next)
});

router.post('/pull-request-review-requests/:pullRequestId/unclaim', (req, res, next) => {
  const { pullRequestId } = req.params
  req.commands.unclaimPullRequestReviewRequest(pullRequestId)
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
