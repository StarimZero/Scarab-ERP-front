import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_CompanyViewPage from '../../components/bj/web_company/WEB_CompanyViewPage'
import WEB_CompanyHistoryPage from '../../components/bj/web_company/WEB_CompanyHistoryPage'
import WEB_CompanyCEO from '../../components/bj/web_company/WEB_CompanyCEO'

const CompanyRouter = () => {
  return (
    <Routes>
        <Route path='/view' element={<WEB_CompanyViewPage/>}/>
        <Route path='/history' element={<WEB_CompanyHistoryPage/>}/>
        <Route path='/ceo' element={<WEB_CompanyCEO/>}/>
    </Routes>
  )
}

export default CompanyRouter
