import React, { useContext, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { TbShoppingBagPlus } from "react-icons/tb"

const Offers = () => {
  const { books, currency, addToCart } = useContext(ShopContext);

  // Фільтруємо ТІЛЬКИ ті книги, де є реальна знижка
  const offerBooks = books.filter(book => 
    Number(book.offerPrice) < Number(book.price) && book.inStock
  );

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className='max-padd-container py-16 pt-20'>
      
      {/* 1. FESTIVE PROMO BANNER (Покращений дизайн) */}
      <div className="w-full bg-gradient-to-r from-violet-600 to-pink-700 rounded-3xl p-8 sm:p-12 mb-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden border border-purple-500/30">
        
        {/* Текстова частина банера */}
        <div className="relative z-10 max-w-xl"> {/* Трохи зменшили max-w для тексту, щоб звільнити місце */}
          <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 inline-block shadow-sm">
            Special Giveaway
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-5 drop-shadow-md text-white">
            Celebrating 10 Years! 🎉
          </h2>
          <p className="text-lg sm:text-xl mb-6 text-purple-50 drop-shadow-sm font-medium leading-relaxed">
            Celebrate with us! Look for discounted books and participate in our gift certificate giveaway.
          </p>
          
          {/* БЛОК З УМОВАМИ (З ЧЕРВОНИМ ТЕКСТОМ) */}
          <div className="text-sm flex flex-col gap-1.5 font-medium bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/50 w-fit shadow-sm relative z-20">
            <p className="text-red-500">* Find the Giveaway terms on our social media pages.</p>
            <p className="text-red-500">** The promo is valid from April 1, 2026 to April 15, 2026.</p>
          </div>
        </div>

        {/* 🖼️ ЗБІЛЬШЕНЕ РУХОМЕ ВІКОНЦЕ З КАРТИНКОЮ cover-3.webp */}
        {/* Додали lg:flex-1, щоб віконце займало більше місця на великих екранах */}
        <div className="mt-8 md:mt-0 relative z-10 hidden md:flex lg:flex-1 justify-center md:justify-end">
          {/* Контейнер з ефектом матового скла, тіню та анімацією при наведенні */}
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/30 cursor-pointer">
              <img 
                src="/assets/cover-3.webp" // Оновлена назва фото
                alt="Promo Artwork" 
                // Збільшено розміри: w-96 h-72 (замість w-64 h-48)
                className="w-96 h-72 lg:w-[450px] lg:h-[320px] object-cover rounded-xl shadow-inner" 
              />
          </div>
        </div>

        {/* Декоративні кола на фоні для глибини */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-purple-900 opacity-40 rounded-full blur-2xl"></div>
      </div>
      {/* КІНЕЦЬ БАНЕРА */}


      {/* 2. ЗАГОЛОВОК СЕКЦІЇ */}
      <Title title1={"Special"} title2={"Offers"} titleStyles={"pb-10"} para={"Hurry up and get your favorite books at discounted prices before they are gone!"} />
      
      {/* 3. СПИСОК КНИГ ЗІ ЗНИЖКАМИ */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {offerBooks.length > 0 ? (
          offerBooks.map((book) => {
            const currentPrice = Number(book.offerPrice);
            const oldPrice = Number(book.price);
            const discountPercent = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);

            return (
              <div key={book._id} className='flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all'>
                
                {/* Зображення книги */}
                <div className='w-full sm:w-1/3 h-64 sm:h-auto overflow-hidden rounded-xl flex items-center justify-center bg-slate-50 relative'>
                   <img src={book.image[0]} alt={book.name} className='object-cover h-full w-full hover:scale-105 transition-all duration-500' />
                   {/* Маленький бейдж знижки */}
                   <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm'>
                     -{discountPercent}%
                   </span>
                </div>
                
                {/* Інформація про книгу */}
                <div className='w-full sm:w-2/3 flex flex-col justify-center'>
                   <h3 className='text-2xl font-bold text-slate-800 line-clamp-1'>{book.name}</h3>
                   <p className='text-sm text-slate-500 mb-4'>{book.category}</p>
                   
                   <div className='flex items-center gap-3 mb-4'>
                      <span className='text-2xl font-bold text-secondary'>{currency}{currentPrice}</span>
                      <span className='text-lg text-slate-400 line-through'>{currency}{oldPrice}</span>
                   </div>
                   
                   <p className='text-sm text-slate-700 mb-3'>
                      <span className='font-medium'>In Stock:</span> {book.inStock ? "Yes" : "No"}
                   </p>
                   
                   <p className='text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed'>
                      {book.description || "An amazing book currently available at a special price. Don't miss the chance to add it to your collection!"}
                   </p>
                   
                   <button onClick={() => addToCart(book._id)} className='flex items-center justify-center gap-2 btn-secondary transition-all w-max cursor-pointer'>
                      <TbShoppingBagPlus className='text-lg'/> Add to Cart
                   </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <h4 className="h3 text-slate-400 mb-2">No promotional items yet</h4>
            <p className="text-slate-500">There are currently no books on sale. Check back later!</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Offers