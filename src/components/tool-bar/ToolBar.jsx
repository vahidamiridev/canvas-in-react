import React from 'react'
import styles from './ToolBar.module.css'
import SubMenuShapes from '../sub-menu-shapes/SubMenuShapes'
import SubMenuColors from '../sub-menu-colors/SubMenuColors'
import SubMenuBackground from '../sub-menu-background/SubMenuBackground'
import SubMenuMarker from '../sub-menu-marker/SubMenuMarker'
import SubMenuEraser from '../sub-menu-eraser/SubMenuEraser'
import FirstPen from '../../ui/icons/FirstPen' 
import SecondPen from '../../ui/icons/SecondPen'
import ThirdPen from '../../ui/icons/ThirdPen'
import MarkerIcon from '../../ui/icons/MarkerIcon'

const ToolBar = (props) => {

 

  const { setSelectedTool,
       setSelectedColor,
       selectedColor,
       mainColorOne,
       mainColorTwo,
       mainColorThree,
       mainColorMarker,
       setMainColorOne,
       setMainColorTwo,
       setMainColorThree,
       saveImageHandler ,
       changeImageHandler ,
       setBrushWidth,
       undoLast,
       clearCanvasHandler,
       setIsHand,
       setFillColor,
       changeBackgroundCanvas,
       gridXFixing,
       gridYFixing,
       gridXYFixing,
       sizeOfGrid,
       setSizeOfGrid,
       clearGrid,
       isActiveShapes ,
      isActiveColors,
      isActiveBackground,
      isActiveMarker,
      setIsActiveMarker,
      setIsActiveShapes ,
      setIsActiveColors ,
      setIsActiveBackground,
      fillColorRef,
      inputImageRef,
      setToDraw,
      setToErase,
      brushWidth,
      isActiveEraser,
      setIsActiveEraser,
      allIndexOfimages,
      isActiveFirstPen ,
      isActiveSecondPen,
      isActiveThirdPen ,
      setIsActiveFirstPen,
      setIsActiveSecondPen,
      setIsActiveThirdPen,
      setMainColorMarker,
      setBrushWidthEraser,
      brushWidthEraser

     
       
      } = props
  return (
    <section className={styles.toolsBoard}>
    
       
     

      <div className={`${styles.row} ${styles.buttons}`} >

      <button style={{position:'relative'}} onClick={(e)=>{
       
        setToDraw()
        setSelectedTool('brush')
        // setMainColorOne()
        setIsActiveFirstPen(true)
        setIsActiveSecondPen(false)
        setIsActiveThirdPen(false)
        setIsActiveMarker(false)
      }}>
          {/* <img src="./icons/pen-black.svg" alt="" /> */}
          <FirstPen color={mainColorOne}/>
        {
          isActiveFirstPen?   <SubMenuColors
          setBrushWidth={setBrushWidth}
          brushWidth={brushWidth}
          setColor={setMainColorOne}
          // setActive = {setIsActiveFirstPen}
          setIsActiveColors = {setIsActiveColors}
          />:null
       
        }

        </button>
        <button style={{position:'relative'}} onClick={()=>{
             setToDraw()
          setSelectedTool('brush')
          // setSelectedColor('#6dd400')
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(true)
          setIsActiveThirdPen(false)
        setIsActiveMarker(false)

        }}>
          {/* <img src="./icons/pen-green.svg" alt="" /> */}
          <SecondPen color={mainColorTwo}/>
          {
          isActiveSecondPen?   <SubMenuColors
          setBrushWidth={setBrushWidth}
          brushWidth={brushWidth}
          setColor={setMainColorTwo}
          // setActive ={setIsActiveSecondPen}
          setIsActiveColors = {setIsActiveColors}
          />:null
       
        }
        </button> 
         <button style={{position:'relative'}} onClick={()=>{
             setToDraw()
          setSelectedTool('brush')
          // setSelectedColor('#e02020')
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(true)
        setIsActiveMarker(false)

         }}>
          {/* <img src="./icons/pen-red.svg" alt="" /> */}
          <ThirdPen color={mainColorThree}/>
          {
          isActiveThirdPen?   <SubMenuColors
          setBrushWidth={setBrushWidth}
          brushWidth={brushWidth}
          setColor={setMainColorThree}
          // setActive ={setIsActiveThirdPen}
          setIsActiveColors = {setIsActiveColors}
          />:null
       
        }
        </button>
         <button 
         style={{position:'relative'}}
         onClick={()=>{
          setToDraw()
          setSelectedTool('marker')
          // setSelectedColor('yellow')
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(true)
         }}>
          {/* <img src="./icons/highlighter.svg" alt="" /> */}
          <MarkerIcon color={mainColorMarker}/>

            {
              isActiveMarker?<SubMenuMarker
              setSelectedColor = {setSelectedColor }
              setBrushWidth = {setBrushWidth }
              setColor={setMainColorMarker}
              setIsActiveColors = {setIsActiveColors }
              />:null
            }

        </button>

         <button 
         style={{position:'relative'}}
         onClick={()=>{
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(true)
          setSelectedTool('eraser')
          // setSelectedTool('brush')
          setToErase()
          
         }}>
          <img src="./icons/clarity_eraser-solid.svg" alt="" />
          {
            isActiveEraser?
            <SubMenuEraser
            setBrushWidthEraser={setBrushWidthEraser}
            brushWidthEraser={brushWidthEraser}
            />:null

          
          } 

        </button>
         <button onClick={()=>{
             setToDraw()
          setIsActiveShapes(!isActiveShapes)
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(false)
          
          }} style={{ position:"relative"}}>
          <img src="./icons/shape.svg" alt="" />
         {
          isActiveShapes ?  <SubMenuShapes
          setFillColor={setFillColor}
          setSelectedTool={setSelectedTool}
          fillColorRef={fillColorRef}
          />:''
         }
        </button>
      







        <button onClick={()=>{
          undoLast()
          setIsActiveShapes(false)
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(false)
        }}>
          <img src="./icons/undo.svg" alt="" />
        </button>
        <button onClick={()=>{
          clearCanvasHandler()
          setIsActiveShapes(false)
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(false)
          }}>
          <img src="./icons/refresh.svg" alt="" />
        </button>

        <button onClick={(e)=>{
          setIsHand(true)
          setIsActiveShapes(false)
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(false)
          }}>
          <img src="./icons/hand.svg" alt="" />
        </button>
        <label htmlFor="inputImg"  className={styles.labelInput}>
          <img src="./icons/pic.svg" alt="" />
        </label>
        <input
        ref={inputImageRef}
          id="inputImg"
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(e)=>{
       
            changeImageHandler(e)
            setIsActiveShapes(false)
          setIsActiveFirstPen(false)
          setIsActiveSecondPen(false)
          setIsActiveThirdPen(false)
          setIsActiveMarker(false)
          setIsActiveEraser(false)
          
          }}
        />
             <button 
             style={{ position:"relative"}}
             onClick={()=>{
              setIsActiveBackground(!isActiveBackground)
              setIsActiveShapes(false)
              setIsActiveFirstPen(false)
              setIsActiveSecondPen(false)
              setIsActiveThirdPen(false)
              setIsActiveMarker(false)
              setIsActiveEraser(false)
            }}
             
             >
          <img src="./icons/screen.svg" alt="" />
         {
          isActiveBackground ?  <SubMenuBackground
          changeBackgroundCanvas={changeBackgroundCanvas}
          gridXFixing={gridXFixing}
          gridYFixing={gridYFixing}
          gridXYFixing={gridXYFixing}
          sizeOfGrid ={sizeOfGrid}
          setSizeOfGrid ={setSizeOfGrid}
          clearGrid={clearGrid}
          />:null
         }
        </button>


        <button onClick={saveImageHandler}>
          <img src="./icons/download.svg" alt="" />

        </button>


        {/* <button onClick={()=>{
          console.log(allIndexOfimages)
        }}>
         Go
        </button> */}
      
      
      </div>
    </section>
  )
}

export default ToolBar
