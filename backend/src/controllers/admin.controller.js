const {UserModel} = require('../models/app-models')

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()

        if(users.length === 0) {
            return res.status(404).json({message:"No users found"})
        }else{
            return res.status(200).json({message: "Users found", status: 'OK', users: users})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const editUser = async (req, res) => {
    const {firstname, email, role, status, lastname} = req.body
    // console.log(req.body)
    // return
    if(!req.params.user){
        return res.status(404).json({message: "Requested user does not exist"})
    }
    try {
        const user = await UserModel.findById(req.params.user)
        if(user){
            await UserModel.updateOne({_id: req.params.user}, {
                $set: {
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  role: role,
                  status: status
                }
            }).then(() => {
                return res.status(200).json({message: 'User updated successfully'})
            })
        }else{
            return res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.user)
        if(user){
            return res.status(200).json({message: "User deleted successfully"})
        }else{
            return res.status(400).json({message: "Failed to delete user"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const addUser = async(req, res) => {
    const {firstname, lname, email, role, status, password} = req.body
    console.log(req.body)
    if(!firstname || !lname || !email || !role || !status || !password){
        return res.status(400).json({status:'error',message: "All Fields are Required"})
    }
    
    try {
        const user = await UserModel.findOne({email: email})
        if(!user){
           const newUser = await UserModel({
             firstname: firstname,
             lastname: lname,
             email: email,
             role: role,
             status: status,
             password: password,
           })
           newUser.save().then(() => {
             return res.status(200).json({status: 'OK', message:"User saved successfully"})
           })
        }else{
            return res.status(404).json({status: 'error', message: "User does not exist"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    getUsers,
    editUser,
    deleteUser,
    addUser
}