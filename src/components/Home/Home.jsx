import React, { useState } from 'react'
import style from "./Home.module.css"
import RecentProducts from "../RecentProducts/RecentProducts"
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider"
import MainSlider from "../MainSlider/MainSlider"
import SearchBar from "../SearchBar/SearchBar"


export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    return<>
    <MainSlider/>
    <CategoriesSlider/>
    <SearchBar setSearchQuery={setSearchQuery} /> 
    <RecentProducts searchQuery={searchQuery} /> 
    </>
}
