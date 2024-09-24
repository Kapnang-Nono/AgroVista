import React from "react";
import { baseURL } from "../../constants";

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={`${baseURL}/uploads/${imgSrc}`} alt={imgSrc} />;
};

export default Image;
