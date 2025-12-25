import { useState } from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import DonationAll from './Pages/DonationAll'
import DonationDetail from './Pages/DonationDetail'
import DonationForm from './Pages/DonationForm'
import Login from './Pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DonationAll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/donation/:id' element={<DonationDetail />} />
        <Route path='/donation/create' element={<DonationForm />} />
      </Routes>
    </>
  )
}

export default App
