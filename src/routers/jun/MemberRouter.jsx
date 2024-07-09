import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Member_LoginPage from '../../components/jun/erp_member/ERP_Member_LoginPage'
import ERP_Member_JoinPage from '../../components/jun/erp_member/ERP_Member_JoinPage'
import ERP_Member_RegisterPage from '../../components/jun/erp_member/ERP_Member_RegisterPage'

const MemberRouter = () => {
    return (
        <Routes>
            <Route path='login' element={<ERP_Member_LoginPage/>}/>
            <Route path='register' element={<ERP_Member_RegisterPage/>}/>
            <Route path='join' element={<ERP_Member_JoinPage/>}/>
        </Routes>
    )
}

export default MemberRouter