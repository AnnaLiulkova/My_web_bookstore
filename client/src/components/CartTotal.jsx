import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { 
    currency, 
    getCartAmount, 
    delivery_fee, 
    navigate, 
    getCartCount,
    addresses = []
  } = useContext(ShopContext);

  const [method, setMethod] = useState('cod'); 
  const [showAddress, setShowAddress] = useState(false); 
  const [selectedAddress, setSelectedAddress] = useState(null); 

  return (
    <div>
      <h3 className='bold-22'>
        Order Details
        <span className='bold-14 text-secondary'> ({getCartCount ? getCartCount() : 0}) Items</span>
      </h3>
      
      <hr className="border-gray-300 my-5" />

      {/* PAYMENT & ADDRESS */}
      <div className='mb-5'>
        <div className='my-5'> 
          <h4 className='h4 mb-5'>Where to ship your order?</h4>
          
          <div className='relative flex justify-between items-start mt-2'>
            <p>
              {selectedAddress 
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` 
                : "No address selected (Please add or select one)"}
            </p>
            
            <button 
              onClick={() => setShowAddress(!showAddress)} 
              className='text-secondary medium-14 hover:underline cursor-pointer'
            >
              Change
            </button>

            {showAddress && (
              <div className='absolute top-10 py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full z-10'>
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <p 
                      key={index} 
                      onClick={() => { setSelectedAddress(address); setShowAddress(false); }} 
                      className='p-2 cursor-pointer hover:bg-gray-100 medium-14'
                    >
                      {address.street}, {address.city}, {address.state}, {address.country}
                    </p>
                  ))
                ) : (
                  <p className='p-2 text-gray-500'>No saved addresses</p>
                )}
                <p 
                  onClick={() => navigate("/address-form")} 
                  className='p-2 text-center cursor-pointer hover:bg-tertiary text-blue-600'
                >
                  + Add New Address
                </p>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="my-6">
          <h4 className="h4 mb-5">Payment Method?</h4>
          <div className="flex gap-3">
            <div 
              onClick={() => setMethod("COD")} 
              className={`${method === "COD" ? "btn-secondary" : "btn-white"} py-1 px-3 border text-xs cursor-pointer`}
            >
              Cash on Delivery
            </div>
            <div 
              onClick={() => setMethod("stripe")} 
              className={`${method === "stripe" ? "btn-secondary" : "btn-white"} py-1 px-3 border text-xs cursor-pointer`}
            >
              Stripe
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-5" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-lg font-medium mt-3">
          <h4 className="h4">Total Amount</h4>
          <p className="bold-18">
            {currency} {getCartAmount()}.00
          </p>
        </div>
      </div>

      <button className="btn-dark w-full mt-8 rounded-md py-3">
        Proceed to Order
      </button>
    </div>
  );
};

export default CartTotal;