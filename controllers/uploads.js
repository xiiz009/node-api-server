const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs;

conn.once('open', function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//@Des Get All Upload File
//@route GET /api/v1/uploads
//@access public
exports.getFiles = (req, res, next) => {
  try {
    gfs.files.find().toArray((err, files) => {
      if(!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No file Exists'
        })
      }
      return res.json(files).status(200);
    })
  } catch (error) {
    return console.error(error);
  }
}

//@Des Get Upload File By filename
//@route GET /api/v1/uploads/:filename
//@access public
exports.getFileByFileName = (req, res, next) => {
  try {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      if(!file || file.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No file Exists'
        })
      }
      return res.json(file).status(200);
    });
  } catch (error) {
    return console.error(error);
  }
}

//@Des Upload File
//@route POSTS /api/v1/uploads
//@access public
exports.uploadFile = (req, res, next) => {
  try {
    return res.json({
      success: true,
      data: req.file
    }).status(200);
  } catch (error) {
    return res.status(500).json({ success: false});
  }
}

//========================================================
//================ Image Controller ======================
//========================================================

//@Des Get Image By filename
//@route GET /api/v1/uploads/:filename
//@access public
exports.getImageByFileName = (req, res, next) => {
  try {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      if(!file || file.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No file Exists'
        })
      }
      // Check if image
      if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read Output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }else {
        res.status(404).json({
          error: 'Not an image'
        });
      }
    });
  } catch (error) {
    return console.error(error);
  }
}
