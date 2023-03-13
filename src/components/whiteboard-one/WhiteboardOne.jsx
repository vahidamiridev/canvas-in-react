import React, { useEffect } from 'react'

import styles from './WhiteboardOne.module.css';

const WhiteboardOne = (props) => {


  const {
    startLeftClickOnCanvas,
    movingMouseOnCanvas,
    stopLeftClickOnCanvas,
    handleMouseOut,
    
  } = props


  return (
 
    <section className={styles.drawingBoard}>
            <canvas id='canvas-1' 
                  onMouseDown={(e)=>{
                    console.log(e)
                    startLeftClickOnCanvas(e)
                  }}
                  onMouseMove={(e)=>{movingMouseOnCanvas(e)}}
                  onMouseUp={(e)=>{stopLeftClickOnCanvas(e)}}
                  onMouseOut={(e)=>{handleMouseOut(e)}}

                  onTouchStart = {(e)=>{
                    console.log(e)
                    startLeftClickOnCanvas(e)
                  }}
                  onTouchMove = {(e)=>{movingMouseOnCanvas(e)}}
                  onTouchEnd={(e)=>{stopLeftClickOnCanvas(e)}}
                  onTouchCancel={(e)=>{handleMouseOut(e)}}

            
              ></canvas>
              <canvas id='bgCanvas' className={styles["bg-canvas"]}></canvas>
    </section>
  )
}

export default WhiteboardOne