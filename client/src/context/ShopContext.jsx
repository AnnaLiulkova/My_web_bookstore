// import React, { createContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from "react-hot-toast";

// export const ShopContext = createContext()

// const ShopContextProvider = ({children}) => {
//     const navigate = useNavigate()
//     const [books, setBooks] = useState([])
//     const [categories, setCategories] = useState([])
//     const [token, setToken] = useState(localStorage.getItem('token') || "")
//     const [user, setUser] = useState(null)
//     const [cartItems, setCartItems] = useState({})
//     const currency = "$" 
//     const delivery_charges = 10
//     const [isAdmin, setIsAdmin] = useState(false)
//     const [searchQuery, setSearchQuery] = useState("")
//     const [showUserLogin, setShowUserLogin] = useState(false);
    
//     const backendUrl = "http://localhost:5000";

//     const fetchBooks = async () => {
//         try {
//             const response = await fetch(backendUrl + '/api/books');
//             const data = await response.json();
//             if(data.success) {
//                 setBooks(data.data);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Error loading data");
//         }
//     }

//     const fetchCategories = async () => {
//         try {
//             const response = await fetch(backendUrl + '/api/categories');
//             const data = await response.json();
//             if(data.success) setCategories(data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         fetchBooks();
//         fetchCategories();
//     }, [])

//     const loginUser = async (email, password) => {
//         try {
//             const response = await fetch(backendUrl + '/api/user/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password })
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setToken(data.token);
//                 localStorage.setItem('token', data.token);
//                 setUser(data.user);
//                 setShowUserLogin(false);
//                 toast.success("Login Successful");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     const registerUser = async (name, email, password) => {
//         try {
//             const response = await fetch(backendUrl + '/api/user/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, password })
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setToken(data.token);
//                 localStorage.setItem('token', data.token);
//                 setUser(data.user);
//                 setShowUserLogin(false);
//                 toast.success("Registration Successful");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     const logout = () => {
//         setToken("");
//         localStorage.removeItem('token');
//         setUser(null);
//         setCartItems({});
//         navigate("/");
//         toast.success("Logged out");
//     }

//     // --- CART ---
//     const addToCart = (itemId) => {
//         let cartData = structuredClone(cartItems);
//         const idStr = String(itemId);
//         if (cartData[idStr]) {
//             cartData[idStr] += 1;
//         } else {
//             cartData[idStr] = 1;
//         }
//         setCartItems(cartData);
//         toast.success("Added to cart");
//     }

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const items in cartItems) {
//             if (cartItems[items] > 0) {
//                 totalCount += cartItems[items];
//             }
//         }
//         return totalCount;
//     }

//     const updateQuantity = (itemId, quantity) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = quantity;
//         setCartItems(cartData);
//     }

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             if (cartItems[items] > 0) {
//                 let itemInfo = books.find((product) => String(product._id) === String(items));
//                 if (itemInfo) {
//                     totalAmount += Number(itemInfo.offerPrice) * cartItems[items];
//                 }
//             }
//         }
//         return totalAmount;
//     }

//     const value = {
//         books, categories, navigate, currency, delivery_charges,
//         cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
//         searchQuery, setSearchQuery,
//         token, setToken, user, loginUser, registerUser, logout,
//         showUserLogin, setShowUserLogin, isAdmin, setIsAdmin, backendUrl
//     }

//     return (
//         <ShopContext.Provider value={value}>
//             {children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
// 1. Імпортуємо твої статичні дані
import { dummyBooks, categories as staticCategories } from '../data'; 

export const ShopContext = createContext()

const ShopContextProvider = ({children}) => {
    const navigate = useNavigate()
    
    // 2. Встановлюємо початкові дані з файлу data.jsx
    const [books, setBooks] = useState(dummyBooks) 
    const [categories, setCategories] = useState(staticCategories)
    
    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [user, setUser] = useState(null)
    const [cartItems, setCartItems] = useState({})
    const currency = "$" 
    const delivery_charges = 10
    const [isAdmin, setIsAdmin] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showUserLogin, setShowUserLogin] = useState(false);
    
    const backendUrl = "http://localhost:5000";

    // 3. Функції запитів залишаємо, але не викликаємо їх, щоб не було помилок підключення
    const fetchBooks = async () => {
        /* Тимчасово вимкнено для автономної роботи
        try {
            const response = await fetch(backendUrl + '/api/books');
            const data = await response.json();
            if(data.success) {
                setBooks(data.data);
            }
        } catch (error) {
            console.log(error);
        }
        */
    }

    const fetchCategories = async () => {
        /* Тимчасово вимкнено
        try {
            const response = await fetch(backendUrl + '/api/categories');
            const data = await response.json();
            if(data.success) setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
        */
    }

    useEffect(() => {
        // fetchBooks(); // Вимкнено
        // fetchCategories(); // Вимкнено
    }, [])

    // --- LOGIC (LOGIN/LOGOUT) ---
    // Ці функції поки не працюватимуть без бекенду, але вони не заважають відображенню книг
    const loginUser = async (email, password) => {
        toast.error("Login disabled in offline mode");
    }

    const registerUser = async (name, email, password) => {
        toast.error("Registration disabled in offline mode");
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem('token');
        setUser(null);
        setCartItems({});
        navigate("/");
        toast.success("Logged out");
    }

    // --- CART LOGIC (Залишається без змін, вона працюватиме з dummyBooks) ---
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        const idStr = String(itemId);
        if (cartData[idStr]) {
            cartData[idStr] += 1;
        } else {
            cartData[idStr] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const updateQuantity = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                let itemInfo = books.find((product) => String(product._id) === String(items));
                if (itemInfo) {
                    totalAmount += Number(itemInfo.offerPrice) * cartItems[items];
                }
            }
        }
        return totalAmount;
    }

    const value = {
        books, categories, navigate, currency, delivery_charges,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
        searchQuery, setSearchQuery,
        token, setToken, user, loginUser, registerUser, logout,
        showUserLogin, setShowUserLogin, isAdmin, setIsAdmin, backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;