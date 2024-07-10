import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_MessagePage from '../../components/bj/erp_message/ERP_MessagePage'
import ERP_ReceiveMessagePage from '../../components/bj/erp_message/ERP_ReceiveMessagePage'
import ERP_SendMessagePage from '../../components/bj/erp_message/ERP_SendMessagePage'
import ERP_insertMessagePage from '../../components/bj/erp_message/ERP_insertMessagePage'
import ERP_DeleteMessagePage from '../../components/bj/erp_message/ERP_DeleteMessagePage'


const MessageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<ERP_MessagePage/>}/>
        <Route path='/send' element={<ERP_SendMessagePage/>}/>
        <Route path='/receive' element={<ERP_ReceiveMessagePage/>}/>
        <Route path='/insert' element={<ERP_insertMessagePage/>}/>
        <Route path='/delete' element={<ERP_DeleteMessagePage/>}/>
    </Routes>   
  )
}

export default MessageRouter