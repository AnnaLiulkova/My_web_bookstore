import React from 'react'
import Title from '../components/Title'
import { PiEnvelopeDuotone } from "react-icons/pi"
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6"

const Contact = () => {
  return (
    <div className='max-padd-container py-16 pt-28'>
      <Title title1={"Contact"} title2={"Us"} titleStyles={"pb-10"} />
      
      <div className='flex flex-col lg:flex-row gap-10 bg-primary p-8 md:p-12 rounded-2xl'>
        {/* Інформація */}
        <div className='flex-1 flex flex-col gap-6'>
          <h4 className='h3 mb-2'>Get in Touch</h4>
          <p className='text-gray-600 mb-4'>Have a question about your order or need a book recommendation? Drop us a message and we will get back to you as soon as possible.</p>
          
          <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm'>
            <FaLocationDot className='text-2xl text-secondary' />
            <div>
                <h5 className='h5'>Address</h5>
                <p className='text-sm text-gray-500'>123 Reading Street, Bookville</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm'>
            <FaPhoneVolume className='text-2xl text-secondary' />
            <div>
                <h5 className='h5'>Phone</h5>
                <p className='text-sm text-gray-500'>+380 12 345 67 89</p>
            </div>
          </div>

          <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm'>
            <PiEnvelopeDuotone className='text-2xl text-secondary' />
            <div>
                <h5 className='h5'>Email</h5>
                <p className='text-sm text-gray-500'>support@books.com</p>
            </div>
          </div>
        </div>

        {/* Форма */}
        <div className='flex-1 flex flex-col gap-4 bg-white p-6 md:p-8 rounded-xl shadow-sm'>
          <input type="text" placeholder="Your Name" className="border border-gray-200 rounded-lg p-3 outline-none focus:border-secondary transition-all" required/>
          <input type="email" placeholder="Your Email" className="border border-gray-200 rounded-lg p-3 outline-none focus:border-secondary transition-all" required/>
          <textarea rows="5" placeholder="Your Message" className="border border-gray-200 rounded-lg p-3 outline-none focus:border-secondary transition-all resize-none" required></textarea>
          <button className="btn-secondary w-max mt-2">Send Message</button>
        </div>
      </div>
    </div>
  )
}

export default Contact