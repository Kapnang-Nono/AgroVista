import React, { useState } from 'react';
import { Search, Phone, MoreVertical, Paperclip, Mic, Send } from 'lucide-react';

const ConsultantSelection = ({ consultants, onSelectConsultant }) => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Chat with a Consultant</h1>
        <div className="flex flex-col space-y-4">
          {consultants.map(consultant => (
            <div 
              key={consultant.id} 
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow w-full md:w-5/6 lg:w-4/5 "
              onClick={() => onSelectConsultant(consultant)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {consultant.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{consultant.name}</h2>
                  <p className="text-sm text-gray-500">{consultant.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{consultant.bio}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  consultant.status === 'online' ? 'bg-green-100 text-green-800' : 
                  consultant.status === 'online' ? 'bg-yellow-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {consultant.status}
                </span>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Chat Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
const ConsultantChat = ({ selectedConsultant, onBackToSelection }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: selectedConsultant.name, content: 'Hello! How can I assist you today?', time: '09:30' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        sender: 'You', 
        content: inputMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onBackToSelection} className="mr-4 text-green-500 hover:text-green-600">
            ← Back
          </button>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {selectedConsultant.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-semibold">{selectedConsultant.name}</p>
            <p className="text-sm text-gray-500">{selectedConsultant.status}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Phone className="text-gray-500 cursor-pointer" />
          <MoreVertical className="text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs ${message.sender === 'You' ? 'bg-green-500 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
              <p>{message.content}</p>
              <p className="text-xs text-right mt-1 opacity-75">{message.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex items-center bg-gray-100 rounded-full p-2">
          <input 
            className="flex-1 bg-transparent outline-none"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="flex space-x-2">
            <Paperclip className="text-gray-500 cursor-pointer" />
            <Mic className="text-gray-500 cursor-pointer" />
            <Send className="text-green-500 cursor-pointer" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ConsultantPage = () => {
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  
  const consultants = [
    { id: 1, name: 'Alex Johnson', specialty: 'Financial Planning', status: 'online', bio: 'Expert in cropm selection, planting techniques and harvest methods.' },
    { id: 2, name: 'Sarah Smith', specialty: 'Career Counseling', status: 'Online', bio: 'Expert in soil testing, analysis and appropriate soilmanaging practices.' },
    { id: 3, name: 'Mike Brown', specialty: 'Legal Advice', status: 'offline', bio: 'Specializing in animal husbandry practices.' },
  ];

  const handleSelectConsultant = (consultant) => {
    setSelectedConsultant(consultant);
  };

  const handleBackToSelection = () => {
    setSelectedConsultant(null);
  };

  return (
    <div>
      {selectedConsultant ? (
        <ConsultantChat 
          selectedConsultant={selectedConsultant} 
          onBackToSelection={handleBackToSelection}
        />
      ) : (
        <ConsultantSelection 
          consultants={consultants} 
          onSelectConsultant={handleSelectConsultant}
        />
      )}
    </div>
  );
};

export default ConsultantPage;