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

import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export const ShopContext = createContext()

const ShopContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [user, setUser] = useState(null)
    const [cartItems, setCartItems] = useState({})
    const currency = "$" 
    const delivery_charges = 10
    const [isAdmin, setIsAdmin] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showUserLogin, setShowUserLogin] = useState(false);

    const loadData = () => {
        // Категорії 
        setCategories([
            { name: "Academic", image: "/assets/categories/academic.png" },
            { name: "Children", image: "/assets/categories/children.png" },
            { name: "Health", image: "/assets/categories/health.png" },
            { name: "Horror", image: "/assets/categories/horror.png" },
            { name: "Business", image: "/assets/categories/business.png" },
            { name: "History", image: "/assets/categories/history.png" },
            { name: "Adventure", image: "/assets/categories/adventure.png" }
        ]);

        // Усі 42 книги з вашого списку 
        setBooks([
            { _id: "1", name: "Foundations of Science", image: ["/assets/books/book_1.png"], offerPrice: 15, price: 35, description: "Learn energy, motion, and forces with simple examples and visuals for young science explorers.", category: "Academic", popular: false, inStock: true },
            { _id: "2", name: "Everyday Math Explained", image: ["/assets/books/book_2.png"], offerPrice: 20, price: 35, description: "Basic math for daily life: budgeting, measuring, percentages, and more made easy and clear.", category: "Academic", popular: false, inStock: true },
            { _id: "3", name: "Basics of Chemistry", image: ["/assets/books/book_3.png"], offerPrice: 10, price: 35, description: "Explore atoms, matter, and reactions in simple steps with visuals and easy chemistry terms.", category: "Academic", popular: false, inStock: true },
            { _id: "4", name: "Tech and Logic Essentials", image: ["/assets/books/book_4.png"], offerPrice: 25, price: 35, description: "Learn coding basics, algorithms, and problem-solving using fun tasks and clear explanations.", category: "Academic", popular: false, inStock: true },
            { _id: "5", name: "World Events and Ideas", image: ["/assets/books/book_5.png"], offerPrice: 15, price: 35, description: "Discover key global events, wars, and changes in a short, simple guide to world history.", category: "Academic", popular: false, inStock: true },
            { _id: "6", name: "Understanding Life Science", image: ["/assets/books/book_6.png"], offerPrice: 18, price: 35, description: "Explore cells, genetics, ecosystems, and biology basics in easy terms for curious readers.", category: "Academic", popular: false, inStock: true },
            { _id: "7", name: "The Magic Treehouse", image: ["/assets/books/book_7.png"], offerPrice: 12, price: 35, description: "Time travel tales with fun lessons, magic, and learning for young adventurous minds.", category: "Children", popular: false, inStock: true },
            { _id: "8", name: "Animal Friends Forever", image: ["/assets/books/book_8.png"], offerPrice: 14, price: 35, description: "Stories of animal friendships, teamwork, and kindness told with colorful illustrations.", category: "Children", popular: false, inStock: true },
            { _id: "9", name: "Fairyland Dreams", image: ["/assets/books/book_9.png"], offerPrice: 18, price: 35, description: "A magical land of fairies and princesses solving problems with courage and teamwork.", category: "Children", popular: false, inStock: true },
            { _id: "10", name: "Super Jack and the Dragon", image: ["/assets/books/book_10.png"], offerPrice: 20, price: 35, description: "Join Jack in his brave journey to defeat a dragon and save his town.", category: "Children", popular: false, inStock: true },
            { _id: "11", name: "Treasure Island Map", image: ["/assets/books/book_11.png"], offerPrice: 15, price: 35, description: "A thrilling quest with hidden maps, clues, and a treasure adventure to enjoy.", category: "Children", popular: false, inStock: true },
            { _id: "12", name: "Kids in Space", image: ["/assets/books/book_12.png"], offerPrice: 17, price: 35, description: "Explore planets, rockets, and space fun with children on a wild ride to the stars.", category: "Children", popular: true, inStock: true },
            { _id: "13", name: "Healthy Living Guide", image: ["/assets/books/book_13.png"], offerPrice: 20, price: 35, description: "Simple tips on staying fit, eating right, and living a healthier life with balance and wellness.", category: "Health", popular: false, inStock: true },
            { _id: "14", name: "Yoga and You", image: ["/assets/books/book_14.png"], offerPrice: 18, price: 35, description: "Basic yoga poses and routines to improve flexibility, calm the mind, and reduce daily stress.", category: "Health", popular: false, inStock: true },
            { _id: "15", name: "Nutrition Simplified", image: ["/assets/books/book_15.png"], offerPrice: 15, price: 35, description: "Learn about healthy eating, food groups, and smart choices to boost energy and stay strong.", category: "Health", popular: false, inStock: true },
            { _id: "16", name: "Rest and Recharge", image: ["/assets/books/book_16.png"], offerPrice: 22, price: 35, description: "Discover how sleep, rest, and relaxation improve mood, health, and focus in daily life.", category: "Health", popular: false, inStock: true },
            { _id: "17", name: "Quick Fitness Plan", image: ["/assets/books/book_17.png"], offerPrice: 25, price: 35, description: "A short workout routine to keep fit, gain energy, and build healthy habits for every day.", category: "Health", popular: false, inStock: true },
            { _id: "18", name: "Nature Heals", image: ["/assets/books/book_18.png"], offerPrice: 18, price: 35, description: "Discover how spending time in nature helps reduce stress, clear your mind, and feel refreshed.", category: "Health", popular: true, inStock: true },
            { _id: "19", name: "Whispers in the Dark", image: ["/assets/books/book_19.png"], offerPrice: 30, price: 35, description: "A creepy tale of shadows and voices that haunt a house deep within a forgotten forest.", category: "Horror", popular: false, inStock: true },
            { _id: "20", name: "The Haunted Woods", image: ["/assets/books/book_20.png"], offerPrice: 25, price: 35, description: "Mysterious events unfold in a forest where no one returns once they enter after sunset.", category: "Horror", popular: true, inStock: true },
            { _id: "21", name: "Voices from the Grave", image: ["/assets/books/book_21.png"], offerPrice: 18, price: 35, description: "Eerie whispers call from the cemetery, revealing long-lost secrets buried deep beneath the ground.", category: "Horror", popular: true, inStock: true },
            { _id: "22", name: "Night of the Shadows", image: ["/assets/books/book_22.png"], offerPrice: 22, price: 35, description: "When night falls, evil rises. A town is stalked by dark figures and fearsome creatures unknown.", category: "Horror", popular: false, inStock: true },
            { _id: "23", name: "The Mirror's Curse", image: ["/assets/books/book_23.png"], offerPrice: 28, price: 35, description: "A haunted mirror shows twisted realities, drawing people in and trapping them forever inside it.", category: "Horror", popular: false, inStock: true },
            { _id: "24", name: "Basement of Bones", image: ["/assets/books/book_24.png"], offerPrice: 30, price: 35, description: "Dark secrets lurk beneath an old home, where bones whisper and spirits walk in silence.", category: "Horror", popular: false, inStock: true },
            { _id: "25", name: "Start Your Own Business", image: ["/assets/books/book_25.png"], offerPrice: 22, price: 35, description: "Step-by-step guide to launching a business from idea to reality, even with little experience.", category: "Business", popular: false, inStock: true },
            { _id: "26", name: "Brand Like a Pro", image: ["/assets/books/book_26.png"], offerPrice: 24, price: 35, description: "Master the art of branding, learn customer psychology, and build a strong, lasting identity.", category: "Business", popular: false, inStock: true },
            { _id: "27", name: "Lead with Purpose", image: ["/assets/books/book_27.png"], offerPrice: 26, price: 35, description: "Gain leadership skills to inspire, manage, and grow your business or team with confidence.", category: "Business", popular: false, inStock: true },
            { _id: "28", name: "Finance for Everyone", image: ["/assets/books/book_28.png"], offerPrice: 18, price: 35, description: "Easy ways to manage money, save smartly, and understand your personal and business finances.", category: "Business", popular: true, inStock: true },
            { _id: "29", name: "Mastering Negotiation", image: ["/assets/books/book_29.png"], offerPrice: 22, price: 35, description: "Practical techniques to win deals, communicate clearly, and negotiate in any business setting.", category: "Business", popular: false, inStock: true },
            { _id: "30", name: "Productivity Hacks", image: ["/assets/books/book_30.png"], offerPrice: 20, price: 35, description: "Time-saving strategies to stay organized, finish tasks faster, and make every day productive.", category: "Business", popular: true, inStock: true },
            { _id: "31", name: "Ancient Civilizations", image: ["/assets/books/book_31.png"], offerPrice: 15, price: 35, description: "Explore early human societies, how they lived, built cities, and shaped the world today.", category: "History", popular: false, inStock: true },
            { _id: "32", name: "World War Chronicles", image: ["/assets/books/book_32.png"], offerPrice: 18, price: 35, description: "Learn about major battles, leaders, and events from both world wars that shaped nations.", category: "History", popular: true, inStock: true },
            { _id: "33", name: "Leaders Who Changed the World", image: ["/assets/books/book_33.png"], offerPrice: 12, price: 35, description: "Discover inspiring stories of historical leaders who transformed countries and inspired generations.", category: "History", popular: true, inStock: true },
            { _id: "34", name: "The Rise and Fall of Empires", image: ["/assets/books/book_34.png"], offerPrice: 20, price: 35, description: "From Rome to the Ottomans, explore how empires grew powerful and what led to collapse.", category: "History", popular: false, inStock: true },
            { _id: "35", name: "History of Inventions", image: ["/assets/books/book_35.png"], offerPrice: 22, price: 35, description: "A journey through game-changing inventions that shaped modern life and changed human progress.", category: "History", popular: false, inStock: true },
            { _id: "36", name: "Explorers and Voyages", image: ["/assets/books/book_36.png"], offerPrice: 25, price: 35, description: "Tales of famous explorers, their discoveries, and how they mapped the unknown world.", category: "History", popular: true, inStock: true },
            { _id: "37", name: "Into the Unknown", image: ["/assets/books/book_37.png"], offerPrice: 16, price: 35, description: "Follow a bold journey through mysterious lands filled with danger, courage, and discovery.", category: "Adventure", popular: true, inStock: true },
            { _id: "38", name: "Lost in the Jungle", image: ["/assets/books/book_38.png"], offerPrice: 19, price: 35, description: "Follow a journey through a wild jungle filled with mystery and nature.", category: "Adventure", popular: false, inStock: true },
            { _id: "39", name: "Mountains of Mystery", image: ["/assets/books/book_39.png"], offerPrice: 20, price: 35, description: "Scaling icy peaks and ancient caves, a group finds danger and secrets buried in snow.", category: "Adventure", popular: true, inStock: true },
            { _id: "40", name: "The Desert Odyssey", image: ["/assets/books/book_40.png"], offerPrice: 23, price: 35, description: "An epic quest across blazing sands, where courage and wit are the only means to survive.", category: "Adventure", popular: false, inStock: true },
            { _id: "41", name: "Caves of Wonder", image: ["/assets/books/book_41.png"], offerPrice: 22, price: 35, description: "Deep underground, a hidden world awaits with lost treasures, strange creatures, and ancient magic.", category: "Adventure", popular: false, inStock: true },
            { _id: "42", name: "Frozen Expedition", image: ["/assets/books/book_42.png"], offerPrice: 21, price: 35, description: "Brave the icy tundra and uncover secrets buried beneath snow and time in this tale.", category: "Adventure", popular: false, inStock: true }
        ]);
    }

    useEffect(() => {
        loadData();
    }, [])

    // --- CART LOGIC ---
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        const idStr = String(itemId);
        cartData[idStr] = (cartData[idStr] || 0) + 1;
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
                let itemInfo = books.find((p) => String(p._id) === String(items));
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
        searchQuery, setSearchQuery, token, setToken, user, logout: () => {
            setToken(""); localStorage.removeItem('token'); navigate("/");
        },
        showUserLogin, setShowUserLogin, isAdmin, setIsAdmin
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;