const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   email: {type: String, unique: true, required: true},
   password: {type: String, required: true},
   lastname: {type: String,},
   firstname: {type: String,},
   role: {type: String, required: true},
   profile: {type: String,},
   location: {type: String,},
   status: {type: String,},
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    prodName: {type: String, unique: true, required: true},
    prodCategory: {type: String, required: true},
    prodPrice: {type: String, required: true},
    prodImage: {type: String, required: true},
    description: {type: String}
}, {timestamps: true})

const productCategorySchema = new mongoose.Schema({
    catName: {type: String, required: true},
    // catDescription: {type: String, required: true},
}, {timestamps: true})

const ContactSchema = new mongoose.Schema({
    user: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
}, {timestamps: true})

const OrderSchema = new mongoose.Schema({
    customerName: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true, default: 'pending'},
    products: {type: [String], required: true,},
    prodNumber: {type: Number, required: true},
    payment: {type: String, required: true, default: 'Due'},
    actions: {
        type: {type: String, required: true},
        paymentMethod: {type: String, required: true},
        dateTime: {type: Date, required: true}
    },
}, {timestamps: true})


const UserModel = mongoose.model("users", userSchema)
const Product = mongoose.model('products', productSchema)
const Category = mongoose.model('categories', productCategorySchema)
const Contact = mongoose.model('contact', ContactSchema)
const Order = mongoose.model('orders', OrderSchema)

module.exports = {
    UserModel,
    Product,
    Category,
    Contact,
    Order
}