import React, { useContext, useState } from 'react'
import style from "./Checkout.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from "axios"
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Checkout() {

    let {checkout,cartId} = useContext(CartContext)
    
    let validationSchema = yup.object().shape({
        details : yup
        .string()
        .required("details is required"),
        phone : yup
        .string()
        .matches(/^01[1025][0-9]{8}$/, "invalid Phone")
        .required("phone is required"),
        city : yup
        .string()
        .required("city is required"),
    })

    let formik = useFormik({
        initialValues :{
            details :"",
            phone :"",
            city : "",
        },
        validationSchema,
        onSubmit:()=> handleCheckout(cartId , `http://localhost:5173`),
    });

    async function handleCheckout(cartId , url) {
        let {data} = await checkout(cartId , url ,formik.values)
        window.location.href = data.session.url
    }


    return<>
    <h1 className='text-left py-7 mt-3 md:mt-0 md:py-4 md:ps-16 text-3xl'>check out now</h1>
    <form onSubmit={formik.handleSubmit} className='md:px-16 relative'>
        <div className="mb-2 relative">
            <label htmlFor="details" className="block mb-2 text-sm font-normal text-gray-600 text-left">Details :</label>
            <input 
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.details && formik.touched.details?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
            <span className="font-medium">{formik.errors.details}</span></div> : null}
        </div>

        <div className="mb-2 relative">
            <label
            htmlFor="phone"
            className="block mb-2 text-sm font-normal text-gray-600 text-left">Phone :</label>
            <input 
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.phone && formik.touched.phone?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
                <pre className="font-medium whitespace-pre-line sm:max-w-[250px] md:max-w-[400px]">{formik.errors.phone}</pre></div> : null}
        </div>

        <div className="mb-2 relative">
            <label
            htmlFor="city"
            className="block mb-2 text-sm font-normal text-gray-600 text-left">City :</label>
            <input 
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.city && formik.touched.city?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
                <pre className="font-medium whitespace-pre-line sm:max-w-[250px] md:max-w-[400px]">{formik.errors.city}</pre></div> : null}
        </div>

        <button type="submit" className="text-white mt-5 md:px-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center right-0 absolute  md:w-11/12 md:me-12">
            Check out 
        </button>
    </form> 
    </>
}
