import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Wishlist() {
    let { wishlist, getWishlist, removeProductFromWishlist, addProductToWishlist, loading } = useContext(WishlistContext);

    useEffect(() => {
        getWishlist();
    }, []);

      return (
        <div className="p-5  bg-gray-100 ">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Wishlist ❤️</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {wishlist && wishlist.length > 0 ? (
                    wishlist.map((product) => (
                        <div key={product.id} className="bg-white p-3 shadow-sm rounded-xl   relative shadow-green-500 transition-all hover:shadow-2xl hover:shadow-green-500">
                            
                            <button
                                className={`absolute top-3 right-3 text-3xl transition-all ${
                                    wishlist.some(item => item.id === product.id) ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-500"
                                }`}
                                onClick={() =>
                                    wishlist.some(item => item.id === product.id)
                                        ? removeProductFromWishlist(product.id)
                                        : addProductToWishlist(product.id)
                                }
                            >
                                <FaHeart />
                            </button>

                            
                            <Link to={`/productdetails/${product.id}/${product.category?.name || 'unknown'}`} className="block">
                                <img src={product.imageCover} alt={product.title || "No title"} className="w-full h-72 object-cover rounded-md mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">{product.title.split(' ').slice(0, 2).join(' ') || "No title"}</h3>
                                <p className="text-green-600 font-bold text-lg">{product.price} EGP</p>
                            </Link>

                            
                            <button
                                onClick={() => removeProductFromWishlist(product.id)}
                                className="mt-4 w-full py-2 text-white bg-red-500 rounded-lg font-medium hover:bg-red-600 transition-all flex justify-center items-center"
                                disabled={loading === product.id}
                            >
                                {loading === product.id ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    "Remove"
                                )}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-lg col-span-full">No items in wishlist</p>
                )}
            </div>
        </div>
    );
}
