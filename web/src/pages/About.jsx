import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae sequi, deserunt expedita eos veritatis aliquid minima vitae iusto atque, quaerat dicta quae deleniti repellat quas voluptates dignissimos. Quo, fuga mollitia!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur iste omnis magnam perspiciatis ipsam voluptatem ipsum dolor eveniet voluptatibus, maiores eligendi numquam amet doloremque, est sed quam commodi quos et?\</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe aspernatur nobis, cumque odit, architecto dicta, ducimus consequatur quae doloremque est. Necessitatibus sunt, explicabo possimus provident architecto excepturi illo ducimus.</p>
        </div>
        
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nesciunt dignissimos culpa voluptatibus reprehenderit velit quos vel nobis corporis? Dolores quo rem facilis dolorum modi? Quis cum dolores accusamus neque?</p>
          </div>
      
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nesciunt dignissimos culpa voluptatibus reprehenderit velit quos vel nobis corporis? Dolores quo rem facilis dolorum modi? Quis cum dolores accusamus neque?</p>
          </div>
   
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nesciunt dignissimos culpa voluptatibus reprehenderit velit quos vel nobis corporis? Dolores quo rem facilis dolorum modi? Quis cum dolores accusamus neque?</p>
          </div>
        </div>
        <NewsLetterBox/>
    </div>
  )
}

export default About
