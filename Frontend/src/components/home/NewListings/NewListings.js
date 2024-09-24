import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  newArrFive
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { getAllProducts } from "../../../redux/orebiSlice";

const NewListings = () => {
  const {allProducts} = useSelector((state) => state.orebiReducer)
  const dispatch = useDispatch() 

useEffect(
  () => {
     dispatch(
       getAllProducts()
     )
  }, [
   allProducts 
     && 
   allProducts.length 
])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const totalProducts = allProducts && allProducts.length
  const five = 5
  const difference = totalProducts - five
  const last_5_products = allProducts && allProducts.slice(difference, totalProducts.length)



  return (
    <div className="w-full pb-16">
      <Heading heading="Latest Listings" />
      <Slider {...settings}>
        <div className="px-2">
          <Product
            _id={last_5_products[0]._id}
            img={last_5_products[0].prodImage}
            productName={last_5_products[0].prodName}
            price={last_5_products[0].prodPrice}
            badge={true}
            des={last_5_products[0].description}
          />
        </div>
        <div className="px-2">
          <Product
            _id={last_5_products[1]._id}
            img={last_5_products[1].prodImage}
            productName={last_5_products[1].prodName}
            price={last_5_products[1].prodPrice}
            badge={false}
            des={last_5_products[1].description}
          />
        </div>
        <div className="px-2">
          <Product
            _id={last_5_products[2]._id}
            img={last_5_products[2].prodImage}
            productName={last_5_products[2].prodName}
            price={last_5_products[2].prodPrice}
            badge={true}
            des={last_5_products[2].description}
          />
        </div>
        <div className="px-2">
          <Product
            _id={last_5_products[3]._id}
            img={last_5_products[3].prodImage}
            productName={last_5_products[3].prodName}
            price={last_5_products[3].prodPrice}
            badge={true}
            des={last_5_products[3].description}
          />
        </div>
        <div className="px-2">
          <Product
            _id={last_5_products[4]._id}
            img={last_5_products[4].prodImage}
            productName={last_5_products[4].prodName}
            price={last_5_products[4].prodPrice}
            badge={true}
            des={last_5_products[4].description}
          />
        </div>
      </Slider>
    </div>
  );
};

export default NewListings;
