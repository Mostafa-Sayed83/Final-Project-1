import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function RecentProducts({ searchQuery }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(null);
    const [wishlistLoading, setWishlistLoading] = useState(null);

    let { addProductToCart ,totalItems } = useContext(CartContext);
    let { wishlist, addProductToWishlist, removeProductFromWishlist, getWishlist } = useContext(WishlistContext);

    async function addToCart(id) {
        setLoading(id);
        try {
            let response = await addProductToCart(id);
            if (response.data.status === "success") {
                toast.success("Added to Cart 🛒");
            } else {
                toast.error("Failed to add to Cart");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(null);
        }
    }

    async function toggleWishlist(id) {
        setWishlistLoading(id);
        const isInWishlist = wishlist.some(product => product.id === id);
        try {
            if (isInWishlist) {
                await removeProductFromWishlist(id);
            } else {
                await addProductToWishlist(id);
            }
            await getWishlist(); 
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setWishlistLoading(null);
        }
    }

    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => console.log(err));

        getWishlist(); 
    }, []);

    const filteredProducts = products.filter(product =>
        product.title && searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

    return (
        <div className="row">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-1 sm:p-2 md:p-6">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => {
                    const isInWishlist = wishlist.some(p => p.id === product.id);
                    return (
                        <div key={product.id} className="product bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 border border-green-400 hover:shadow-green-400 hover:shadow-md group relative">
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img src={product.imageCover} alt={product.category.name} className="w-full object-cover rounded-t-xl" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-green-600">{product.category.name}</h3>
                                    <p className="text-black text-lg mt-2">{product.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-lg font-light">{product.price} EGP</span>
                                        <span><i className="fa-solid fa-star text-yellow-400 me-2"></i>{product.ratingsAverage}</span>
                                    </div>
                                </div>
                            </Link>
                            <button 
                                onClick={() => addToCart(product.id)} 
                                className="btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center m-auto"
                                disabled={loading === product.id}>
                                {loading === product.id ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    "+ Add to Cart"
                                )}
                            </button>
                            <button 
    onClick={() => toggleWishlist(product.id)} 
    className={`absolute top-3 right-3 text-2xl transition-all duration-300 ${
        wishlistLoading === product.id 
            ? "animate-pulse text-gray-400" 
            : isInWishlist 
                ? "text-red-500" 
                : "text-black hover:text-gray-600"
    }`}
>
    {wishlistLoading === product.id ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
    ) : (
        <i className="fa-solid fa-heart"></i> 
    )}
</button>

                        </div>
                    );
                }) : (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
