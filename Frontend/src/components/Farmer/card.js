import React from 'react';

const Card = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Card;
