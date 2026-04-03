import React, {useContext, useEffect, useState} from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay} from 'swiper/modules';
import Item from './Item'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
   const [popularBooks, setPopularBooks]= useState([])
   const {books} = useContext(ShopContext)

   useEffect(()=>{
      if(books.length > 0) {
        const data = books.filter((item)=> item.popular)
        setPopularBooks(data.slice(0,6))
      }
    }, [books])

  return (
    <section className="max-padd-container flex gap-6 h-158.5 mt-16">
      <div className="flex-5 bg-cover bg-center bg-no-repeat rounded-2xl" 
           style={{backgroundImage: `url("/assets/bg.png")`}}>
        <div className="max-padd-container flex flex-col h-full justify-center pt-8">
            <h3 className="bold-24 text-secondary font-thin">Explore Books You'll Love</h3>
            <h1 className="h1 max-w-174.75 !font=[800] leading-none mt-2">Find Your Next Book</h1>
            
            {/* НОВИЙ ТЕКСТ ТУТ */}
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mt-4'>
              Up to 40% Off This Week
            </h2>
            <p className='text-gray-600 mt-4 max-w-lg leading-relaxed text-sm sm:text-base'>
              Discover the joy of reading with our carefully curated collection of books. Whether you're searching for the latest bestsellers, timeless classics, or hidden gems, we've got something for every reader. Enjoy fast delivery, secure checkout, and unbeatable prices your next great read is just a click away!
            </p>

            <div className='flex mt-8'>
                <Link to={'/shop'} className="bg-white text-xs font-medium pl-6 rounded-full flexCenter gap-x-6 group w-fit"> Check our latest Stock 
                <FaArrowRight className="bg-secondary text-white rounded-full h-11 w-11 p-3 m-0.75 border border-white group-hover:bg-primary group-hover:text-black transition-all duration-500 "/>
                </Link>
            </div>
        </div>
      </div>
      
      <div className="hidden lg:block flex-2 bg-primary rounded-2xl bg-center bg-cover bg-no-repeat" 
           style={{backgroundImage: `url("/assets/bg-hero.png")`}}> 
         <div className=" max-w-sm pt-28" >
            <div>
              {/* SWIPER */}
               <Swiper 
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  modules={[Autoplay]}
                  className="min-h-99.75 max-w-64">
                  {popularBooks.map((book)=>(
                     <SwiperSlide key={book._id}>
                        <Item book={book} fromHero={true}/>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </div>
    </section>
  )
}
export default Hero