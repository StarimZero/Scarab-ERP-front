import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Member_LoginPage from '../../components/jun/erp_member/ERP_Member_LoginPage'
import ERP_Member_JoinPage from '../../components/jun/erp_member/ERP_Member_JoinPage'
import ERP_Member_RegisterPage from '../../components/jun/erp_member/ERP_Member_RegisterPage'
import ERP_Member_MyPage from '../../components/jun/erp_member/ERP_Member_MyPage'
import ERP_Member_UpdateInfoPage from '../../components/jun/erp_member/ERP_Member_UpdateInfoPage'

const MemberRouter = () => {
    return (
        <Routes>
            <Route path='login' element={<ERP_Member_LoginPage/>}/>
            <Route path='register' element={<ERP_Member_RegisterPage/>}/>
            <Route path='join' element={<ERP_Member_JoinPage/>}/>
            <Route path='mypage' element={<ERP_Member_MyPage/>}/>
            <Route path='updateInfo' element={<ERP_Member_UpdateInfoPage/>}/>
        </Routes>
    )
}

export default MemberRouter