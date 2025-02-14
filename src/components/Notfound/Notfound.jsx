import React from 'react'
import style from "./Notfound.module.css"
import error_logo from "../../assets/error.svg"

export default function Notfound() {
    return<>
    <div className="container flex flex-col align-middle mx-auto my-auto">
    <img className='mx-auto my-auto' src={error_logo} alt="error" />
    <h1 className='text-3xl mt-20 font-serif'>⚠️❌ Not Found ❌⚠️</h1>
    </div>
    </>
}
