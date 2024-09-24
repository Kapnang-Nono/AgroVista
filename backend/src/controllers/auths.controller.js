const {UserModel} = require('../models/app-models')
const hash = require('bcrypt')

async function RegisterUser(req, res){
    let {email, password, role, firstname, lastname} = req.body

     try {
         const isOldUser = await UserModel.findOne({email: email})
         if(isOldUser){
             return res.status(400).json({status: 'error', message: "Account Already in Use. Please create another one"})
         }else{
            const saltRound = 10
             let passwordHash = await hash.hash(password, saltRound)
             await new UserModel({ email, password: passwordHash, role, firstname, lastname })
                .save()
                .then(() => {
                    return res.status(201).json({status: "OK", message: "Account created successfully"})
                })
         }
     } catch (error) {
        console.log(error);
        return res.status(500).send();
     }
}


async function Login (req, res){
    const {
        email, password
    } = req.body

    if(!email){
        return res.status(400).json({status: 'error', message: "Email is required"})
    }
    if(!password){
        return res.status(400).json({status: 'error', message: "Password is required"})
    }

    try {
        const isValidAccount = await UserModel.findOne({email: email})
        if(isValidAccount){
            const correctPassword = await hash.compare(password, isValidAccount.password)
            if(correctPassword){
                const userRole = isValidAccount.role
                const userId = isValidAccount._id
                return res.status(200).json({status: "OK", message: 'Login successfull', data: {
                    role: userRole,
                    userID: userId
                }})
            }else{
                return res.status(400).json({status: 'error', message: "Invalid email or password"})
            }
        }else{
            return res.status(404).json({status: 'error', message: "Account not found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}



module.exports = {
    RegisterUser,
    Login
}