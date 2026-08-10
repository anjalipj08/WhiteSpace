import React from 'react'
import Header from '../components/Header'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button, Label, Radio, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginUserAPI, registerUserAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';

function Auth() {

  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()
  const [userData,setUserData]=useState({username:'', email:'', password:'',role:''})
  

  const handleRegister=async()=>{
    console.log(userData)
    if(!userData.username || !userData.email || !userData.password || !userData.role){
      alert("Please fill all details!")
    }
    else{
      try{
        const response = await registerUserAPI(userData)
        console.log(response)
        if(response.status == 200){
          alert("Registeration Successfull")
          setIsRegister(false)
        }
        else{
          alert(response.response.data)
        }
      }
      catch(err){
        console.log(err);
      }
    }

  }

  const handleLogin= async()=>{
    console.log(userData);
    const{email,password}=userData
    if(!email || !password){
      alert("Please fill all the fields");
    }
    else{
      try{
        const response= await loginUserAPI({email,password})
        console.log(response)
        if(response.status == 200){
          //token store
          sessionStorage.setItem('token', response.data.token)

          //userdata store
          sessionStorage.setItem('loggedUser',JSON.stringify(response.data.existingUser))

          if(response.data.existingUser.role == "admin"){
            alert(response.data.message)
            navigate('/adminHome')
          }
          else if(response.data.existingUser.role == "advertiser"){
            alert(response.data.message)
            navigate('/adHome')
          }
          else{
            navigate('/resHome')
          }
          // alert(response.data.message)
          
        }
        else{
          alert(response.response.data)
        }
      }
      catch(err){
        console.log(err);
      }
      
    }
  }
  return (
    <div className='w-full h-166 bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6] p-10'>
        {
          // LOGIN 
          !isRegister ?( 
            <div className='w-130 h-100 bg-white/30 mx-80 my-20 p-10'>
              <h3 className='text-3xl text-center mb-10 text-white '>LogIn</h3>
              <TextInput onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='Enter Email' type="email" required  className='mb-5'/>
              <TextInput onChange={(e)=>setUserData({...userData,password:e.target.value})} placeholder='Enter Password' type="password" required  className='mb-5'/>
              <Button onClick={handleLogin} type="submit" className='ml-40'>Submit</Button> 
              
              <p onClick={() => setIsRegister(true)} className=' text-white mt-15 mx-30'>New User? <span className='text-blue-500'>Register Now</span></p>
            </div> 
          
          )
          :(
            // REGISTER 
            <div className='w-130 h-130 bg-white/30 mx-80 my-10 p-10'>
              <h3 className='text-3xl text-center mb-10 text-white'>Register</h3>
              <div className='flex gap-10 justify-center m-5'> 
                <div className="flex items-center gap-2">
                  <Radio  checked={userData.role === 'advertiser'} onChange={(e)=>setUserData({...userData,role:e.target.value})} id="advertiser" name="role" value="advertiser" />
                  <Label htmlFor="advertiser">Advertiser</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio checked={userData.role === 'resourceOwner'} onChange={(e)=>setUserData({...userData,role:e.target.value})} id="resourceOwner" name="role" value="resourceOwner" />
                  <Label htmlFor="resourceOwner">Resource Owner</Label>
                </div>
              </div>

              <TextInput onChange={(e)=>setUserData({...userData,username:e.target.value})} placeholder='Enter name' type="text" required  className='mb-5'/>
              <TextInput onChange={(e)=>setUserData({...userData,email:e.target.value})} placeholder='Enter Email' type="email" required  className='mb-5'/>
              <TextInput onChange={(e)=>setUserData({...userData,password:e.target.value})} placeholder='Enter Password' type="password" required  className='mb-5'/>
              <Button onClick={handleRegister} type="submit" className='ml-40'>Submit</Button>

              <p onClick={() => setIsRegister(false)} className=' text-white mt-15 ml-35'>Alredy <span className='text-blue-500'>Registered</span></p>
            </div>
            
          )
          }
    </div>
    
  )
}

export default Auth