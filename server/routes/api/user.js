const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const config = require('../../config/key')
const validateRegister = require('../../validation/register')
const validateLogin = require('../../validation/login')
const User = require('../../models/User')
const SECRET = config.SECRET


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  const { name, email, password } = req.body
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ $or: [{ email }, { name }] }).then(user => {
    if (user) {
      if (user.email === email) {
        return res.status(400)
          .json({ email: 'Email already exists' })
      }
      else {
        return res.status(400)
          .json({ name: 'username already exists' })
      }
      else {
        const newUser = new User({ name, email, password })
        //Hasing password before saving it to the database
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt(error, hash) => {
            if(error) {
              throw error;
            }
            newUser.password = hash;
            newUser.save().then(user => res.json(user))
              .catch(error => console.log({ error: 'Error creating a new user. reason' + error }))
          });
        });
      }
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { email, password } = req.body
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: 'email not found' })
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (error, token) => {
          if (error) {
            console.log(error)
          }
          return res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        return res.status(400)
          .json({ password: 'password is unfortunately incorrect, try again!' })
      }
    })
  })
})

module.exports = router