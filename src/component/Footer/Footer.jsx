import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from '@mui/icons-material';

export const Footer = () => {
  return (
    <section>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          <div>
            <h3 className="font-bold mb-4">My Account</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/account"
                  className="hover:underline text-gray-300 flex items-center justify-center lg:justify-start"
                >
                  <span className="material-icons"></span> Profile
                </a>
              </li>
              <li>
                <a
                  href="/account"
                  className="hover:underline text-gray-300 flex items-center justify-center lg:justify-start"
                >
                  <span className="material-icons"></span> Purchase History
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="hover:underline text-gray-300 flex items-center justify-center lg:justify-start"
                >
                  <span className="material-icons"></span> My Cart
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="hover:underline text-gray-300 flex items-center justify-center lg:justify-start"
                >
                  <span className="material-icons"></span> Blogs
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="font-bold mb-4">Our Client Says</h3>
            <p className="text-gray-300">
              Excellent company! I would recommend it to everyone.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center justify-center lg:justify-start">
                <LocationOn className="mr-2" /> 1234 Vintage Ave, NY, USA
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <Phone className="mr-2" /> Phone: 123-456-7890
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <Email className="mr-2" /> Email: info@vintagestore.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-8 mb-4">
            <a
              href="https://www.facebook.com/ngvuq.11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <Facebook fontSize="large" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <Twitter fontSize="large" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <Instagram fontSize="large" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 Vintage Store. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
