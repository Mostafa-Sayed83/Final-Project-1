import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(null); 

    let headers = { token: localStorage.getItem("userToken") };

    async function getWishlist() {
        try {
            let response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
            setWishlist(response.data.data || []);
            return response;
        } catch (error) {
            setWishlist([]);
        }
    }

    async function addProductToWishlist(productId) {
        try {
            let response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers });
            setWishlist(response.data.data || []);
            toast.success("Added to Wishlist ❤️");
            return response;
        } catch (error) {
            toast.error("Failed to add to Wishlist");
        }
    }

    async function removeProductFromWishlist(productId) {
        setLoading(productId);
        try {
            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            toast.success("Removed from Wishlist ❌");
            await getWishlist();
            return response;
        } catch (error) {
            toast.error("Failed to remove from Wishlist");
        } finally {
            setLoading(null);
        }
    }

    return (
        <WishlistContext.Provider value={{ wishlist, getWishlist, addProductToWishlist, removeProductFromWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
}
