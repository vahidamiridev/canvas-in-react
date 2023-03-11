import React from 'react'
import { useParams } from 'react-router-dom';

import styles from './Whiteboard.module.css';

const Whiteboard = (props) => {

  const params = useParams()
  

  const {
    startLeftClickOnCanvas,
    movingMouseOnCanvas,
    stopLeftClickOnCanvas,
    handleMouseOut

  } = props



  

  return (
 
    <section className={styles.drawingBoard}>
        <canvas id={ 
          params.id ? ` canvas${params.id}` : 'canvas'
          } ref={props.canvasRef} 
      
        onMouseDown={(e)=>{startLeftClickOnCanvas(e)}}
        onMouseMove={(e)=>{movingMouseOnCanvas(e)}}
        onMouseUp={(e)=>{stopLeftClickOnCanvas(e)}}
        onMouseOut={(e)=>{handleMouseOut(e)}}
        onTouchStart={(e)=>{startLeftClickOnCanvas(e)}}
        onTouchMove={(e)=>{movingMouseOnCanvas(e)}}
        onTouchEnd={(e)=>{stopLeftClickOnCanvas(e)}}
        
        ></canvas>
    </section>
  )
}

export default Whiteboard