import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbBrandBlogger, TbHome } from "react-icons/tb";
import { IoLibraryOutline, IoInformationCircleOutline, IoPricetagOutline } from "react-icons/io5"; // Додали IoPricetagOutline
import { PiEnvelopeDuotone } from "react-icons/pi";

const Navbar = ({ containerStyles, setMenuOpened }) => {
  const navItems = [
    { to: "/", label: "Home", icon: <TbHome /> },
    { to: "/shop", label: "Shop", icon: <IoLibraryOutline /> },
    { to: "/offers", label: "Offers", icon: <IoPricetagOutline /> }, // Використовуємо надійну іконку
    { to: "/blog", label: "Blog", icon: <TbBrandBlogger /> },
    { to: "/about", label: "About", icon: <IoInformationCircleOutline /> }, 
    { to: "/contact", label: "Contact", icon: <PiEnvelopeDuotone /> }, 
  ];

  return (
    <nav className={containerStyles}> 
      {navItems.map(({ to, label, icon }) => (
        <div key={label}>
          <NavLink onClick={()=>setMenuOpened(false)} to={to} className= {({ isActive })  => `${isActive ? "bg-white ring-1 ring-slate-900/10" : "" } flexCenter gap-x-2 px-3 py-2 rounded-full transition-all`}>
            <span className='text-xl'>{icon}</span>
            <span className='medium-16'>{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;