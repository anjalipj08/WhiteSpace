import { Card, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { addResourceAPI } from '../../services/allAPIs';

function AddRes() {

    const[token,setToken]=useState('') 
    useEffect(()=>{
        setToken(sessionStorage.getItem("token")) 
    },[])

    const navigate = useNavigate();

    const[resourceData,setResourceData]=useState({
        title: '', 
        location: '', 
        size: '', 
        visibility: '', 
        type: '', 
        description: '', 
        price: '', 
        dprice: '', 
        priceType:'',
        UploadedImages:[]
    })


    //to hold image url
    const[preview,setPreview]=useState('')
    //to hold
    const[previewList,setPreviewList]=useState([])

    const handleUpload=(e)=>{
        console.log(e.target.files[0]);

        let imgArray=resourceData.UploadedImages
        imgArray.push(e.target.files[0])
        console.log(imgArray)

        setResourceData({...resourceData,UploadedImages:imgArray})
        console.log(resourceData)

        const url =URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)

        const imageListArray =previewList
        imageListArray.push(url)
        console.log(imageListArray);
        setPreviewList(imageListArray)
        
    }

    const handleAddResource= async() =>{
        console.log(resourceData)
        const {title, location, size, visibility, type, description, price, priceType, dprice, UploadedImages} = resourceData
           
        if (!title ||!location ||!size ||!visibility ||!type ||!description ||!price ||!priceType ||!dprice ||UploadedImages.length === 0) {
            alert("Please fill all details")
            return
        }

        try{
           //reqheader
            const reqHeader={
                Authorization:`Bearer ${token}`
            }
             //reqBody
            const reqBody = new  FormData() //since file uploading present we use FormData() 
            for(let key in resourceData){
                if(key != "UploadedImages"){
                    reqBody.append(key, resourceData[key])
                }
                else{
                    resourceData.UploadedImages.forEach(item=>(
                    reqBody.append("UploadedImages",item)
                    ))
                }
            }  
            //api call
                const result = await addResourceAPI(reqBody,reqHeader)
                console.log(result);
                if(result.status==200){
                    alert(result.data)
                }
                else{
                    alert(result.response.data)
                }
        }
        catch(err){
            console.log("Error"+err)
        }
    }
    

  return (
   
    <div className="py-10 bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] flex items-center justify-center z-50">
    
        <div className="bg-transparent  w-full max-w-xl rounded-lg shadow-lg p-6 text-white">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl text-center ">Add New Resource</h3>
            <button onClick={() => navigate("/resHome") } className="text-gray-500 hover:text-white text-xl">×</button>
        </div>

        {/* Form */}
        <form className="space-y-4">

            {/* Image */}
            <div>
                <label htmlFor='imgFile' className="text-sm font-medium"  >
                    <input type="file" id='imgFile' hidden onChange={(e)=>handleUpload(e)} />
                    <Card onClick={() => navigate("/addRes")}  className="w-130 h-30 flex items-center justify-center cursor-pointer border border-gray-300 bg-transparent hover:bg-white/10 transition">
                        <div className="flex  items-center gap-7 text-gray-500 ">
                            {previewList.slice(0, 3).map((item, index) => (
                                <img src={item} alt="preview" className="w-24 h-24 object-cover rounded-md" />
                            ))}
                            
                            
                            {previewList.length < 3 && (
                                <div>
                                <div className="w-14 h-14 ml-2 mb-3 flex items-center justify-center rounded-full border border-white/80">
                                    <HiPlus size={28} />
                                </div>
                                <p className="text-xs font-medium text-white/80">Upload Image</p>
                                </div>
                            )}
                            
                        </div>
                    </Card>
                </label>

                
                    
            </div>

            {/* Title */}
            <input onChange={(e)=>setResourceData({...resourceData,title:e.target.value})} type="text" placeholder="Resource Title" className="w-full border rounded-md p-2 text-sm" required/>

            {/* Location */}
            <input onChange={(e)=>setResourceData({...resourceData,location:e.target.value})} type="text" placeholder="Location" className="w-full border rounded-md p-2 text-sm" required/>

            {/* Size & Type */}
            <div className="flex gap-3">
            <input onChange={(e)=>setResourceData({...resourceData,size:e.target.value})}  type="text" placeholder="Size (eg: 20×10 ft)" className="w-1/2 border rounded-md p-2 text-sm" required/>

            <select value={resourceData.type} 
                    onChange={(e) =>setResourceData({ ...resourceData, type: e.target.value })} 
                    className="w-1/2 border rounded-md p-2 text-sm " required>
                <option className='text-black'>Type</option>
                <option className='text-black'>BillBoards</option>
                <option className='text-black'>Vechicles</option>
                <option className='text-black' value='DigitalBillboard'>Digital BillBoards</option>
                <option className='text-black' value='WallFence'>Wall & Fence</option>
                <option className='text-black'>Windows</option>
                <option className='text-black'>Mascot Costumes</option>
            </select>
            </div>

            {/* Visibility */}
            <input onChange={(e)=>setResourceData({...resourceData,visibility:e.target.value})} type="text" placeholder="Visibility" className="w-full border rounded-md p-2 text-sm" required/>

            {/* Price & Duration */}
            <div className="flex gap-3">
                <input onChange={(e)=>setResourceData({...resourceData,price:e.target.value})} type="number" placeholder="Price" className="w-1/2 border rounded-md p-2 text-sm" required/>
                
                <select value={resourceData.priceType}
                        onChange={(e) =>setResourceData({ ...resourceData, priceType: e.target.value })}
                        className="w-1/2 border rounded-md p-2 text-sm">
                    <option className='text-black'>Per</option>
                    <option className='text-black'>Daily</option>
                    <option className='text-black'>Weekly</option>
                    <option className='text-black'>Monthly</option>
                </select>
            </div>

            {/* Discount */}
            <input onChange={(e)=>setResourceData({...resourceData,dprice:e.target.value})} type="number" placeholder="Discount (%)" className="w-full border rounded-md p-2 text-sm" required/>

            {/* description */}
            <textarea onChange={(e)=>setResourceData({...resourceData,description:e.target.value})} id="comment" placeholder="Description..." required rows={4} cols={74}  className='bg-transparent border border-white rounded-md p-2 rounded-md p-2 text-sm'/>

            
            
            <button onClick={handleAddResource} type="button" className="px-4 py-2 text-sm ml-50 rounded-md bg-white/40 text-black hover:border border-white"
                >Add Resource
            </button>
            

        </form>
        </div>
  </div>
   
  )
}

export default AddRes