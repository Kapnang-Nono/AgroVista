const express = require('express');

const { editUser, getUsers, deleteUser, addUser } = require('../controllers/admin.controller');

const adminRoute = express.Router()

adminRoute.get('/users', getUsers)
adminRoute.patch('/users/:user', editUser)
adminRoute.delete('/users/:user', deleteUser)
adminRoute.post('/users/', addUser)


module.exports = adminRoute