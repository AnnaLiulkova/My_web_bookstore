import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { TbShoppingBagPlus } from "react-icons/tb"

const FeaturedBooks = () => {
  const { books, currency, addToCart } = useContext(ShopContext)
  
  const book = books.length > 0 ? books.find(b => b.popular) || books[0] : null;

  if (!book) return null;

  return (
    <section className='max-padd-container py-16 max-sm:bg-primary'>
      <div className='sm:px-10 flex sm:bg-primary py-16 rounded-2xl'>
        {/* HEADER */}
        <div className='flex-1'>
         <Title title1={"Featured"} title2={"Books"} titleStyles={"pb-8"} para={"Browse featured books carefully selected..."}/>
           {/* BOOK CARD */}
           <div className='flex gap-3 sm:gap-8 sm:bg-white sm:p-4 rounded-2xl'>
              <div className='min-w-40'>
                 <img 
                    src={book.image[0]} 
                    alt={book.name} 
                    className='h-64 w-44 object-cover rounded-xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.1)]' 
                  />
              </div>
              <div className='flex flex-col justify-between flex-1'>
                <div className='space-y-1'>
                  <h3 className='text-xl font-semibold text-gray-800 line-clamp-1'>{book.name}</h3>
                  <p className='text-sm'>{book.category}</p>
                </div>
                <div className='flex items-center gap-3 sm:mt-2 '>
                  <h4 className='text-lg font-bold text-secondary'>{currency}{book.offerPrice}</h4>
                  <p className='text-sm text-gray-400 line-through'>{currency}{book.price}</p>
                  <span className='hidden sm:flex bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full'>Save 5%</span>
                </div>
                <div className='grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 test-sm text-gray-600'>
                  <p><span className='font-medium text-gray-800'>In Stock:</span> {book.inStock ? "Yes" : "No"}</p>
                </div>
                <p className='mt-1 sm:mt-4 text-sm line-clamp-3'>{book.description}</p>
                <button onClick={() => addToCart(book._id)} className="btn-secondary max-sm:text-xs mt-1 sm:mt-5 w-fit px-5 py-2 flex items-center gap-2 text-sm font-medium"> 
                    <TbShoppingBagPlus className='text-lg'/>Add to Cart
                </button>
              </div>
           </div>
        </div>
        {/* RIGHT SIDE*/}
        <div className='hidden xl:flex flex-1 bg-center bg-cover bg-no-repeat' 
             style={{backgroundImage: `url("/assets/featured-books.png")`}}>
          <div className=''/>
        </div>
      </div>
    </section>
  )
}
export default FeaturedBooks