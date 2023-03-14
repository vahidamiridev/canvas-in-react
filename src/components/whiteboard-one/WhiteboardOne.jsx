import React, { useEffect } from 'react'

import styles from './WhiteboardOne.module.css';

const WhiteboardOne = (props) => {


  const {
    startLeftClickOnCanvas,
    movingMouseOnCanvas,
    stopLeftClickOnCanvas,
    handleMouseOut,
    canvasRef,
    bgCanvasRef
    
  } = props


  return (
 
    <section className={styles.drawingBoard}>
            <canvas id='canvas-1' 
            ref={canvasRef}
                  onMouseDown={(e)=>{
             
                    startLeftClickOnCanvas(e)
                  }}
                  onMouseMove={(e)=>{movingMouseOnCanvas(e)}}
                  onMouseUp={(e)=>{stopLeftClickOnCanvas(e)}}
                  onMouseLeave={(e)=>{stopLeftClickOnCanvas(e)}}

                  onTouchStart = {(e)=>{
                    // console.log(e)
                    startLeftClickOnCanvas(e)
                  }}
                  onTouchMove = {(e)=>{movingMouseOnCanvas(e)}}
                  onTouchEnd={(e)=>{stopLeftClickOnCanvas(e)}}
                  onTouchCancel={(e)=>{handleMouseOut(e)}}

            
              ></canvas>
              <canvas ref={bgCanvasRef} id='bgCanvas' className={styles["bg-canvas"]}></canvas>
    </section>
  )
}

export default WhiteboardOne