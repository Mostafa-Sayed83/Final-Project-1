    import axios from "axios";
    import { createContext, useEffect, useState } from "react";

    export let CartContext = createContext();

    export default function CartContextProvider(props) {

        let headers = {
            token: localStorage.getItem("userToken"),
        };

        const [cartId, setCartId] = useState(null);
        const [totalItems, setTotalItems] = useState(0);

        function getLoggedUserCart() {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
                .then((res) => {
                    if (res.data.status === "success") {
                        setCartId(res.data.data._id);
                        const total = res.data.data.products.reduce((acc, product) => acc + product.count, 0);
                        setTotalItems(total); 
                    }
                    return res;
                })
                .catch((err) => err);
        }

        function addProductToCart(productId) {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: productId },
                { headers })
                .then((res) => {
                    if (res.data.status === "success") {
                        getLoggedUserCart(); 
                    }
                    return res;
                })
                .catch((err) => err);
        }

        function updateCartProductQuantity(productId, newCount) {
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: newCount },
                { headers })
                .then((res) => {
                    getLoggedUserCart(); 
                    return res;
                })
                .catch((err) => err);
        }

        function deleteCartItem(productId) {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
                .then((res) => {
                    getLoggedUserCart(); 
                    return res;
                })
                .catch((err) => err);
        }

        async function deleteCart() {
            try {
                let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
                setTotalItems(0); 
                return response;
            } catch (error) {
                console.error("Error clearing cart:", error);
            }
        }

        function checkout(cartId, url, formData) {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
                { shippingAddress: formData },
                { headers })
                .then((res) => res)
                .catch((err) => err);
        }

        useEffect(() => {
            getLoggedUserCart(); 
        }, []);

        return (
            <CartContext.Provider value={{ addProductToCart, getLoggedUserCart, updateCartProductQuantity, deleteCartItem, checkout, cartId, deleteCart, totalItems }}>
                {props.children}
            </CartContext.Provider>
        );
    }
