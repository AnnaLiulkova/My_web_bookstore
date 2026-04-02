import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import {FaBars, FaBarsStaggered} from "react-icons/fa6"
import {FaSearch} from "react-icons/fa"
import {RiUserLine} from "react-icons/ri"
import { ShopContext } from '../context/ShopContext';

const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { navigate, user, setUser, searchQuery, setSearchQuery, getCartCount, setShowUserLogin, logout} = useContext(ShopContext);
  const isShopPage = useLocation().pathname.endsWith('/shop');
  const toggleMenu = () => setMenuOpened((prev) => !prev)

  useEffect(() => {
    if (searchQuery.length > 0 && !isShopPage) {
      navigate('/shop');
    }
  }, [searchQuery]);

  return (
    <header className="absolute top-0 left-0 right-0 max-padd-container flexBetween gap-4 py-2">
      {/* LOGO */}
      <div className="flex flex-1">
        <Link to={'/'} className="bold-22 xl:bold-28 flex items-end gap-1">
         <img src="/assets/logo.png" alt="" className="hidden sm:block h-9"/>
         <div className="sm:relative top-1.5">
          BookS<span className="text-secondary">a.</span></div> 
        </Link>
      </div>

      {/* NAVBAR FOR MOBILE & DESKTOP*/}
      <div className="flex-1 flex justify-center"> 
      <Navbar 
        setMenuOpened={setMenuOpened} 
        containerStyles={`${menuOpened ? 
        "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50":
        "hidden lg:flex gap-x-5 xl:gap-x-7 medium-15 ring-1 ring-1 ring-slate-900/15 rounded-full p-1 bg-primary" }`}/>
      </div>

      <div className="flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8">
      {/* SEARCHBAR */}
      <div className="relative hidden xl:flex items-center">
      <div className={`bg-white ring-1 ring-slate-900/10 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? "w-66.5 opacity-100 px-4 py-2.5" : "w-0 opacity-0 p-0"}`}>
        <input 
          onChange={(e)=>setSearchQuery(e.target.value)}
          type="text" 
          placeholder="Search book..." 
          className="bg-transparent w-full text-sm outline-none pr-10 placeholder:text-gray-400"
        />
      </div>
      <div onClick={()=>setShowSearch(prev=>!prev)} className="absolute right-0.5 bg-primary p-2.5 rounded-full cursor-pointer z-10">
        <FaSearch className="text-xl"/>
      </div>
      </div>
      
      {/* MENU TOGGLE */}
      <>
      {menuOpened ? (
        <FaBarsStaggered onClick={toggleMenu} className="lg:hidden cursor-pointer text-xl"/>
      ) : (
        <FaBars onClick={toggleMenu} className="lg:hidden cursor-pointer text-xl"/>
      )}
      </>

      {/* CART */}
      <Link to={'/cart'} className="flex relative">
        <div className="bold-16 flex items-center gap-x-1">
            Cart 
            <span className="bg-secondary text-white text-[11px] font-semibold absolute -top-4 -right-2 flex items-center justify-center w-4.5 h-4.5 rounded-full shadow-md leading-none">
                {getCartCount()}
            </span>
        </div>
      </Link>

      {/* USER PROFILE */}
      <div className="group relative">
        <div className=""> 
           {user ? (
              <div className="flex gap-2 items-center cursor-pointer rounded-full bg-white" >
                <img src="/assets/user.png" alt="userImg" height={44} width={44}/>
              </div>             
           ) : (
              <button onClick={()=>(setShowUserLogin(true))} className="btn-light flexCenter gap-x-2">Login <RiUserLine className="text-xl"/> </button>
           )}
        </div>
        {/* DROPDOWN */}
        {user && (
        <ul className="bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-10 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
          <li onClick={()=>navigate('/my-orders')} className="p-2 rounded-md hover:bg-primary cursor-pointer">Orders</li>
          <li onClick={logout} className="p-2 rounded-md hover:bg-primary cursor-pointer text-red-500">Logout</li>
        </ul>
        )}
      </div>
 
      </div>
    </header>
  )
}

export default Header