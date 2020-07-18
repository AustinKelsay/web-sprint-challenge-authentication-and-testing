const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../users/usersModel");

router.post('/register', (req, res) => {
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, 14)

  req.body.password = hash;

  Users.add(req.body)
    .then((user) => {
      res.status(200).json({data: user})
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: err})
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
module.exports = router;
