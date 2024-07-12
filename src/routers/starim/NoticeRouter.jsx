import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERPNoticeInsertPage from '../../components/starim/erp_notice/ERPNoticeInsertPage'
import ERPNoticeListPage from '../../components/starim/erp_notice/ERPNoticeListPage'
import ERPNoticeReadPage from '../../components/starim/erp_notice/ERPNoticeReadPage'
import ERPNoticeUpdatePage from '../../components/starim/erp_notice/ERPNoticeUpdatePage'


const NoticeRouter = () => {
  return (
    <Routes>
        <Route path='insert' element={<ERPNoticeInsertPage/>}/>
        <Route path='list' element={<ERPNoticeListPage/>}/>
        <Route path=':notice_id' element={<ERPNoticeReadPage/>}/>
        <Route path='update/:notice_id' element={<ERPNoticeUpdatePage/>}/>
       
    </Routes>
  )
}

export default NoticeRouter