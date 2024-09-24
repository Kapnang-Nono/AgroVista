const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const dbConnector = require('./providers/conn')

const authRoute = require('./routes/auth.route')
const prodRoute = require("./routes/product.route")
const clientRoute = require("./routes/client.route")
const farmerRoute = require("./routes/farmer.route")
const globalRoute = require("./routes/global.routes")
const adminRoute = require("./routes/admin.route")

const PORT = process.env.PORT || 8000
const app = express()



dotenv.config()

//call db connector
 dbConnector.establishConnection()
app.use(cors({origin: "*"}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static("../public/uploads/products"));
app.use('/profile', express.static("../public/uploads/profile-pictures"));


app.use('/api/auths', authRoute)
app.use('/api/product', prodRoute)
app.use('/api/users', clientRoute);
app.use('/api/farmer', farmerRoute);
app.use('/api/global', globalRoute);
app.use('/api/admin', adminRoute);

app.get('*', (req, res) => {
   res.end("Sorry Page Not Found")
})

app.listen(PORT, (err) => {
   if(err) console.log("Error from server launch");
   console.log(`Server is running on port ${PORT}`);
})