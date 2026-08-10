import React, { useEffect, useState } from "react";
import AdHeader from "../components/AdHeader";
import { Card, Button, Avatar, Badge, TextInput, Textarea, Label, FileInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { getAdvertiserAPI,  updateUserAPI } from "../../services/allAPIs";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { serverURL } from "../../services/serverURL";

function AdProfile() {

  const[token,setToken]=useState('') 
  const[userDetails,setUserDetails]=useState({ //to store the userdata while editing
    username:"",
    bio:"",
    location:"",
    businessType:"",
    profile:"",
    password:""
  })
  const[preview,setPreview]=useState('')

  //TO UPDATE
  const handleUpdate=async()=>{
    console.log(userDetails)
    const {username,bio,location,businessType,profile,password}=userDetails
    try{
        //req header
        const reqHeader =  {Authorization: `Bearer ${token}`}
        //reqBody
        const reqBody= new FormData()
        for(let key in userDetails){
          reqBody.append(key,userDetails[key])
        }
        //api call
        const response = await updateUserAPI(reqBody,reqHeader)
        console.log(response)
        if(response.status==200){
          alert(response.data.message)
        }
        else{
          alert(result.response.data)
        }
    }
    catch(err){
            console.log("ERROR"+err)
        }
  }

  //HANDLE FILE UPLOAD WHILE UPDATING
  const handleFileUpload=async(e)=>{
    console.log(e.target.files[0]) //file format of uploded img
    const url = URL.createObjectURL(e.target.files[0])
    console.log(url)
    setPreview(url)
    setUserDetails({...userDetails,profile:e.target.files[0]})
  }
  
  //GET  ADVERTISER
  const getUser=async()=>{
      try{
         //req header
        const reqHeader =  {Authorization: `Bearer ${token}`}
        //api call
        const response = await getAdvertiserAPI(reqHeader)
        console.log(response)
        setUserDetails(response.data)
      }
      catch(err){
            console.log("ERROR"+err)
        }
  }

  useEffect(()=>{
      setToken(sessionStorage.getItem('token'))
      if(token){
        getUser()
      }
  },[token])

  console.log(userDetails)

  return (
    <>
      <div className="bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] h-screen ">
        <AdHeader />
        {/* <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6"> */}

          {/* <Card className="w-250 h-100 bg-transparent ml-20 mt-20 ">
            <div className="flex">
              <div className="ml-20">
                <Avatar
                  img={user.profile? user.proflie : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" }
                  rounded
                  size="xl"
                  className="mx-auto mb-8"
                />
                <Button onClick={()=>setEditOpen(true)} className="ml-5">Edit Profile</Button>
              </div>
              
              <div className="ml-30">
                <h3 className="text-lg font-bold mb-10">Account Information</h3>
                <div className="grid grid-cols-2 gap-y-9 gap-x-25 text-gray-700">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Joined On:</strong> {user.joined? user.joined : ""}</p>
                  <p><strong>Business Type:</strong> {user.businessType? user.businessType : ""}</p>
                  <p><strong>Location:</strong> {user.location? user.location : ""}</p>
                </div>
              </div>
            </div>
            
            <hr className="my-4"/>

            <h3 className="text-lg font-bold mb-3 ml-15">About</h3>
            <p className="text-gray-600 ml-15">
              {user.bio ? user.bio : "Give your bio..."}
            </p>
          </Card> */}

          {/* STATS */}
          {/* <Card>
            <h3 className="font-bold mb-2">Campaign Summary</h3>
            <p>📢 Active Campaigns: <strong>3</strong></p>
            <p>📅 Total Bookings: <strong>12</strong></p>
            <p>💳 Total Spent: <strong>₹18,200</strong></p>
          </Card> */}

          {/* RECENT ACTIVITY */}
          {/* <Card className="col-span-2">
            <h3 className="font-bold mb-3">Recent Activity</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✔ Booked MG Road Billboard</li>
              <li>💳 Payment completed ₹1500</li>
              <li>⭐ Rated Metro Station Ad Space</li>
            </ul>
          </Card> */}

          
        {/* EDIT PART */}
        <div className="rounded-lg h-100 w-200 bg-transparent border border-white p-10 mt-25 mx-50 ">
          <div className="space-y-5 flex">
                <div className=' w-35 h-35 mt-5 '>
                  <label htmlFor='uploadImg'>
                    <input onChange={(e)=>handleFileUpload(e)} type='file' name='uploadImg' id='uploadImg' hidden/>
                    <img src={ preview ? preview:`${serverURL}/uploads/${userDetails.profile}` } alt=""  className='w-full h-full rounded-full object-cover ' />
                    <div name='uploadImg' className='relative w-5 -top-5 left-20 '><BiSolidEdit  className='text-black hover:bg-white'/></div >
                  </label>
                  <div className="ml-3 text-center">
                    <h1>{userDetails.email}</h1>
                    <h1>{userDetails.role}</h1>
                  </div>
                </div>

                <div className="ml-10">
                  <div className="grid grid-cols-2 gap-4 w-130 ">
                    <div>
                      <Label htmlFor="name" className="text-white">Enter Name</Label>
                      <TextInput value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} id="name" type="text" />
                    </div>
                    <div>
                      <Label  htmlFor="password" className="text-white">Enter Password</Label>
                      <TextInput value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} id="password" type="password"  />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Business Type</Label>
                      <TextInput value={userDetails.businessType} onChange={e=>setUserDetails({...userDetails,businessType:e.target.value})} type="text" placeholder="Local, Contract..." />
                    </div>
                    <div>
                      <Label className="text-white">Location</Label>
                      <TextInput value={userDetails.location} onChange={e=>setUserDetails({...userDetails,location:e.target.value})} type="text" placeholder="Ernakulam, Kochi" />
                    </div>
                  </div>  
                  <div>
                    <Label className="text-white">Bio</Label>
                    <Textarea value={userDetails.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})} placeholder="..." />
                  </div>      
                </div>
          </div>
          
          <div className="flex gap-5 px-5 mt-5 ml-150">
            <Button onClick={handleUpdate}>Update</Button>
          </div>
            
        </div>           
      </div>
    </>
  )
}

export default AdProfile