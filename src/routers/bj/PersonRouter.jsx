import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_OrganizationPage from '../../components/bj/web_person/WEB_OrganizationPage'

const PersonRouter = () => {
  return (
    <Routes>
        <Route path='/organization' element={<WEB_OrganizationPage/>}/>
    </Routes>
  )
}

export default PersonRouter