const {UserModel} = require('../models/app-models')

async function getLoggedUserInfo(req, res) {
    try {
        const userId = req.query.user
        const user = await UserModel.findOne({_id: userId})

        if(!userId){
            return res.status(400).json({message: 'Request parameters is required'});
        }else{
            if(!user){
                return res.status(404).json({status: 'error', message: 'Account not found'});
            }else{
                return res.status(200).json({status: 'OK', data: user})
            }
        }
    } catch (error) {
        throw new Error("Server Error occured: " + error.message)
    }
}


async function updateProfilePicture(req, res) {
    const olduser = await UserModel.findOne({_id: req.params.uid})

    if(!olduser){
        return res.status(404).json({message: 'Account not found'});
    }

    try {
        if(!req.file){
            return res.status(400).json({status: 'error', message: 'No file selected'});
        }else {
            olduser.profile = req.file.filename 
            await olduser.save().then(() => {
                return res.status(200).json({message: "You have successfully updated your profile", status:"OK", picture: olduser.profile})
            })
        }
    } catch (error) {
        throw new Error("Server Error occured: " + error.message)
    }
}

module.exports = {
    getLoggedUserInfo,
    updateProfilePicture
}