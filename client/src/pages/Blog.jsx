import React, { useEffect, useState } from 'react'
import Title from '../components/Title'

// Наші статичні дані з твоїми картинками
const dummyBlogs = [
  { id: 1, title: "Top 10 Books to Read in 2026", category: "Recommendations", image: "/assets/blogs/blog1.jpg", content: "Looking for your next great read? We have compiled a list of the most anticipated and highly rated books of the year that you simply cannot miss." },
  { id: 2, title: "How to Build a Reading Habit", category: "Lifestyle", image: "/assets/blogs/blog2.jpg", content: "Struggling to find time to read? Discover 5 actionable tips to help you read more consistently and make books a part of your daily routine." },
  { id: 3, title: "Exploring Sci-Fi Universes", category: "Review", image: "/assets/blogs/blog3.jpg", content: "A deep dive into the most immersive science fiction worlds created by modern authors. Robots, space exploration, and futuristic societies await." },
  { id: 4, title: "Cozy Mysteries for Rainy Days", category: "Genres", image: "/assets/blogs/blog4.jpg", content: "No gore, just a good puzzle and a cup of tea. Explore the best cozy mysteries to keep you entertained during a rainy weekend." },
  { id: 5, title: "Interview with a Bestseller", category: "Author Talk", image: "/assets/blogs/blog5.jpg", content: "We sat down with one of this decade's most prominent authors to discuss their writing process, inspirations, and upcoming projects." },
  { id: 6, title: "Classics Worth Rereading", category: "Classics", image: "/assets/blogs/blog6.jpg", content: "Some books reveal new layers of meaning when you read them as an adult. Here is our list of classics that deserve a second look." },
  { id: 7, title: "Books for Learning Programming", category: "Education", image: "/assets/blogs/blog7.jpg", content: "From Python to React: the best books for beginners and intermediate developers looking to level up their coding skills." },
  { id: 8, title: "Creating the Perfect Reading Nook", category: "Lifestyle", image: "/assets/blogs/blog8.jpg", content: "Lighting, seating, and ambiance. Learn how to transform a corner of your home into the ultimate reading sanctuary." },
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Спробуємо отримати дані з сервера
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => { 
        // Якщо сервер повернув дані і вони не порожні
        if(data.success && data.data.length > 0) {
            setBlogs(data.data) 
        } else {
            // Якщо сервер порожній, показуємо наші підготовлені картинки
            setBlogs(dummyBlogs)
        }
      })
      .catch(err => {
        console.error(err);
        // Якщо сервер взагалі вимкнений, все одно показуємо картинки
        setBlogs(dummyBlogs);
      });
      
      window.scrollTo(0, 0); // Прокрутка вгору при відкритті
  }, [])

  return (
    <div className='max-padd-container py-16 pt-28'>
      <Title title1={"Our"} title2={"Blog"} titleStyles={"pb-10"} para={"Explore our latest articles, reviews, and book recommendations."} />

      {/* ГОЛОВНА СТАТТЯ (Перший елемент масиву) */}
      {blogs.length > 0 && (
         <div className='flex flex-col md:flex-row gap-8 mb-16 bg-primary rounded-2xl p-6 shadow-sm'>
            <div className='flex-1 overflow-hidden rounded-xl'>
               <img src={blogs[0].image} alt="Featured" className='w-full h-full object-cover max-h-[400px] hover:scale-105 transition-all duration-500' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-start gap-4'>
               <span className='bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>{blogs[0].category}</span>
               <h3 className='h2'>{blogs[0].title}</h3>
               <p className='text-gray-600 text-lg'>{blogs[0].content}</p>
               <button className='btn-dark mt-4'>Read Full Article</button>
            </div>
         </div>
      )}

      {/* СІТКА ІНШИХ СТАТЕЙ (Решта елементів) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12'>
        {blogs.slice(1).map((blog, i) => (
          <div key={i} className='group flex flex-col cursor-pointer'>
            
            <div className='overflow-hidden rounded-xl relative shadow-sm'>
              <img src={blog.image} alt={blog.title} className='w-full aspect-video object-cover group-hover:scale-110 transition-all duration-500' />
              {/* Бейджик категорії поверх картинки */}
              <span className='absolute top-3 left-3 bg-white text-secondary px-3 py-1 rounded-full text-xs font-bold shadow-md'>
                {blog.category}
              </span>
            </div>

            <div className='pt-4 flex flex-col flex-grow'>
                <h5 className="h5 mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{blog.title}</h5>
                <p className='text-sm text-gray-600 line-clamp-3 mb-4 flex-grow'>
                 {blog.content}
                </p>
                <button className='underline mt-auto bold-14 text-left hover:text-secondary transition-colors'>
                  continue reading &rarr;
                </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog