import express from 'express'
import passport from 'passport'
import Queries from './queries'
import Commands from './commands'

const router = new express.Router()

const GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('GITHUB LOGIN?', accessToken, refreshToken, profile)
    new Commands().findOrCreateUserFromGithubProfile(profile)
      .then(user => {
        cb(undefined, user);
      })
      .catch(error => {
        cb(error)
      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, {id: user.id});
});

passport.deserializeUser(function(user, done) {
  new Queries().getUserById(user.id)
    .then( user  => done(null, user))
    .catch(error => done(error))
});


router.get('/login', passport.authenticate('github'));


router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router
