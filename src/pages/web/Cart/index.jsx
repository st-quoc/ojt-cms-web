import { useState } from 'react';
import Footer from '../../../component/Footer/Footer';
import Header from '../../../component/Header';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sản phẩm 1',
      price: 300,
      quantity: 2,
      image:
        'https://product.hstatic.net/1000312752/product/3q7a8272_copy_f203320e0ec641418afb3713c3087266_grande.jpg',
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      price: 500,
      quantity: 1,
      image:
        'https://product.hstatic.net/1000312752/product/3q7a8272_copy_f203320e0ec641418afb3713c3087266_grande.jpg',
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      price: 700,
      quantity: 3,
      image:
        'https://product.hstatic.net/1000312752/product/3q7a8272_copy_f203320e0ec641418afb3713c3087266_grande.jpg',
    },
  ]);

  const getCartQuantity = () => {
    const uniqueProductIds = new Set(cartItems.map(item => item.id));
    return uniqueProductIds.size;
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateShip = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity * (1 / 12), 0)
      .toFixed(2);
  };

  const calculateThue = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity * (1 / 10), 0)
      .toFixed(2);
  };

  const handleRemove = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  return (
    <div>
      <Header cartQuantity={getCartQuantity()} />
      <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Giỏ hàng của bạn
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center">Giỏ hàng trống.</p>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 mx-4">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Giá: ${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 p-2 border rounded"
                    />
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-lg font-bold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:w-1/4 lg:ml-8 mt-8 lg:mt-0">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Tổng cộng</h2>
                <div className="flex justify-between mb-4">
                  <span>Tổng tiền:</span>
                  <span className="font-bold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Phí ship:</span>
                  <span className="font-bold">${calculateShip()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Thuế:</span>
                  <span className="font-bold">${calculateThue()}</span>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
