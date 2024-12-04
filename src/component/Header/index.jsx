import { useState, useEffect, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { getTotalQuantity } = useCart();
  const cartQuantity = getTotalQuantity();

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = path => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section>
      <header className="w-full flex flex-col items-center justify-between bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="w-full bg-black text-white text-center py-2 text-sm">
          FREE SHIPPING FOR ORDERS OVER $99
        </div>
        <div className="w-full flex items-center justify-between px-4 md:px-8 py-4">
          <div
            onClick={() => handleNavigate('/')}
            className="text-4xl font-bold p-2 pl-4 pr-4 border-2 cursor-pointer"
          >
            S
          </div>
          <nav
            ref={menuRef}
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } flex-col md:flex md:flex-row space-y-4 text-center border-gray-800 border-solid md:space-y-0 md:space-x-8 absolute md:static top-[90px] left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-40`}
          >
            <span
              onClick={() => handleNavigate('/')}
              className="hover:text-gray-600 text-black text-sm md:text-base cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:border-b-2 hover:border-black"
            >
              HOME
            </span>
            <span
              onClick={() => handleNavigate('/products')}
              className="hover:text-gray-600 text-black text-sm md:text-base cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:border-b-2 hover:border-black"
            >
              SHOP
            </span>
            <span
              onClick={() => handleNavigate('/AboutUs')}
              className="hover:text-gray-600 text-black text-sm md:text-base cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:border-b-2 hover:border-black"
            >
              ABOUT US
            </span>
            <span
              onClick={() => handleNavigate('/blogs')}
              className="hover:text-gray-600 text-black text-sm md:text-base cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:border-b-2 hover:border-black pb-2"
            >
              BLOGS
            </span>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="hidden lg:block font-bold">
              CALL US: 123456789
            </span>
            <span
              onClick={() => handleNavigate('/#search')}
              className="hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <SearchIcon />
            </span>
            <span
              onClick={() => handleNavigate('/account')}
              className="hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PersonIcon />
            </span>
            <span
              onClick={() => handleNavigate('/cart')}
              className="relative hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <ShoppingCartIcon />
              {cartQuantity > 0 && (
                <span className="absolute top-4 right-[-10px] text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 translate-y-1">
                  {cartQuantity}
                </span>
              )}
            </span>
            <button
              ref={buttonRef}
              className="block md:hidden text-black focus:outline-none z-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
      <div className="h-[130px]"></div>
    </section>
  );
};

export default Header;
