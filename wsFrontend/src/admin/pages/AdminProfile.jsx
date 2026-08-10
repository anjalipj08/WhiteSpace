import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Button, Card, Label, Textarea, TextInput } from 'flowbite-react'
import { getAdminAPI } from '../../services/allAPIs'
import { useState } from 'react'
import { useEffect } from 'react'

function AdminProfile() {

   const[adminData,setAdminData] = useState()

   const getAdmin=async()=>{
        try{
              const response = await getAdminAPI()
              console.log(response.data)
              setAdminData(response.data)
          }
          catch(err){
              console.log("ERROR"+err)
          }
    }
    useEffect(()=>{   
          getAdmin()
    },[])
   console.log(adminData)

  return (
    <div className='bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] h-screen overflow-y-hidden ' >
        <AdminHeader/>
        <Card className='w-100 h-110 bg-transparent mx-100 my-5'>
            <div className='w-20 h-20 rounded-full overflow-hidden ml-30'>
                <img  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"  alt=""  />
            </div>
            <div >
                <Label>Name</Label>
                <TextInput />
            </div>
            <div >
                <Label>Password</Label>
                <TextInput />
            </div>
            <div>
                <Label>Bio</Label>
                <Textarea/>
            </div>
            
            <Button>Update</Button>
        </Card>
    </div>

  )
}

export default AdminProfile