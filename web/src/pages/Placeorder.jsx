import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Placeorder = () => {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              const itemInfo = {
                ...product,
                size,
                quantity
              };
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        date: Date.now()
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: { token }
          });

          if (response.data.success) {
            setCartItems({});
            toast.success('Order placed successfully!');
            navigate('/orders');
          } else {
            toast.error(response.data.message || 'Order placement failed.');
          }
          break;

        default:
          toast.error('Selected payment method not supported yet.');
          break;
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Something went wrong while placing the order.');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80v] border-t'
    >
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First Name'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            type='text'
            placeholder='Last Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          type='email'
          placeholder='Email Address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />
        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          type='text'
          placeholder='Home Address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            type='text'
            placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            type='text'
            placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>
        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='phone'
            value={formData.phone}
            type='text'
            placeholder='Phone'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            type='text'
            placeholder='Zip Code'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-13'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='Stripe' />
            </div>

            <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='Razorpay' />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3'>
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
