import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  background1, // Import your background image here
} from "../../assets/images";
import Image from "../designLayouts/Image";

const banner1 = "bannerImgOne.jpg"

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Center vertically
      padding:"50px",
      
    }}
  >
    <div
      style={{
        maxWidth: "450px", // Adjust the maxWidth as needed
        marginRight: "100px", // Add margin between text/button and image
        position: "absolute", // Position text absolutely within the slide
        maxWidth: "450px", // Adjust as needed
        marginRight: "100px", // Space between text/button and image
        top: "300%", // Vertical center
        left: "10%", // Adjust horizontal position
        transform: "translateY(-50%)", // Vertical center
        textAlign: "left", // Adjust text alignment
      }}
    >
      <h1
        style={{
          marginBottom: "15px",
          fontSize: "2.5rem", // Adjust the font size as needed
          color: "#ffffff", // Black color
          fontWeight: "700",
        }}
      >
        {text}
      </h1>
      <p
        style={{
          marginBottom: "25px",
          fontSize: "1.5rem", // Adjust the font size as needed
          color: "#fff", // Gray color
          opacity:"0.8"
        }}
      >
        {Subtext}
      </p>

      <Link to={buttonLink}>
        <button className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
          {buttonText}
        </button>
      </Link>
    </div>

    {imgSrc && (
      <div style={{ marginLeft: "100px" }}>
        <Image imgSrc={imgSrc} />
      </div>
    )}
  </div>
);

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "1%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: banner1,
      text: "Buy Directly from Local Farms and Empower Communities",
      Subtext: "Support sustainable agriculture",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgOne,
      text: "Farm-Fresh Produce Delivered to Your Doorstep",
      Subtext: "Enjoy the taste of nature with produce harvested just for you",
      buttonLink: "/shop",
      buttonText: "About-us",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Efficiency Redefined",
      Subtext: "Choose Organic, Eat Healthy",
      buttonLink: "/contact",
      buttonText: "Shop now",
    },
  ];

  return (
    <div
      className="w-full bg-white"
      style={{
        backgroundImage: `url(${background1})`, // Set background image here
        backgroundSize: "cover", // Ensure the background image covers the entire area
        backgroundPosition: "center", // Center the background image
        height: '90vh'
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;