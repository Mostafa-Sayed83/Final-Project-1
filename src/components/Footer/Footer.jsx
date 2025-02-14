import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" text-white relative bottom-0 mt-28">

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} Route Acdemy . All Rights Reserved. made by Osha
      </div>
    </footer>
  );
}

