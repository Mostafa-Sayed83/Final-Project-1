import React, { useContext, useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'



export default function Register() {
    
    let{userLogin ,setuserLogin}= useContext(UserContext)
    let navigate = useNavigate()
    const [ApiError, setApiError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    
    function handleRegister(values) {
        setisLoading(true)
        axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then((res)=>{
            setisLoading(false)
            if (res.data.message =="success") {
                localStorage.setItem("userToken",res.data.token)
                setuserLogin(res.data.token)
                navigate("/login")
            }
            
        })
        .catch((res)=>{
            setisLoading(false)
            setApiError(res.response.data.message)
        })
        
    }

    let validationSchema = yup.object().shape({
        name :yup
        .string()
        .min(3,"name min length is 3")
        .required("name is required"),
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
        ),
        rePassword : yup
        .string()
        .oneOf([yup.ref("password")],"not matched with password")
        .required("re-Password is required"),
        phone : yup
        .string()
        .matches(/^01[1025][0-9]{8}$/, "invalid Phone")
        .required("phone is required")
    })

    let formik = useFormik({
        initialValues :{
            name :"",
            email :"",
            password :"",
            rePassword :"",
            phone : "",
        },
        validationSchema,
        onSubmit:handleRegister,
    });

    return<>
    {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
        </div>
    )}
    {ApiError ? <div className="p-4 mt-11 md:mt-0 md:my-4 md:mx-16 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 flex justify-center" role="alert">
        <i className="fa-solid fa-circle-exclamation text-3xl me-5"></i>  <span className="font-medium py-1 mx-5">{ApiError}</span></div> :null}
    <h1 className='text-left py-7 mt-3 md:mt-0 md:py-4 md:ps-16 text-3xl'>register now</h1>
    <form onSubmit={formik.handleSubmit} className='md:px-16 relative'>
        <div className="mb-2 relative">
            <label htmlFor="name" className="block mb-2 text-sm font-normal text-gray-600 text-left">Name :</label>
            <input 
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.name && formik.touched.name?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
            <span className="font-medium">{formik.errors.name}</span></div> : null}
        </div>
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
        <div className="mb-2 relative">
            <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-normal text-gray-600 text-left">Ra-password :</label>
            <input 
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
            {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
                <span className="font-medium">{formik.errors.rePassword}</span></div> : null}
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
                <span className="font-medium">{formik.errors.phone}</span></div> : null}
        </div>
        <button type="submit" disabled={isLoading} className="text-white md:mx-16 md:mt-5 md:px-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center right-0 absolute">
            {isLoading ? <i class="fa-solid fa-spinner fa-spin"></i> : "Register now"}
        </button>
    </form> 
    </>
}





















// import React, { useState } from 'react'
// import style from "./Register.module.css"
// import { useFormik } from 'formik'
// import * as yup from "yup"
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'


// export default function Register() {

//     let navigate = useNavigate()
//     const [ApiError, setApiError] = useState("")
//     const [isLoading, setisLoading] = useState(false)
    
//     function handleRegister(values) {
//         setisLoading(true)
//         axios
//         .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
//         .then((res)=>{
//             setisLoading(false)
//             console.log(res);
            
//         })
//         .catch((res)=>{
//             setisLoading(false)
//             setApiError(res.response.data.message)
//         })
        
//     }


//     let validationSchema = yup.object().shape({
//         name :yup
//         .string()
//         .min(3,"name min length is 3")
//         .required("name is required"),
//         email : yup
//         .string()
//         .email("email pattern is inavalid")
//         .required("email is required"),
//         password : yup
//         .string()
//         .required("password is required")
//         .matches(
//             /^[A-Za-z][A-Za-z0-9]{5,8}$/,
//             "must be:\n* Start with a letter (either uppercase or lowercase).\n* Be between 6 and 9 characters in total.\n* Can only contain letters (A-Z or a-z) and numbers (0-9)."
//         ),
//         rePassword : yup
//         .string()
//         .oneOf([yup.ref("password")],"not matched with password")
//         .required("re-Password is required"),
//         phone : yup
//         .string()
//         .matches(/^01[1025][0-9]{8}$/, "invalid Phone")
//         .required("phone is required")
//     })



//     let formik = useFormik({
//         initialValues :{
//             name :"",
//             email :"",
//             password :"",
//             rePassword :"",
//             phone : "",
//         },
//         validationSchema,
//         onSubmit:handleRegister,
//     });



//     return<>
//     {ApiError ? <div className="p-4 my-4 mx-16 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 flex justify-center" role="alert">
//         <i className="fa-solid fa-circle-exclamation text-3xl me-5"></i>  <span className="font-medium py-1 mx-5">{ApiError}</span></div> :null}
//     <h1 className='text-left py-10 md:py-4 md:ps-16 text-3xl'>register now</h1>
//     <form onSubmit={formik.handleSubmit} className='md:px-16 relative'>
//         <div className="mb-2 relative">
//             <label
//             htmlFor="name"
//             className="block mb-2 text-sm font-normal text-gray-600 text-left">Name :</label>
//             <input 
//             type="text"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             id="name"
//             className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
//             {formik.errors.name && formik.touched.name?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
//             <span className="font-medium">{formik.errors.name}</span></div> : null}
//         </div>
//         <div className="mb-2 relative">
//             <label
//             htmlFor="email"
//             className="block mb-2 text-sm font-normal text-gray-600 text-left">Email :</label>
//             <input 
//             type="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             id="email"
//             className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
//             {formik.errors.email && formik.touched.email?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
//             <span className="font-medium">{formik.errors.email}</span></div> : null}
//         </div>
        // <div className="mb-2 relative">
        //     <label
        //     htmlFor="password"
        //     className="block mb-2 text-sm font-normal text-gray-600 text-left">Password :</label>
        //     <input 
        //     type="password"
        //     name="password"
        //     value={formik.values.password}
        //     onChange={formik.handleChange}
        //     onBlur={formik.handleBlur}
        //     id="password"
        //     className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
        //     {formik.errors.password && formik.touched.password?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
        //         <pre className="font-medium whitespace-pre-line sm:max-w-[250px] md:max-w-[400px]">{formik.errors.password}</pre></div> : null}
        // </div>
        // <div className="mb-2 relative">
        //     <label
        //     htmlFor="rePassword"
        //     className="block mb-2 text-sm font-normal text-gray-600 text-left">Ra-password :</label>
        //     <input 
        //     type="password"
        //     name="rePassword"
        //     value={formik.values.rePassword}
        //     onChange={formik.handleChange}
        //     onBlur={formik.handleBlur}
        //     id="rePassword"
        //     className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
        //     {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
        //         <span className="font-medium">{formik.errors.rePassword}</span></div> : null}
        // </div>
        // <div className="mb-2 relative">
        //     <label
        //     htmlFor="phone"
        //     className="block mb-2 text-sm font-normal text-gray-600 text-left">Phone :</label>
        //     <input 
        //     type="tel"
        //     name="phone"
        //     value={formik.values.phone}
        //     onChange={formik.handleChange}
        //     onBlur={formik.handleBlur}
        //     id="phone"
        //     className="bg-white border border-slate-300 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 block w-full p-1"/>
        //     {formik.errors.phone && formik.touched.phone?<div className="p-4 my-4 text-sm border border-red-600 text-red-600 rounded-lg bg-red-50 text-left" role="alert">
        //         <span className="font-medium">{formik.errors.phone}</span></div> : null}
        // </div>
//         <button type="submit" className="text-white md:mx-16 md:mt-5 md:px-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center right-0 absolute">Register now</button>
//     </form> 
//     </>
// }

