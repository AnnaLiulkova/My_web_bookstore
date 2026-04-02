import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { FaTrash, FaRegEdit, FaFilter, FaSortAmountDown } from "react-icons/fa"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom' 

const ProductList = () => {
  const { currency } = useContext(ShopContext)
  const [list, setList] = useState([]); 
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortType, setSortType] = useState("relevant");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5; 

  const fetchList = async (reset = false) => {
    try {
        const currentPage = reset ? 1 : page; 
        
        const url = `http://localhost:5000/api/books?page=${currentPage}&limit=${limit}&category=${filterCategory}&sort=${sortType}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if(data.success){
            if (data.data.length < limit) {
                setHasMore(false); 
            } else {
                setHasMore(true);
            }

            if (reset) {
                setList(data.data); 
            } else {
                setList(prev => [...prev, ...data.data]); 
            }
        } else {
            toast.error("Error fetching list");
        }
    } catch (error) {
        console.error(error);
        toast.error("Server error");
    }
  }

  useEffect(() => {
      setPage(1); 
      setHasMore(true);
      fetchList(true);
  }, [filterCategory, sortType]);

  const handleLoadMore = () => {
      setPage(prev => prev + 1); 
  };

  useEffect(() => {
      if (page > 1) {
          fetchList(false); 
      }
  }, [page]);


  const removeBook = async (id) => {
      if(!window.confirm("Are you sure?")) return;
      try {
          const response = await fetch('http://localhost:5000/api/books/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id })
          });
          const data = await response.json();
          if(data.success){
              toast.success("Deleted");
              fetchList(true); 
          }
      } catch (error) { toast.error("Error"); }
  }

  return (
    <div className='px-2 sm:px-6 py-8 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl'>
      <h3 className="h3 text-center mb-6">All Books List (Server Side)</h3>

      {/* ФІЛЬТРИ */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white p-2 rounded-md border border-slate-300">
              <FaFilter className="text-gray-500"/>
              <select onChange={(e) => setFilterCategory(e.target.value)} className="outline-none text-sm bg-transparent cursor-pointer">
                  <option value="All">All Categories</option>
                  <option value="Academic">Academic</option>
                  <option value="Children">Children</option>
                  <option value="Health">Health</option>
                  <option value="Horror">Horror</option>
                  <option value="Business">Business</option>
              </select>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-md border border-slate-300">
              <FaSortAmountDown className="text-gray-500"/>
              <select onChange={(e) => setSortType(e.target.value)} className="outline-none text-sm bg-transparent cursor-pointer">
                  <option value="relevant">Newest</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="name-az">Name: A-Z</option>
              </select>
          </div>
      </div>

      {/* СПИСОК */}
      <div className='flex flex-col gap-2'>
        <div className='hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-white border border-gray-200 font-bold text-sm rounded-lg shadow-sm mb-2'>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5 className='text-center'>Action</h5>
        </div>

        {list.map((book) => (
          <div key={book._id} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] max-sm:grid-cols-[1fr_3fr_1fr] items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all'>
            <img src={book.image[0]} alt={book.name} className='w-12 h-16 object-cover rounded-md bg-gray-100' />
            <h5 className='text-sm font-semibold line-clamp-1 max-w-50'>{book.name}</h5>
            <p className='text-sm text-gray-500 max-sm:hidden'>{book.category}</p>
            <div className='text-sm font-semibold text-secondary'>{currency}{book.offerPrice}</div>
            <div className='flex justify-center gap-2'>
               <button onClick={() => navigate(`/admin/edit/${book._id}`)} className='p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all cursor-pointer'><FaRegEdit /></button>
               <button onClick={() => removeBook(book._id)} className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer'><FaTrash /></button>
            </div>
          </div>
        ))}

        {list.length === 0 && <p className='text-center text-gray-500 mt-10'>No books found.</p>}

        {/*LOAD MORE */}
        {hasMore && (
            <div className='flex justify-center mt-6 mb-10'>
                <button onClick={handleLoadMore} className='bg-gray-100 border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-all text-sm font-medium'>
                    Load More
                </button>
            </div>
        )}
      </div>
    </div>
  )
}

export default ProductList