import React, { useEffect, useState } from 'react';
import { Star, MapPin, Search } from 'lucide-react';
import { Profile1 } from '../../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers } from '../../../redux/orebiSlice';
import { baseURL } from '../../../constants';

const DriverCard = ({ firstname, location, rating, profile, lastname }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-sm mx-auto">
    <img src={`${baseURL}/profile/${profile}`} alt={firstname} className="w-40 h-40 mb-4 object-cover" />
    <h3 className="font-semibold text-xl mb-2">{firstname} {lastname}</h3>
    <div className="flex items-center mb-3">
      <MapPin size={18} className="text-gray-500 mr-1" />
      <span className="text-sm text-gray-600">{location}</span>
    </div>
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
    <div className="flex flex-col space-y-3 w-full">
      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-sm">
        View Profile
      </button>
      <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-sm">
        Book Now
      </button>
    </div>
  </div>
);

const DriverListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()
  const {driverList} = useSelector((state) => state.orebiReducer)

  useEffect(() => {
      dispatch(getDrivers())
  }, [driverList && 
    driverList.length
  ])

  const filteredDrivers = driverList.filter(driver =>
    driver.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.lastname.toLowerCase().includes(searchTerm.toLowerCase()) 
    // driver.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Available Drivers</h2>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search drivers by name"
          className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDrivers.map((driver, index) => (
          <DriverCard key={index} {...driver} />
        ))}
      </div>
    </div>
  );
};

export default DriverListing;
