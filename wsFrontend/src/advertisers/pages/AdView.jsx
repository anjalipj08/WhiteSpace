import React, { useEffect, useState } from 'react'
import AdHeader from '../components/AdHeader'
import { Button, Card, Rating, RatingStar } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { paymentAPI, viewResourceAPI } from '../../services/allAPIs';
import { serverURL } from "../../services/serverURL";
import {loadStripe} from '@stripe/stripe-js';

function AdView() {
 
  const {id} = useParams()
  console.log(id)

  const[token,setToken]=useState('')
  console.log(token)

  const[resourceData,setResourceData]=useState()
  const images = resourceData?.UploadedImages || []

  // VIEW SELECTED RESOURCE
  const viewResource=async()=>{
    try{
      //req header
      const reqHeader =  {Authorization: `Bearer ${token}`}
      //api call
      const response = await viewResourceAPI(id,reqHeader)
      console.log(response)
      if(response.status==200){
        setResourceData(response.data.data)
      }     
    }
    catch(err){
      console.log("ERROR"+err)
    }
  }

  // MAKE PAYMENT 
  const makePayment = async () => {
    try {
      if (!resourceData) {
        alert("Resource not loaded")
        return
      }

      const stripe = await loadStripe( 'pk_test_51Splyd3HNiuB4KIOolJctanT6NKIpdoOeGwLplb3f4IocA0P3Hks2o4hMCF9A0eBuVH8iPlEcAYpKESVADpOo96x00rq8ts380' )

      //req header
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      //reqbody
      const reqBody = {
        resourceDetails: resourceData,
      }
      //api call
      const response = await paymentAPI(reqBody, reqHeader)
      console.log("Payment response:", response)

      // Redirect to Stripe Checkout
      const checkoutUrl = response.data.session.url
      window.location.href = checkoutUrl

    } catch (err) {
      console.error("Payment Error:", err)
      alert("Payment failed. Please try again.")
    }
  }


  useEffect(()=>{
      setToken(sessionStorage.getItem('token'))
      if(token){
          viewResource()
      } 
  },[token])

  // console.log(resourceData)

  return (
    <>
    <AdHeader />

      <div className="bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] min-h-screen p-8">
        {
          resourceData ?
            <>
              {/* Image Section */}
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <img
                  src={`${serverURL}/uploads/${images[0]}`}
                  className="col-span-2 h-96 w-full object-cover rounded-lg"
                />
                <div className="space-y-4">
                  {images.slice(1, 3).map((img, index) => (
                    <img
                      key={index}
                      src={`${serverURL}/uploads/${img}`}
                      className="h-44 w-full object-cover rounded-lg"
                      alt="resource"
                    />
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="grid grid-cols-3 gap-8">

                {/* Left Content */}
                <div className="col-span-2  p-6 rounded-lg shadow text-white border border-white">
                  <h1 className="text-2xl font-bold mb-2">{resourceData.title}</h1>
                  <p className="text-white/70 mb-3">{resourceData.location}</p>

                  {/* <Rating>
                    <RatingStar />
                    <span className="ml-2 text-sm font-medium">4.9 (120 reviews)</span>
                  </Rating> */}

                  <div className="mt-6 grid grid-cols-2 gap-4 ">
                    <p><strong>Size:</strong>  <span className='text-white/70'>{resourceData.size}</span> </p>
                    <p><strong>Type:</strong> <span className='text-white/70'>{resourceData.type}</span> </p>
                    <p><strong>Visibility:</strong> <span className='text-white/70'>{resourceData.visibility}</span> </p>
                    <p><strong>Availability:</strong> <span className='text-blue-600'>{resourceData.status=='pending'? 'Available' : 'Not Available'}</span> </p>
                  </div>

                  <hr className="my-6"/>

                  <h2 className="font-bold text-lg mb-2">Description</h2>
                  <p className="text-white/70">{resourceData.description} </p>
                </div>

                {/* Pricing Card */}
                <Card className="p-4 h-fit bg-transparent text-white">
                  <h2 className="text-xl font-bold ">₹{resourceData.price} / {resourceData.priceType}</h2>
                  <p className="text-green-600 text-sm">({resourceData.dprice}% discount applied)</p>

                  {
                    resourceData.status=='pending'?
                      <Button onClick={makePayment} className="w-full mt-4">  Buy Now  </Button>
                    : <Button color="red">Sold Out</Button>
                  }
                  

                  <div className="flex items-center mt-6">
                      <hr className="flex-grow " />
                      <h1 className="px-4 text-lg font-semibold whitespace-nowrap">
                          Owner Deatils
                      </h1>
                      <hr className="flex-grow border-gray-300" />
                  </div>
                  <div className='text-center space-y-2'>
                      <p>UserName :   <span className='text-white/70'>res</span> </p>
                      <p>Email :  <span className='text-white/70'>{resourceData.userMail}</span></p>
                  </div>
                  
                </Card>
                
                <div className='w-300 h-auto  rounded-lg'>
                  <h3 className='text-xl text-white my-5'>Reviews</h3>
                  {
                    resourceData.review ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"'>
                      {resourceData.review.map(item =>(
                          
                            <Card className='w-70 h-30 border-white bg-transparent text-white'>
                               <p>{item.userMail}</p> 
                               <p>{item.comment}</p>
                            
                            </Card>
                          
                      ))}
                    </div>
                    :" No Reviews Added"
                  }
                  
                </div>

              </div>
              
            </>
            : "No Data Found"
        }
      </div>
    </>
  )
}

export default AdView