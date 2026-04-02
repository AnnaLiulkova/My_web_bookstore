import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";
import { FaMinus, FaPlus } from "react-icons/fa6"
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { navigate, books, currency, cartItems, updateQuantity } = 
    useContext(ShopContext);

  return books && cartItems ? (
    <div className="max-padd-container py-16 pt-28">
      <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        
        {/* LEFT SIDE */}
        <div className="flex flex-2 flex-col gap-3">
          <Title title1={"Cart"} title2={"Overview"} titleStyles={"pb-5"} />
          
          {/* Header Row */}
          <div className="grid grid-cols-[6fr_1fr_2fr] text-base font-medium bg-primary p-2 rounded-lg">
            <h5 className="h5 text-left">Product Details</h5>
            <h5 className="h5 text-center">Subtotal</h5>
            <h5 className="h5 text-center">Action</h5>
          </div>

          {/* Cart Items */}
          {books.map((book)=>{
             const quantity = cartItems[book._id]
             if(quantity > 0){
              return (
              <div key={book._id} className="grid grid-cols-[6fr_1fr_2fr] items-center bg-primary p-2 rounded-lg mt-3">
                  
                  <div className="flex items-center gap-x-3">
                    <img src={book.image[0]} alt="bookImage" className="w-16 rounded-lg object-cover"/>
                    <div className="flex flex-col gap-1">
                        <h5 className="h5 line-clamp-1">{book.name}</h5>
                        <div className="flex items-center justify-start">
                            <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-white">
                                <button onClick={()=>updateQuantity(book._id, quantity - 1)} className="p-1.5 bg-white hover:bg-primary text-secondary rounded-full cursor-pointer transition-all">
                                    <FaMinus className='text-xs'/>
                                </button>                  
                                <p className="px-2 font-bold">{quantity}</p>
                                <button onClick={()=>updateQuantity(book._id, quantity + 1)} className="p-1.5 bg-white hover:bg-primary text-secondary rounded-full cursor-pointer transition-all">
                                    <FaPlus className='text-xs'/>
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* COLUMN 2: Subtotal */}
                  <div className="flex items-center justify-center">
                    <h5 className="h5">{currency}{book.offerPrice * quantity}</h5>
                  </div>

                  {/* COLUMN 3: Action */}
                  <div className="flex items-center justify-center">
                     <button onClick={()=>updateQuantity(book._id, 0)} className="cursor-pointer font-bold text-secondary hover:text-red-500 transition-all">delete</button>
                  </div>
                  
              </div>
              )
            }
            return null;
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-1 flex-col'>
          <div className='max-w-100 w-full bg-primary p-5 py-10 max-md:mt-6 rounded-xl'>
            <CartTotal />
          </div>
        </div>

      </div>
    </div>
  ) : null;
}

export default Cart;