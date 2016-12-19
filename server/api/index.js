import express from 'express'
import commands from '../commands'
import queries from '../queries'

const router = new express.Router()

router.get('/session', (req, res, next) => {
  res.json({
    user: req.user
  })
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.json(null)
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
  res.json({
    error: {
      message: error.message,
      stack: stack,
    },
  });
});

module.exports = router
