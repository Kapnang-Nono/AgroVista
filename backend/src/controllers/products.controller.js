const {Product, Category} = require("../models/app-models.js")


async function addProduct(req, res){
    let {prodName, prodCategory, prodPrice, prodImage} = req.body 
    console.log("body request: ", req.body)
    prodCategory = prodCategory.toLowerCase()
    
    // return
    if(!prodName || !prodCategory || !prodPrice){
        return res.status(200).json({status: 'error', message: "All fields are mandatory"})
    }
    if(!req.file){
        return res.status(400).json({status:'error', message: "Upload an image for the product"})
    }

    try {
        const oldProduct = await Product.findOne({prodName})
        if(oldProduct){
            return res.status(400).json({status:'error', message: 'Product name already exist'})
        }else{
            const newProduct = new Product({prodName, prodCategory, prodPrice, prodImage: req.file.filename})
            await newProduct.save()
            .then(() => {
                return res.status(201).json({
                    status: 'OK',
                    message: `Product ${prodName} added successfully`,
                })
            })
        }
    } catch (error) {
       console.log(error.stack)
       throw new Error("Server error occured: ", error) 
    }
}

async function getProducts(req, res){
  try {
     const products = await Product.find()
     if(products && products.length > 0){
        return res.status(200).json({status:'OK', data:{data:{products: products}}})
     }else{
        return res.status(404).json({status:'error', data: [], message: 'No products found'})
     }
  } catch (error) {
    throw new Error("Server error occured: ", error) 
  }
}


async function deleteProduct(req, res){
    const {prodID} = req.params
    try {
       const product = await Product.findById(prodID)
       if(product){
          await Product.deleteOne({_id: prodID})
          .then(() => {
            return res.status(200).json({status:'OK', message: 'product deleted successfully'})
          })
       }else{
          return res.status(404).json({status:'error', message: 'Product not found'})
       }
    } catch (error) {
      throw new Error("Server error occured: ", error) 
    }
  }

 
  async function updateProduct(req, res){
    const body = req.body
    const {productId} = req.params
    
    try {
       const productImageName = req.file && req.file.filename;
       const product = await Product.findByIdAndUpdate(
         productId,
         {
            ...body,
            prodImage: productImageName
         },
         {new: true}
       )
       if(product){
         return res.status(200).json({status:'OK', message: 'product updated successfully'})
       }
       else{
          return res.status(404).json({status:'error', message: 'product not found'})
       }
    } catch (error) {
        console.log(error)
      throw new Error("Server error occured: ", error) 
    }
  }

async function getCategory(req, res) {
   try {
    const categories = await Category.find()
     const result = categories.length > 0 && categories

     return res.json({categories: result})
   } catch (error) {
    throw new Error("Server error occured: ", error)
   }
}

async function getProductCategory(req, res){
    let category = req.params.category.toLowerCase()
    try {
      if(!category){
         return res.json({status: '404', message: 'Category not found'})
      }
      const data = await Product.find({prodCategory: category})
      if(data && data.length > 0){
          return res.json({status: 'OK', data: data})
      }else{
         return res.status(404).json({status: '404', message: `No products found for category ${category}`})
      }
    } catch (error) {
       return res.status(500).json({status: '500', message:"server error"})
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getCategory,
    getProductCategory
}