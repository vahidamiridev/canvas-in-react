import './App.css'
import Whiteboard from './components/whiteboard/Whiteboard'
import WhiteboardTwo from './components/whiteboard-two/WhiteboardTwo'
import ToolBar from './components/tool-bar/ToolBar'
import React from 'react'
import Pagination from './components/pagination/Pagination'
import { Routes, useNavigate , Route } from 'react-router-dom'

function App() {
  const [canvas, setCanvas] = React.useState()
  const [ctx, setCtx] = React.useState()
  const [prevMouseX, setPrevMouseX] = React.useState()
  const [prevMouseY, setPrevMouseY] = React.useState()
  const [snapshot, setSnapshot] = React.useState()
  const [isDrawing, setIsDrawing] = React.useState(false)
  const [brushWidth, setBrushWidth] = React.useState(5)
  const [selectedTool, setSelectedTool] = React.useState('brush')
  const [selectedColor, setSelectedColor] = React.useState('#000')
  const [restoreArrray, setRestoreArrray] = React.useState([])
  const [indexOfRestoreArrray, setIndexOfRestoreArrray] = React.useState(-1)
  const [isHand, setIsHand] = React.useState(false)
  const [sizeOfImage, setSizeOfImage] = React.useState({ width: 0, height: 0 })
  const [offsetX, setOffsetX] = React.useState()
  const [offsetY, setOffsetY] = React.useState()
  const [canvasWidth, setCanvasWidth] = React.useState()
  const [canvasHeight, setCanvasHeight] = React.useState()
  const [isDragging, setIsDragging] = React.useState(false)
  const [pictures, setPictures] = React.useState([])
  const [fillColor, setFillColor] = React.useState(false)
  const [inputImage, setInputImage] = React.useState()
  const [numberOfPage , setNumberOfPage] = React.useState(1)
  const [arrayOfCreatedElementsButton , setArrayOfCreatedElementsButton] = React.useState([])

  const navigate = useNavigate()


  React.useEffect(() => {
    const canvas = document.getElementById(`canvas`)
    setCanvas(canvas)
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
    const inputImage = document.getElementById('inputImg')
    setInputImage(inputImage)
    const fillColor = document.getElementById('fillColor')
    // const isChecked = fillColor.checked
    // setFillColor(isChecked)
    setOffsetX(canvas.offsetLeft)
    setOffsetY(canvas.offsetTop)
    const canvasWidth = canvas.offsetWidth
    setCanvasWidth(canvasWidth)
    const canvasHeight = canvas.offsetHeight 
    setCanvasHeight(canvasHeight)
    canvas.width = canvasWidth
    canvas.height =  canvasHeight
    // //setting whole canvas background to white , so the downloaded img background will be white
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = selectedColor //setting fill style back to the selected Color ,it`ll be the brush color
  },[])


 

  const handleMouseOut = (e) => {
    // user has left the canvas, so clear the drag flag
    setIsDragging(false)
  }

  const startLeftClickOnCanvas =   (e) => {
    if (isHand) {
      // set the drag flag
      setIsDragging(true)
    } else {
      setIsDrawing(true)
       setPrevMouseX(e.nativeEvent.offsetX) //passing current mouseX position as prevMouseX value
       setPrevMouseY(e.nativeEvent.offsetY) //passing current mouseY position as prevMouseY value
      ctx.beginPath() // creating new path to drow
      ctx.lineWidth = brushWidth //passing brush size as line width
      ctx.strokeStyle = selectedColor //passing selectedColor as strok style
      ctx.fillStyle = selectedColor // passing selectedColor as fill style
      //coping canvas data & passing as snapshot value .. this avoids draging the image
      const snapshot = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      setSnapshot(snapshot)


    }
  }

  const drawRect = (e) => {
    //if fillColor isn`t checked draw a react with border else draw react with background
    if (!fillColor) {
      //strockeRect(x-cordinate , y-cordinate , width , height) draw according to the mouse pointer
      return ctx.strokeRect(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        prevMouseX - (e.nativeEvent.offsetX),
        prevMouseY - (e.nativeEvent.offsetY),
      )
    }
       ctx.fillRect(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        prevMouseX - e.nativeEvent.offsetX,
        prevMouseY - e.nativeEvent.offsetY,
      )

    
  }

  const drawCircle = (e) => {
    ctx.beginPath() //creating new path to draw circle
    //getting radius for circle according  to the mouse pointer
    let radius = Math.sqrt(
      Math.pow(prevMouseX - e.nativeEvent.offsetX, 2) +
        Math.pow(prevMouseY - e.nativeEvent.offsetY, 2),
    )
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI) //creating circle according to the mouse pointer
    fillColor ? ctx.fill() : ctx.stroke() //if fillColor is checked fill circle else draw border circle
  }

  const drawLine = (e) => {
    ctx.beginPath() //creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //creating first line according to the mouse pointer
    ctx.stroke()
  }
  const drawTriangle = (e) => {
    ctx.beginPath() //creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.nativeEvent.offsetX, e.nativeEvent.offsetY) //  creating bottom line of triangle
    ctx.closePath() // clothing path of a triangle so the third line draw automatically
    fillColor ? ctx.fill() : ctx.stroke() //if fillColor is checked fill triangle else draw border
  }

  const movingMouseOnCanvas = (e) => {
    if (isHand && pictures.length) {
      let canMouseX = parseInt(e.clientX - offsetX)
      let canMouseY = parseInt(e.clientY - offsetY)
      // if the drag flag is set, clear the canvas and draw the image
      if (isDragging) {
        ctx.clearRect(0, 0, 5000, 5000)
        ctx.drawImage(
          pictures[0],
          canMouseX - 128 / 2,
          canMouseY - 120 / 2,
          sizeOfImage.width,
          sizeOfImage.height,
        )
      }
    } else {

      if (!isDrawing) return //if isDrawing is false return from here
      ctx.putImageData(snapshot, 0, 0) //adding copied canvas data on ro this canvas

      if (selectedTool === 'brush' || selectedTool === 'eraser') {
        //if selected tool is eraser then set stroleStyle to white

        ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor
        if (selectedTool === 'eraser') {
          setTimeout(() => {
            ctx.lineWidth = 100
          }, 3000)
        }
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) // creating line according to the mouse pointer
        ctx.stroke() //drawing /filling line with color
      } else if (selectedTool === 'rectangle') {
        drawRect(e)
      } else if (selectedTool === 'circle') {
        drawCircle(e)
      } else if (selectedTool === 'line') {
        drawLine(e)
      } else if (selectedTool === 'triangle') {
        drawTriangle(e)
      } else if (selectedTool === 'marker') {
        ctx.strokeStyle = ctx.strokeStyle + 80
        ctx.lineWidth = 25
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) // creating line according to the mouse pointer
        ctx.stroke() //drawing /filling line with color
      } else {
        console.log('Do Not select tools')
      }
    }
  }

  const stopLeftClickOnCanvas = (e) => {
    if (isHand) {
      // clear the drag flag
      setIsDragging(false)
      setIsHand(false)
    } else {
      setIsDrawing(false)
      setIndexOfRestoreArrray(indexOfRestoreArrray + 1)
      const newRestoreArrray = [...restoreArrray]
      const newImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      newRestoreArrray.push(newImage)
      setRestoreArrray(newRestoreArrray)
    }
  }

  const clearCanvasHandler = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight) // clearing whole canvas
    //setting whole canvas background to white , so the downloaded img background will be white
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = selectedColor //setting fill style back to the selected Color ,it`ll be the brush color
    setRestoreArrray([])
    setIndexOfRestoreArrray(-1)
    setPictures([])
  }

  const undoLast = () => {
    if (indexOfRestoreArrray <= 0) {
      clearCanvasHandler()
      setPictures([])
    } else {
      let newIndexOfRestoreArrray = indexOfRestoreArrray
      newIndexOfRestoreArrray -= 1
      let newRestoreArrray = [...restoreArrray]
      newRestoreArrray.pop()
      setRestoreArrray(newRestoreArrray)
      setIndexOfRestoreArrray(newIndexOfRestoreArrray) 
      ctx.putImageData(newRestoreArrray[newIndexOfRestoreArrray], 0, 0)
    }
  }

  const saveImageHandler = () => {
    const link = document.createElement('a') //creating <a> element
    link.download = `${Date.now()}.jpg` //passing current date as link href value
    link.href = canvas.toDataURL() //passing canvasDate as link download value
    link.click() //clicking link to download image
  }


  const changeImageHandler = (e) => {
    setPictures([])
    ctx.clearRect(0, 0, 5000, 5000)
    const reader = new FileReader()
    reader.readAsDataURL(inputImage.files[0])
    reader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result
      const newPictures = [...pictures]
      newPictures.push(image)
      setPictures(newPictures)
      image.onload = () => {
        const { height, width } = image
        const widthOfNewPicture = width > 600 ? 300 : width
        const heightOfNewPicture = height > 600 ? 300 : height
        setSizeOfImage({
          width: widthOfNewPicture,
          height: heightOfNewPicture,
        })
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.drawImage(image, 0, 0, widthOfNewPicture, heightOfNewPicture)
      }
    }
  }

  const changeBackgroundCanvas = (color)=>{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }


  const gridXFixing = ()=>{
    ctx.reset()
      const rectangle = new Path2D();
      for(let i =0 ; i<1820 ;i +=50){
        rectangle.rect(0, i, 5000, 50);
      }
      ctx.stroke(rectangle);
    
}


  const gridYFixing = ()=>{
    ctx.reset()
      const rectangle = new Path2D();
      for(let i =0 ; i<1820 ;i +=50){
        rectangle.rect(i, 0, 50, 5000);
      }
      ctx.stroke(rectangle);
    
}
  const gridXYFixing = ()=>{
    ctx.reset()
      const rectangle = new Path2D();
      for(let i =0 ; i<1820 ;i +=50){
        rectangle.rect(0, i, 5000, 50);
        rectangle.rect(i, 0, 50, 5000);
      }
      ctx.stroke(rectangle);
}


const createElement = (numberOfpage)=>{
  if(numberOfPage>10)return
     const element =  React.createElement(
        'div',
        {
          id:numberOfpage,
          
          style:{
             width:'100%' ,
             height:"100%" ,
             display:'flex' ,
             justifyContent:'center' ,
             alignItems:'center' , 
             border:"1px solid rgba(0, 0, 0, 0.356)" ,
             borderRadius:'100%',
             boxShadow:' 0 0 10px 3px rgba(0, 0, 0, 0.479)',
             cursor:'pointer'

            } ,
            onClick:()=>{navigate(`/canvas${numberOfPage}`)}

        },
        numberOfPage
      )

      const elements = [...arrayOfCreatedElementsButton]
      elements.push({
        id:numberOfPage,
        element:element
      })
      setArrayOfCreatedElementsButton(elements)



}


 

  return (
    <div className="container">
      <ToolBar
        setSelectedTool={setSelectedTool}
        setSelectedColor={setSelectedColor}
        saveImageHandler={saveImageHandler}
        changeImageHandler={changeImageHandler}
        setBrushWidth={setBrushWidth}
        clearCanvasHandler={clearCanvasHandler}
        undoLast={undoLast}
        setIsHand={setIsHand}
        setFillColor={setFillColor}
        changeBackgroundCanvas={changeBackgroundCanvas}
        gridXFixing={gridXFixing}
        gridYFixing={gridYFixing}
        gridXYFixing= {gridXYFixing}

      />
      {/* <Routes>
        <Route path='/' element={<Whiteboard 
             startLeftClickOnCanvas={startLeftClickOnCanvas}
             movingMouseOnCanvas={movingMouseOnCanvas}
             stopLeftClickOnCanvas={stopLeftClickOnCanvas}
             handleMouseOut={handleMouseOut}
        />}/>
        <Route path='/canvas:id' element={<Whiteboard 
             startLeftClickOnCanvas={startLeftClickOnCanvas}
             movingMouseOnCanvas={movingMouseOnCanvas}
             stopLeftClickOnCanvas={stopLeftClickOnCanvas}
             handleMouseOut={handleMouseOut}
        />}/>

        
      </Routes> */}
        <Whiteboard
        startLeftClickOnCanvas={startLeftClickOnCanvas}
        movingMouseOnCanvas={movingMouseOnCanvas}
        stopLeftClickOnCanvas={stopLeftClickOnCanvas}
        handleMouseOut={handleMouseOut}
      />
      <Pagination
        numberOfPage ={numberOfPage}
        setNumberOfPage ={setNumberOfPage}
        createElement={createElement}
        arrayOfCreatedElementsButton={arrayOfCreatedElementsButton}
        setArrayOfCreatedElementsButton={setArrayOfCreatedElementsButton}
      />
    </div>
  )
}

export default App
