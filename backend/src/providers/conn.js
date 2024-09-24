//Establishing mongodb database connection
const mongoose = require('mongoose')

const establishConnection =  () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        })
           .then(() => {
              console.log("Connection to database successfull");
           })
    } catch (error) {
        console.log("Connection to database failed");
    }
}


module.exports = {
    establishConnection
}