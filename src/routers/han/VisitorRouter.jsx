import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../components/han/visitor/LoginPage';
import JoinPage from '../../components/han/visitor/JoinPage';
import MyPage from '../../components/han/visitor/MyPage';
import UpdatePage from '../../components/han/visitor/UpdatePage';

const VisitorRouter = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='insert' element={<JoinPage />} />
      <Route path='mypage' element={<MyPage/>}/>
      <Route path='update' element={<UpdatePage/>}/>
    </Routes>
  );
}

export default VisitorRouter;