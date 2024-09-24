const express = require('express');
const path = require('path')
const process = require('process')
const multer = require('multer');

const {
    getLoggedUserInfo,
    updateProfilePicture
} = require('../controllers/global.controller');

const globalRoute = express.Router();

const allowedFileType = (file, cb) => {
    const fileTypeAllowed = /gif|jpg|png|/;
    const fileExtension = fileTypeAllowed.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypeAllowed.test(file.mimetype);
  
    if (mimeType && fileExtension) {
      return cb(null, true);
    } else {
      cb(`Error: File with extension ${fileExtension} are not allowed`);
    }
};
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd().split("src")[0] + "/public/uploads/profile-pictures"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now() + "-" + file.originalname}`);
    },
  });
  
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 5000000,
    },
    // fileFilter: function(file, cb) {
    //    allowedFileType(file, cb)
    // }
  });


globalRoute.get('/account-details', getLoggedUserInfo)
globalRoute.patch('/update-picture/:uid', uploads.single('file'), updateProfilePicture)


module.exports = globalRoute