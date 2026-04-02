import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const { setShowUserLogin, loginUser, registerUser, user, showUserLogin } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
        setShowUserLogin(false);
    }
  }, [user, setShowUserLogin]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    if (currentState === "Login") {
        await loginUser(data.email, data.password);
    } else {
        await registerUser(data.name, data.email, data.password);
    }
  }

  if (!showUserLogin) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div onClick={(e) => e.stopPropagation()} className='bg-white p-8 rounded-xl shadow-2xl w-[90%] sm:w-96 relative'>
        
        <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>{currentState}</h2>
            <button onClick={() => setShowUserLogin(false)} className='text-gray-400 hover:text-gray-600 text-2xl'>&times;</button>
        </div>
        
        <form onSubmit={onLogin} className='flex flex-col gap-4'>
            {currentState === "Sign Up" && (
                <div className='space-y-1'>
                    <p className='text-sm font-medium text-gray-700'>Name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none' required />
                </div>
            )}
            
            <div className='space-y-1'>
                <p className='text-sm font-medium text-gray-700'>Email</p>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='name@example.com' className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none' required />
            </div>

            <div className='space-y-1'>
                <p className='text-sm font-medium text-gray-700'>Password</p>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' className='w-full border border-gray-300 rounded-lg px-3 py-2 outline-none' required />
            </div>

            <button type='submit' className='bg-secondary text-white font-semibold py-2.5 rounded-lg mt-2 hover:opacity-90'>
                {currentState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <div className='text-center text-sm text-gray-600 mt-2'>
                {currentState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")} className='text-secondary cursor-pointer font-bold hover:underline'>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")} className='text-secondary cursor-pointer font-bold hover:underline'>Login here</span></p>
                }
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login