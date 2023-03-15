import React from 'react'
import './App.css'
import WhiteboardOne from './components/whiteboard-one/WhiteboardOne'
import ToolBar from './components/tool-bar/ToolBar'
import Pagination from './components/pagination/Pagination'

function App() {
  const canvasRef = React.useRef(null)
  const contextRef = React.useRef(null)

  const bgCanvasRef = React.useRef(null)
  const inputImageRef = React.useRef(null)

  const fillColorRef = React.useRef(null)

  const [bgCanvas, setBgCanvas] = React.useState()
  const [bgCtx, setBgCtx] = React.useState()
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
  const [numberOfPage, setNumberOfPage] = React.useState(1)
  const [
    arrayOfCreatedElementsButton,
    setArrayOfCreatedElementsButton,
  ] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [sizeOfGrid, setSizeOfGrid] = React.useState(30)
  const [background, setBackground] = React.useState('#fff')

  const [isActiveShapes, setIsActiveShapes] = React.useState(false)
  const [isActiveColors, setIsActiveColors] = React.useState(false)
  const [isActiveBackground, setIsActiveBackground] = React.useState(false)
  const [isActiveMarker, setIsActiveMarker] = React.useState(false)
  const [isActiveEraser, setIsActiveEraser] = React.useState(false)

  const [isTouched, setIsTouched] = React.useState(false)

  React.useEffect(() => {
    const canvas = canvasRef.current
    setCanvas(canvas)
    const ctx = canvas.getContext('2d')
    setCtx(ctx)
    const bgCanvas = bgCanvasRef.current
    setBgCanvas(bgCanvas)
    const bgCtx = bgCanvas.getContext('2d')
    setBgCtx(bgCtx)
    const inputImage = inputImageRef.current
    setInputImage(inputImage)
    const fillColor = fillColorRef.current
    setOffsetX(canvas.offsetLeft)
    setOffsetY(canvas.offsetTop)
    const canvasWidth = canvas.offsetWidth
    setCanvasWidth(canvasWidth)
    const canvasHeight = canvas.offsetHeight
    setCanvasHeight(canvasHeight)
    bgCanvas.width = canvas.offsetWidth
    bgCanvas.height = canvas.offsetHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    // //setting whole canvas background to white , so the downloaded img background will be white
    // ctx.fillStyle = '#fff'
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = selectedColor //setting fill style back to the selected Color ,it`ll be the brush color
    ctx.lineCap = 'round'

    contextRef.current = ctx
  }, [])

  const getXYWhenTouched = (e) => {
    let rect = e.target.getBoundingClientRect()
    let x = e.targetTouches[0].pageX - rect.left
    let y = e.targetTouches[0].pageY - rect.top
    return {
      x,
      y,
    }
  }

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over'
  }
  const setToErase = () => {
    contextRef.current.globalCompositeOperation = 'destination-out'
  }

  const handleMouseOut = (e) => {
    // user has left the canvas, so clear the drag flag
    setIsDragging(false)
  }

  const startLeftClickOnCanvas = (e) => {

    setIsActiveShapes(false)
    setIsActiveColors(false)
    setIsActiveBackground(false)
    setIsActiveMarker(false)
    setIsActiveEraser(false)

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

  const startTouchOnCanvas = (e) => {
    const result = getXYWhenTouched(e)

    setIsActiveShapes(false)
    setIsActiveColors(false)
    setIsActiveBackground(false)
    setIsActiveMarker(false)
    setIsActiveEraser(false)

    if (isHand) {
      // set the drag flag
      setIsDragging(true)
    } else {
      setIsDrawing(true)
      setPrevMouseX(result.x) //passing current mouseX position as prevMouseX value
      setPrevMouseY(result.y) //passing current mouseY position as prevMouseY value
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
        prevMouseX - e.nativeEvent.offsetX,
        prevMouseY - e.nativeEvent.offsetY,
      )
    }
    ctx.fillRect(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
      prevMouseX - e.nativeEvent.offsetX,
      prevMouseY - e.nativeEvent.offsetY,
    )
  }
  const drawRectTouch = (e) => {
    const result = getXYWhenTouched(e)
    //if fillColor isn`t checked draw a react with border else draw react with background
    if (!fillColor) {
      //strockeRect(x-cordinate , y-cordinate , width , height) draw according to the mouse pointer
      return ctx.strokeRect(
        result.x,
        result.y,
        prevMouseX - result.x,
        prevMouseY - result.y,
      )
    }
    ctx.fillRect(
      result.x,
      result.y,
      prevMouseX - result.x,
      prevMouseY - result.y,
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
  const drawCircleTouch = (e) => {
    const result = getXYWhenTouched(e)
    ctx.beginPath() //creating new path to draw circle
    //getting radius for circle according  to the mouse pointer
    let radius = Math.sqrt(
      Math.pow(prevMouseX - result.x, 2) +
        Math.pow(prevMouseY - result.y, 2),
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
  const drawLineTouch = (e) => {
    const result = getXYWhenTouched(e)
    ctx.beginPath() //creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
    ctx.lineTo(result.x, result.y) //creating first line according to the mouse pointer
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
  const drawTriangleTouch = (e) => {
    const result = getXYWhenTouched(e)
    ctx.beginPath() //creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
    ctx.lineTo(result.x, result.y) //creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - result.x, result.y) //  creating bottom line of triangle
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

        // ctx.strokeStyle =
        // (selectedTool === 'eraser' && background==='#fff') ? '#fff' :
        // (selectedTool === 'eraser' && background==='#242222') ? '#242222' :
        // (selectedTool === 'eraser' && background==='#18381d') ? '#18381d' :
        //  selectedColor

        ctx.strokeStyle = selectedColor
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) // creating line according to the mouse pointer
        ctx.stroke() //drawing /filling line with color
      } else if (selectedTool === 'eraser') {
        // contextRef.current.globalCompositeOperation = 'destination-out'
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
  const movingTouchOnCanvas = (e) => {
const result = getXYWhenTouched(e)

    if (isHand && pictures.length) {
      let canMouseX = parseInt(e.targetTouches[0].clientX - offsetX)
      let canMouseY = parseInt(e.targetTouches[0].clientY - offsetY)
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

        // ctx.strokeStyle =
        // (selectedTool === 'eraser' && background==='#fff') ? '#fff' :
        // (selectedTool === 'eraser' && background==='#242222') ? '#242222' :
        // (selectedTool === 'eraser' && background==='#18381d') ? '#18381d' :
        //  selectedColor

        ctx.strokeStyle = selectedColor
        ctx.lineTo(result.x, result.y) // creating line according to the mouse pointer
        ctx.stroke() //drawing /filling line with color
      } else if (selectedTool === 'eraser') {
        // contextRef.current.globalCompositeOperation = 'destination-out'
      } else if (selectedTool === 'rectangle') {
        drawRectTouch(e)
      } else if (selectedTool === 'circle') {
        drawCircleTouch(e)
      } else if (selectedTool === 'line') {
        drawLineTouch(e)
      } else if (selectedTool === 'triangle') {
        drawTriangleTouch(e)
      } else if (selectedTool === 'marker') {
        ctx.strokeStyle = ctx.strokeStyle + 80
        ctx.lineWidth = 25
        ctx.lineTo(result.x, result.y) // creating line according to the mouse pointer
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
      //next get imageData ///////////////////////////192-196
      setIndexOfRestoreArrray(indexOfRestoreArrray + 1)
      const newRestoreArrray = [...restoreArrray]
      const newImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      newRestoreArrray.push(newImage)
      setRestoreArrray(newRestoreArrray)
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
    ctx.fillStyle = 'transparent'
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
    setToDraw()
    setIsLoading(true)
    // setPictures([])
    // ctx.clearRect(0, 0, 5000, 5000)
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
        // ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.drawImage(image, 0, 0, widthOfNewPicture, heightOfNewPicture)

        //next get imageData and commented 244 and 261///////////////////////////265-269
        setIndexOfRestoreArrray(indexOfRestoreArrray + 1)
        const newRestoreArrray = [...restoreArrray]
        const newImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
        newRestoreArrray.push(newImage)
        setRestoreArrray(newRestoreArrray)
      }
      setIsLoading(false)
    }
  }

  const changeBackgroundCanvas = (color) => {
    bgCanvas.style.backgroundColor = color
    setBackground(color)
  }

  const gridXFixing = (size) => {
    let num = +size
    bgCtx.clearRect(0, 0, 5000, 5000)
    bgCtx.lineWidth = 1

    bgCtx.strokeStyle = 'rgba(128, 128, 128, 0.281)'

    const rectangle = new Path2D()
    for (let i = 0; i < 1820; i += num) {
      rectangle.rect(0, i, 5000, num)
    }
    bgCtx.stroke(rectangle)
  }

  const gridYFixing = (size) => {
    let num = +size
    bgCtx.clearRect(0, 0, 5000, 5000)
    bgCtx.lineWidth = 1

    bgCtx.strokeStyle = 'rgba(128, 128, 128, 0.281)'
    const rectangle = new Path2D()
    for (let i = 0; i < 1820; i += num) {
      rectangle.rect(i, 0, num, 5000)
    }
    bgCtx.stroke(rectangle)
  }
  const gridXYFixing = (size) => {
    let num = +size
    bgCtx.clearRect(0, 0, 5000, 5000)
    bgCtx.lineWidth = 1
    bgCtx.strokeStyle = 'rgba(128, 128, 128, 0.281)'
    const rectangle = new Path2D()
    for (let i = 0; i < 1820; i += num) {
      rectangle.rect(0, i, 5000, num)
      rectangle.rect(i, 0, num, 5000)
    }
    bgCtx.stroke(rectangle)
  }

  const clearGrid = () => {
    bgCtx.clearRect(0, 0, canvasWidth, canvasHeight) // clearing whole canvas
  }

  const createElement = (numOfPage) => {
    if (numOfPage > 5) return
    const element = React.createElement(
      'div',
      {
        id: numOfPage,

        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid rgba(0, 0, 0, 0.356)',
          borderRadius: '100%',
          boxShadow: ' 0 0 10px 3px rgba(0, 0, 0, 0.479)',
          cursor: 'pointer',
          zIndex: '100',
          backgroundColor: '#fff',
        },
        onClick: (e) => {
          e.stopPropagation()
          console.log(e.target.id)
        },
      },
      numOfPage,
    )

    const elements = [...arrayOfCreatedElementsButton]
    elements.push({
      id: numOfPage,
      element: element,
    })
    setArrayOfCreatedElementsButton(elements)

    numOfPage += 1
    setNumberOfPage(numOfPage)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '0',
          left: '0',
          color: '#292664',
          width: '100%',
          height: '100vh',
          opacity: isLoading ? '0.9' : '0',
          backgroundColor: '#fff',
          // transform:'translateX(-50%) translateY(-50%)'
        }}
      >
        <span> ...لطفاً منتظر بمانید </span>
        <img src="./Spin-1s-200px.svg" width="50px" height="50px" />
      </div>
      <div className="container" style={{ opacity: !isLoading ? '1' : '0' }}>
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
          gridXYFixing={gridXYFixing}
          sizeOfGrid={sizeOfGrid}
          setSizeOfGrid={setSizeOfGrid}
          clearGrid={clearGrid}
          isActiveShapes={isActiveShapes}
          isActiveColors={isActiveColors}
          isActiveBackground={isActiveBackground}
          setIsActiveShapes={setIsActiveShapes}
          setIsActiveColors={setIsActiveColors}
          setIsActiveBackground={setIsActiveBackground}
          isActiveMarker={isActiveMarker}
          setIsActiveMarker={setIsActiveMarker}
          fillColorRef={fillColorRef}
          inputImageRef={inputImageRef}
          setToDraw={setToDraw}
          setToErase={setToErase}
          brushWidth={brushWidth}
          isActiveEraser={isActiveEraser}
          setIsActiveEraser={setIsActiveEraser}
        />

        <WhiteboardOne
          startLeftClickOnCanvas={startLeftClickOnCanvas}
          movingMouseOnCanvas={movingMouseOnCanvas}
          stopLeftClickOnCanvas={stopLeftClickOnCanvas}
          handleMouseOut={handleMouseOut}
          canvasRef={canvasRef}
          bgCanvasRef={bgCanvasRef}
          startTouchOnCanvas={startTouchOnCanvas}
          setIsTouched={setIsTouched}
          movingTouchOnCanvas = {movingTouchOnCanvas}
          
        />

        <Pagination
          numberOfPage={numberOfPage}
          setNumberOfPage={setNumberOfPage}
          createElement={createElement}
          arrayOfCreatedElementsButton={arrayOfCreatedElementsButton}
        />
      </div>
    </>
  )
}

export default App
