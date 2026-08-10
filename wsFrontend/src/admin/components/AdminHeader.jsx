import React from 'react'
import { useNavigate } from "react-router-dom"

function AdminHeader() {
    const navigate = useNavigate()

    //LOGOUT
    const handleLogout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("loggedUser")
        navigate("/")
    }
  return (
    <>
    <div className='w-full bg-[#6f8ca6] h-10 py-3 flex'>
        <h3 className='text-white text-center text-3xl ml-130'>Welcome Admin</h3>
        <h1 onClick={handleLogout} className='text-white ml-100 hover:text-red-800 font-bold' >LogOut</h1>
    </div>
    <div className='h-35 w-full bg-[#6f8ca6] pt-8 flex'>
        <div className='w-40 h-40 rounded-full overflow-hidden border border-white ml-20  '>
            <img src="https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg?semt=ais_hybrid&w=740&q=80" alt=""  />
        </div>
        <div className='flex gap-10 ml-10 mt-20 text-white'>
            <a href="/adminHome"> <p>User Details</p> </a>
            <a href="/adminRes"> <p>Resource Details</p> </a>
            {/* <a href="#"> <p>Requests</p> </a> */}
            {/* <a href="/adminProfile"> <p>Profile</p> </a> */}
        </div>
    </div>
    </>
  )
}

export default AdminHeader