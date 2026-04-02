import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const [image, setImage] = useState(false); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("Academic");
  const [popular, setPopular] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
        toast.error("Please upload an image first");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
        });
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
            toast.error(uploadData.message || "Image upload failed");
            return;
        }

        const imageUrl = uploadData.imageUrl;

        const productData = {
            name,
            description,
            price,
            offerPrice,
            category,
            popular,
            image: imageUrl 
        };

        const response = await fetch('http://localhost:5000/api/books/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        
        const data = await response.json();

        if (data.success) {
            toast.success("Product Added Successfully");
            setName("");
            setDescription("");
            setPrice("");
            setOfferPrice("");
            setImage(false);
            setPopular(false);
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        console.error(error);
        toast.error("Error adding product");
    }
  };

  return (
    <div className="px-2 sm:px-6 py-8 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl">
      <h3 className="h3 text-center mb-6">Add New Book</h3>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-4 medium-14 max-w-2xl mx-auto">
        
        <div className="w-full">
          <h5 className="h5 mb-2">Book Name</h5>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Title of the book"
            className="px-3 py-2 bg-white border border-slate-300 rounded-md w-full outline-none focus:border-secondary transition-all"
            required
          />
        </div>

        <div className="w-full">
          <h5 className="h5 mb-2">Description</h5>
          <textarea
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Write content here..."
            className="px-3 py-2 bg-white border border-slate-300 rounded-md w-full outline-none focus:border-secondary transition-all resize-none"
            required
          />
        </div>

        <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-37.5">
              <h5 className="h5 mb-2">Category</h5>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md outline-none cursor-pointer"
              >
                <option value="Academic">Academic</option>
                <option value="Children">Children</option>
                <option value="Health">Health</option>
                <option value="Horror">Horror</option>
                <option value="Business">Business</option>
                <option value="History">History</option>
                <option value="Adventure">Adventure</option>
              </select>
           </div>
           
           <div className="flex-1 min-w-25">
              <h5 className="h5 mb-2">Price</h5>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md outline-none"
                required
              />
            </div>

            <div className="flex-1 min-w-25">
               <h5 className="h5 mb-2">Offer Price</h5>
              <input
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md outline-none"
                required
              />
            </div>
        </div>
        
        {/* IMAGE UPLOAD */}
        <div>
            <h5 className="h5 mb-2">Book Cover</h5>
            <label htmlFor="image" className="flex flex-col items-center justify-center w-32 h-44 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden">
                {image ? (
                    <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <FaCloudUploadAlt className="text-3xl mb-1"/>
                        <span className="text-xs">Upload</span>
                    </div>
                )}
                <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type="file" 
                    id="image" 
                    hidden 
                    required
                />
            </label>
        </div>

       <div className="flex items-center gap-2 mt-2">
        <input
            onChange={() => setPopular((prev) => !prev)}
            checked={popular}
            type="checkbox"
            id="popular"
            className="w-4 h-4 cursor-pointer accent-secondary"
          />
          <label htmlFor="popular" className="cursor-pointer select-none">Add to Popular</label>
       </div>

       <button type="submit" className="btn-dark mt-4 py-3 rounded-md w-full hover:bg-black/90 transition-all">Add Book</button>
      </form>
    </div>
  );
};

export default AddProduct;