const express = require('express');
const router = express.Router();
const { register, getUsers } = require('../controllers/user');

router.route('/')
  .get(getUsers)
  .post(register)  

module.exports = router;