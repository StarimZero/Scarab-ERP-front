import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_ItmesReadPage from '../../components/bj/web_items/WEB_ItmesReadPage'


const ItemsRouter = () => {
  return (
    <Routes>
        <Route path='/read' element={<WEB_ItmesReadPage/>}/>
    </Routes>
  )
}

export default ItemsRouter