import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerBBSPage from '../../components/jay/CustomerBBSPage'
import CustomerFAQPage from '../../components/jay/CustomerFAQPage'

const CustomerRouterPage = () => {
  return (
    <Routes>
        <Route path='bbs' element={<CustomerBBSPage/>}/>
        <Route path='faq' element={<CustomerFAQPage/>}/>
    </Routes>
  )
}

export default CustomerRouterPage