import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'




export default function Login() {

    let{userLogin ,setuserLogin}= useContext(UserContext)
    let navigate = useNavigate()
    const [ApiError, setApiError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [userName, setuserName] = useState(null)
    
    function handleLogin(values) {
        setisLoading(true)
        axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
        .then((res)=>{
            setisLoading(false)
            if (res.data.message =="success") {
                localStorage.setItem("userToken",res.data.token)
                setuserName(res.data.user.name) ;  
                let x = res.data.user.name  
                setuserLogin(res.data.token)
                navigate("/")
                toast.success(`Welcome ${x} 😍`)
            }
            
        })
        .catch((res)=>{
            setisLoading(false)
            setApiError(res.response.data.message)
        })
        
    }

    let validationSchema = yup.object().shape({
        email : yup
        .string()
        .email("email pattern is inavalid")
        .required("email is required"),
        password : yup
        .string()
        .required("password is required")
        .matches(
            /^[A-Za-z][A-Za-z0-9]{5,8}$/,
            "must be:\n* Start with a letter (either uppercase or lowercase).\n* Be between 6 and 9 characters in total.\n* Can only contain letters (A-Z or a-z) and numbers (0-9)."
        )
    })

    let formik = useFormik({
        initialValues :{
            email :"",
            password :"",
        },
        validationSchema,
        onSubmit:handleLogin,
    });

    return<>
    {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
        </div>
    )}
    {ApiError ? <div className="p-4 mt-11 md:mt-0 md:my-4 md:mx-16 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 flex justify-center" role="alert">
        <i className="fa-solid fa-circle-exclamation text-3xl me-5"></i>  <span className="font-medium py-1 mx-5">{ApiError}</span></div> :null}
    <h1 className='text-left py-7 mt-3 md:mt-0 md:py-4 md:ps-16 text-3xl'>login now</h1>
    <form onSubmit={formik.handleSubmit} className='md:px-16 relative'>
        <div className="mb-2 relative">
            <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-600 text-left">Email :</label>
            <input 
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.email && formik.touched.email?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
            <span className="font-medium">{formik.errors.email}</span></div> : null}
        </div>
        <div className="mb-2 relative">
            <label
            htmlFor="password"
            className="block mb-2 text-sm font-normal text-gray-600 text-left">Password :</label>
            <input 
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.password && formik.touched.password?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
                <pre className="font-medium whitespace-pre-line sm:max-w-[250px] md:max-w-[400px]">{formik.errors.password}</pre></div> : null}
        </div>
        <div className='flex justify-between items-center py-5'>
            <Link className="hover:text-green-700" to={"/verify"} >forget your password ?</Link>
        <button type="submit" disabled={isLoading} className="text-white md:mx-16 md:mt-5 md:px-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center right-0 absolute hover:underline-offset-4">
            {isLoading ? <i class="fa-solid fa-spinner fa-spin"></i> : "Login now"}
        </button>
        </div>
    </form> 
    </>
}
