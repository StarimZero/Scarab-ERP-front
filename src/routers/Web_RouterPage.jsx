import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Web_HomePage from '../web_common/Web_HomePage'
import CustomerRouterPage from './jay/CustomerRouterPage'
import Web_Menu from '../web_common/Web_Menu'
import '../common/assets/web/css/web.css'



const Web_RouterPage = () => {
  return (
    <>
      <Web_Menu/>
      
      <Routes>
          <Route path='/' element={<Web_HomePage/>}/>
          <Route path='/customer/*' element={<CustomerRouterPage/>}/>
      </Routes>

    
     
    </>
  );
}

export default Web_RouterPage