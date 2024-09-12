const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/tmp/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage });


const uploadMiddleware = (req, res, next) => {


  upload.any()(req, res, (err) => {

    if (err) {

      console.log('err', err)
      return res.status(400).json({ error: err.message })
    }


    const files = req.files;
    const errors = [];


    files.forEach((file) => {

      const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      const allowedSize = 5 * 1024 * 1024; // 5 mb;


      if (!allowedFormats.includes(file.mimetype)) {
        errors.push(`Invalid File Type : ` + file.originalname)
      }

      if (file.size > allowedSize) {
        errors.push(`File size is too big : ` + file.originalname)
      }

    });

    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path)
      })

      return res.status(400).json({ errors })
    }


    req.files = files


    next();

  })
}

module.exports = uploadMiddleware;