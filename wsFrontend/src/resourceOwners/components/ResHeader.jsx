import React from 'react'
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, 
        Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,
} from "flowbite-react";
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from "../../services/serverURL";
import { getAdvertiserAPI } from '../../services/allAPIs';

function ResHeader() {
  const[user,setUser]=useState({})
  const[token,setToken]=useState('')
  const navigate = useNavigate()
  
  //GET USER DATA
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

  return (  
    <Navbar fluid className='bg-[#6f8ca6] items-center justify-between px-10'>
      <h3 className='text-white text-2xl'>WhiteSpace</h3>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user.profile? `${serverURL}/uploads/${user.profile}` : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/resHome" >Home</DropdownItem>
          <DropdownItem as={Link} to="/resProfile" >Profile</DropdownItem>
          {/* <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem> */}
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
    
  )
}

export default ResHeader