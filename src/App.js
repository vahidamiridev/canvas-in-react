import './App.css'
import Whiteboard from './components/whiteboard/Whiteboard'

import WhiteboardTwo from './components/whiteboard-two/WhiteboardTwo'
import ToolBar from './components/tool-bar/ToolBar'
import React from 'react'

function App() {


  

















  const content = {
    page1 : <Whiteboard/>,
    page2: <WhiteboardTwo/>
  }

  return (
    <div className="container">
      <ToolBar />
      {content.page1}
    </div>
  )
}

export default App
