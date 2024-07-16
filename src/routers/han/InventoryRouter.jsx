import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InventoryPage from '../../components/han/inventory/InventoryPage'

const InventoryRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<InventoryPage/>}/>
    </Routes>
  )
}

export default InventoryRouter