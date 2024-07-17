import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InventoryPage from '../../components/han/inventory/InventoryPage'
import TradeListPage from '../../components/han/inventory/TradeListPage'
import WarehouseListPage from '../../components/han/inventory/WarehouseListPage'

const InventoryRouter = () => {
  return (
    <Routes>
        <Route path='itemlist' element={<InventoryPage/>}/>
        <Route path='tradelist' element={<TradeListPage/>}/>
        <Route path='warehouselist' element={<WarehouseListPage/>}/>
    </Routes>
  )
}

export default InventoryRouter