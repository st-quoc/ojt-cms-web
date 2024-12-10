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

    const country = document.getElementById('select-country-input-3').value;
    const city = document.getElementById('select-city-input-3').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phone-input').value;

    if (!country || !city || !address || !phoneNumber) {
      toast.error('Please provide all the required information!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_ROOT}/vnpay/create-payment-url`,
        {
          userId,
          shippingAddress: `${country}, ${city}, ${address}`,
          phoneNumber,
          shippingFee,
        },
      );

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error('Payment URL not found.');
      }
    } catch (error) {
      toast.error('Error during payment process. Please try again.');
      console.log(error);
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
                      htmlFor="select-country-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      Country*
                    </label>
                    <select
                      id="select-country-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    >
                      <option selected>United States</option>
                      <option value="AS">Australia</option>
                      <option value="FR">France</option>
                      <option value="ES">Spain</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      City*
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    >
                      <option selected>San Francisco</option>
                      <option value="NY">New York</option>
                      <option value="LA">Los Angeles</option>
                      <option value="CH">Chicago</option>
                      <option value="HU">Houston</option>
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
                        id="credit-card"
                        aria-describedby="credit-card-text"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="credit-card"
                        className="font-medium leading-none text-gray-800 dark:text-white"
                      >
                        {' '}
                        VN PAY{' '}
                      </label>
                      <p
                        id="credit-card-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Pay with VNPay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-700">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="pay-on-delivery"
                        aria-describedby="pay-on-delivery-text"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="pay-on-delivery"
                        className="font-medium leading-none text-gray-900 dark:text-white"
                      >
                        {' '}
                        Stripe{' '}
                      </label>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Payment with stripe
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-700">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="paypal-2"
                        aria-describedby="paypal-text"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-gray-600 focus:ring-2 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="paypal-2"
                        className="font-medium leading-none text-gray-900 dark:text-white"
                      >
                        {' '}
                        Cash On Delivery{' '}
                      </label>
                      <p
                        id="paypal-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
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
