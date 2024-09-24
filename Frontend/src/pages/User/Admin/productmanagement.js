import React, { useState } from 'react';

const ProductEquipmentManagement = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Organic Apples', category: 'Fruits', price: 2.99, stock: 100, status: 'In Stock', type: 'product' },
    { id: 2, name: 'Beans', category: 'Grains', price: 3.49, stock: 50, status: 'In Stock', type: 'product' },
    { id: 3, name: 'Carrot', category: 'Vegetable',price: 100,  stock: 50, status: 'In Stock', type: 'product' },
    { id: 4, name: 'Harvester', category: 'Farm Equipment', rentalRate: 150, availability: 'In Use', condition: 'Excellent', type: 'equipment' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || item.category === selectedCategory)
  );

  const handleAddOrEditItem = (itemData) => {
    if (itemData.id) {
      setItems(items.map(item => item.id === itemData.id ? itemData : item));
    } else {
      setItems([...items, { ...itemData, id: items.length + 1 }]);
    }
    setIsItemModalOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const openItemModal = (item = null) => {
    setCurrentItem(item || { name: '', category: '', type: 'product', price: '', stock: '', status: 'In Stock', rentalRate: '', availability: 'Available', condition: 'Good' });
    setIsItemModalOpen(true);
  };

  const openItemDetails = (item) => {
    setCurrentItem(item);
    setIsItemDetailsOpen(true);
  };

  const categories = ['All', 'Fruits', 'Grains', 'Vegetable', 'LiveStock', 'Roots', 'Farm Equipment'];

  const ItemModal = ({ isOpen, onClose, onSave, item }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">{item.id ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(item);
          }}>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => setCurrentItem({...item, name: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded"
                value={item.category}
                onChange={(e) => setCurrentItem({...item, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="w-full p-2 border rounded"
                value={item.type}
                onChange={(e) => setCurrentItem({...item, type: e.target.value})}
                required
              >
                <option value="product">Product</option>
                <option value="equipment">Equipment for Rent</option>
              </select>
              {item.type === 'product' ? (
                <>
                  <input
                    className="w-full p-2 border rounded"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => setCurrentItem({...item, price: parseFloat(e.target.value)})}
                    required
                  />
                  <input
                    className="w-full p-2 border rounded"
                    type="number"
                    placeholder="Stock"
                    value={item.stock}
                    onChange={(e) => setCurrentItem({...item, stock: parseInt(e.target.value)})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={item.status}
                    onChange={(e) => setCurrentItem({...item, status: e.target.value})}
                    required
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </>
              ) : (
                <>
                  <input
                    className="w-full p-2 border rounded"
                    type="number"
                    step="0.01"
                    placeholder="Rental Rate"
                    value={item.rentalRate}
                    onChange={(e) => setCurrentItem({...item, rentalRate: parseFloat(e.target.value)})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={item.availability}
                    onChange={(e) => setCurrentItem({...item, availability: e.target.value})}
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                  <select
                    className="w-full p-2 border rounded"
                    value={item.condition}
                    onChange={(e) => setCurrentItem({...item, condition: e.target.value})}
                    required
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Item</button>
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ItemDetailsPage = ({ item, onClose }) => {
    if (!isItemDetailsOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Item Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Item Information</h3>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Type:</strong> {item.type === 'product' ? 'Product' : 'Equipment for Rent'}</p>
            {item.type === 'product' ? (
              <>
                <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                <p><strong>Stock:</strong> {item.stock}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </>
            ) : (
              <>
                <p><strong>Rental Rate:</strong> ${item.rentalRate.toFixed(2)} per day</p>
                <p><strong>Availability:</strong> {item.availability}</p>
                <p><strong>Condition:</strong> {item.condition}</p>
              </>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">{item.type === 'product' ? 'Sales History' : 'Rental History'}</h3>
            <p>{item.type === 'product' ? 'Sales' : 'Rental'} history will be displayed here.</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => openItemModal(item)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit Item</button>
            <button onClick={() => {
              handleDeleteItem(item.id);
              onClose();
            }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Item</button>
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product and Equipment Management</h1>
      
      <div className="mb-4">
        <div className="flex border-b">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 ${activeTab === category ? 'border-b-2 border-green-500' : ''}`}
              onClick={() => {
                setActiveTab(category);
                setSelectedCategory(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() => openItemModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Item
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Price/Rate</th>
            <th className="py-2 px-4 border-b">Stock/Availability</th>
            <th className="py-2 px-4 border-b">Status/Condition</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openItemDetails(item)} className="text-blue-500 hover:underline">
                  {item.name}
                </button>
              </td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.type === 'product' ? 'Product' : 'Equipment'}</td>
              <td className="py-2 px-4 border-b">
                {item.type === 'product' ? `$${item.price.toFixed(2)}` : `$${item.rentalRate.toFixed(2)}/day`}
              </td>
              <td className="py-2 px-4 border-b">
                {item.type === 'product' ? item.stock : item.availability}
              </td>
              <td className="py-2 px-4 border-b">
                {item.type === 'product' ? item.status : item.condition}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openItemModal(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        onSave={handleAddOrEditItem}
        item={currentItem}
      />

      {currentItem && (
        <ItemDetailsPage
          item={currentItem}
          onClose={() => setIsItemDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductEquipmentManagement;