import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Button, Card, Pagination } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllUserAPI } from '../../services/allAPIs'
import { serverURL } from "../../services/serverURL";

function AdminHome() {

  const[token,setToken]=useState('')
  const[userData,setUserData] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = userData.slice( indexOfFirstUser, indexOfLastUser  )

  const totalPages = Math.ceil( userData.length / usersPerPage )


  // GET ALL USERS 
  const allUsers=async()=>{
      try{
          //req header
            const reqHeader =  {Authorization: `Bearer ${token}`}
          //api
            const response = await getAllUserAPI(reqHeader)
            console.log(response.data)
            setUserData(response.data)
      }
      catch(err){
          console.log("ERROR"+err)
      }
  }
  useEffect(()=>{  
      setToken(sessionStorage.getItem('token')) 
      if(token){
        allUsers()
      }  
  },[token])


  return (
    <div className='bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] h-screen overflow-y-hidden'>
      <AdminHeader/>

      <div className=''>
        <div className='px-15 h-105 pt-15  grid grid-cols-1 md:grid-cols-3 gap-6'>
          {
          currentUsers.length>0 && 
            currentUsers.map(items=>(
              <Card className='w-80 h-40 bg-transparent '>
                <p >ID: {items._id}</p>
              <div className='flex gap-10'>
                <div className='w-20 h-20 rounded-full overflow-hidden '>
                  <img  src={ items.profile ?`${serverURL}/uploads/${items.profile}`:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" } alt=""  />
                </div>
                <div className='text-center space-y-3'>
                  <h1>{items.name}</h1>
                  <p>{items.email}</p>
                  <p>{items.role}</p>
                  {/* <Button>View</Button> */}
                </div>
              </div>
             </Card>
            ))
        }
        </div>
        
        <div className=''>
          {
            totalPages > 1 &&
            <div className="flex justify-center pb-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                showIcons
              />
            </div>
          }
        </div>
        
      </div>
      
      

    </div>
  )
}

export default AdminHome