import React, { useState } from 'react';

// Mock data for clients
const initialClients = [
  { id: 1, name: "John Doe", farm: "Green Acres", location: "Countryside, CA", crops: ["Corn", "Wheat"], lastContact: "2024-08-30" },
  { id: 2, name: "Jane Smith", farm: "Sunshine Fields", location: "Riverside, OR", crops: ["Apples", "Pears"], lastContact: "2024-09-02" },
  { id: 3, name: "Bob Johnson", farm: "Valley View", location: "Hillside, WA", crops: ["Tomatoes", "Cucumbers"], lastContact: "2024-09-05" },
];

const ClientCard = ({ client, onViewDetails }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{client.name}</h3>
        <p className="text-sm text-gray-600">{client.farm}</p>
        <p className="text-sm text-gray-500">{client.location}</p>
      </div>
      <button 
        className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-400 transition-colors duration-300"
        onClick={() => onViewDetails(client)}
      >
        View Details
      </button>
    </div>
    <div className="mt-2">
      <p className="text-sm text-gray-600">Crops: {client.crops.join(", ")}</p>
      <p className="text-sm text-gray-500">Last Contact: {client.lastContact}</p>
    </div>
  </div>
);

const ClientDetails = ({ client, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{client.name}</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">Farm: {client.farm}</p>
          <p className="text-sm text-gray-500">Location: {client.location}</p>
          <p className="text-sm text-gray-500">Crops: {client.crops.join(", ")}</p>
          <p className="text-sm text-gray-500">Last Contact: {client.lastContact}</p>
          {/* Add more client details here */}
        </div>
        <div className="items-center px-4 py-3">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AddClientForm = ({ onAdd, onCancel }) => {
  const [newClient, setNewClient] = useState({ name: '', farm: '', location: '', crops: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...newClient, id: Date.now(), crops: newClient.crops.split(','), lastContact: new Date().toISOString().split('T')[0] });
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Client</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Farm Name"
            value={newClient.farm}
            onChange={(e) => setNewClient({ ...newClient, farm: e.target.value })}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Location"
            value={newClient.location}
            onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Crops (comma-separated)"
            value={newClient.crops}
            onChange={(e) => setNewClient({ ...newClient, crops: e.target.value })}
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientsManagement = () => {
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetails = (client) => setSelectedClient(client);
  const handleCloseDetails = () => setSelectedClient(null);

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
          onClick={() => setIsAddingClient(true)}
        >
          Add New Client
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredClients.map(client => (
        <ClientCard 
          key={client.id} 
          client={client} 
          onViewDetails={handleViewDetails}
        />
      ))}

      {selectedClient && (
        <ClientDetails 
          client={selectedClient} 
          onClose={handleCloseDetails}
        />
      )}

      {isAddingClient && (
        <AddClientForm 
          onAdd={handleAddClient}
          onCancel={() => setIsAddingClient(false)}
        />
      )}
    </div>
  );
};

export default ClientsManagement;