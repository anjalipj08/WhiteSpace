import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Button, Card, Pagination, Rating, RatingStar } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllResourceAPI, getAllUserAPI } from '../../services/allAPIs'
import { serverURL } from "../../services/serverURL";

function AdminRes() {
    const[token,setToken]=useState('')
        const[resourceData,setResourceData] = useState([])
        // const nonAdminUsers = resourceData?.filter(user => user.role !== "admin")

        const [currentPage, setCurrentPage] = useState(1)
        const resourcePerPage = 6
        const indexOfLastUser = currentPage * resourcePerPage
        const indexOfFirstUser = indexOfLastUser - resourcePerPage
        const currentResource = resourceData.slice( indexOfFirstUser, indexOfLastUser  )

        const totalPages = Math.ceil( resourceData.length / resourcePerPage )


        // GET ALL USERS 
        const allResource=async()=>{
            try{
                //req header
                const reqHeader =  {Authorization: `Bearer ${token}`}
                //api
                const response = await getAllResourceAPI(reqHeader)
                console.log(response.data)
                setResourceData(response.data)
            }
            catch(err){
                console.log("ERROR"+err)
            }
        }
        useEffect(()=>{  
            setToken(sessionStorage.getItem('token')) 
            if(token){
            allResource()
            }  
        },[token])

  return (
    <div className='bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] h-auto '>
      <AdminHeader/>

      <div className=''>
        <div className='pl-30 py-3 h-auto pt-15 grid grid-cols-1 md:grid-cols-3 gap-6'>
          {
          currentResource.length>0 && 
            currentResource.map(items=>(
              <Card className="w-60 h-80" 
                    renderImage={() => (
                        <img src={
                            items.UploadedImages && items.UploadedImages.length > 0
                                ? `${serverURL}/uploads/${items.UploadedImages[0]}`
                                : "No Image Available"
                            }
                            className="w-full h-40 object-cover rounded-t-lg"
                            alt="resource"
                        />
                    )}
                    >
                    <div className="space-y-2 ">
                        <h2 className='font-bold m-0' >{items.title}</h2>
                        <h2 className='m-0'>{items.location}</h2>
                        {/* <div className='flex gap-2 text-gray-600'>
                            <h2>20*10 feet</h2>
                            <h2>Static</h2>
                        </div> */}
                        <div className='flex gap-2 items-center'>
                            <h2 className='font-bold'>{items.price} / {items.priceType}</h2>
                            <h2 className='text-green-500'>({items.dprice}% off)</h2>
                        </div>
                        <Rating>
                            <RatingStar />
                            <h2 className="ml-2 text-sm  text-gray-900 dark:text-white">4.95</h2>
                        </Rating>
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

export default AdminRes