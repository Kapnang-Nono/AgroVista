const express = require('express');
const farmerRoute = express.Router();

const {
    updateFarmerprofile,
    getDrivers,
    getOrders
} = require('../controllers/farmer.controller')

farmerRoute.put('/update-profile/:userId', updateFarmerprofile)
farmerRoute.get('/hire-drivers', getDrivers)
farmerRoute.get('/customers/orders', getOrders)


module.exports = farmerRoute