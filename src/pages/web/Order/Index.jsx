import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../../../constants';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const email = JSON.parse(localStorage.getItem('userInfo'))?.email;
  const userId = JSON.parse(localStorage.getItem('userInfo'))?.id;

  useEffect(() => {
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${API_ROOT}/user/order/my-orders`, {
          userId,
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('success')) {
      const deleteCartItems = async () => {
        try {
          await axios.delete(`${API_ROOT}/user/cart/delete-all`, {
            data: { userId },
          });
          localStorage.removeItem('totalPrice');
          toast.success('Order placed successfully!');
        } catch (error) {
          console.error(
            'Error clearing cart:',
            error.response?.data || error.message,
          );
        }
      };
      deleteCartItems();
    } else if (searchParams.has('payment-fail')) {
      toast.error('Payment failed!');
    }
  }, [userId]);

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter(
          order =>
            order.paymentStatus === filter || order.orderStatus === filter,
        );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-100 text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Order History
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('all')}
        >
          All Orders
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'paid' ? 'bg-gray-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('paid')}
        >
          Paid Orders
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'failed' ? 'bg-gray-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('failed')}
        >
          Order Canceled
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'pending' ? 'bg-gray-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending Orders
        </button>
      </div>

      {!filteredOrders || filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {[...filteredOrders]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(order => (
              <div
                key={order._id}
                className="border border-gray-800 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col justify-center space-y-2">
                    <h2 className="text-xl font-bold mb-2">Email: {email}</h2>
                    <p>
                      Total Price:{' '}
                      <span className="font-semibold">
                        {order.totalPrice.toLocaleString()} VND
                      </span>
                    </p>
                    <p>
                      Order Status:{' '}
                      <strong className="text-blue-600">
                        {order.orderStatus}
                      </strong>
                    </p>
                    <p>Payment Status: {order.paymentStatus}</p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Phone Number: {order.phoneNumber}</p>
                    <p>
                      Order Date:{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
                    <ul className="space-y-4">
                      {order.products.map(item => (
                        <li key={item._id} className="list-none">
                          <div className="flex items-center gap-4 p-2 bg-gray-100 rounded-lg">
                            <img
                              src={
                                item.product.images?.[0] ||
                                'https://via.placeholder.com/100'
                              }
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-bold">{item.product.name}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>
                                Price per Unit:
                                {item.product.variants[0]?.price.toLocaleString() ||
                                  'N/A'}{' '}
                                VND
                              </p>
                              <p className="text-sm text-gray-500">
                                Description: {item.product.sortDesc}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
