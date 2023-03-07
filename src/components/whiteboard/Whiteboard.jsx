import React from 'react'

import styles from './Whiteboard.module.css';

const Whiteboard = (props) => {

  const {
    startLeftClickOnCanvas,
    movingMouseOnCanvas,
    stopLeftClickOnCanvas,
    handleMouseOut

  } = props



  

  return (
 
    <section className={styles.drawingBoard}>
        <canvas id="canvas" ref={props.canvasRef} 
      
        onMouseDown={(e)=>{startLeftClickOnCanvas(e)}}
        onMouseMove={(e)=>{movingMouseOnCanvas(e)}}
        onMouseUp={(e)=>{stopLeftClickOnCanvas(e)}}
        onMouseOut={(e)=>{handleMouseOut(e)}}
        
        ></canvas>
    </section>
  )
}

export default Whiteboard