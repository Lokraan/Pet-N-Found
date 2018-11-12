const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/reportImages"));
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});

module.exports = multer({storage: storage});