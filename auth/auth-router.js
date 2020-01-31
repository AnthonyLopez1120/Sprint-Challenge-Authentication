const router = require('express').Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = require('../api/secret')

const Users = require('./auth-model')

router.post('/register', (req, res) => {
  let {username, password} = req.body;
  const hash = bycrypt.hashSync(password, 8);

  Users.add({username, password: hash})
    .then(saved => {
      res.status(200).json(saved)
    })
    .catch(err => {
      console.log(err)
      res.status.apply(500).json(err)
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bycrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Hola mi amigo ${user.username}!`, token})
      }else{
        res.status(401).json({ message: "Nice try buddy!"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

function generateToken(user){
  const payload = {
    username: user.username
  }
  const secrets = secret.jwtSecret;

  const options = {
    expiresIn: "1hr"
  };
  return jwt.sign(payload, secrets, options)
}

module.exports = router;
