const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../controllers/store');
const auth = require('../middlewares/auth');

router.route('/')
  .get(getStores)
  .post(auth, addStore);

module.exports = router;