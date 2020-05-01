const epxress = require('express');
const router = epxress.Router();
const { getImageByFileName } = require('../controllers/uploads');

router.route('/:filename').get(getImageByFileName);

module.exports = router;