import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home'
import Shop from './pages/Shop'
import CategoryShop from './pages/CategoryShop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Header from './components/Header'
import Footer from './components/Footer'
import AddressForm from './pages/AddressForm';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login'
import { ShopContext } from './context/ShopContext'; 
import Sidebar from './components/admin/Sidebar';
import AdminLogin from './components/admin/AdminLogin';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import Orders from './pages/admin/Orders';
import EditProduct from './pages/admin/EditProduct';
import About from './pages/About';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Blog from './pages/Blog';


const App = () => {
  const { showUserLogin, isAdmin } = useContext(ShopContext)
  const isAdminPath = useLocation().pathname.includes('admin')
  
  return (
    <main>
      {showUserLogin && <Login />}
      {!isAdminPath && <Header />}
      <Toaster position='bottom-right'/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/shop/:category' element={<CategoryShop/>} />
          <Route path='/shop/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/address-form' element={<AddressForm/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/admin' element={isAdmin ? <Sidebar /> : <AdminLogin />}>
             <Route index element={isAdmin ? <AddProduct /> : null} />
             <Route path='list' element={<ProductList />} />
             <Route path='orders' element={<Orders />} />
             <Route path='edit/:id' element={<EditProduct />} />
          </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </main>
  )
}

export default App