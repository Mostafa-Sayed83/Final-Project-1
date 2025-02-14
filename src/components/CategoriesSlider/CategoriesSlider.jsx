import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";


export default function CategoriesSlider() {

    const [categories, setcategories] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        dotsClass: "custom-dots",
        customPaging: (i) => (
        <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
        ),
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            },
        },
        ],
    };


    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{
            
            setcategories(res.data.data)
        })
    }
    useEffect (()=>{
        getCategories()
    },[])

    return<>
    <h1 className="text-left text-black text-2xl font-semibold mx-2 my-4">Shop Popular Categories</h1>
    <Slider {...settings} className="mb-5">
        {categories.map((category)=> <div className="mb-4" >
            <img src={category.image} className=" w-full h-64 object-cover" alt="" />
            <h4>{category.name}</h4>
        </div>)}
    </Slider>

    </>
}
