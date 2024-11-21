import { useState, useEffect, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Header = ({ cartQuantity }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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

  return (
    <section>
      <div className="w-full bg-black text-white text-center py-2 text-sm">
        FREE SHIPPING FOR ORDERS OVER $99
      </div>
      <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-md relative z-50">
        <div className="text-4xl font-bold p-2 pl-4 pr-4 border-2">S</div>
        <nav
          ref={menuRef}
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col  md:flex md:flex-row space-y-4 text-center border-gray-800 border-solid md:space-y-0 md:space-x-8 absolute md:static top-[90px] left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-40`}
        >
          <a
            href="/"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            HOME
          </a>
          <a
            href="#bestseller"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            BEST-SELLER
          </a>
          <a
            href="#trending"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            TRENDING
          </a>
          <a
            href="#amphora"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            SPORT
          </a>
          <a
            href="#room"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            SNEAKER
          </a>
          <a
            href="#more"
            className="hover:text-gray-600 text-black text-sm md:text-base"
          >
            MORE
          </a>
          <a
            href="Blogs"
            className="hover:text-gray-600 text-black text-sm md:text-base pb-2"
          >
            BLOGS
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="hidden lg:block font-bold">CALL US: 123456789</span>
          <a href="#search" className="hover:text-gray-600">
            <SearchIcon />
          </a>
          <a href="/account" className="hover:text-gray-600">
            <PersonIcon />
          </a>
          <a href="/cart" className="relative hover:text-gray-600">
            <ShoppingCartIcon />
            {cartQuantity > 0 && (
              <span className="absolute top-4 right-[-10px] text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 translate-y-1">
                {cartQuantity}
              </span>
            )}
          </a>
          <button
            ref={buttonRef}
            className="block md:hidden text-black focus:outline-none z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </section>
  );
};
export default Header;
