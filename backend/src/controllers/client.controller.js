const {Contact, Order, UserModel} = require("../models/app-models")

const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  // function to get client contact message on from contact form and sending message to farmer
const handleUserContactMessage = async (req, res) => {
    const {name, email, message} = req.body
    const user = req.params.user
    
    try {
        if(!user || user === ""){
            return res.status(400).json({error: "Requester params is missing"})
        }
        if(!name){
            return res.status(400).json({error: "username is required", status:404, title: 'name'})
        }
        if(!email){
            return res.status(400).json({error: "Email is required", status:404, title: 'email'})
        }
        if(!EmailValidation(email)){
            return res.status(400).json({error: "Invalid email address", status:404, title: 'email'})
        }
        if(!message){
            return res.status(400).json({error: "Message is required", status:404, title: 'message'})
        }

        const contact = new Contact({ user, name, email, message })
        await contact.save()
          .then(() => {
             return res.status(200).json({status: "OK", message: `Thank you dear ${name}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`})
          })
    } catch (error) {
        return res.sendStatus(500)
    }
}

// Function to create a new order from client to farmer
const newOrder = async (req, res) => {
    const {customerName, amount, status, type, paymentMethod, products, payment} = req.body
    const custId = req.params.custID

    if(!custId){
        return res.status(400).json({message: 'Request parameters is required'})
    }
    if(!customerName || customerName === ""){
        return res.status(400).json({status:'error', message: 'custName must be specified'})
    }
    if(!amount || amount === ""){
        return res.status(400).json({status:'error', message: 'Amount is obligatory'})
    }
    if(!type || type === ""){
        return res.status(400).json({status:'error', message: 'Provide transaction type please'})
    }
    if(!paymentMethod || paymentMethod === ""){
        return res.status(400).json({status:'error', message: 'Payment method must be provided'})
    }
    if(!products || products.length === 0){
        return res.status(400).json({status:'error', message: 'No product added to cart. please select at least one product'})
    }
    if(!payment || payment === ""){
        return res.status(400).json({status:'error', message: 'Payment is required'})
    }

    try {
        const oldUser = await UserModel.findOne({_id: custId})

        if(!oldUser){
            return res.status(404).json({status:'error', message:'user not found'})
        }

        let actions = {
            type: type,
            paymentMethod: paymentMethod,
            dateTime: new Date()
        }
        const newOrderItem = new Order({
            customerName: oldUser.firstname,
            amount: parseInt(amount),
            status,
            products,
            prodNumber:products && products.length,
            payment,
            actions
        })
        await newOrderItem.save()
          .then(() => {
            return res.json({status:"OK", message:"Order has been created successfully"})
        })
    } catch (error) {
        console.log(error)
       return res.status(500).send() 
    }
}


exports.contactMessage = handleUserContactMessage
exports.handleNewOrder = newOrder
