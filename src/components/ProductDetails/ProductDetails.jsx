// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Slider from 'react-slick';

// export default function ProductDetails() {
//     let { id, category } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loadingRelated, setLoadingRelated] = useState(false);

//     const settings = {
//         dots: true,
//         infinite: true,
//         arrows: false,
//         speed: 300,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         dotsClass: "custom-dots",
//         customPaging: (i) => (
//             <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
//         ),
//     };

//     function getProduct(id) {
//         setLoading(true);
//         axios
//             .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//             .then((res) => {
//                 setProduct(res.data.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }

//     function getAllProducts() {
//         setLoadingRelated(true);
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//             .then((res) => {
//                 let related = res.data.data.filter((product) => product.category.name === category);
//                 setRelatedProducts(related);
//                 setLoadingRelated(false);
//             })
//             .catch(() => setLoadingRelated(false));
//     }

//     useEffect(() => {
//         getProduct(id);
//         getAllProducts();
//     }, [id, category]);

//     return (
//         <>
//             {loading ? (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 m-auto gap-6 md:px-10 md:py-6">
//                     <div className="flex flex-col md:flex-row border-green-500 bg-white shadow-lg rounded-2xl overflow-hidden border shadow-green-200 py-7">
//                         <Slider {...settings} className="mb-5 md:w-1/2">
//                             {product?.images.map((src, index) => (
//                                 <img key={index} src={src} className="w-full h-96 object-contain" />
//                             ))}
//                         </Slider>
//                         <div className="flex flex-col justify-center gap-5 md:gap-8 p-6 w-full md:w-1/2">
//                             <div>
//                                 <h3 className="text-2xl font-bold text-black text-left">
//                                     {product?.title.split(' ').slice(0, 2).join(' ')}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2 text-left">{product?.description}</p>
//                                 <h2 className="text-black text-xl mt-6 text-left">{product?.category.name}</h2>
//                             </div>
//                             <div className="flex items-center justify-between mt-4">
//                                 <span className="text-lg font-extralight text-gray-700">{product?.price} EGP</span>
//                                 <div className="flex items-center gap-2">
//                                     <i className="fa-solid fa-star text-yellow-400"></i>
//                                     <span className="text-black">{product?.ratingsAverage}</span>
//                                 </div>
//                             </div>
//                             <button className="bg-green-500 text-white py-3 rounded-lg text-center text-lg mt-4 w-full hover:bg-green-600 transition-all">
//                                 + Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <h1 className="bg-green-200 text-2xl md:text-3xl text-gray-800 font-bold font-serif p-2 md:p-5 rounded-2xl my-6 md:mx-5 md:my-3 flex justify-between">
//                 <i className="fa-solid fa-angles-down"></i> Related Products <i className="fa-solid fa-angles-down"></i>
//             </h1>

//             {loadingRelated ? (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-1 sm:p-2 md:p-6">
//                     {relatedProducts.length > 0 ? (
//                         relatedProducts.map((product) => (
//                             <div 
//                                 key={product.id} 
//                                 className="product bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 border border-green-400 hover:shadow-green-400 hover:shadow-md group"
//                             >
//                                 <Link to={`/productdetails/${product.id}/${product.category.name}`} onClick={() => setLoading(true)}>
//                                     <img 
//                                         src={product.imageCover} 
//                                         alt={product.category.name} 
//                                         className="w-full object-cover rounded-t-xl"
//                                     />
//                                     <div className="p-4">
//                                         <h3 className="text-lg font-semibold text-green-600 ">{product.category.name}</h3>
//                                         <p className="text-black text-lg mt-2">{product.title.split(' ').slice(0, 2).join(' ')}</p>
//                                         <div className="flex items-center justify-between mt-4">
//                                             <span className="text-lg font-light ">{product.price} EGP</span>
//                                             <span><i className="fa-solid fa-star text-yellow-400 me-2"></i>{product.ratingsAverage}</span>
//                                         </div>
//                                     </div>
//                                 </Link>
//                                 <button className="btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ">
//                                     + Add to Cart
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-700">No related products found.</p>
//                     )}
//                 </div>
//             )}
//         </>
//     );
// }






// import React, { useEffect, useState, useContext } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Slider from 'react-slick';
// import { CartContext } from '../../Context/CartContext'; // ✅ استيراد الـ CartContext
// import toast from 'react-hot-toast';

// export default function ProductDetails() {
//     let { id, category } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loadingRelated, setLoadingRelated] = useState(false);
//     const [loadingCart, setLoadingCart] = useState(false); // ✅ لإدارة تحميل الزر عند الإضافة

//     const { addProductToCart } = useContext(CartContext); // ✅ استخدام CartContext

//     const settings = {
//         dots: true,
//         infinite: true,
//         arrows: false,
//         speed: 300,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         dotsClass: "custom-dots",
//         customPaging: (i) => (
//             <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
//         ),
//     };

//     function getProduct(id) {
//         setLoading(true);
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//             .then((res) => {
//                 setProduct(res.data.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }

//     function getAllProducts() {
//         setLoadingRelated(true);
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//             .then((res) => {
//                 let related = res.data.data.filter((product) => product.category.name === category);
//                 setRelatedProducts(related);
//                 setLoadingRelated(false);
//             })
//             .catch(() => setLoadingRelated(false));
//     }

//     async function addToCart(id) {
//         setLoadingCart(true);
//         try {
//             let response = await addProductToCart(id);
//             if (response.data.status === "success") {
//                 toast.success("Added to Cart 🛒");
//             } else {
//                 toast.error("Failed to add to Cart");
//             }
//         } catch (error) {
//             toast.error("Something went wrong!");
//         } finally {
//             setLoadingCart(false);
//         }
//     }

//     useEffect(() => {
//         getProduct(id);
//         getAllProducts();
//     }, [id, category]);

//     return (
//         <>
//             {loading ? (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 m-auto gap-6 md:px-10 md:py-6">
//                     <div className="flex flex-col md:flex-row border-green-500 bg-white shadow-lg rounded-2xl overflow-hidden border shadow-green-200 py-7">
//                         <Slider {...settings} className="mb-5 md:w-1/2">
//                             {product?.images.map((src, index) => (
//                                 <img key={index} src={src} className="w-full h-96 object-contain" />
//                             ))}
//                         </Slider>
//                         <div className="flex flex-col justify-center gap-5 md:gap-8 p-6 w-full md:w-1/2">
//                             <div>
//                                 <h3 className="text-2xl font-bold text-black text-left">
//                                     {product?.title.split(' ').slice(0, 2).join(' ')}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2 text-left">{product?.description}</p>
//                                 <h2 className="text-black text-xl mt-6 text-left">{product?.category.name}</h2>
//                             </div>
//                             <div className="flex items-center justify-between mt-4">
//                                 <span className="text-lg font-extralight text-gray-700">{product?.price} EGP</span>
//                                 <div className="flex items-center gap-2">
//                                     <i className="fa-solid fa-star text-yellow-400"></i>
//                                     <span className="text-black">{product?.ratingsAverage}</span>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => addToCart(product.id)} // ✅ عند الضغط يتم استدعاء addToCart
//                                 className="bg-green-500 text-white py-3 rounded-lg text-center text-lg mt-4 w-full hover:bg-green-600 transition-all flex justify-center"
//                                 disabled={loadingCart} // ✅ تعطيل الزر أثناء تحميل الإضافة
//                             >
//                                 {loadingCart ? (
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                 ) : (
//                                     "+ Add to Cart"
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
















// import React, { useEffect, useState, useContext } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Slider from 'react-slick';
// import { CartContext } from '../../Context/CartContext'; 
// import toast from 'react-hot-toast';

// export default function ProductDetails() {
//     let { id, category } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loadingRelated, setLoadingRelated] = useState(false);
//     const [loadingCart, setLoadingCart] = useState(false);

//     const { addProductToCart } = useContext(CartContext);

//     const settings = {
//         dots: true,
//         infinite: true,
//         arrows: false,
//         speed: 300,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         dotsClass: "custom-dots",
//         customPaging: (i) => (
//             <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
//         ),
//     };

//     function getProduct(id) {
//         setLoading(true);
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//             .then((res) => {
//                 setProduct(res.data.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }

//     function getAllProducts() {
//         setLoadingRelated(true);
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//             .then((res) => {
//                 let related = res.data.data.filter((product) => product.category.name === category);
//                 setRelatedProducts(related);
//                 setLoadingRelated(false);
//             })
//             .catch(() => setLoadingRelated(false));
//     }

//     async function addToCart(id) {
//         setLoadingCart(true);
//         try {
//             let response = await addProductToCart(id);
//             if (response.data.status === "success") {
//                 toast.success("Added to Cart 🛒");
//             } else {
//                 toast.error("Failed to add to Cart");
//             }
//         } catch (error) {
//             toast.error("Something went wrong!");
//         } finally {
//             setLoadingCart(false);
//         }
//     }

//     useEffect(() => {
//         getProduct(id);
//         getAllProducts();
//     }, [id, category]);

//     return (
//         <>
//             {loading ? (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 m-auto gap-6 md:px-10 md:py-6">
//                     <div className="flex flex-col md:flex-row border-green-500 bg-white shadow-lg rounded-2xl overflow-hidden border shadow-green-200 py-7">
//                         <Slider {...settings} className="mb-5 md:w-1/2">
//                             {product?.images.map((src, index) => (
//                                 <img key={index} src={src} className="w-full h-96 object-contain" />
//                             ))}
//                         </Slider>
//                         <div className="flex flex-col justify-center gap-5 md:gap-8 p-6 w-full md:w-1/2">
//                             <div>
//                                 <h3 className="text-2xl font-bold text-black text-left">
//                                     {product?.title.split(' ').slice(0, 2).join(' ')}
//                                 </h3>
//                                 <p className="text-gray-600 mt-2 text-left">{product?.description}</p>
//                                 <h2 className="text-black text-xl mt-6 text-left">{product?.category.name}</h2>
//                             </div>
//                             <div className="flex items-center justify-between mt-4">
//                                 <span className="text-lg font-extralight text-gray-700">{product?.price} EGP</span>
//                                 <div className="flex items-center gap-2">
//                                     <i className="fa-solid fa-star text-yellow-400"></i>
//                                     <span className="text-black">{product?.ratingsAverage}</span>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => addToCart(product.id)}
//                                 className="bg-green-500 text-white py-3 rounded-lg text-center text-lg mt-4 w-full hover:bg-green-600 transition-all flex justify-center"
//                                 disabled={loadingCart}
//                             >
//                                 {loadingCart ? (
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                                 ) : (
//                                     "+ Add to Cart"
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <h1 className="bg-green-200 text-2xl md:text-3xl text-gray-800 font-bold font-serif p-2 md:p-5 rounded-2xl my-6 md:mx-5 md:my-3 flex justify-between">
//                 <i className="fa-solid fa-angles-down"></i> Related Products <i className="fa-solid fa-angles-down"></i>
//             </h1>

//             {loadingRelated ? (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-1 sm:p-2 md:p-6">
//                     {relatedProducts.length > 0 ? (
//                         relatedProducts.map((product) => (
//                             <div key={product.id} className="product bg-white shadow-lg rounded-2xl overflow-hidden border border-green-400 transition-transform transform hover:scale-105 hover:shadow-green-400 hover:shadow-md group">
//                                 <Link to={`/productdetails/${product.id}/${product.category.name}`}>
//                                     <img src={product.imageCover} alt={product.category.name} className="w-full object-cover rounded-t-xl" />
//                                     <div className="p-4">
//                                         <h3 className="text-lg font-semibold text-green-600">{product.category.name}</h3>
//                                         <p className="text-black text-lg mt-2">{product.title.split(' ').slice(0, 2).join(' ')}</p>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-700">No related products found.</p>
//                     )}
//                 </div>
//             )}
//         </>
//     );
// }













import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let { id, category } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const [loadingRelatedCart, setLoadingRelatedCart] = useState({});

    const { addProductToCart } = useContext(CartContext);

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dotsClass: "custom-dots",
        customPaging: (i) => (
            <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
        ),
    };

    function getProduct(id) {
        setLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                setProduct(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    function getAllProducts() {
        setLoadingRelated(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((res) => {
                let related = res.data.data.filter((product) => product.category.name === category);
                setRelatedProducts(related);
                setLoadingRelated(false);
            })
            .catch(() => setLoadingRelated(false));
    }

    async function addToCart(id) {
        setLoadingCart(true);
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
            setLoadingCart(false);
        }
    }

    async function addToRelatedCart(id) {
        setLoadingRelatedCart((prev) => ({ ...prev, [id]: true }));
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
            setLoadingRelatedCart((prev) => ({ ...prev, [id]: false }));
        }
    }

    useEffect(() => {
        getProduct(id);
        getAllProducts();
    }, [id, category]);

    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 m-auto gap-6 md:px-10 md:py-6">
                    <div className="flex flex-col md:flex-row border-green-500 bg-white shadow-lg rounded-2xl overflow-hidden border shadow-green-200 py-7">
                        <Slider {...settings} className="mb-5 md:w-1/2">
                            {product?.images.map((src, index) => (
                                <img key={index} src={src} className="w-full h-96 object-contain" />
                            ))}
                        </Slider>
                        <div className="flex flex-col justify-center gap-5 md:gap-8 p-6 w-full md:w-1/2">
                            <div>
                                <h3 className="text-2xl font-bold text-black text-left">
                                    {product?.title.split(' ').slice(0, 2).join(' ')}
                                </h3>
                                <p className="text-gray-600 mt-2 text-left">{product?.description}</p>
                                <h2 className="text-black text-xl mt-6 text-left">{product?.category.name}</h2>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-lg font-extralight text-gray-700">{product?.price} EGP</span>
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-star text-yellow-400"></i>
                                    <span className="text-black">{product?.ratingsAverage}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => addToCart(product.id)}
                                className="bg-green-500 text-white py-3 rounded-lg text-center text-lg mt-4 w-full hover:bg-green-600 transition-all flex justify-center"
                                disabled={loadingCart}
                            >
                                {loadingCart ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    "+ Add to Cart"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="bg-green-200 text-2xl md:text-3xl text-gray-800 font-bold font-serif p-2 md:p-5 rounded-2xl my-6 md:mx-5 md:my-3 flex justify-between">
                <i className="fa-solid fa-angles-down"></i> Related Products <i className="fa-solid fa-angles-down"></i>
            </h1>

            {loadingRelated ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-1 sm:p-2 md:p-6">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((product) => (
                            <div 
                                key={product.id} 
                                className="product bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 border border-green-400 hover:shadow-green-400 hover:shadow-md group"
                            >
                                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                    <img 
                                        src={product.imageCover} 
                                        alt={product.category.name} 
                                        className="w-full object-cover rounded-t-xl"
                                    />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-green-600">{product.category.name}</h3>
                                    <p className="text-black text-lg mt-2">{product?.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <button
                                        onClick={() => addToRelatedCart(product.id)}
                                        className="btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full mt-5"
                                        disabled={loadingRelatedCart[product.id]}
                                    >
                                        {loadingRelatedCart[product.id] ? "Adding....." : "+ Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">No related products found.</p>
                    )}
                </div>
            )}
        </>
    );
}
