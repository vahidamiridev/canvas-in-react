import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import styles from './Whiteboard.module.css';

const Whiteboard = (props) => {


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

export default Whiteboard