import React from 'react'
import AdHeader from '../components/AdHeader'
import { Button, Card, Rating, RatingStar, Textarea } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { addReviewAPI, getBuyResourceAPI } from '../../services/allAPIs'
import { serverURL } from "../../services/serverURL";

function AdHistory() {

    const[token,setToken]=useState('')
    const[resourceData,setResourceData]=useState([])
    const [reviews, setReviews] = useState({})

    //GETTING RESOURCES BROUGHT BY USER
    const getBuyResource=async()=>{
        try{
            //req header
            const reqHeader =  {Authorization: `Bearer ${token}`}
            //api call
            const response = await getBuyResourceAPI(reqHeader)
            console.log(response.data)
            setResourceData(response.data)
        }
        catch(err){
            console.log("ERROR"+err)
        }
    }

    //ADDING REVIEW
    const handleReview = async (resourceId) => {
        try {
            if (!reviews[resourceId]) {
                alert("Please enter a review")
                return
            }

            //reqHeader
            const reqHeader = { Authorization: `Bearer ${token}` }
            //reqBody
            const reqBody = { resourceId, comment: reviews[resourceId]  }
            //apicall
                const response = await addReviewAPI(reqBody, reqHeader)
                if(response.status==200){
                    alert("Review added successfully")
                }

            // clear textarea
            setReviews({ ...reviews, [resourceId]: "" })

        } 
        catch (err) {
            console.log(err)
            alert("Failed to add review")
        }
    }

    useEffect(()=>{
            setToken(sessionStorage.getItem('token'))
            if(token){
                getBuyResource()
            } 
        },[token])

    console.log(resourceData)

  return (
    <div className='bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] min-h-screen h-auto '>
        <AdHeader/>
        <div className=' p-10'>
            {
                resourceData.length>0?
                    resourceData.map(item=>(
                        <Card className="bg-black bg-transparent p-4 mb-3">
                            <div className="flex gap-8 items-start">

                                <div className="h-40 w-40 shrink-0">
                                    <img src={`${serverURL}/uploads/${item.UploadedImages[0]}`} alt="" className="h-full w-full object-cover rounded" />
                                </div>

                                <div className=" text-white text-center">
                                    <h3 className="text-xl ">Title: {item.title}</h3>
                                    <p>Type: {item.type}</p>
                                    <p>Location: {item.location}</p>
                                </div>

                                <div className="text-white flex-1">
                                    <p>Price: {item.price}/{item.priceType}</p>
                                    <p>Discount: {item.dprice}%</p>
                                </div>

                                {/*Review */}
                                <div className="flex gap-5 items-end">
                                    <div>
                                        <p className="text-white mb-1">Give Review</p>
                                        <Textarea  onChange={(e) => setReviews({ ...reviews, [item._id]: e.target.value }) }  value={reviews[item._id] || ""} className="w-60 h-30 " />
                                    </div>

                                    <Button onClick={() => handleReview(item._id)} className="mt-6">Add</Button>
                                </div>

                            </div>
                            </Card>

                    ))
                :"No Resource Brought Yet"
            }
        </div>
    </div>
  )
}

export default AdHistory