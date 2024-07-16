import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_EmpolyProcedure from '../../components/bj/web_empoly/WEB_EmpolyProcedure'

const EmployRouter = () => {
  return (
    <Routes>
        <Route path='procedure' element={<WEB_EmpolyProcedure/>}/>
    </Routes>
  )
}

export default EmployRouter