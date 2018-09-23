var express = require('express');
var router = express.Router();
var title = "file upload"

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
var upload = multer({storage:storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.post('/', upload.single('upload_file'), function (req, res, next) {
  console.log(JSON.stringify(req.file));
  console.log(JSON.stringify(req.body));
  res.redirect("/")
})

module.exports = router;
