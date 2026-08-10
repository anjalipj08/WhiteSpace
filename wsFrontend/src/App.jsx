import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import AdHome from './advertisers/pages/AdHome'
import Pnf from './pages/Pnf'
import AdListing from './advertisers/pages/AdListing'
import AdView from './advertisers/pages/AdView'
import AdProfile from './advertisers/pages/AdProfile'
import AdminHome from './admin/pages/AdminHome'
import ResHome from './resourceOwners/pages/ResHome'
import AddRes from './resourceOwners/pages/AddRes'
import PaymentSuccess from './advertisers/pages/PaymentSuccess'
import PaymentError from './advertisers/pages/PaymentError'
import AdminProfile from './admin/pages/AdminProfile'
import AdminRes from './admin/pages/AdminRes'
import AdHistory from './advertisers/pages/AdHistory'
import ResProfile from './resourceOwners/pages/ResProfile'

function App() {

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={<Auth/>}  />

        {/* advertisers */}
        <Route path='/adHome' element={<AdHome/>} />
        <Route  path='/adListing' element={<AdListing/>} />
        <Route path='/adView/:id' element={<AdView/>} />
        <Route path='/adProfile' element={<AdProfile/>} />
        <Route path='/adHistory' element={<AdHistory/>} />
        <Route path='/paymentSuccess' element={<PaymentSuccess/>} />
        <Route path='/paymentError' element={<PaymentError/>} />

        {/* resourceOwner  */}
        <Route path='/resHome' element={<ResHome/>} />
        <Route path='/addRes' element={<AddRes/>} />
        <Route path='/resProfile' element={<ResProfile/>} />

        {/* admin  */}
        <Route path='/adminHome' element={<AdminHome/>} />
        <Route path='/adminProfile' element={<AdminProfile/>} />
        <Route path='/adminRes' element={<AdminRes/>} />

        <Route path='/pnf' element={<Pnf/>} />
      </Routes>
    </>
  )
}

export default App
