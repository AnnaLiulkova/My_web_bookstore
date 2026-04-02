import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import NewArrivals from '../components/NewArrivals'
import FeaturedBooks from '../components/FeaturedBooks'
import PopularBooks from '../components/PopularBooks'

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedBooks />
      <PopularBooks />
    </>
  )
}

export default Home