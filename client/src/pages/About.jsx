import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    // Changed the background of the entire section to a very light gray so the white card stands out
    <div className=' max-padd-container py-16 pt-28 min-h-screen'>
      
      <Title title1={"About"} title2={"Us"} titleStyles={"pb-10"} />
      
      {/* MAIN BLOCK: White card with shadow and rounded corners */}
      <div className='flex flex-col md:flex-row gap-12 bg-white p-10 sm:p-14 rounded-3xl shadow-lg border border-slate-100'>
        
        {/* Image on the left (added a soft shadow for the photo) */}
        <div className='flex-1 overflow-hidden rounded-2xl shadow-md'>
          <img 
            src="/assets/bg.png" 
            alt="About Us" 
            className='w-full h-full object-cover max-h-[450px] hover:scale-105 transition-all duration-500'
          />
        </div>
        
        {/* Text section on the right */}
        <div className='flex-1 flex flex-col justify-center gap-6'>
          {/* Dark slate heading */}
          <h3 className='h2 text-slate-900 leading-tight'>
            Welcome to <span className='text-secondary'>BookS</span> — your cozy book corner!
          </h3>
          
          {/* Rich dark gray text for better readability */}
          <p className='text-slate-700 text-lg leading-relaxed'>
            We are a team of passionate book lovers united by a single goal: to make reading accessible, exciting, and inspiring for everyone. We believe that every book holds a whole world ready to reveal its secrets.
          </p>
          
          <p className='text-slate-700 text-lg leading-relaxed'>
            Our selection is carefully curated: from gripping thrillers to in-depth programming textbooks. We strive to be more than just a store, but a community where everyone can find a story to their liking.
          </p>
          
          {/* STATISTICS SECTION: Made white blocks on a gray background for contrast */}
          <div className='flex gap-5 mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner'>
            
            <div className='bg-white p-5 rounded-xl flex-1 text-center shadow-sm border border-slate-100'>
               {/* Using secondary color (purple) for numbers */}
               <h4 className='h1 text-secondary font-extrabold'>10k+</h4>
               <p className='text-sm text-slate-600 font-medium'>Books in stock</p>
            </div>
            
            <div className='bg-white p-5 rounded-xl flex-1 text-center shadow-sm border border-slate-100'>
               <h4 className='h1 text-secondary font-extrabold'>5k+</h4>
               <p className='text-sm text-slate-600 font-medium'>Happy readers</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default About