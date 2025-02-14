import React from 'react'
import style from "./Allorders.module.css"
import { Link } from 'react-router-dom'

export default function Allorders() {
    return<>
    <div className='flex flex-col gap-8 items-center justify-center w-full py-40'>
      <h1 className='text-3xl max-md:text-2xl max-sm:text-xl'> <i className="fa-solid fa-circle-check text-4xl max-sm:text-2xl max-md:text-3xl text-green-400"></i> Payment completed successfully</h1>


      <Link to="/" className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                        Go Shopping 🛒
                    </Link>
    </div>
    </>
}
