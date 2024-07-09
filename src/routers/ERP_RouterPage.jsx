import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_HomePage from '../erp_common/ERP_HomePage'
import '../common/assets/erp/css/styles.min.css';
import ERP_SideMenu from '../erp_common/ERP_SideMenu';
import ERP_TopMenu from '../erp_common/ERP_TopMenu';
import AttendancePage from '../components/jun/AttendancePage';
import SalesRouter from './starim/SalesRouter';
import ItemsRouter from './starim/ItemsRouter';
import WareHouseRouter from './starim/WareHouseRouter';
import ClientRouter from './starim/ClientRouter';
import MessageRouter from './bj/MessageRouter';


const ERP_RouterPage = () => {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <ERP_SideMenu />
            <div className="body-wrapper">
                <ERP_TopMenu />
                <div className="container-fluid">
                    <Routes>
                        <Route path='' element={<ERP_HomePage />} />
                        <Route path='member/attendance' element={<AttendancePage />} />
                        <Route path='/sales/*' element={<SalesRouter/>}/>
                        <Route path='/items/*' element={<ItemsRouter/>}/>
                        <Route path='/client/*' element={<ClientRouter/>}/>
                        <Route path='/warehouse/*' element={<WareHouseRouter/>}/>
                        <Route path='/message/*' element={<MessageRouter/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ERP_RouterPage