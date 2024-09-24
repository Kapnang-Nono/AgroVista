const {UserModel, Order} = require("../models/app-models")
const bcrypt = require("bcrypt")

const validatePasword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d)(.{8,})$/
    return passwordRegex.test(password)
}

const updateFarmerprofile = async (req, res) => {
    const {fname, lname, password, newPassword, confirmNewPassword} = req.body
    const farmerId = req.params.userId
    console.log(req.body)
   
    if(!farmerId){
        return res.status(400).json({message: 'Request parameters is required'});
    }
    if(!fname){
        return res.status(400).json({status: 'error', message: 'Firstname is required'})
    }
    if(!lname){
        return res.status(400).json({status: 'error', message: 'Lastname is required'})
    }
    if(!password){
        return res.status(400).json({status: 'error', message: 'password are required'})
    }
    if(!newPassword){
        return res.status(400).json({status: 'error', message: 'Enter new password'})
    }
    if(!confirmNewPassword){
        return res.status(400).json({status: 'error', message: 'Confirm new password'})
    }
    if(!validatePasword(newPassword)){
        return res.status(400).json({status: 'error', message: `
            Password must be at least 8 characters long and contain at least 1 uppercase letter, 
            1 lowercase letter, 3 digits, and 1 symbol
        `})
    }
    if(confirmNewPassword !== newPassword){
        return res.status(400).json({status: 'error', message: 'Password does not match'})
    }
    if(newPassword.length !== confirmNewPassword.length){
        return res.status(400).json({status: 'error', message: 'Password does not match'})
    }

    try {
        const farmer = await UserModel.findOne({_id: farmerId})
        
        if(!farmer){
            return res.status(404).json({message: ' User does not exist'});
        }else{
            const passwordMatch = await bcrypt.compare(password, farmer.password)
            if(passwordMatch){
                const hashPassword = await bcrypt.hash(password, 10)
                await UserModel.updateOne({_id: farmerId}, {
                    $set: {
                        firstname: fname,
                        lastname: lname,
                        password: hashPassword
                    }
                }).then(() => {return res.status(200).json({status: 'OK', message: 'Profile updated successfully'})})
            }else{
                return res.status(403).json({status: 'error', message: "Wrong password"})
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const getDrivers = async (req, res) => {
    try {
        const drivers = await UserModel.find({role: process.env.DRIVER_ROLE})
        if(!(drivers && drivers.length > 0)) {
            return res.status(404).json({message: 'Drivers not found'})
        }else{
            return res.status(200).json({data: drivers, status: 'OK'})
        }
    } catch (error) {
        throw new Error("Server error: " + error.message)
    }
}


// getting all orders and rendering it at farmer-side UI
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()

        if(orders && orders.length > 0) {
            return res.status(200).json({status: 'OK', data: {data: orders}})
        }else{
            return res.status(404).json({status: 'error', message: 'No order found for the moment'})
        }
    } catch (error) {
       return res.status(500).send() 
    }
}


module.exports = {
    updateFarmerprofile,
    getDrivers,
    getOrders
}