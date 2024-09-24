import React, { useState, useEffect, useContext } from "react";
// import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { ImPlus, ImFoursquare } from "react-icons/im";
import NavTitle from "./NavTitle";
import {useSelector } from "react-redux";
import { toggleCategory } from "../../../../redux/orebiSlice";
import { baseURL, MSG_VAR } from "../../../../constants";
import { ProductContext } from "../../../../pages/Shop/Shop";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [productCategory, setProductCategory] = useState([])

  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  useEffect(
    () => {
        fetch(`${baseURL}/api/product/category`)
          .then(response => response.json())
          .then(data => setProductCategory(data.categories))
          .catch(error => console.error(error))
    }, [
    productCategory 
        && 
    productCategory.length
  ])

  // const handleToggleCategory = (category) => {
  //   dispatch(toggleCategory(category));
  // };
  
 const {setProductItems, productItems} = useContext(ProductContext)

  const getProductsFromCategory = async (category) => {  
     try {
       const resp = await fetch(`${baseURL}/api/product/${category}`)
       const data = await resp.json()

       if(data.status === MSG_VAR.OK){
         setProductItems(data.data)
       }else{
         console.log(data.message)
         toast.info(data.message)
       }
     } catch (error) {
       console.log(error)
     }
  }

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {productCategory && 
              productCategory.map((item) => (
            <li
              key={item._id}
              
              className="border-b-[1px] cursor-pointer border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <ImFoursquare 
                  onClick={() => getProductsFromCategory(item.catName)} 
                  title={`Display only ${item.catName}`}
              />
              {item.catName}
              {item.icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
