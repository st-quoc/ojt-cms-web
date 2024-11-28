import { useState, useEffect } from 'react';
import Footer from '../../../component/Footer/Footer';
import CartHeader from '../../../component/CartHeader';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsDetails, setProductsDetails] = useState({});
  const [colorNames, setColorNames] = useState({});
  const [sizeNames, setSizeNames] = useState({});
  const Token = localStorage.getItem('accessToken');

  const fetchCartData = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const userId = userInfo ? JSON.parse(userInfo).id : null;

    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8017/v1/cart/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.items);
        fetchProductDetails(data.items);
      } else {
        setError(data.error || 'Failed to fetch cart data');
      }
    } catch (err) {
      setError('Failed to fetch cart data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async cartItems => {
    try {
      const productDetails = {};
      for (const item of cartItems) {
        const response = await fetch(
          `http://localhost:8017/v1/user/product/detail/${item.productId}`,
        );
        const productData = await response.json();

        if (response.ok) {
          productDetails[item.productId] = productData;
        }
      }
      setProductsDetails(productDetails);
      fetchColorAndSizeNames(cartItems);
    } catch (err) {
      setError('Failed to fetch product details', err);
    }
  };

  const fetchColorAndSizeNames = async cartItems => {
    try {
      const colorNames = {};
      const sizeNames = {};
      for (const item of cartItems) {
        const colorResponse = await fetch(
          `http://localhost:8017/v1/user/color/${item.color}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const colorData = await colorResponse.json();
        if (colorResponse.ok) {
          colorNames[item.color] = colorData.name;
        }

        const sizeResponse = await fetch(
          `http://localhost:8017/v1/user/size/${item.size}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const sizeData = await sizeResponse.json();
        if (sizeResponse.ok) {
          sizeNames[item.size] = sizeData.name;
        }
      }
      setColorNames(colorNames);
      setSizeNames(sizeNames);
    } catch (err) {
      setError('Failed to fetch color or size data', err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const getCartQuantity = () => {
    const uniqueProductIds = cartItems.length;
    return uniqueProductIds;
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

  const handleRemove = async (id, productId, size, color) => {
    const userInfo = localStorage.getItem('userInfo');
    const userId = userInfo ? JSON.parse(userInfo).id : null;

    if (!userId) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:8017/v1/cart/remove', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, size, color }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(
          cartItems.filter(
            item =>
              item.productId !== productId ||
              item.size !== size ||
              item.color !== color,
          ),
        );
      } else {
        setError(data.error || 'Failed to remove item');
      }
    } catch (err) {
      setError('Failed to remove item', err);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map(item =>
        item._id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  return (
    <div>
      <CartHeader cartQuantity={getCartQuantity()} />
      <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Giỏ hàng của bạn
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Giỏ hàng trống.</p>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/4">
              {cartItems.map(item => {
                const productDetails = productsDetails[item.productId] || {};
                const imageUrl =
                  productDetails.product && productDetails.product.images
                    ? productDetails.product.images[0]
                    : 'default-image-url';

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md"
                  >
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 mx-4">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">
                        Color: {colorNames[item.color] || 'Loading...'}
                      </p>
                      <p className="text-gray-600">
                        Size: {sizeNames[item.size] || 'Loading...'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value),
                          )
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
                      onClick={() =>
                        handleRemove(
                          item._id,
                          item.productId,
                          item.size,
                          item.color,
                        )
                      }
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
                );
              })}
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
