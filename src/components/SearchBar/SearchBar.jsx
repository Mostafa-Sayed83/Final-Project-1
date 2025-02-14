import React from 'react'
import style from "./SearchBar.module.css"

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="w-full flex justify-center mt-10 mb-3">
            <input
                type="text"
                placeholder="Search for a product....."
                className="w-full md:w-3/4 p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );

}
