export const Footer = () => {
  return (
    <section>
      <footer className="bg-gray-900 text-white p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>Terms & Condition</li>
              <li>Privacy Policy</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="font-bold mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>Order History</li>
              <li>Wish List</li>
              <li>News</li>
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
