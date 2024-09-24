import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[full] text-xl text-lightText mb-2">
          Welcome to  <span className="text-primeColor font-semibold text-xl text-green-600 " >AgroVista</span>{" "},
          a pioneering platform dedicated to transforming the agricultural landscape for smallholder
          farmers and consumers alike.
          Our mission is to empower smallholder farmers by providing innovative solutions that 
          enable them to make the most of their limited resources while maximizing profitability.
          In an ever-evolving agricultural industry, smallholder farmers often face the challenge
          of operating with insufficient resources, making it difficult to achieve sustainable growth.
          Our portal is designed to bridge this gap by offering a comprehensive suite of tools and resources
          that support farmers in optimizing their production, accessing new markets, and enhancing their profitability.

        </h1>
        <Link to="/shop">
          <button className="bg-green-600 text-white rounded-md px-4 py-2 transition-transform duration-300ms ease-in-out hover:scale-105">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
