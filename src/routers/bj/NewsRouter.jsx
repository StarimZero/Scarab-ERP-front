import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_NewsDomesticPage from '../../components/bj/web_news/WEB_NewsDomesticPage'
import WEB_NewsOverseasPage from '../../components/bj/web_news/WEB_NewsOverseasPage'

const NewsRouter = () => {
  return (
    <Routes>
        <Route path='/domestic' element={<WEB_NewsDomesticPage/>}/>
        <Route path='/overseas' element={<WEB_NewsOverseasPage/>}/>
    </Routes>
  )
}

export default NewsRouter