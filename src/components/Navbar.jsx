import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-900 text-white py-3 items-center'>

        <div className="logo mx-4">
            <span className='font-bold text-2xl'>i Tasks</span>
        </div>
        <ul className="flex gap-9 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
