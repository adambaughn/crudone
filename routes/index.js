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
      // .then(() => { res.render('index', { title: 'Listing Registrations' }); })
       .then(() => { res.send('Thank you for your registration!'); })
      //  .then(() => { res.render('form', { title: 'Registration form' }); })
      //  .then(() => { res.send(form); })
      //  .then(() => { res.redirect('/'); })
      //  .then(() => { console.log('Your information has been registered '); })
        .catch(() => {
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

  // router.get('/', basic.check((req, res) => {
  // router.get('/registrations', basic.check((req, res) => {
  router.get('/registrations', (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', 'registrations': registrations });
      // res.render('index', registrations:docs });
      })
      .catch(() => {
        res.send('There was an error. The query was not executed.');
      });
  });

router.delete("/registrations", (req, res) => {
    Registration.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.query.id) }, (err, Registration) => {
        if (!err) {
            res.json({ msg: "Registration deleted", deleted: Registration });
        } else {
            console.log("Error removing :" + err);
        }
    });
});

module.exports = router;



/* router.delete("/delete", (req, res) => {
    Registration.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.query.id) }, (err, Registration) => {
        if (!err) {
            res.json({ msg: "Registration deleted", deleted: Registration });
        } else {
            console.log("Error removing :" + err);
        }
    });
}); */
