import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Web_HomePage from '../web_common/Web_HomePage';
import CustomerRouterPage from './jay/CustomerRouterPage';
import Web_Menu from '../web_common/Web_Menu';
import '../common/assets/web/css/web.css';
import VisitorRouter from './han/VisitorRouter';
import ItemsRouter from './bj/ItemsRouter';
import CompanyRouter from './bj/CompanyRouter';
import Web_bottomPage from '../web_common/Web_bottomPage';
import EmployRouter from './bj/EmployRouter';
import NewsRouter from './bj/NewsRouter';
import WorkspaceRouter from './bj/WorkspaceRouter';

const Web_RouterPage = () => {
  return (
    <>
      <Web_Menu />
      
      <Routes>
        <Route path='/' element={<Web_HomePage />} />
        <Route path='/customer/*' element={<CustomerRouterPage />} />
        <Route path='/visitor/*' element={<VisitorRouter />} />
        <Route path='/items/*' element={<ItemsRouter/>}/>
        <Route path='/company/*' element={<CompanyRouter/>}/>
        <Route path='/employ/*' element={<EmployRouter/>}/>
        <Route path='/news/*' element={<NewsRouter/>}/>
        <Route path='/workspace/*' element={<WorkspaceRouter/>}/>
      </Routes>
      <Web_bottomPage/>
 
     
    </>
  );
}

export default Web_RouterPage;