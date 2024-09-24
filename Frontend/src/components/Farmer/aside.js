import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Profile1 } from '../../assets/images';

const Aside = ({ isDarkMode, toggleDarkMode }) => (
  <div className="w-64 h-screen bg-green-100 p-4 fixed right-0 top-0">
    <div className="flex justify-end mb-4">
      <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <img src={Profile1} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-2" />
      <h3 className="text-lg font-semibold text-center">John Doe</h3>
      <p className="text-gray-600 text-center">john@example.com</p>
    </div>
    <div className="bg-white rounded-lg shadow p-4 h-2/4">
      <h3 className="text-lg font-semibold mb-2">Recent Updates</h3>
      <ul className="space-y-2">
        <li>New order received</li>
        <li>Product inventory updated</li>
        <li>Customer feedback received</li>
      </ul>
    </div>
  </div>
);

export default Aside;
