import React from 'react'
import AdHeader from '../components/AdHeader'
import FooterBar from '../../components/FooterBar'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

function PaymentSuccess() {
  return (
    <div className=' bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6]'>
       <AdHeader/>
        <div className='h-100 text-center'>   
            <img src="https://www.lappymaker.com/images/greentick-unscreen.gif" alt="" className='ml-120 w-70'/> 
                <h3 className='text-white text-4xl mb-5'>Payment Successfull...</h3>
                <p className='text-white mb-3'>Thanks for trusting Us</p>
                <Link to={'/adListing'}>
                    <Button className='ml-145'>Keep Shopping</Button>
                </Link>
            

        </div>
        <FooterBar/>
    </div>
  )
}

export default PaymentSuccess