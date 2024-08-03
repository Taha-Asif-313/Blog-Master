import React from 'react'
import { PiBookOpenTextFill } from "react-icons/pi";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <footer className="px-5 py-10 flex items-center justify-center bg-black text-stone-50 border-t border-primary">
  <aside className='flex items-center gap-2'>
  <Link to={'/'} className="flex items-center justify-center gap-2 text-2xl font-bold"><PiBookOpenTextFill className="font-bold text-4xl text-primary"/></Link>
    <p className='font-thin text-sm lg:text-lg border-l ml-2 pl-2 border-white'>Read the thoughts of other. Share your words with others!</p>
  </aside> 

</footer>
    </>
  )
}

export default Footer