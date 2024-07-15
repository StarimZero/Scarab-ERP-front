import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_NewsDomesticPage from '../../components/bj/web_news/WEB_NewsDomesticPage'

const NewsRouter = () => {
  return (
    <Routes>
        <Route path='/domestic' element={<WEB_NewsDomesticPage/>}/>
    </Routes>
  )
}

export default NewsRouter