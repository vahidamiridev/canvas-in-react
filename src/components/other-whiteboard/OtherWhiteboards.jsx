import React from 'react'
import styles from './OtherWhiteboards.module.css'
const OtherWhiteboards = (props) => {
  
    const {
      startLeftClickOnCanvas,
      movingMouseOnCanvas,
      stopLeftClickOnCanvas,
      handleMouseOut,
    } = props
  
  
  
  
  
  
    return (
   
      <section className={styles.drawingBoard}>
       <canvas id={'canvas'} 
            onMouseDown={(e)=>{startLeftClickOnCanvas(e)}}
            onMouseMove={(e)=>{movingMouseOnCanvas(e)}}
            onMouseUp={(e)=>{stopLeftClickOnCanvas(e)}}
            onMouseOut={(e)=>{handleMouseOut(e)}}
       
        ></canvas>
      </section>
  )
}

export default OtherWhiteboards