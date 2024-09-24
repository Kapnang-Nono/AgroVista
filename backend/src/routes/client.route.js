const express = require('express');
const clientRoute = express.Router();

const {
    contactMessage,
    handleNewOrder
} = require('../controllers/client.controller')

clientRoute.post('/contact/:user', contactMessage)
clientRoute.post('/new-order/:custID', handleNewOrder)


module.exports = clientRoute