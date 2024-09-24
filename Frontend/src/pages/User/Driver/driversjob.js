import React, { useState } from 'react';
import { Truck, MapPin, Calendar, Clock, Package, DollarSign, CheckCircle, XCircle, User } from 'lucide-react';

// Mock data for job requests
const initialJobRequests = [
  {
    id: 1,
    from: 'Warehouse A',
    to: 'Farm B',
    farmerName: 'John Doe',
    farmerLocation: { lat: 34.0522, lng: -118.2437 },
    date: '2024-09-06',
    startTime: '08:00 AM',
    estimatedDuration: '2h 30m',
    cargo: 'Agricultural Supplies',
    weight: '2,500 kg',
    payment: '$180',
  },
  {
    id: 2,
    from: 'Farm C',
    to: 'Distribution Center D',
    farmerName: 'Jane Smith',
    farmerLocation: { lat: 40.7128, lng: -74.0060 },
    date: '2024-09-07',
    startTime: '10:00 AM',
    estimatedDuration: '1h 45m',
    cargo: 'Fresh Produce',
    weight: '1,800 kg',
    payment: '$150',
  },
];

const MapPlaceholder = ({ location }) => (
  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-4">
    <p className="text-gray-500">Map View: {location.lat}, {location.lng}</p>
  </div>
);

const JobCard = ({ job, onAccept, onDecline, onMarkDone, isRequest }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">{job.from} to {job.to}</span>
        <span className="text-gray-500">{job.date}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Clock className="mr-2 text-gray-500" size={16} />
          <span>{job.startTime} ({job.estimatedDuration})</span>
        </div>
        <div className="flex items-center">
          <Package className="mr-2 text-gray-500" size={16} />
          <span>{job.cargo}</span>
        </div>
        <div className="flex items-center">
          <Truck className="mr-2 text-gray-500" size={16} />
          <span>{job.weight}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-2 text-gray-500" size={16} />
          <span>{job.payment}</span>
        </div>
        <div className="flex items-center col-span-2">
          <User className="mr-2 text-gray-500" size={16} />
          <span>Farmer: {job.farmerName}</span>
        </div>
      </div>
      <button 
        onClick={() => setShowMap(!showMap)} 
        className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showMap ? 'Hide Map' : 'Show Farmer Location'}
      </button>
      {showMap && <MapPlaceholder location={job.farmerLocation} />}
      <div className="flex justify-end">
        {isRequest ? (
          <>
            <button 
              onClick={() => onAccept(job.id)} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Accept
            </button>
            <button 
              onClick={() => onDecline(job.id)} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Decline
            </button>
          </>
        ) : (
          <button 
            onClick={() => onMarkDone(job.id)} 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

const DriverJobs = () => {
  const [jobRequests, setJobRequests] = useState(initialJobRequests);
  const [acceptedJobs, setAcceptedJobs] = useState([]);

  const handleAccept = (jobId) => {
    const acceptedJob = jobRequests.find(job => job.id === jobId);
    setAcceptedJobs([...acceptedJobs, acceptedJob]);
    setJobRequests(jobRequests.filter(job => job.id !== jobId));
  };

  const handleDecline = (jobId) => {
    setJobRequests(jobRequests.filter(job => job.id !== jobId));
  };

  const handleMarkDone = (jobId) => {
    setAcceptedJobs(acceptedJobs.filter(job => job.id !== jobId));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Jobs</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Requests</h2>
        {jobRequests.length > 0 ? (
          jobRequests.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onAccept={handleAccept} 
              onDecline={handleDecline} 
              isRequest={true} 
            />
          ))
        ) : (
          <p className="text-gray-500">No new job requests at the moment.</p>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Accepted Jobs</h2>
        {acceptedJobs.length > 0 ? (
          acceptedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onMarkDone={handleMarkDone} 
              isRequest={false} 
            />
          ))
        ) : (
          <p className="text-gray-500">No accepted jobs at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DriverJobs;