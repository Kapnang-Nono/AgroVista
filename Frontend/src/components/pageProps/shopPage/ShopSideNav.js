import React from "react";
import Category from "./shopBy/Category";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={true} />
    </div>
  );
};

export default ShopSideNav;
