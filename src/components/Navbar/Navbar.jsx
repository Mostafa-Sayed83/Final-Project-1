import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { getLoggedUserCart } = useContext(CartContext);
  let navigate = useNavigate();
  let location = useLocation();
  let { totalItems } = useContext(CartContext);


  useEffect(() => {
    async function fetchCart() {
      let response = await getLoggedUserCart();
      if (response.data.status === "success") {
        const total = response.data.data.products.reduce((acc, product) => acc + product.count, 0);
        setTotalItems(total);
      }
    }
    if (userLogin) {
      fetchCart();
    }
  }, [userLogin, getLoggedUserCart]);

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-zinc-50 fixed z-30 top-0 left-0 right-0 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} width={"120px"} className="h-8" alt="Logo" />
        </Link>

       
        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
          {userLogin != null ? (
            <Link to="/cart" className="text-slate-600 text-2xl hover:text-black relative">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          ) : null}
          {userLogin != null ? (
            <span onClick={signout} className="text-slate-500 px-2 pt-1 hover:text-black">Log Out</span>
          ) : (
            <>
              <Link to="/login" className="text-slate-500 px-2 pt-1 hover:text-black">Log In</Link>
              <Link to="/register" className="text-slate-500 px-2 pt-1 hover:text-black">Register</Link>
            </>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          {userLogin != null ? (
            <ul className="flex flex-col font-sans text-sm p-3 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link to="" className={`block py-2 px-2 rounded-sm md:bg-transparent ${location.pathname === '/' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Home</Link>
              </li>
              <li>
                <Link to="/cart" className={`block py-2 px-2 ${location.pathname === '/cart' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className={`block py-2 px-2 ${location.pathname === '/wishlist' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Wish List</Link>
              </li>
              <li>
                <Link to="/products" className={`block py-2 px-2 ${location.pathname === '/products' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Products</Link>
              </li>
              <li>
                <Link to="/categories" className={`block py-2 px-2 ${location.pathname === '/categories' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Categories</Link>
              </li>
              <li>
                <Link to="/brands" className={`block py-2 px-2 ${location.pathname === '/brands' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-black'}`}>Brands</Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
