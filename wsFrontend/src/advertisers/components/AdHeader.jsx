import React, { useEffect } from 'react'
import { useState } from "react";
import { Button, Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem,
  Navbar, NavbarBrand,  NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import { FaHeart,FaSearch,FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { serverURL } from "../../services/serverURL";
import { getAdvertiserAPI } from '../../services/allAPIs';

function AdHeader() {
  const[token,setToken]=useState('')
  const [open, setOpen] = useState(false);
  const[user,setUser]=useState({})
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  console.log(searchText)

  //GET USERDATA
  const getUser=async()=>{
        try{
          //req header
            const reqHeader =  {Authorization: `Bearer ${token}`}
          //api
            const response = await getAdvertiserAPI(reqHeader)
            console.log(response.data)
            setUser(response.data)
        }
        catch(err){
              console.log("ERROR"+err)
          }
  }

  //SEARCH
  const handleSearch = () => {
    if(searchText==""){
      navigate('/adListing')
    }
    else if (searchText.trim()) {
      navigate(`/adListing?search=${encodeURIComponent(searchText)}`);
    }
  } 

  //LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("loggedUser")
    navigate("/")  
  }

  useEffect(()=>{
        setToken(sessionStorage.getItem('token')) 
        if(token){
          getUser()
        }  
  },[token])

  console.log(user)
  

  return (
    <>
        <Navbar className='flex w-full h-15 bg-[#6f8ca6] items-center justify-between px-10  '>
            <h3 className='text-white text-2xl'>WhiteSpace</h3>
            <div className="flex relative">

              {/* all selction */}
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-[#8faac2] h-[44px] px-4 text-white border-2 border-[#6f8ca6] rounded-tl-lg rounded-bl-lg hover:bg-[#7f9bb3]" >
                  Items <FaChevronDown className="text-sm" />
                </button>
                {open && (
                  <div className="flex absolute left-0 top-[48px] w-90 bg-white shadow-lg rounded-lg z-50 p-3">
                    <div className='text-sm w-40'>
                      <Link to="/adListing?type=Billboards" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500 '>Billboards </h4>
                      </Link>
                      <Link to="/adListing?type=DigitalBillboard" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500'>Digital Billboard</h4>
                      </Link>
                      <Link to="/adListing?type=Vechicles" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500 '>Vechicles </h4>
                      </Link> 
                      
                    </div>
                    <div className='text-sm w-40'>
                      <Link to="/adListing?type=WallFence" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500 '>Wall & Fence </h4>
                      </Link>
                      <Link to="/adListing?type=Windows" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500 '>Windows </h4>
                      </Link>
                      {/* <Link to="/adListing?type=Mascot Costumes" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-blue-500 '>Mascot Costumes</h4>
                      </Link> */}
                      <Link to="/adListing" className="block px-4 py-2 hover:bg-gray-100" > 
                        <h4 className='font-bold text-green-500'>View All</h4>
                      </Link>  
                    </div>
                  </div>
                )}
              </div>

              {/* search bar */}
              <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search for location, resource, type..." className="bg-[#8faac2] w-[400px] h-[44px] text-white px-4 border-y-2 border-[#6f8ca6] focus:outline-none" />
              
              {/* search button */}
              <button onClick={handleSearch} className="bg-[#8faac2] h-[44px] px-4 border-2 border-[#6f8ca6] rounded-tr-lg rounded-br-lg text-white hover:bg-[#7f9bb3]">
                <FaSearch />
              </button>
            </div>

            {/* profile */}
            <div className='flex gap-10 items-center'>
              <div className="flex md:order-2">
                <Dropdown arrowIcon={false} inline
                  label={
                    <Avatar alt="User settings" img={user.profile? `${serverURL}/uploads/${user.profile}` : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} rounded />
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm">Welcome  <span className='font-bold'>{user.username}</span> </span>
                    <span className="block truncate text-sm font-medium">{user.email}</span>
                  </DropdownHeader>
                  <DropdownItem as={Link} to="/adHome">Home</DropdownItem>
                  <DropdownItem as={Link} to="/adProfile">Profile</DropdownItem>
                  <DropdownItem as={Link} to="/adHistory">History</DropdownItem>
                  {/* <DropdownItem>Earnings</DropdownItem> */}
                  <DropdownDivider />
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
              </div>
            
            {/* wishList */}
            {/* <div className='flex gap-2 '>
              <FaHeart className='text-2xl text-red-500' />
            </div> */}
            </div>
            
            
            
        </Navbar>
    </>
  )
}

export default AdHeader