import React from 'react'
import AdHeader from '../components/AdHeader'
import { Button, Card, Label, Radio, Select, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Rating, RatingStar } from "flowbite-react";
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { getAllResourceAPI } from '../../services/allAPIs';
import { Carousel } from "flowbite-react";
import { useLocation } from "react-router-dom";

import { serverURL } from "../../services/serverURL";

function AdListing() {
  
    const[resourseData,setResourceData] = useState()
    const[token,setToken]=useState('')

    const[filterResource,setFilterResource] = useState([])
    const[location,setLocation]= useState('')
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [discount, setDiscount] = useState('');

    const locationHook = useLocation();
    const queryParams = new URLSearchParams(locationHook.search);
    const resType = queryParams.get("type");  //type 
    const searchText = queryParams.get("search"); //search

    console.log(locationHook)
    console.log(queryParams.get("type"))
    console.log(resourseData)
    console.log(filterResource)

    // All RESOURCE
    const allResource=async()=>{
        try{
            //req header
            const reqHeader =  {Authorization: `Bearer ${token}`}
            //api call
            const response = await getAllResourceAPI(reqHeader)
            console.log(response.data)
            let data = response.data;

            //filtering
            if (resType) {
                data = data.filter(
                    item => item.type?.toLowerCase() === resType.toLowerCase()
                );
            }
            //searching
            if (searchText ) {
                data = data.filter(item =>
                    item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.location?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.type?.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            setResourceData(data)

            
            setFilterResource(data)// for filter
        }
        catch(err){
            console.log("ERROR"+err)
        }
    }

    // FILTER 
    const applyFilters=async()=>{
        let filtered = resourseData
        if(location){
            filtered = filtered.filter(item =>item.location.toLowerCase().includes(location.toLowerCase()))
        }

        filtered = filtered.filter(item => {
                const price = Number(item.price);
                const min = minPrice ? Number(minPrice) : null;
                const max = maxPrice ? Number(maxPrice) : null;

                if (min !== null && price < min) return false;
                if (max !== null && price > max) return false;

                return true; // price is within range
            });

        if (discount) {
                filtered = filtered.filter(item => item.dprice >= Number(discount));
        }

        setFilterResource(filtered)
    }

    // CLEAR FILTER 
    const clearFilters = () => {
        setLocation('');
        setMinPrice('');
        setMaxPrice('');
        setDiscount('');
        setFilterResource(resourseData);
    };

    useEffect(()=>{
        setToken(sessionStorage.getItem('token'))
        if(token){
            allResource()
        }     
    },[token,resType,searchText])
     
  return (
    
    <div >
        <AdHeader/>

        <div className='flex w-full h-screen overflow-hidden bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6]'>
            {/* sidebar FILTER  */}
            <div className='w-1/4 h-full  '>
                <Sidebar aria-label="Sidebar with content separator example" className='h-500' >
                    <SidebarItems >
                        <h2 className='mt-5 font-bold'>FILTERS</h2>  
                        <SidebarItemGroup>
                            <h2 className='pl-4 text-sm m-0 mb-1 '>Location</h2>
                            <SidebarItem className="py-1">
                            <input onChange={(e)=>setLocation(e.target.value)} value={location} type='text' placeholder='Search by city or area' className='w-50 h-8 p-2 border border-black/20 rounded-lg text-sm'/>
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <h2 className='pl-4 text-sm'>Price Range</h2>
                            <SidebarItem className="py-1">
                                <input onChange={(e)=>setMinPrice(e.target.value)} value={minPrice} type="number" placeholder='minimun range' className='w-50 h-8 p-2 border border-black/20 rounded-lg mb-3 text-sm' /> <br />
                                <input onChange={(e)=>setMaxPrice(e.target.value)} value={maxPrice} type="number" placeholder='maximum range' className='w-50 h-8 p-2 border border-black/20 rounded-lg text-sm' />
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <h2 className='ml-4 text-sm'>Discount</h2>
                            <SidebarItem className="py-1" >
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '10'} value='10' id='10'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm' >10% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '20'} value='20' id='20'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>20% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '30'} value='30' id='30'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>30% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '40'} value='40' id='40'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>40% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '50'} value='50' id='50'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>50% and more</label> <br />
                                <Radio  onChange={(e) => setDiscount(e.target.value)} checked={discount === '60'} value='60' id='60'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>60% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '70'} value='70' id='70'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>70% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '80'} value='80' id='80'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>80% and more</label> <br />
                                <Radio onChange={(e) => setDiscount(e.target.value)} checked={discount === '90'} value='90' id='90'  name="dis" />
                                <label htmlFor="" className='ml-2 text-black/60 text-sm'>90% and more</label>
                            </SidebarItem>
                        </SidebarItemGroup>
                        
                        <SidebarItemGroup>
                            <div className='flex gap-13 '>
                            <Button onClick={applyFilters} className='h-8'> Apply </Button>
                            <Button onClick={clearFilters} className='h-8'>Clear All</Button>
                        </div>
                        </SidebarItemGroup>
                        
                        
                    </SidebarItems>
                </Sidebar>  
            </div>

            <div className='w-3/4 h-full overflow-y-auto px-6 hide-scrollbar'>
                {/* sort  */}
                {/* <div className='flex my-7  ml-150'>
                    <Label htmlFor='sort' className='font-bold  m-3'> SORT BY:</Label>
                    <Select onChange={(e) => setSortBy(e.target.value)} id="countries" required className='w-50'>
                        <option value={''}>All</option>
                        <option value={'priceHigh'}>Price: High to Low</option>
                        <option value={'priceLow'}>Price: Low to High</option>
                        <option value={'discount'}>Discount</option>
                        <option>Customer Rating</option>
                    </Select>
                </div> */}
                
                {/* items listings */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10' >
                    {
                        filterResource.length ?
                            filterResource.map(item=>(
                               
                                <Link to={`/adView/${item._id}`}>
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
                                        {/* <Rating>
                                            <RatingStar />
                                            <h2 className="ml-2 text-sm  text-gray-900 dark:text-white">4.95</h2>
                                        </Rating> */}
                                    </div>
                                </Card>
                            </Link>
                            ))
                        
                        :"No Resourse Found :("
                    }
                    

                    {/* <Card className="w-60 h-80"
                        renderImage={() => ( <img src="https://desidays.in/wp-content/uploads/2024/09/jln-stadium-billboard-scaled.jpg" className="w-full h-35 object-cover" /> )} >
                        <div className="space-y-2 ">
                            <h2 className='font-bold m-0' >MG Road BillBoard </h2>
                            <h2 className='m-0'>Kochi</h2>
                            <div className='flex gap-2 text-gray-600'>
                                <h2>20*10 feet</h2>
                                <h2>Static</h2>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <h2 className='font-bold'>₹1500 / week</h2>
                                <h2 className='text-green-500'>(20% off)</h2>
                            </div>
                            <Rating>
                                <RatingStar />
                                <h2 className="ml-2 text-sm  text-gray-900 dark:text-white">4.95</h2>
                            </Rating>
                        </div>
                    </Card> */}

                    {/* <Card className="w-60 h-80"
                        renderImage={() => ( <img src="https://goodmockups.com/wp-content/uploads/2025/05/Free-Near-Highway-City-Billboard-Mockup-PSD.jpg" className="w-full h-35 object-cover" /> )} >
                        <div className="space-y-2 ">
                            <h2 className='font-bold m-0' >MG Road BillBoard </h2>
                            <h2 className='m-0'>Kochi</h2>
                            <div className='flex gap-2 text-gray-600'>
                                <h2>20*10 feet</h2>
                                <h2>Static</h2>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <h2 className='font-bold'>₹1500 / week</h2>
                                <h2 className='text-green-500'>(20% off)</h2>
                            </div>
                            <Rating>
                                <RatingStar />
                                <h2 className="ml-2 text-sm  text-gray-900 dark:text-white">4.95</h2>
                            </Rating>
                        </div>
                    </Card> */}
                </div>
                
            </div>
        </div>
       

    </div>
  )
}

export default AdListing