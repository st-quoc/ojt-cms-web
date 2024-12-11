import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../../../constants';

import { toast } from 'react-toastify';
const userId = JSON.parse(localStorage.getItem('userInfo'))?.id;

export default function Checkout() {
  const initialTotalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
  const [, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(initialTotalPrice);

  useEffect(() => {
    console.log('Initial total price:', initialTotalPrice);
    console.log('Current shipping fee:', shippingFee);
    setFinalPrice(initialTotalPrice + shippingFee);
    console.log('Updated final price:', initialTotalPrice + shippingFee);
  }, [shippingFee, initialTotalPrice]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistricts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleCityChange = e => {
    const city = e.target.value;
    setSelectedCity(city);

    const selected = citiesData.find(item => item.city === city);
    const districts = selected ? selected.districts : [];
    setDistricts(districts);

    setSelectedDistrict('');

    console.log('Updated districts:', districts);
  };

  const handleShippingFeeChange = e => {
    const fee = parseFloat(e.target.value);
    if (isNaN(fee)) {
      toast.error('Invalid shipping fee selected!');
      return;
    }
    setShippingFee(fee);
  };

  const handlePayment = async e => {
    e.preventDefault();

    const province = selectedCity;
    const district = selectedDistrict;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phone-input').value;
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked',
    )?.id;

    if (!province || !district || !address || !phoneNumber || !paymentMethod) {
      toast.error('Please provide all the required information!');
      return;
    }

    try {
      setIsLoading(true);

      const orderDetails = {
        userId,
        shippingAddress: `${address}, ${district}, ${province}`,
        phoneNumber,
        shippingFee,
        totalPrice: finalPrice,
        paymentMethod,
      };

      if (paymentMethod === 'cod') {
        orderDetails.paymentStatus = 'pending';
        orderDetails.orderStatus = 'processing';

        const response = await axios.post(
          `${API_ROOT}/user/order/createOrder`,
          orderDetails,
        );

        if (response.status === 201) {
          toast.success('Order created successfully with Cash On Delivery!');
          window.location.href = '/order?success';
        } else {
          toast.error('Failed to create the order.');
        }
      } else if (paymentMethod === 'vnpay') {
        const response = await axios.post(
          `${API_ROOT}/vnpay/create-payment-url`,
          orderDetails,
        );

        if (response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          toast.error('Payment URL not found.');
        }
      } else if (paymentMethod === 'stripe') {
        toast.info('Stripe payment not implemented yet.');
      } else {
        toast.error('Invalid payment method selected!');
      }
    } catch (error) {
      toast.error('Error during payment process. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-100 md:py-16">
      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-primary-200 dark:text-primary-500 dark:after:border-primary-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-primary-200 after:content-['/'] dark:after:text-primary-500 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Cart
            </span>
          </li>

          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-primary-700 dark:text-primary-500 dark:after:border-primary-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center after:mx-2 after:text-primary-700 after:content-['/'] dark:after:text-primary-700 sm:after:hidden">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Checkout
            </span>
          </li>

          <li className="flex shrink-0 items-center text-gray-600">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Order summary
          </li>
        </ol>

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-700">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="select-city-input"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      City*
                    </label>
                    <select
                      id="select-city-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                      onChange={handleCityChange}
                      value={selectedCity}
                    >
                      <option value="">Select a city</option>
                      {citiesData.map((city, index) => (
                        <option key={index} value={city.city}>
                          {city.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="select-district-input"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      District*
                    </label>
                    <select
                      id="select-district-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                      disabled={!selectedDistricts.length}
                      onChange={e => setSelectedDistrict(e.target.value)}
                      value={selectedDistrict}
                    >
                      <option value="">Select a district</option>
                      {selectedDistricts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-800 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    placeholder="123 Ngo Quyen"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone-input-3"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Phone Number*
                  </label>
                  <div className="flex items-center">
                    <button
                      id="dropdown-phone-button-3"
                      data-dropdown-toggle="dropdown-phone-3"
                      className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300 dark:focus:ring-gray-700"
                      type="button"
                    >
                      +84
                    </button>

                    <div className="relative w-full">
                      <input
                        type="text"
                        id="phone-input"
                        className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-100 dark:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-gray-500"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-600">
                Payment
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-700">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="vnpay"
                        type="radio"
                        name="payment-method"
                        value="vnpay"
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="vnpay"
                        className="font-medium leading-none text-gray-800 dark:text-white"
                      >
                        VN PAY
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Pay with VNPay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-700">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="stripe"
                        type="radio"
                        name="payment-method"
                        value="stripe"
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="stripe"
                        className="font-medium leading-none text-gray-800 dark:text-white"
                      >
                        Stripe
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Payment with Stripe
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-700">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="cod"
                        type="radio"
                        name="payment-method"
                        value="cod"
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="cod"
                        className="font-medium leading-none text-gray-800 dark:text-white"
                      >
                        Cash On Delivery
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Pay when receive the product
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-600">
                Delivery Methods
              </h3>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-800 dark:bg-gray-100">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="dhl"
                      aria-describedby="dhl-text"
                      type="radio"
                      name="delivery-method"
                      value="55000"
                      className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      onChange={handleShippingFeeChange}
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="dhl"
                      className="font-medium leading-none text-gray-900 dark:text-gray-800"
                    >
                      55.000 VND - DHL Fast Delivery
                    </label>
                    <p
                      id="dhl-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-600"
                    >
                      Get it by Tomorrow
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-100">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="fedex"
                      aria-describedby="fedex-text"
                      type="radio"
                      name="delivery-method"
                      value="10000"
                      className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      onChange={handleShippingFeeChange}
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="fedex"
                      className="font-medium leading-none text-gray-900 dark:text-gray-800"
                    >
                      10.000 VND - Standard Delivery
                    </label>
                    <p
                      id="fedex-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-600"
                    >
                      Get it after 3 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-800 dark:text-gray-800">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-800">
                    {initialTotalPrice.toLocaleString()} VND
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-800">
                    Shipping Fee
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-800">
                    {shippingFee.toLocaleString()} VND
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-800">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-gray-800">
                    0 VND
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-gray-800">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-gray-800">
                    {finalPrice.toLocaleString()} VND
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePayment}
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4  focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
const citiesData = [
  {
    city: 'Hà Nội',
    districts: [
      'Ba Đình',
      'Hoàn Kiếm',
      'Hai Bà Trưng',
      'Đống Đa',
      'Tây Hồ',
      'Cầu Giấy',
      'Thanh Xuân',
      'Hoàng Mai',
    ],
  },
  {
    city: 'Hồ Chí Minh',
    districts: [
      'Quận 1',
      'Quận 2',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Bình Thạnh',
      'Phú Nhuận',
    ],
  },
  {
    city: 'Đà Nẵng',
    districts: [
      'Hải Châu',
      'Thanh Khê',
      'Cẩm Lệ',
      'Ngũ Hành Sơn',
      'Sơn Trà',
      'Liên Chiểu',
      'Hòa Vang',
      'Hoàng Sa',
    ],
  },
  {
    city: 'Cần Thơ',
    districts: [
      'Ninh Kiều',
      'Bình Thủy',
      'Cái Răng',
      'Ô Môn',
      'Thốt Nốt',
      'Phong Điền',
      'Cờ Đỏ',
      'Vĩnh Thạnh',
      'Thới Lai',
    ],
  },
  {
    city: 'Hải Phòng',
    districts: [
      'Hồng Bàng',
      'Ngô Quyền',
      'Lê Chân',
      'Hải An',
      'Kiến An',
      'Đồ Sơn',
      'Dương Kinh',
      'Thủy Nguyên',
      'An Dương',
      'An Lão',
      'Kiến Thụy',
      'Tiên Lãng',
      'Vĩnh Bảo',
      'Cát Hải',
      'Bạch Long Vĩ',
    ],
  },
  {
    city: 'An Giang',
    districts: [
      'Long Xuyên',
      'Châu Đốc',
      'Tân Châu',
      'An Phú',
      'Tịnh Biên',
      'Tri Tôn',
      'Châu Phú',
      'Châu Thành',
      'Phú Tân',
      'Thoại Sơn',
    ],
  },
];
