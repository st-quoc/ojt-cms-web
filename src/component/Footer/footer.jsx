export const Footer = () => {
  return (
    <section>
      <footer className="bg-gray-900 text-white p-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Information Section */}
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                Terms & Condition
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                About Us
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* My Account Section */}
          <div>
            <h3 className="font-bold mb-4">My Account</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                My Account
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                Order History
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                Wish List
              </li>
              <li className="hover:text-gray-300 hover:underline cursor-pointer">
                News
              </li>
            </ul>
          </div>

          {/* Our Client Says Section */}
          <div>
            <h3 className="font-bold mb-4">Our Client Says</h3>
            <p className="hover:text-gray-300">
              Excellent company! I would recommend it to everyone.
            </p>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <p className="hover:text-gray-300">1234 Vintage Ave, NY, USA</p>
            <p className="hover:text-gray-300">Phone: 123-456-7890</p>
            <p className="hover:text-gray-300">Email: info@vintagestore.com</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
