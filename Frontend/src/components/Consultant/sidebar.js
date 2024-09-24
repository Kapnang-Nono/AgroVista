import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Package, Users, Truck, Users as UsersIcon, LogOut, Menu, User, Book } from 'lucide-react';
import { logo } from '../../assets/images';
import Image from "../designLayouts/Image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative border-r-2 border-green-100">
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden p-4 text-black"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white text-black p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <Link to="/">
            <div>
              <Image className="w-32 object-cover" imgSrc={logo} />
            </div>
          </Link>
        <nav>
          <ul className="space-y-2 mt-5">
            {[
              { name: 'Dashboard', icon: Home, path: '/consultantdashboard' },
              { name: 'Consultations', icon: Book, path: '/consultantdashboard/consultations' },
              { name: 'Clients', icon: Users, path: '/consultantdashboard/clients' },
              { name: 'Profile', icon: User, path: '/consultantdashboard/profile' },
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center space-x-2 p-2 rounded bg-green-100 text-green-800'
                      : 'flex items-center space-x-2 p-2 rounded hover:bg-green-100'
                  }
                  onClick={toggleSidebar} // Close sidebar on link click (optional)
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-12">
          <button className="flex items-center space-x-2 p-2 rounded hover:bg-gray-500">
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
