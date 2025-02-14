import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentCategories() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subLoading, setSubLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        setLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((res) => {
                setCategories(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    function getSubCategories(categoryId) {
        setSubLoading(true);
        setSelectedCategory(categoryId);
        axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
            .then((res) => {
                const filteredSubCategories = res.data.data.filter(sub => sub.category === categoryId);
                setSubCategories(filteredSubCategories);
                setSubLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setSubLoading(false);
            });
    }

    return (
        <div className="container mx-auto py-6 md:px-10">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-5 md:mb-1">Categories</h2>

            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:p-4">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-lg shadow-md transition-transform transform hover:border-green-500 hover:shadow-green-500 cursor-pointer border border-gray-400"
                            onClick={() => getSubCategories(category._id)}
                        >
                            <img src={category.image} alt={category.name} className="w-full h-72 object-cover rounded-md" />
                            <h3 className="text-2xl font-medium text-green-600 text-center my-5">{category.name}</h3>
                        </div>
                    ))}
                </div>
            )}

            {subLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                </div>
            )}

            {selectedCategory && !subLoading && (
            <div className="my-7">
                    <h2 className="text-3xl font-semibold text-center text-green-600 my-8">Subcategories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {subCategories.map((sub) => (
                <div key={sub._id} className="bg-white p-4 rounded-lg shadow-lg text-center border border-gray-400 hover:shadow-green-300 hover:border-green-600">
                    <h4 className="text-2xl font-normal font-serif text-gray-800">{sub.name}</h4>
                </div>
            ))}
                </div>
            </div>
            )}
        </div>
    );
}

