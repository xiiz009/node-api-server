const express = require('express');
const router = express.Router();
const {
  getFiles,
  uploadFile,
  getFileByFileName
} = require('../controllers/uploads');
const { uploadMiddleware } = require('../middlewares/upload');

router.route('/')
  .get(getFiles)
  .post(uploadMiddleware.single('file'), uploadFile)

router.route('/:filename')
  .get(getFileByFileName);

module.exports = router;