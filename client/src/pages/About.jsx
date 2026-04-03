import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    <div className='max-padd-container py-16 pt-28 min-h-screen'>
      
      <Title title1={"About"} title2={"Us"} titleStyles={"pb-12"} />

      {/* MAIN CARD */}
      <div className='relative overflow-hidden flex flex-col lg:flex-row gap-12 bg-gradient-to-br from-white to-slate-50 p-8 sm:p-12 lg:p-14 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-200'>
        
        {/* Decorative blur circles */}
        <div className='absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute bottom-0 left-0 w-52 h-52 bg-primary/40 rounded-full blur-3xl pointer-events-none'></div>

        {/* IMAGE */}
        <div className='flex-1 relative z-10'>
          <div className='overflow-hidden rounded-[1.8rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/60'>
            <img
              src="/assets/bg.png"
              alt="About Us"
              className='w-full h-full object-cover max-h-[500px] hover:scale-105 transition-all duration-700'
            />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className='flex-1 flex flex-col justify-center gap-6 relative z-10'>
          
          <div className='inline-block w-fit px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide'>
            Our Story
          </div>

          <h3 className='text-3xl sm:text-4xl font-bold text-slate-900 leading-tight max-w-xl'>
            Welcome to <span className='text-secondary'>BookS</span> — your cozy world of stories
          </h3>

          <p className='text-slate-700 text-lg leading-relaxed'>
            We are a team of passionate book lovers united by one mission: to make reading accessible, exciting, and inspiring for everyone. Every book opens the door to a new world, a new perspective, and a new adventure.
          </p>

          <p className='text-slate-700 text-lg leading-relaxed'>
            Our collection is thoughtfully curated — from thrilling fiction and timeless classics to educational and programming books. We want to be more than just a bookstore — we want to be your favorite reading place.
          </p>

          {/* STATS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6'>
            <div className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-all duration-300'>
              <h4 className='text-4xl font-extrabold text-secondary'>10k+</h4>
              <p className='text-sm text-slate-600 font-medium mt-2'>Books in stock</p>
            </div>

            <div className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-all duration-300'>
              <h4 className='text-4xl font-extrabold text-secondary'>5k+</h4>
              <p className='text-sm text-slate-600 font-medium mt-2'>Happy readers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About