import React from 'react'
import styles from './ToolBar.module.css'
import SubMenuShapes from '../sub-menu-shapes/SubMenuShapes'
import SubMenuColors from '../sub-menu-colors/SubMenuColors'
import SubMenuBackground from '../sub-menu-background/SubMenuBackground'

const ToolBar = (props) => {

  const [isActiveShapes , setIsActiveShapes ] = React.useState(false) 
  const [isActiveColors , setIsActiveColors ] = React.useState(false) 
  const [isActiveBackground , setIsActiveBackground ] = React.useState(false) 

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
     
       
      } = props
  return (
    <section className={styles.toolsBoard}>
    
       
     

      <div className={`${styles.row} ${styles.buttons}`} >

      <button style={{position:'relative'}} onClick={()=>{
        setSelectedTool('brush')
        setSelectedColor('black')
        setIsActiveColors(!isActiveColors)
       

      }}>
          <img src="./icons/pen-black.svg" alt="" />
        {
          isActiveColors?   <SubMenuColors
          setBrushWidth={setBrushWidth}
          setSelectedColor={setSelectedColor}
          />:null
       
        }

        </button>
        <button onClick={()=>{
          setSelectedTool('brush')
          setSelectedColor('#6dd400')
        }}>
          <img src="./icons/pen-green.svg" alt="" />
        </button> 
         <button onClick={()=>{
          setSelectedTool('brush')
          setSelectedColor('#e02020')
         }}>
          <img src="./icons/pen-red.svg" alt="" />
        </button>
         <button onClick={()=>{
          setSelectedTool('marker')
          setSelectedColor('yellow')
         }}>
          <img src="./icons/highlighter.svg" alt="" />
        </button>
         <button onClick={()=>{
          setSelectedTool('eraser')
          
         }}>
          <img src="./icons/clarity_eraser-solid.svg" alt="" />
        </button>
         <button onClick={()=>{
          setIsActiveShapes(!isActiveShapes)
          }} style={{ position:"relative"}}>
          <img src="./icons/shape.svg" alt="" />
         {
          isActiveShapes ?  <SubMenuShapes
          setFillColor={setFillColor}
          setSelectedTool={setSelectedTool}
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
