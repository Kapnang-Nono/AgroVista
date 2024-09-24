const express = require('express')
const path = require('path')
const process = require('process')
const multer = require('multer')

const PRODUCT_CONTROLLERS = require('../controllers/products.controller')
const productRoute = express.Router()


const allowedFileType = (file, cb) => {
    const fileTypeAllowed = /pdf|docx|png|mp4|txt/;
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
      cb(null, path.join(process.cwd().split("src")[0] + "/public/uploads/products"));
    },
    filename: (req, file, cb) => {
        console.log('in multer: ', file)
      cb(null, `${Date.now() + "-" + file.originalname}`);
    },
  });
  
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 4000000,
    },
  });

// products routes
productRoute.get('/category', PRODUCT_CONTROLLERS.getCategory)
productRoute.get('/:category', PRODUCT_CONTROLLERS.getProductCategory)
productRoute.get('', PRODUCT_CONTROLLERS.getProducts)
productRoute.put('/update/:productId', uploads.single('file'), PRODUCT_CONTROLLERS.updateProduct)
productRoute.delete('/delete/:prodID', PRODUCT_CONTROLLERS.deleteProduct)
productRoute.post('/add', uploads.single('file'), PRODUCT_CONTROLLERS.addProduct,  (error, req, res) => {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
})




module.exports = productRoute
