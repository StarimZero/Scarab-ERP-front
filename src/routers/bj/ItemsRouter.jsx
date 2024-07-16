import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_ItmesReadPage from '../../components/bj/web_items/WEB_ItmesReadPage'
import WEB_ItemsResearch from '../../components/bj/web_items/WEB_ItemsResearch'


const ItemsRouter = () => {
  return (
    <Routes>
        <Route path='/read' element={<WEB_ItmesReadPage/>}/>
        <Route path='/research' element={<WEB_ItemsResearch/>}/>
    </Routes>
  )
}

export default ItemsRouter