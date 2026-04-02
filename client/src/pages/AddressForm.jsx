import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from "react-hot-toast";
import CartTotal from '../components/CartTotal'; 

const AddressForm = () => {
  const { navigate, backendUrl, token, cartItems, books, getCartAmount, delivery_charges, setCartItems } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", 
    city: "", country: "", phone: ""
  });

  const [method, setMethod] = useState('cod');

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        let orderItems = [];
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                const itemInfo = structuredClone(books.find(book => book._id === items));
                if (itemInfo) {
                    itemInfo.quantity = cartItems[items];
                    orderItems.push(itemInfo);
                }
            }
        }

        let orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_charges,
            paymentMethod: method
        }

        const response = await fetch(backendUrl + '/api/orders/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token 
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
            setCartItems({});
            navigate('/my-orders');
            toast.success("Order Placed Successfully!");
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error("Error placing order");
    }
  }

  return (
    <div className='max-padd-container pt-28 pb-10'>
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-12'>
            <div className='flex flex-col gap-4 w-full sm:max-w-120'>
                <Title title1={'DELIVERY'} title2={'INFORMATION'} titleStyles={'text-left text-2xl font-medium mb-6'} />
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            <div className='flex flex-col gap-8 w-full sm:max-w-100'>
                <div className='mt-8'>
                    <div className='max-w-94.75 w-full bg-primary p-5 py-10 rounded-xl'>
                       <h3 className='bold-22 mb-4'>Cart Totals</h3>
                       <div className='flex justify-between py-2'>
                           <p>Subtotal</p>
                           <p>${getCartAmount()}.00</p>
                       </div>
                       <div className='flex justify-between py-2'>
                           <p>Shipping Fee</p>
                           <p>${delivery_charges}.00</p>
                       </div>
                       <div className='flex justify-between py-2 font-bold text-lg'>
                           <p>Total</p>
                           <p>${getCartAmount() + delivery_charges}.00</p>
                       </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <Title title1={'PAYMENT'} title2={'METHOD'} titleStyles={'text-left text-2xl font-medium mb-6'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>STRIPE</p>
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded cursor-pointer'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddressForm