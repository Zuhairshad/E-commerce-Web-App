import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
            <img className='m b-5 w-32'src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloremque praesentium delectus cumque maiores pariatur possimus explicabo maxime veniam quas, quidem dolor facere doloribus officia earum laboriosam esse quo consequatur? </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5 '>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+92 326 4553643</li>
            <li>+92 322 4538541</li>
            <li>contact@shad&Co.com</li>
        </ul>
      </div>
    </div>
    <div>
        <hr/>
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025@ Shad&Co - All Rights Reserved</p>
    </div>
    </div>
  )
}

export default Footer
