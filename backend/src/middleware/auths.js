const validatePasword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d)(.{8,})$/
    return passwordRegex.test(password)
}

const validateData = async (req, res, next) => {
    const {
       email, password, cpass, role,lastname, firstname
    } = req.body

    // console.log(req.body);
    

    if(!email){
        return res.status(400).json({status: 'error', message: "Email is required"})
    }
    if(!firstname){
        return res.status(400).json({status: 'error', message: "First name is required"})
    }
    if(!lastname){
        return res.status(400).json({status: 'error', message: "Last name is required"})
    }
    if(!password){
        return res.status(400).json({status: 'error', message: "Password is required"})
    }
    if(!cpass || cpass === ""){
        return res.status(400).json({status: 'error', message: "Please Confirm Password"})
    }
    if(!role || role === ""){
        return res.status(400).json({status: 'error', message: "Please user role is required"})
    }
    if(!validatePasword(password)){
        return res.status(400).json({status: 'error', message: `
            Password must be at least 8 characters long and contain at least 1 uppercase letter, 
            1 lowercase letter, 3 digits, and 1 symbol
        `})
    }
    if(cpass.length !== password.length){
        return res.status(400).json({status: 'error', message: "Invalid Password length"})
    }
    if(cpass !== password){
        return res.status(400).json({status: 'error', message: "Password does not match"})
    }

    return next()
}


module.exports = {
    validateData
}