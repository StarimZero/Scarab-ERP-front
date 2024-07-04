import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerBBSPage from '../../components/jay/CustomerBBSPage'

const CustomerRouterPage = () => {
  return (
    <Routes>
        <Route path='bbs' element={<CustomerBBSPage/>}/>
    </Routes>
  )
}

export default CustomerRouterPage