import React, { useState, useEffect } from 'react';

import { initialEquipmentList } from '../../../mock/equipments';

// Simulated data for equipment list with image placeholders


const Equipments = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    equipmentType: '',
    startDate: '',
    endDate: '',
    priceRange: '',
  });

  const [equipmentList, setEquipmentList] = useState(initialEquipmentList);
  const [filteredEquipment, setFilteredEquipment] = useState(initialEquipmentList);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [bookingDates, setBookingDates] = useState({ startDate: '', endDate: '' });
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = equipmentList.filter(equipment => {
      return (
        (searchParams.location === '' || equipment.location.toLowerCase().includes(searchParams.location.toLowerCase())) &&
        (searchParams.equipmentType === '' || equipment.type.toLowerCase().includes(searchParams.equipmentType.toLowerCase())) &&
        (searchParams.priceRange === '' || equipment.price <= parseInt(searchParams.priceRange))
      );
    });
    setFilteredEquipment(filtered);
  };

  const handleBookNow = (equipment) => {
    setSelectedEquipment(equipment);
    setIsBookingDialogOpen(true);
  };

  const handleBookingDateChange = (e) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = () => {
    console.log('Booking confirmed:', { equipment: selectedEquipment, ...bookingDates });
    setToast({ 
      show: true, 
      message: `Booking Confirmed: You have booked ${selectedEquipment.name} from ${bookingDates.startDate} to ${bookingDates.endDate}.` 
    });
    setIsBookingDialogOpen(false);
    setSelectedEquipment(null);
    setBookingDates({ startDate: '', endDate: '' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Equipment Rental</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={searchParams.location}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          name="equipmentType"
          placeholder="Equipment Type"
          value={searchParams.equipmentType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={searchParams.startDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={searchParams.endDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          name="priceRange"
          placeholder="Max Price"
          value={searchParams.priceRange}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <button 
        onClick={handleSearch} 
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-8"
      >
        Search Equipment
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEquipment.map(equipment => (
          <div key={equipment.id} className="border rounded-md p-4 shadow-md bg-white">
            <img 
              src={equipment.image} 
              alt={equipment.name}
              className="w-full h-48 object-cover mb-4 cursor-pointer"
              onClick={() => handleImageClick(equipment.image)}
            />
            <h2 className="text-xl text-green-500 font-semibold mb-2">{equipment.name}</h2>
            <p className="mb-1">Location: {equipment.location}</p>
            <p className="mb-1">Type: {equipment.type}</p>
            <p className="mb-2">Price: Fcfa{equipment.price}/day</p>
            <button 
              onClick={() => handleBookNow(equipment)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {isBookingDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Book Equipment</h2>
            {selectedEquipment && (
              <div>
                <img 
                  src={selectedEquipment.image} 
                  alt={selectedEquipment.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <p>You are booking: {selectedEquipment.name}</p>
                <p>Price: Fcfa{selectedEquipment.price}/day</p>
                <div className="mt-4">
                  <label className="block mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingDates.startDate}
                    onChange={handleBookingDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingDates.endDate}
                    onChange={handleBookingDateChange}
                    min={bookingDates.startDate}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsBookingDialogOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBooking}
                className="bg-green-100 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4" onClick={() => setIsImageModalOpen(false)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Equipment" className="w-full h-auto" />
            <button 
              onClick={() => setIsImageModalOpen(false)}
              className="mt-4 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Equipments;