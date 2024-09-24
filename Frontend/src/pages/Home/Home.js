import React from "react";
import Banner from "../../components/Banner/Banner";
import NewListings from "../../components/home/NewListings/NewListings";
import ShopNow from "../../components/designLayouts/buttons/ShopNow";

const Home = () => {
  return (
    <div className="w-full mx-auto">
        <Banner />
      <div className="max-w-container mx-auto px-4">
        <NewListings />
      </div>
    </div>
  );
};

export default Home;
