const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.post('/',
  [
    check('name')
      .isLength({ min: 2 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 8 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
      //  .then(() => { res.send('Your information has been registered.'); })
        .then(() => { res.redirect('/'); })
      //  .then(() => { console.log('Your information has been registered '); })
        .catch((err) => {
          console.log(err);
          res.send('There was an error. Your information was not registered'); 
        });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  });

router.get('/', basic.check((req, res) => {
// router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    // res.render('index', registrations:docs });
    })
    .catch((err) => {
      console.log(err);
      res.send('There was an error. The query was not executed.');
    });
}));

module.exports = router;
