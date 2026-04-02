import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const MyOrders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  const loadOrderData = async () => {
    if (!token) {
        setOrders([]); 
        return;
    }

    try {
      const response = await fetch(backendUrl + '/api/userorders', {
        method: 'POST',
        headers: { 
            token: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) 
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token])

  return (
    <div className='max-padd-container py-16 pt-28'>
      <Title title1={"My Orders"} title2={"List"} titleStyles={"pb-10"} />
      
      {!token ? (
          <div className='text-center text-gray-500 mt-10'>
              Please <span className='font-bold text-secondary'>Log In</span> to view your orders.
          </div>
      ) : orders.length === 0 ? (
         <div className='text-center text-gray-500'>No orders found. Please place an order first.</div>
      ) : (
      <div className='flex flex-col gap-6'>
        {orders.map((order) => (
          <div key={order._id} className='bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm'>
            
            <div className='flex flex-wrap gap-6 mb-4'>
              {order.items.map((item, index) => (
                 <div key={index} className='flex gap-3 items-center min-w-50'>
                    <img 
                       src={item.book.image[0]} 
                       alt={item.book.name}
                       className='w-14 h-18 object-cover rounded shadow-sm bg-white'
                    /> 
                    <div className='flex flex-col text-sm'>
                       <h5 className="font-bold text-slate-800 line-clamp-1 max-w-37.5">{item.book.name}</h5>
                       <p className='text-gray-600 text-xs'>
                          Price: <span className='text-slate-900'>{currency}{item.book.offerPrice}</span>
                       </p>
                       <p className='text-gray-600 text-xs'>
                          Quantity: <span className='text-slate-900'>{item.quantity}</span>
                       </p>
                    </div>
                 </div>
              ))}
            </div>

            <hr className='border-green-300 my-4' />

            <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
               
               <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700'>
                  <div>
                    <span className='font-medium text-slate-600'>OrderId: </span> 
                    <span className='text-slate-900 font-mono text-xs'>{order._id}</span>
                  </div>
                  <div>
                    <span className='font-medium text-slate-600'>Date: </span> 
                    <span className='text-slate-900'>{new Date(order.createdAt).toDateString()}</span>
                  </div>
                  <div>
                    <span className='font-medium text-slate-600'>Payment: </span> 
                    <span className='text-slate-900'>{order.isPaid ? "Done" : "Pending"}</span>
                  </div>
                  <div>
                    <span className='font-medium text-slate-600'>Method: </span> 
                    <span className='text-slate-900 capitalize'>{order.paymentMethod}</span>
                  </div>
                  <div className='sm:col-span-2 mt-1'>
                    <span className='font-medium text-slate-600'>Total Amount: </span> 
                    <span className='font-bold text-purple-700 text-lg'>{currency}{order.amount}</span>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex items-center gap-2">
                      <h5 className="text-sm font-medium text-slate-600">Status:</h5>
                      <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                          <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                          <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                             {order.status}
                          </p>
                      </div>
                  </div>
                  <button onClick={loadOrderData} className="bg-[#a855f7] text-white py-2! px-6! text-sm! rounded-md! shadow-md hover:bg-[#9333ea] transition-all font-medium cursor-pointer">
                      Track Order
                  </button>
               </div>

            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default MyOrders