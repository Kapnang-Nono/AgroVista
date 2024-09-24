import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { getAllProducts } from "../../redux/orebiSlice";

export const ProductContext = createContext({
   productItems: [],
   setProductItems: () => {}
})


const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage); 
  };

  const [shopData, setProductItems] = useState([])
  const {allProducts} = useSelector((state) => state.orebiReducer)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(
      getAllProducts()
   )
   setProductItems(allProducts)
}, [allProducts && allProducts.length])



  return (
    <div className="max-w-container mx-auto px-4">
      {/* <Breadcrumbs title="Products" /> */}
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
          <ProductContext.Provider value={{productItems: shopData, setProductItems}}>
              <div className="w-[20%] lgl:w-[20%] hidden mdl:inline-flex h-full">
                  <ShopSideNav />
              </div>
              <div className="w-full mdl:w-[100%] lgl:w-[100%] h-full flex flex-col gap-10">
                <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
                <Pagination 
                  itemsPerPage={itemsPerPage} 
                />
              </div>
          </ProductContext.Provider>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
