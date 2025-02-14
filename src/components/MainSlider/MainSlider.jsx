import React from 'react'
import style from "./MainSlider.module.css"
import slider_1 from "../../assets/slider-image-1.jpeg"
import slider_2 from "../../assets/slider-image-2.jpeg"
import slider_3 from "../../assets/slider-image-3.jpeg"
import slider_4 from "../../assets/grocery-banner.png"
import slider_5 from "../../assets/grocery-banner-2.jpeg"
import Slider from 'react-slick'
import right_top from "../../assets/right_top.jpg"
import right_bottom from "../../assets/right_bottom.jpg"



export default function MainSlider() {
    
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            dotsClass: "custom-dots",
            customPaging: (i) => (
            <div className="w-6 h-2 bg-gray-400 rounded-md mx-1 transition-all duration-300 slick-dot"></div>
            ),
    };




    return<>
    <div className="flex flex-col md:flex-row py-3">
        <div className=" w-full md:w-3/4">
        <Slider {...settings} className="mb-5">
        <img src={slider_1} className="w-full md:h-[400px] object-cover mb-3" alt="" />
        <img src={slider_2} className="w-full md:h-[400px] object-cover mb-3" alt="" />
        <img src={slider_3} className="w-full md:h-[400px] object-cover mb-3" alt="" />
        </Slider>
        </div>
        <div className="w-full md:w-1/4">
        <img src={right_top} className="w-full md:h-[200px] object-cover" alt="" />
        <img src={right_bottom} className="w-full md:h-[200px] object-cover" alt="" />
        </div>
    </div>
    </>
}


// <div className="grid grid-cols-3">
// <Slider {...settings} className="mb-5">
    
// </Slider>
// <div className=" flex flex-col">
//     <img
//         src={right_top}
//         alt="Category 1"
//         className="object-cover w-2/3"
//     />
//     <img
//         src={right_bottom}
//         alt="Category 2"
//         className="w-2/3 object-cover"
//     />
// </div>
// </div>