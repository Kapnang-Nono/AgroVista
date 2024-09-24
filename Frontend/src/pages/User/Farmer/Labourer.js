import React, { useState, useEffect } from 'react';
import { worker1, worker2, worker3, worker4, worker5 } from '../../../assets/images';


// Simulated data for laborer list with image placeholders
const initialLaborerList = [
  { id: 1, name: "John Doe", skill: "Machinery Operation", location: "Yaounde", rate: 25, image: worker1 },
  { id: 2, name: "Jane Smith", skill: "Irrigation Knowledge", location: "Yaounde", rate: 30, image: worker2 },
  { id: 3, name: "Mike Johnson", skill: "Harvester", location: "Yaounde", rate: 28, image: worker3 },
  { id: 3, name: "Mike Johnson", skill: "Mower", location: "Yaounde", rate: 28, image: worker4 },
  { id: 3, name: "Mike Johnson", skill: "Soil Preparation", location: "Yaounde", rate: 28, image: worker5 },

  // Add more laborers as needed
];

const Laborers = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    skill: '',
    startDate: '',
    endDate: '',
    maxRate: '',
  });

  const [laborerList, setLaborerList] = useState(initialLaborerList);
  const [filteredLaborers, setFilteredLaborers] = useState(initialLaborerList);
  const [selectedLaborer, setSelectedLaborer] = useState(null);
  const [hiringDates, setHiringDates] = useState({ startDate: '', endDate: '' });
  const [isHiringDialogOpen, setIsHiringDialogOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = laborerList.filter(laborer => {
      return (
        (searchParams.location === '' || laborer.location.toLowerCase().includes(searchParams.location.toLowerCase())) &&
        (searchParams.skill === '' || laborer.skill.toLowerCase().includes(searchParams.skill.toLowerCase())) &&
        (searchParams.maxRate === '' || laborer.rate <= parseInt(searchParams.maxRate))
      );
    });
    setFilteredLaborers(filtered);
  };

  const handleHireNow = (laborer) => {
    setSelectedLaborer(laborer);
    setIsHiringDialogOpen(true);
  };

  const handleHiringDateChange = (e) => {
    const { name, value } = e.target;
    setHiringDates(prev => ({ ...prev, [name]: value }));
  };

  // Simulated function to send a request to the laborer
  const sendRequestToLaborer = async (laborer, startDate, endDate) => {
    setIsLoading(true);
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // In a real application, you would send an actual request to your backend here
    console.log(`Request sent to ${laborer.name} for work from ${startDate} to ${endDate}`);
    return true; // Simulate successful request
  };

  const handleConfirmHiring = async () => {
    if (!hiringDates.startDate || !hiringDates.endDate) {
      setToast({ 
        show: true, 
        message: "Please select both start and end dates." 
      });
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
      return;
    }

    const success = await sendRequestToLaborer(selectedLaborer, hiringDates.startDate, hiringDates.endDate);
    
    if (success) {
      setToast({ 
        show: true, 
        message: `Request sent to ${selectedLaborer.name} for work from ${hiringDates.startDate} to ${hiringDates.endDate}.` 
      });
      setIsHiringDialogOpen(false);
      setSelectedLaborer(null);
      setHiringDates({ startDate: '', endDate: '' });
    } else {
      setToast({ 
        show: true, 
        message: "There was an error sending the request. Please try again." 
      });
    }
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
      <h1 className="text-2xl font-bold mb-4">Laborer Hiring</h1>
      
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
          name="skill"
          placeholder="Skill"
          value={searchParams.skill}
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
          name="maxRate"
          placeholder="Max Hourly Rate"
          value={searchParams.maxRate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <button 
        onClick={handleSearch} 
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-8"
      >
        Search Laborers
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredLaborers.map(laborer => (
          <div key={laborer.id} className="border rounded-md p-4 shadow-md bg-white">
            <img 
              src={laborer.image} 
              alt={laborer.name}
              className="w-full h-48 object-cover mb-4 cursor-pointer"
              onClick={() => handleImageClick(laborer.image)}
            />
            <h2 className="text-xl text-green-500 font-semibold mb-2">{laborer.name}</h2>
            <p className="mb-1">Location: {laborer.location}</p>
            <p className="mb-1">Skill: {laborer.skill}</p>
            <p className="mb-2">Hourly Rate: ${laborer.rate}</p>
            <button 
              onClick={() => handleHireNow(laborer)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Hire Now
            </button>
          </div>
        ))}
      </div>

      {isHiringDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Hire Laborer</h2>
            {selectedLaborer && (
              <div>
                <img 
                  src={selectedLaborer.image} 
                  alt={selectedLaborer.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <p>You are hiring: {selectedLaborer.name}</p>
                <p>Hourly Rate: ${selectedLaborer.rate}</p>
                <div className="mt-4">
                  <label className="block mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={hiringDates.startDate}
                    onChange={handleHiringDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={hiringDates.endDate}
                    onChange={handleHiringDateChange}
                    min={hiringDates.startDate}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsHiringDialogOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmHiring}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? 'Sending Request...' : 'Confirm Hiring'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4" onClick={() => setIsImageModalOpen(false)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Laborer" className="w-full h-auto" />
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

export default Laborers;