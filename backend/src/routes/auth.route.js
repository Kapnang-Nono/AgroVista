const express = require('express')
const router = express.Router()
const MIDDLEWARE = require('../middleware/auths')
const CONTROLLERS = require('../controllers/auths.controller')


router.post('/register', MIDDLEWARE.validateData, CONTROLLERS.RegisterUser)
router.post('/login', CONTROLLERS.Login)


module.exports = router