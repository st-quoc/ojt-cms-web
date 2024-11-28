export const Footer = () => {
  return (
    <section>
      <footer className="bg-gray-900 text-white p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="hover:underline text-gray-300">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="font-bold mb-4">My Account </h3>
            <ul className="space-y-2">
              <li>
                <a href="/account" className="hover:underline text-gray-300">
                  Profile
                </a>
              </li>
              <li>
                <a href="/account" className="hover:underline text-gray-300">
                  Order History
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:underline text-gray-300">
                  My Cart
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:underline text-gray-300">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="font-bold mb-4">Our Client Says</h3>
            <p>Excellent company! I would recommend it to everyone.</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <p>1234 Vintage Ave, NY, USA</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@vintagestore.com</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
