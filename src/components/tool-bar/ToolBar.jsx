import React from 'react'
import styles from './ToolBar.module.css'
import SubMenuShapes from '../sub-menu-shapes/SubMenuShapes'
import SubMenuColors from '../sub-menu-colors/SubMenuColors'
import SubMenuBackground from '../sub-menu-background/SubMenuBackground'
import SubMenuMarker from '../sub-menu-marker/SubMenuMarker'
import SubMenuEraser from '../sub-menu-eraser/SubMenuEraser'

const ToolBar = (props) => {

 

  const { setSelectedTool,
       setSelectedColor,
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
      setIsActiveEraser
     
       
      } = props
  return (
    <section className={styles.toolsBoard}>
    
       
     

      <div className={`${styles.row} ${styles.buttons}`} >

      <button style={{position:'relative'}} onClick={(e)=>{
       
        setToDraw()
        setSelectedTool('brush')
        setSelectedColor('black')
        setIsActiveColors(!isActiveColors)
       

      }}>
          <img src="./icons/pen-black.svg" alt="" />
        {
          isActiveColors?   <SubMenuColors
          setBrushWidth={setBrushWidth}
          setSelectedColor={setSelectedColor}
          setIsActiveColors = {setIsActiveColors}
          />:null
       
        }

        </button>
        <button onClick={()=>{
             setToDraw()
          setSelectedTool('brush')
          setSelectedColor('#6dd400')
        }}>
          <img src="./icons/pen-green.svg" alt="" />
        </button> 
         <button onClick={()=>{
             setToDraw()
          setSelectedTool('brush')
          setSelectedColor('#e02020')
         }}>
          <img src="./icons/pen-red.svg" alt="" />
        </button>
         <button 
         style={{position:'relative'}}
         onClick={()=>{
          setToDraw()
          setSelectedTool('marker')
          setSelectedColor('yellow')
          setIsActiveMarker(true)
         }}>
          <img src="./icons/highlighter.svg" alt="" />

            {
              isActiveMarker?<SubMenuMarker
              setSelectedColor = {setSelectedColor }
              setBrushWidth = {setBrushWidth }
              setIsActiveColors = {setIsActiveColors }
              />:null
            }

        </button>

         <button 
         style={{position:'relative'}}
         onClick={()=>{
          setIsActiveEraser(!isActiveEraser)
          // setSelectedTool('eraser')
          setBrushWidth(15)
          setSelectedTool('brush')
          setToErase()
          
         }}>
          <img src="./icons/clarity_eraser-solid.svg" alt="" />
          {
            isActiveEraser?
            <SubMenuEraser
            setBrushWidth={setBrushWidth}
            />:null

          
          } 

        </button>
         <button onClick={()=>{
             setToDraw()
          setIsActiveShapes(!isActiveShapes)
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
      







        <button onClick={undoLast}>
          <img src="./icons/undo.svg" alt="" />
        </button>
        <button onClick={clearCanvasHandler}>
          <img src="./icons/refresh.svg" alt="" />
        </button>

        <button onClick={(e)=>setIsHand(true)}>
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
          
          }}
        />
             <button 
             style={{ position:"relative"}}
             onClick={()=>{setIsActiveBackground(!isActiveBackground)}}
             
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
      
      
      </div>
    </section>
  )
}

export default ToolBar
