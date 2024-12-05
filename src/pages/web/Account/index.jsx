import { useState } from 'react';
import Footer from '../../../component/Footer/Footer';
import Header from '../../../component/Header';
import Profile from './profile';
import PurchaseHistory from './purchaseHistory';
import Notifications from './notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const Account = () => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const menuItems = [
    {
      key: 'profile',
      label: 'Personal Information',
      icon: <AccountCircleIcon />,
    },
    { key: 'history', label: 'Purchase History', icon: <HistoryIcon /> },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: <NotificationsIcon />,
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-6 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Account Settings
          </h2>
          <nav>
            <ul className="space-y-4">
              {menuItems.map(item => (
                <li
                  key={item.key}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                    selectedSection === item.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                  onClick={() => setSelectedSection(item.key)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-lg font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10 bg-white rounded-lg shadow-md mx-6 md:mx-0">
          {selectedSection === 'profile' && <Profile />}
          {selectedSection === 'history' && <PurchaseHistory />}
          {selectedSection === 'notifications' && <Notifications />}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Account;
