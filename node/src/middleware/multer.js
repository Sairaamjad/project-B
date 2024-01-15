const multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})

var upload = multer({ storage });
module.exports=upload;