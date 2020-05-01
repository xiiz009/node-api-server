const express = require('express');
const router = express.Router();
const { login, getUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.route('/login')
  .post(login);

router.route('/user')
  .get(auth, getUser);

module.exports = router;