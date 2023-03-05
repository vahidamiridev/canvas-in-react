import './App.css'

import Whiteboard from './components/whiteboard/Whiteboard'
import ToolBar from './components/tool-bar/ToolBar'

function App() {
  return (
    <div className="container">
      <ToolBar />
      <Whiteboard />
    </div>
  )
}

export default App
