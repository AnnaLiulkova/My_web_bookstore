import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { TbShoppingBagPlus } from "react-icons/tb"
import { ShopContext } from '../context/ShopContext'

const Item = ({book, fromHero}) => {

    const navigate = useNavigate();
    const { currency, addToCart } = useContext(ShopContext)

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault(); 
        addToCart(book._id);
        console.log("Додано в кошик:", book.name);
    }

    const handleNavigate = () => {
        console.log("Перехід на сторінку:", book.name);
        navigate(`/shop/${book.category}/${book._id}`);
        window.scrollTo(0, 0); 
    }

    if (!book) return <div className='p-5 text-red-600 text-sm'>No book found.</div>

    return (
        <div 
            onClick={handleNavigate} 
            className={`overflow-hidden sm:p-4 ${fromHero ? "bg-white" : "sm:bg-primary"} rounded-xl cursor-pointer group shadow-sm hover:shadow-md transition-all`}
        >
            {/* IMAGE */}
            <div className='overflow-hidden rounded-xl relative'>
                <img 
                    src={book.image[0]} 
                    alt={book.name} 
                    className='rounded-lg w-full object-cover aspect-3/4 group-hover:scale-105 transition-all duration-300' 
                />
            </div>
            
            {/* INFO */}
            <div className='pt-4'>
                <div className='flex justify-between items-center gap-2'>
                    <h4 className='h5 line-clamp-1'>{book.name}</h4>
                    <p className='text-secondary bold-15'>{currency}{book.offerPrice}.00</p>
                </div>
                
                <div className='flex justify-between items-start gap-2 mt-1'>
                    <p className='line-clamp-1 text-sm text-gray-600'>{book.description}</p>
                    
                    <button 
                        onClick={handleAddToCart}
                        className='cursor-pointer p-1 hover:text-secondary hover:scale-110 transition-all z-20'
                        title="Add to cart"
                    >
                        <TbShoppingBagPlus className='text-2xl'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item