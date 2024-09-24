import React, { useState } from 'react';

// Mock data for appointments
const initialAppointments = [
  { id: 1, farmerName: "John Doe", date: "2024-09-10", time: "10:00 AM", status: "pending" },
  { id: 2, farmerName: "Jane Smith", date: "2024-09-11", time: "2:00 PM", status: "accepted" },
  { id: 3, farmerName: "Bob Johnson", date: "2024-09-12", time: "11:30 AM", status: "pending" },
];

const AppointmentCard = ({ appointment, onAccept, onReject, onCancel, onChat }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 ">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{appointment.farmerName}</h3>
        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
      </div>
      <div className="flex space-x-2">
        {appointment.status === 'pending' && (
          <>
            <button 
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" 
              onClick={() => onAccept(appointment.id)}
            >
              Accept
            </button>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" 
              onClick={() => onReject(appointment.id)}
            >
              Reject
            </button>
          </>
        )}
        {appointment.status === 'accepted' && (
          <>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" 
              onClick={() => onCancel(appointment.id)}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" 
              onClick={() => onChat(appointment)}
            >
              Chat
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const ChatInterface = ({ farmer, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'consultant' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg mt-4 p-4]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Chat with {farmer.farmerName}</h3>
        <button 
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="h-64 overflow-y-auto mb-4 p-2 bg-gray-100 rounded">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'consultant' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'consultant' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const Consultations = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState('pending');
  const [activeChat, setActiveChat] = useState(null);

  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const handleAccept = (id) => updateAppointmentStatus(id, 'accepted');
  const handleReject = (id) => updateAppointmentStatus(id, 'rejected');
  const handleCancel = (id) => updateAppointmentStatus(id, 'cancelled');
  const handleChat = (appointment) => setActiveChat(appointment);

  const filteredAppointments = appointments.filter(app => {
    if (activeTab === 'pending') return app.status === 'pending';
    if (activeTab === 'accepted') return app.status === 'accepted';
    if (activeTab === 'past') return app.status === 'cancelled' || app.status === 'rejected';
    return true;
  });

  return (
    <div style={{height: '590px'}}className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Consultations</h2>
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>
      {filteredAppointments.map(appointment => (
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
          onChat={handleChat}
        />
      ))}
      {activeChat && (
        <ChatInterface 
          farmer={activeChat} 
          onClose={() => setActiveChat(null)} 
        />
      )}
    </div>
  );
};

export default Consultations;