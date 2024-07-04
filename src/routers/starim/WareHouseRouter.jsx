import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_WareHouseListPage from '../../components/starim/erp_warehouse/ERP_WareHouseListPage'

const WareHouseRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_WareHouseListPage/>}/>
    </Routes>
  )
}

export default WareHouseRouter