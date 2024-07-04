import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Client_ListPage from '../../components/starim/erp_client/ERP_Client_ListPage'

const ClientRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_Client_ListPage/>}/>
    </Routes>
  )
}

export default ClientRouter