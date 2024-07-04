import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_ItemsListPage from '../../components/starim/erp_items/ERP_ItemsListPage'

const ItemsRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_ItemsListPage/>}/>
    </Routes>
  )
}

export default ItemsRouter