import React from 'react'
import { Route, Routes } from 'react-router-dom'

import WEB_WorkspacePage from '../../components/bj/web_workspace/WEB_WorkspacePage'

const WorkspaceRouter = () => {
  return (
    <Routes>
        <Route path='/world' element={<WEB_WorkspacePage/>}/>
    </Routes>
  )
}

export default WorkspaceRouter