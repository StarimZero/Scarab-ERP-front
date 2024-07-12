import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_CompanyViewPage from '../../components/bj/web_company/WEB_CompanyViewPage'

const CompanyRouter = () => {
  return (
    <Routes>
        <Route path='/view' element={<WEB_CompanyViewPage/>}/>
    </Routes>
  )
}

export default CompanyRouter
