import React, { useState } from 'react'
import Header from '../components/Header'
import { Button } from 'flowbite-react'
import { Carousel } from "flowbite-react";
import FooterBar from '../components/FooterBar';
import { Link } from 'react-router-dom';
// import DarkLightMode from '../components/DarkLightMode';

function Landing() {

  

  return (
    <div className="overflow-x-hidden">
      <Header/>
      {/* home */}
      <section id='home' className=" w-full h-screen bg-[url('/img1.jpg')] bg-cover bg-bottom pt-5 ">
          
          
          {/* <DarkLightMode/> */}
          <div className='mt-52 mx-12 dark:bg-gray-800 '>
              <h3 className="shrikhand-regular text-white text-8xl "> White Space</h3>
              <p className=' text-xl text-white ml-20 mt-5 '>a space to conncet advetisers and resource owners</p>
          </div>
          <div>
            <p className='text-lg ml-210 rotate-4 text-black/50'>Explore through white space... <br/>  Find right place to advertise </p>
            <Link to={'/AdHome'}>
              <Button className='ml-220 mt-5 px-8 py-3 rotate-4 text-lg border border-transparent bg-white text-black hover:border-black/50 hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-0 active:outline-none'>Get Started</Button>
            </Link>
            
          </div>
      </section>

      {/* about */}
      <section id='about' className="flex relative w-full h-screen bg-gradient-to-b from-[#bdb4a6] via-[#a3a8ac] to-[#8faac2]  "> 
          <div className='mt-50 ml-6'>
             <img className='w-70 mb-5' src="https://img.freepik.com/premium-photo/business-man-choosing-candidate-human-resource-search-new-employee-business-recuit-concept_74054-378.jpg" alt="" />
             <img className='w-70' src="https://img.freepik.com/free-photo/handshake-close-up-executives_1098-1384.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
          </div>
          <img className='w-70 h-98 mt-50 ml-5' src="https://img.freepik.com/free-photo/man-giving-bar-graph-presentation-using-high-technology-digital-pen_53876-104049.jpg" alt="" />

          <div className='text-white text-lg w-160 flex-col pt-30 pl-10'>
            <h3 className='text-7xl text-center'>About Us</h3>
            <h3 className='text-xl text-center mb-5'>Find  Connect Grow</h3>
            <p >White Space is a smart advertising platform that brings together advertisers and resource providers in one simple place.</p> <br />
            <p>Whether you’re a business or an individual looking to promote your brand, White Space helps you find the right advertising space—from billboards and digital screens to flyers, vehicle ads, shop walls, event banners, merchandise printing, and more.</p> <br />
            <p>At the same time, providers who own advertising resources can easily list, manage, and monetize their spaces by connecting with genuine advertisers.</p>
          </div>
      </section>

      {/* services */}
      <section id='services' className='w-full h-screen bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] p-10 text-white'>
        <h3 className='text-7xl mt-20'>Services </h3>
        <div className='flex gap-10  py-10 '>
          <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
            transition-transform duration-900 ease-in-out 
            hover:scale-105'>            
            <h3 className='text-xl'>Multiple Ad Options</h3>
            <p className='text-white'>Advertise using billboards, screens, vehicles, banners, and more.</p>
          </div>

          <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
            transition-transform duration-900 ease-in-out 
            hover:scale-105'> 
            <h3 className='text-xl'>Smart Search</h3>
            <p className='text-white'>Find ad spaces by location, price, and category.</p>
          </div>

          <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
            transition-transform duration-900 ease-in-out 
            hover:scale-105'> 
            <h3 className='text-xl'>Easy Connections</h3>
            <p className='text-white'>Connect advertisers with trusted resource owners.</p>
          </div>
        </div>

        <div className='flex gap-10 pl-30'>
        <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
          transition-transform duration-900 ease-in-out 
          hover:scale-105'> 
          <h3 className='text-xl'>Instant Notifications</h3>
          <p className='text-white'>Get real-time booking and payment updates.</p>
        </div>
        <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
          transition-transform duration-900 ease-in-out 
          hover:scale-105'> 
          <h3 className='text-xl'>Ratings & Reviews</h3>
          <p className='text-white'>Choose providers based on user ratings.</p>
        </div>
        <div className='h-30 w-80 p-5 text-center border border-white rounded-lg
          transition-transform duration-900 ease-in-out 
          hover:scale-105'> 
          <h3 className='text-xl'>Simple Management</h3>
          <p className='text-white'>Add, update, or remove ad resources easily.</p>
        </div>
        </div>
        
      </section>

      {/* footer  */}
      <FooterBar/>
    </div>
  )
}

export default Landing