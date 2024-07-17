import React from 'react'
import ERP_Transaction_ListPage from '../../components/jun/erp_transaction/ERP_Transaction_ListPage'
import { Route, Routes } from 'react-router-dom'

const TransactionRouter = () => {
    return (
        <Routes>
            <Route path='list' element={<ERP_Transaction_ListPage />} />
        </Routes>
    )
}

export default TransactionRouter