import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";
import { baseURL } from "../../constants";



const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [productCategory, setProductCategory] = useState([])


  const handleTabClick = (tabId) => {

  };

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo.ficheTech]);

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

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full "
              src={`${baseURL}/uploads/${productInfo.img}`}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo 
               productInfo={productInfo} 
               productCategory={productCategory}
            />
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
