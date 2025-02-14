import React from 'react'
import style from "./Layout.module.css"
import Navbar from "../Navbar/Navbar"
import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"

export default function Layout() {
    return<>
    <Navbar/>
    <div className="container py-5 my-5">
        <Outlet/>
    </div>
    <Footer/>
    </>
}
