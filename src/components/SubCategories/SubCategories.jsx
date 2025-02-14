import React, { useEffect, useState } from 'react'
import style from "./SubCategories.module.css"
import axios from 'axios'



export default function SubCategories({ categoryId }) {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryId) {
            axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
                .then((res) => {
                    const filteredSubCategories = res.data.data.filter(sub => sub.category === categoryId);
                    setSubCategories(filteredSubCategories);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [categoryId]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {subCategories.map((sub) => (
                <div key={sub._id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center border border-gray-300">
                    <h3 className="text-lg font-medium text-gray-700">{sub.name}</h3>
                </div>
            ))}
        </div>
    );
}
