import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const initialOrders = [
  {
    id: 1,
    customer: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    supplier: { name: 'Tech Supplies Inc.', email: 'info@techsupplies.com', phone: '987-654-3210' },
    date: '2024-09-01',
    status: 'Pending',
    total: 100.00,
    items: ['Laptop', 'Mouse']
  },
  {
    id: 2,
    customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
    supplier: { name: 'Office Gear Ltd.', email: 'sales@officegear.com', phone: '876-543-2109' },
    date: '2024-09-02',
    status: 'Shipped',
    total: 150.50,
    items: ['Desk Chair', 'Desk Lamp']
  },
  {
    id: 3,
    customer: { name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012' },
    supplier: { name: 'Gadget World', email: 'support@gadgetworld.com', phone: '765-432-1098' },
    date: '2024-09-03',
    status: 'Delivered',
    total: 75.25,
    items: ['Smartphone', 'Phone Case']
  },
  {
    id: 4,
    customer: { name: 'Alice Brown', email: 'alice@example.com', phone: '456-789-0123' },
    supplier: { name: 'Stationery Plus', email: 'orders@stationeryplus.com', phone: '654-321-0987' },
    date: '2024-09-04',
    status: 'Pending',
    total: 200.00,
    items: ['Printer', 'Ink Cartridges']
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredOrders = orders.filter(order => 
    (order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || order.status === statusFilter)
  );

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-4 h-[590px]">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="flex mb-4">
        <div className="relative flex-1 mr-2">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex items-center">
          <Filter className="mr-2 text-gray-400" size={20} />
          {['All', 'Pending', 'Shipped', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`px-3 py-2 mr-2 rounded-md ${
                statusFilter === status
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Supplier</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.customer.name}</td>
                <td className="py-2 px-4 border-b">{order.supplier.name}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => openOrderDetails(order)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={closeOrderDetails} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <p>Name: {selectedOrder.customer.name}</p>
                <p>Email: {selectedOrder.customer.email}</p>
                <p>Phone: {selectedOrder.customer.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Supplier Information</h3>
                <p>Name: {selectedOrder.supplier.name}</p>
                <p>Email: {selectedOrder.supplier.email}</p>
                <p>Phone: {selectedOrder.supplier.phone}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Order Information</h3>
                <p>Order ID: {selectedOrder.id}</p>
                <p>Date: {selectedOrder.date}</p>
                <p>Status: {selectedOrder.status}</p>
                <p>Total: ${selectedOrder.total.toFixed(2)}</p>
                <p>Items: {selectedOrder.items.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;