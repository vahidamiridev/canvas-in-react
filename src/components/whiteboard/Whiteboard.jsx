import React from 'react'

import styles from './Whiteboard.module.css';

const Whiteboard = () => {
  const [prevMouseX , setPrevMouseX]  = React.useState()
  const [prevMouseY , setPrevMouseY]  = React.useState()
  const [snapshot , setSnapshot]  = React.useState()
  const [isDrawing , setIsDrawing]  = React.useState(true)
  const [brushWidth , setBrushWidth]  = React.useState(5)
  const [selectedTool , setSelectedTool]  = React.useState('brush')
  const [selectedColor , setُelectedColor]  = React.useState('#000')
  const [ restoreArrray,setRestoreArrray ]  = React.useState([])
  const [ indexOfRestoreArrray, setIndexOfRestoreArrray ]  = React.useState(-1)
  const [isHand, setIsHand ]  = React.useState()
  const [ sizeOfImage, setSizeOfImage ]  = React.useState({ width: 0, height: 0 })
  const [offsetX , setOffsetX ]  = React.useState()
  const [offsetY ,setOffsetY ]  = React.useState()
  const [canvasWidth , setCanvasWidth]  = React.useState()
  const [canvasHeight ,setCanvasHeight ]  = React.useState()
  const [isDragging ,setIsDragging ]  = React.useState(false)
  const [pictures ,setPictures ]  = React.useState([])


  const canvasRef = React.useRef()
  let ctx ;

  React.useEffect(()=>{
        setOffsetX(canvasRef.current.offsetLeft)
        setOffsetY(canvasRef.current.offsetTop)
        setCanvasWidth(canvasRef.current.offsetWidth)
        setCanvasHeight(canvasRef.current.offsetHeight)
        ctx = canvasRef.current.getContext('2d')
        //setting whole canvas background to white , so the downloaded img background will be white
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.fillStyle = selectedColor //setting fill style back to the selected Color ,it`ll be the brush color

  })

  return (
 
    <section className={styles.drawingBoard}>
        <canvas id="canvas" ref={canvasRef} ></canvas>
    </section>
  )
}

export default Whiteboard