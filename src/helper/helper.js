const canvas = document.querySelector('#canvas'),
      toolBtn = document.querySelectorAll('.tool'),
      fillColor = document.querySelector('#fillColor'),
      sizeSlider = document.querySelector('#sizeSlider'),
      colorBtns = document.querySelectorAll('.colors .option'),
      colorPicker = document.querySelector('#colorPicker'),
      clearCanvas = document.querySelector('.clearCanvas'),
      saveImg = document.querySelector('.saveImg'),
      undoBtn = document.querySelector('.undo'),
      moveItem = document.querySelector('.moveItem'),
      inputImage = document.getElementById('inputImg'),
      ctx = canvas.getContext('2d')



let prevMouseX,
    prevMouseY,
    snapshot,
    isDrawing = false,
    brushWidth = 5,
    selectedTool = 'brush',
    selectedColor = '#000',
    restore_arrray = [],
    index = -1,
    isHand = false

let sizeOfImage = { width: 0, height: 0 }
let offsetX = canvas.offsetLeft
let offsetY = canvas.offsetTop
let canvasWidth = canvas.width
let canvasHeight = canvas.height
let isDragging = false
let pictures = []



window.addEventListener('load', () => {
  //setting canvas width/height ..offsetwidth /height returns viewable width/height of an element
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  setCanvasBackground()
})
function setCanvasBackground() {
  //setting whole canvas background to white , so the downloaded img background will be white
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = selectedColor //setting fill style back to the selected Color ,it`ll be the brush color
}


function handleMouseOut(e) {
  let canMouseX = parseInt(e.clientX - offsetX)
  let canMouseY = parseInt(e.clientY - offsetY)
  // user has left the canvas, so clear the drag flag
  //isDragging=false;
}

const drawRect = (e) => {
  //if fillColor isn`t checked draw a react with border else draw react with background
  if (!fillColor.checked) {
    //strockeRect(x-cordinate , y-cordinate , width , height) draw according to the mouse pointer
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY,
    )
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY,
  )
}

const drawCircle = (e) => {
  ctx.beginPath() //creating new path to draw circle
  //getting radius for circle according  to the mouse pointer
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2),
  )
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI) //creating circle according to the mouse pointer
  fillColor.checked ? ctx.fill() : ctx.stroke() //if fillColor is checked fill circle else draw border circle
}

const drawLine = (e) => {
  ctx.beginPath() //creating new path to draw circle
  ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY) //creating first line according to the mouse pointer
  ctx.stroke()
}
const drawTriangle = (e) => {
  ctx.beginPath() //creating new path to draw circle
  ctx.moveTo(prevMouseX, prevMouseY) //moving triangle to the mouse pointer
  ctx.lineTo(e.offsetX, e.offsetY) //creating first line according to the mouse pointer
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY) //  creating bottom line of triangle
  ctx.closePath() // clothing path of a triangle so the third line draw automatically
  fillColor.checked ? ctx.fill() : ctx.stroke() //if fillColor is checked fill triangle else draw border
}

const startLeftClickOnCanvas = (e) => {
  if (isHand) {
    let canMouseX = parseInt(e.clientX - offsetX)
    let canMouseY = parseInt(e.clientY - offsetY)
    // set the drag flag
    isDragging = true
  } else {
    isDrawing = true
    prevMouseX = e.offsetX //passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY //passing current mouseY position as prevMouseY value
    ctx.beginPath() // creating new path to drow
    ctx.lineWidth = brushWidth //passing brush size as line width
    ctx.strokeStyle = selectedColor //passing selectedColor as strok style
    ctx.fillStyle = selectedColor // passing selectedColor as fill style
    //coping canvas data & passing as snapshot value .. this avoids draging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
  }
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
        }, 2000)
      }
      ctx.lineTo(e.offsetX, e.offsetY) // creating line according to the mouse pointer
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
      ctx.lineTo(e.offsetX, e.offsetY) // creating line according to the mouse pointer
      ctx.stroke() //drawing /filling line with color
    } else {
      console.log('Do Not select tools')
    }
  }
}

const stopLeftClickOnCanvas = (e) => {
  if (isHand) {
    let canMouseX = parseInt(e.clientX - offsetX)
    let canMouseY = parseInt(e.clientY - offsetY)
    // clear the drag flag
    isDragging = false
    isHand = false
  } else {
    isDrawing = false
    restore_arrray.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
    index += 1
    // console.log(restore_arrray)
  }
}

const undoLast = () => {
  if (index < 0) {
    clearCanvasHandler()
    pictures = []
  } else {
    index -= 1
    restore_arrray.pop()
    ctx.putImageData(restore_arrray[index], 0, 0)
  }
}

const clearCanvasHandler = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height) // clearing whole canvas
  setCanvasBackground()
  restore_arrray = []
  index = -1
  pictures = []
}




toolBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    //adding click event to all tool option
    // removing active class from the previous and adding on current clicked option
    document.querySelector('.options .active ').classList.remove('active')
    btn.classList.add('active')
    selectedTool = btn.id
  })
})

colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // removing active class from the previous and adding on current clicked option
    document.querySelector('.options .selected ').classList.remove('selected')
    btn.classList.add('selected')
    //passing selected btn background color as selected color value
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue('background-color')
  })
})


colorPicker.addEventListener('change', () => {
  //passing picked color value from color picker to last color btn background
  colorPicker.parentElement.style.background = colorPicker.value
  colorPicker.parentElement.click()
})

saveImg.addEventListener('click', () => {
  const link = document.createElement('a') //creating <a> element
  link.download = `${Date.now()}.jpg` //passing current date as link href value
  link.href = canvas.toDataURL() //passing canvasDate as link download value
  link.click() //clicking link to download image
})

inputImage.addEventListener('change', async(e) => {
 
  pictures = []
  ctx.clearRect(0, 0, 5000, 5000)
  const reader = new FileReader()
  reader.readAsDataURL(inputImage.files[0])
  reader.onload = (e) => {
  const image = new Image()
 image.src = e.target.result
 pictures.push(image) 
 pictures[0].onload = () => {
 const { height, width } = pictures[0]
 sizeOfImage.width = (width > 600) ? 500 : width;
 sizeOfImage.height =  (height > 600) ? 500 : height;
 ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.drawImage(image, 0, 0 , sizeOfImage.width , sizeOfImage.height)



 }}
})

sizeSlider.addEventListener('change', () => (brushWidth = sizeSlider.value)) //passing slider valu az brushsize
clearCanvas.addEventListener('click', clearCanvasHandler)
moveItem.addEventListener('click', () => (isHand = true))
undoBtn.addEventListener('click', undoLast)
canvas.addEventListener('mousedown', startLeftClickOnCanvas)
canvas.addEventListener('mousemove', movingMouseOnCanvas)
canvas.addEventListener('mouseup', stopLeftClickOnCanvas)
canvas.addEventListener('mouseout', handleMouseOut)

