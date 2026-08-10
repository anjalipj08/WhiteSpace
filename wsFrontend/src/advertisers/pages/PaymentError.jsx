import React from 'react'

import FooterBar from '../../components/FooterBar'
import AdHeader from '../components/AdHeader'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

function PaymentError() {
  return (
   <div className='bg-gradient-to-b from-[#8faac2] via-[#a3a8ac] to-[#bdb4a6]'>
       <AdHeader/>
         <div class="flex text-center p-40">
            <div class="w-1/2 ...">
            {/* <p className='text-red-600 text-8xl'>Oh No!</p> */}
            <h3 className='text-white text-4xl'>Your payment was Failed</h3>
            <p className='text-amber-800 py-5'>We apologize for the inconvience caused and appreciate your visit to our website</p>
            <Link  to={'/adListing'}>
              <Button className='ml-40' >Expolre More</Button>
            </Link>
            
            </div>
            <div class="w-1/2 ...">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/payment-error-2130357-1800921.png" alt="" />
            </div>
        </div>
        <FooterBar/>
    </div>
  )
}

export default PaymentError