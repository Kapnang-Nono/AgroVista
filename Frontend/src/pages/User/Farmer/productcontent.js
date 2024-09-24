import React, { useState, useEffect, createContext, useContext } from 'react';
import { Trash2, Edit, Plus, X, Search } from 'lucide-react';
import { baseURL, MSG_VAR } from '../../../constants';

const ProductContextAPI = createContext({product: {},
  setProduct: () => {},
})

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full">
      <thead>
        <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Category</th>
          <th className="py-3 px-6 text-left">Price</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        {products.map((product) => (
          <tr key={product._id} className="border-b border-gray-200 hover:bg-green-100">
            <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{product.prodName}</td>
            <td className="py-3 px-6 text-left">
              <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                {product.prodCategory}
              </span>
            </td>
            <td className="py-3 px-6 text-left">Fcfa{parseFloat(product.prodPrice).toFixed()}</td>
            <td className="py-3 px-6 text-center">
              <div className="flex item-center justify-center">
                <button onClick={() => onEdit(product)} className="text-purple-500 hover:text-purple-600 mx-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => onDelete(product._id)} className="text-red-500 hover:text-red-600 mx-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductForm = ({ 
  onSubmit,
  onClose, 
  message, 
  status, 
  btnName,
  onEdit,
  updateProduct
 }) => {
  const [formProduct, setFormProduct] = useState({
    prodName: "", prodCategory:"", prodPrice: "", prodImage: "", _id:""
  })

  const {product} = useContext(ProductContextAPI) //get context API data

  const OnChange = (e) => {
    const {name, value} = e.target
    setFormProduct((prevData) => ({
      ...prevData,
      [name]:value
    }))
    
  }

  const handleUpload = (e) => {
    const selectedImage = e.target.files[0]
    setFormProduct((prevData) => ({
      ...prevData,
      prodImage: selectedImage
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(btnName === "Add Product"){
       onSubmit(formProduct);
    }else if(btnName === "Update Product"){
       updateProduct(formProduct)
    }
  };

  useEffect(
     () => {
       setFormProduct(product)
  }, [product])

  return (
    <div className="fixed inset-0 bg-green-100 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
          <button onClick={onClose} className="text-green-600 hover:text-green-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name='prodName'
              value={formProduct.prodName}
              onChange={OnChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="prodCategory"
              value={formProduct.prodCategory}
              name='prodCategory'
              onChange={OnChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="vegetables">Vegetables</option>
              <option value="livestock">Livestock</option>
              <option value="roots">Roots</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="prodPrice"
              value={formProduct.prodPrice}
              name='prodPrice'
              onChange={OnChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="prodImage"
              name='prodImage'
              onChange={handleUpload}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>
          <div className="flex items-start justify-between">
            <span className={`text-[13px] pt-3 ${status === MSG_VAR.OK ? 'text-green-600': 'text-red-600'}`}>{message}</span>
            <button
              type="submit"
              className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              {btnName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState()
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [product, setProduct] = useState()
  const [buttonName, setButtonName] = useState("Add Product")

  useEffect(() => {
    const results = products.filter(product =>
      product.prodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.prodCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [products, searchTerm]);

  useEffect(
    () => {
      const getproducts = async () => {
        try {
          const req = await fetch(`${baseURL}/api/product`)
         const resp = await req.json()
         if(resp.status === MSG_VAR.OK){
            setProducts(resp.data.data.products)
         }else{
          console.log(resp.message)
         }
        } catch (error) {
          console.log(error)
        }
      }
      getproducts()
    }, [
    products && 
    products.length
  ])



  /* @Rufus api */
  const handleAddProduct = async (newProduct) => {
    const formData = new FormData()
    formData.append('prodName', newProduct.prodName)
    formData.append('prodCategory', newProduct.prodCategory)
    formData.append('prodPrice', newProduct.prodPrice)
    formData.append('file', newProduct.prodImage)
   
    try {
        const req = await fetch(`${baseURL}/api/product/add`, {
           method: 'POST',
           body: formData
        })
        const resp = await req.json()
        const {status, message} = resp

        if(status === MSG_VAR.ERROR){
          setMessage(message)
          setStatus(status)
        }else{
          setMessage(message)
          setStatus(status)
          setTimeout(() => {
            setIsFormOpen(false)
            window.location.reload()
          }, 1000)
        }
    } catch (error) {
      console.log(error)
    }
  };


  const handleEditProduct = async (product) => {
      setIsFormOpen(true)
      setProduct(product) //Sets context API object
      setButtonName('Update Product')
  };

  const updateProduct = async (product) => {
    const formData = new FormData()
    formData.append('prodName', product.prodName)
    formData.append('prodCategory', product.prodCategory)
    formData.append('prodPrice', product.prodPrice)
    formData.append('file', product.prodImage ? `${baseURL}/uploads/products/${product.prodImage}` : null)

    try {
      const req = await fetch(`${baseURL}/api/product/update/${product._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
     })
     const resp = await req.json()
     const {status, message} = resp
     if(status === MSG_VAR.ERROR){
       setMessage(message)
       setStatus(status)
     }else{
       setStatus(status)
       setMessage(message)
       setTimeout(() => {
        setProduct({prodName:"", prodCategory:"", prodImage:"", prodPrice:""})
        window.location.reload()
       }
       , 1000)
     }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async (id) => {
    setButtonName('Add Product')
    try {
      const req = await fetch(`${baseURL}/api/product/delete/${id}`, {method: 'DELETE'})
      const resp = await req.json()

      if(status === MSG_VAR.ERROR){
        console.log(resp.message)
      }else{
        alert(resp.message)
        setTimeout(() => window.location.reload(), 1000)
      }
  } catch (error) {
    console.log(error)
  }
  };

  const closeForm = () => {
    setIsFormOpen(false)
    setMessage("")
    setStatus("")
    setProduct({prodName:"", prodCategory:"", prodImage:"", prodPrice:""}) // clear context API object
    setButtonName("Add Product")
  }

  const showForm = () => {
    setIsFormOpen(true)
    setProduct({prodName:"", prodCategory:"", prodImage:"", prodPrice:""})
  }

  return (
    <div className="container w-[full] p-6  min-h-screen">
       <ProductContextAPI.Provider value={{product, setProduct}}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
              <button
                onClick={showForm}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <ProductTable
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
          {isFormOpen && (
            <ProductForm
              onSubmit={handleAddProduct}
              onClose={closeForm}
              message={message}
              status={status}
              btnName={buttonName}
              updateProduct={updateProduct}
            />
          )}
       </ProductContextAPI.Provider>
    </div>
  );
};

export default ProductsContent;