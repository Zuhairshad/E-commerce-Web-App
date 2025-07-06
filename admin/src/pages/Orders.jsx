import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, Currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const statusHandler = async (event , orderId) => {
    try {
        const response = await axios.post(backendUrl + '/api/order/status', {
          orderId,
          status: event.target.value
        }, {
          headers: {token}
        });
        if (response.data.success) {
          await fetchAllOrders(); // Refresh orders after updating status
          toast.success("Order status updated successfully.");
        } else {          toast.error(response.data.message);
        } 
    }catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id || index}>
              <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />

              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}.</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size},</span>
                      </p>
                    );
                  }
                })}


                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>

                <p>
                  {order.address.street}, {order.address.city}, {order.address.zipcode}, {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className='sm:text-[-15px]'><strong>Items:</strong> {order.items.length}</p>
                <p className='sm:text-[-15px]'><strong>Total:</strong>$ {order.amount}</p>
                <p className='mt-3'><strong>Payment Method:</strong> {order.paymentMethod ? "Done" : "Pending"}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              </div>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} ClassName="w-full sm:w-auto p-2 border font-semibold border-gray-300 rounded-md text-sm">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered </option></select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
