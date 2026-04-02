import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };


  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await fetch('http://localhost:5000/api/order/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await response.json();
      
      if (data.success) {
         await fetchAllOrders(); 
         toast.success("Status Updated");
      }
    } catch (error) {
       console.error(error);
       toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl">
      <div className='flex flex-col gap-4'>
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            
            <div className="flex flex-wrap gap-6 mb-6">
              {order.items.map((item, index) => (
                 <div key={index} className="flex gap-3 items-start">
                  <img
                    src={item.book.image && item.book.image[0] ? item.book.image[0] : "/assets/books/book_1.png"}
                    alt="orderImg"
                    className="w-12 h-16 object-cover rounded bg-gray-100 shadow-sm"
                  />
                  <div className="flex flex-col mt-1">
                     <h5 className="font-bold text-slate-800 line-clamp-1 max-w-50 text-sm">
                        {item.book.name}
                     </h5>
                     <p className='text-xs text-slate-500 mt-1'>
                        {currency}{item.book.offerPrice} <span className='mx-1'>x</span> {item.quantity}
                     </p>
                  </div>
                 </div>
              ))}
            </div>

            <hr className='border-slate-200 mb-6' />

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6 items-start text-sm">
               <div className="flex flex-col gap-2">
                  <div className='flex gap-2 items-center'>
                     <span className='font-semibold text-slate-600'>OrderId:</span>
                     <span className='text-slate-500 font-mono text-xs'>{order._id}</span>
                  </div>
                  <div className='flex gap-1 items-start'>
                     <span className='font-semibold text-slate-600 text-nowrap'>Address:</span>
                     <span className='text-slate-800'>
                        {order.address 
                            ? `${order.address.city}, ${order.address.country}` 
                            : "No Address Info"}
                     </span>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <div className='flex gap-2'>
                     <span className='font-semibold text-slate-600'>Payment Status:</span>
                     <span>{order.isPaid ? "Done" : "Pending"}</span>
                  </div>
                  <div className='flex gap-2'>
                     <span className='font-semibold text-slate-600'>Method:</span>
                     <span className='capitalize'>{order.paymentMethod}</span>
                  </div>
                  <div className='flex gap-2'>
                     <span className='font-semibold text-slate-600'>Amount:</span>
                     <span className='font-bold text-secondary'>{currency}{order.amount}</span>
                  </div>
               </div>

               <div className="flex lg:justify-end items-start">
                  <div className="flex items-center gap-2">
                     <span className="font-semibold text-slate-600">Status:</span>
                     <select 
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status} 
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-secondary cursor-pointer"
                     >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                     </select>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;