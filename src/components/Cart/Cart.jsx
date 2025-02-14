    import React, { useContext, useEffect, useState } from 'react';
    import { CartContext } from '../../Context/CartContext';
    import toast from 'react-hot-toast';
    import { AiOutlineLoading3Quarters } from 'react-icons/ai';
    import { Link } from 'react-router-dom';

    export default function Cart() {
        let { getLoggedUserCart, updateCartProductQuantity, deleteCartItem ,deleteCart } = useContext(CartContext);
        const [CartDetails, setCartDetails] = useState(null);
        const [loadingId, setLoadingId] = useState(null);
        const [clearLoading, setClearLoading] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        async function getCartItems() {
            let response = await getLoggedUserCart();
            if (response.data.status === "success") {
                setCartDetails(response.data.data);
            } else {
                toast.error("Please Try Again 🥺👉👈");
            }
            setIsLoading(false);
        }

        async function updateProduct(id, count) {
            if (count < 1) {
                await deleteItem(id); 
                return;
            }
            setLoadingId(id);
            let response = await updateCartProductQuantity(id, count);
            setLoadingId(null);

            if (response.data.status === "success") {
                setCartDetails(response.data.data);
                toast.success("Updated Count ✅");
            }
        }

        async function deleteItem(productId) {
            let response = await deleteCartItem(productId);
            if (response.data.status === "success") {
                setCartDetails(response.data.data);
                toast.success("Removed Item 😒");
            }
        }

        async function clearUserCart() {
            setClearLoading(true);
            let response = await deleteCart();
            setClearLoading(false);
            console.log(response);
            
            if (response?.data?.message === "success") {
                setCartDetails({ products: [] });
                await getLoggedUserCart(); 
                toast.success("Cart Cleared Successfully ✅");
            }
        }

        useEffect(() => {
            getCartItems();
        }, []);

        const totalPrice = CartDetails?.products.reduce((acc, product) => acc + product.price * product.count, 0) || 0;
        const totalItems = CartDetails?.products.reduce((acc, product) => acc + product.count, 0) || 0;

        return (
            <div className="flex flex-col p-5 bg-gray-100">
                {isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                    </div>
                )}
                <div className="bg-gray-50 p-6 rounded-lg w-full flex justify-between items-center shadow-md shadow-green-400 mb-8 md:mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Cart Shop</h2>
                        <p className="text-gray-700 mt-2">
                            total price: <span className="text-green-500 font-semibold">{totalPrice} EGP</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <Link to={"/checkout"}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                Check Out
                            </button>
                        </Link>
                        <p className="text-gray-700 mt-2">
                            total number of items: <span className="text-green-500 font-semibold">{totalItems}</span>
                        </p>
                    </div>
                </div>
        
                {CartDetails?.products.length === 0 ? (
                    <div className="text-center py-10">
                        <h3 className="text-xl font-semibold text-gray-600">Your cart is empty 😢</h3>
                        <p className="text-gray-500 mt-2">Start shopping now and add your favorite items!</p>
                        <Link to="/" className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                            Go Shopping 🛒
                        </Link>
                    </div>
                ) : (
                    <div className="md:p-4 grid gap-4 md:gap-6 grid-cols-1">
                        {CartDetails?.products.map((product) => (
                            <div key={product.product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:justify-between items-center border border-gray-200">
                                <img src={product.product.imageCover} alt={product.name} className="w-32 h-32 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">{product.product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <span className="text-lg font-bold text-green-600 my-2">{product.price} EGP</span>
                                <div className="flex items-center space-x-2 my-2">
                                    <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="p-1 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                                        -
                                    </button>
                                    <span className="w-12 text-center border border-gray-300 rounded-lg p-1">
                                        {loadingId === product.product.id ? <AiOutlineLoading3Quarters className="animate-spin" /> : product.count}
                                    </span>
                                    <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="p-1 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                                        +
                                    </button>
                                </div>
                                <button onClick={() => deleteItem(product.product.id)} className="text-red-600 font-medium hover:underline mt-2">Remove</button>
                            </div>
                        ))}
                    </div>
                )}
        
                {CartDetails?.products.length > 0 && (
                    <div className="mt-4 text-center">
                        <button onClick={clearUserCart} className="border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition flex items-center justify-center m-auto">
                            {clearLoading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Clear Your Cart"}
                        </button>
                    </div>
                )}
            </div>
        );
    }
