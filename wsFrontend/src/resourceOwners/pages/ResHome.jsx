import React from "react";
import { Card, Button, Badge } from "flowbite-react";
import Header from "../../components/Header";
import ResHeader from "../components/ResHeader";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { deleteResourceAPI, getResourceAPI } from "../../services/allAPIs";
import { useEffect } from "react";
import { useState } from "react";
import { serverURL } from "../../services/serverURL";
import DarkLightMode from "../../components/DarkLightMode";

function ResHome() {
  const navigate = useNavigate();
  const[token,setToken]=useState('')
  const[resourseData,setResourceData] = useState([])
  
  //GET RESOURCE
  const getResource=async()=>{
          try{
              //req header
              const reqHeader =  {Authorization: `Bearer ${token}`}
              //api call
              const response = await getResourceAPI(reqHeader)
              console.log(response.data)
              setResourceData(response.data)
          }
          catch(err){
              console.log("ERROR"+err)
          }
      }

  //DELETE RESOURCE
  const handleDelete = async (id) => {
    try {
      const reqHeader = {Authorization: `Bearer ${token}`}

      const response = await deleteResourceAPI(id, reqHeader)
      console.log(response.data)
      
      alert("Resource deleted successfully")
      setResourceData(resourseData.filter(item => item._id !== id))

    } catch (err) {
      console.log("Delete error:", err)
    }
  }

  useEffect(()=>{
          setToken(sessionStorage.getItem('token'))
          if(token){
              getResource()
          } 
      },[token])

  console.log(resourseData)

  return (
    <>
        <ResHeader />
        
        <div className="bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6]  min-h-screen p-6">
        
            <div className="max-w-7xl mx-auto space-y-6">

          {/*STATUS */} 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-transparent text-center" >
              <h3 className="text-white text-3xl dark:bg-gray-800">My Resources</h3>
              <p className="text-white text-2xl font-bold">{resourseData?.length || 0}</p>
            </Card>

            <Card className="bg-transparent text-center">
              <h3 className="text-white text-3xl">Sold Resources</h3>
              <p className="text-white text-2xl font-bold">{
                    resourseData.filter(item => item.status === "sold").length}
              </p>
            </Card>

            <Card className="bg-transparent text-center">
              <h3 className="text-white text-3xl">Earnings</h3>
              <p className="text-white text-2xl font-bold">₹{
                  resourseData
                    .filter(item => item.status === "sold")
                    .reduce((sum, item) => {
                      const discountedPrice =
                        item.price - (item.price * item.dprice) / 100
                      return sum + discountedPrice
                    }, 0)
                    .toFixed(0)
                }</p>
            </Card>

            {/* <Card>
              <h5 className="text-gray-500">Pending Requests</h5>
              <p className="text-2xl font-bold">2</p>
            </Card> */}
          </div>

          {/*RESOURCES */}
          <Card className="bg-transparent shadow-none border-none">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-white">My Advertising Resources</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {
                resourseData?
                  resourseData.map(items=>(
                    <Card className="w-60 h-85" 
                      renderImage={() => ( <img src={
                                        items.UploadedImages && items.UploadedImages.length > 0
                                            ? `${serverURL}/uploads/${items.UploadedImages[0]}`
                                            : "No Image Available"
                                        } className="w-full h-35 object-cover" /> )} >
                      <div className="space-y-2 ">
                          <h2 className='font-bold m-0' >{items.title}</h2>
                          <h2 className='m-0'>{items.location}</h2>
                          <div className='flex gap-2 text-gray-600'>
                              <h2>{items.size}</h2>
                          </div>
                          <div className='flex gap-2 items-center'>
                              <h2 className='font-bold'>₹{items.price} / {items.priceType}</h2>
                              <h2 className='text-green-500'>({items.dprice}% off)</h2>
                          </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                          {/* <button className="w-1/2 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                           Update
                          </button> */}

                          <button onClick={() => handleDelete(items._id)} className="w-1/2 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                           Delete
                          </button>
                      </div>
                  </Card>
                  ))
                :"No Data Added"
              }

              <Card onClick={() => navigate("/addRes")}  className="w-60 h-85 flex items-center justify-center cursor-pointer border border-gray-300 bg-transparent hover:bg-white/10 transition">
                  <div className="flex flex-col items-center gap-2 text-gray-500 ">
                      <div className="w-14 h-14 flex items-center justify-center 
                                      rounded-full border border-white/80">
                      <HiPlus size={28} />
                      </div>

                      <p className="text-sm font-medium text-white/80">Add Resource</p>
                  </div>
              </Card>    
            </div>
          </Card>

          {/* BOOKING REQUESTS */}
          {/* <Card>
            <h3 className="text-lg font-bold mb-3">Booking Requests</h3>

            <div className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-semibold">Metro Station Billboard</p>
                <p className="text-sm text-gray-500">
                  Requested by: AdFusion Pvt Ltd
                </p>
              </div>

              <div className="flex gap-2">
                <Button color="success" size="sm">Accept</Button>
                <Button color="failure" size="sm">Reject</Button>
              </div>
            </div>
          </Card> */}

          {/* RECENT EARNINGS */}
          {/* <Card className="bg-transparent">
            <h3 className="text-lg font-bold mb-3">Recent Earnings</h3>

            <ul className="space-y-2 text-gray-600">
              <li>✔ MG Road Billboard – ₹3,000</li>
              <li>✔ LED Van Campaign – ₹1,500</li>
              <li>✔ T-Shirt Branding – ₹800</li>
            </ul>
          </Card> */}

        </div>
      </div>
    </>
  )
}

export default ResHome