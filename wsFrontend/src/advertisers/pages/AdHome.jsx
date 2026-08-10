import React, { useEffect, useState } from 'react'
import AdHeader from '../components/AdHeader'
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Button, Rating, RatingStar } from 'flowbite-react';
import { Card } from "flowbite-react";
import FooterBar from '../../components/FooterBar';
import { Link } from 'react-router-dom';
import { getLatestResourceAPI } from '../../services/allAPIs';

const serverURL = "http://localhost:3000"

function AdHome() {
    const[token,setToken]=useState('')
    const[resourseData,setResourceData] = useState()

    useEffect(()=>{
        setToken(sessionStorage.getItem('token'))
        if(token){
            latestResource()
        } 
    },[token])

     //LATEST RESOURCE
    const latestResource=async()=>{
        try{
            //req header
            const reqHeader =  {Authorization: `Bearer ${token}`}
            //api call
            const response = await getLatestResourceAPI(reqHeader)
            console.log(response.data)
            setResourceData(response.data)
        }
        catch(err){
            console.log("ERROR"+err)
        }
    }
    
    // console.log(resourseData)

  return (
    <div className='w-full h-auto bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6]'>
        {
        token?
            <>
            <AdHeader/>
            <section>
                <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 4000 }} loop className="h-80 w-310 mt-5 " >
                    <SwiperSlide>
                        <img src='./c1.png' className="h-full w-full object-cover" />
                    </SwiperSlide>
                    {/* <SwiperSlide>
                    <img src="https://images.unsplash.com/photo-1628727102241-88e069da23db?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-full w-full object-contain" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src="https://images.unsplash.com/photo-1557858310-9052820906f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-full w-full object-contain" />
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <img src='./c2.png' className="h-full w-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='./c3.png' className="h-full w-full object-cover" />
                    </SwiperSlide>
                </Swiper>
            </section>
            
            <section className=' w-full bg-white/20 my-10 p-10'>
            <h3 className='text-white text-2xl mb-3 text-center '>Recenently Added</h3>
            <div className='flex gap-8 ml-15'>
                {
                resourseData ?
                    resourseData.map(item=>(
                        <Link to= {`/adView/${item._id} `}>
                            <Card className="w-60 h-80" 
                                renderImage={() => (
                                    <img src={
                                        item.UploadedImages && item.UploadedImages.length > 0
                                            ? `${serverURL}/uploads/${item.UploadedImages[0]}`
                                            : "No Image Available"
                                        }
                                        className="w-full h-40 object-cover rounded-t-lg"
                                        alt="resource"
                                    />
                                )}
                                    >
                                <div className="space-y-2 ">
                                    <h2 className='font-bold m-0' >{item.title}</h2>
                                    <h2 className='m-0'>{item.location}</h2>
                                    {/* <div className='flex gap-2 text-gray-600'>
                                        <h2>20*10 feet</h2>
                                        <h2>Static</h2>
                                    </div> */}
                                    <div className='flex gap-2 items-center'>
                                        <h2 className='font-bold'>{item.price} / {item.priceType}</h2>
                                        <h2 className='text-green-500'>({item.dprice}% off)</h2>
                                    </div>
                                    <Rating>
                                        <RatingStar />
                                        <h2 className="ml-2 text-sm  text-gray-900 dark:text-white">4.95</h2>
                                    </Rating>
                                </div>
                            </Card>
                        </Link>
                        ))
                    
                    :"No Resourse Added Yet :("
                }
            </div>
            </section>
            
            </>
            :
            <div className='h-90 flex ml-50'>
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-svg-download-png-8333958.png" alt="" />
                <div className='mt-30 ml-30'> 
                     <p className='text-white text-2xl'>Please Login To Explore More...</p>
                    <Link to={'/auth'}><Button className='ml-30 mt-5'> Login </Button></Link>
                </div>
               
                
            </div>
        }

        <FooterBar/>

    </div>
  )
}

export default AdHome