import React from 'react'

import styles from './WhiteboardTwo.module.css';

const WhiteboardTwo = () => {

  return (
 
    <section className={styles.drawingBoard}>
        <canvas id="canvasTwo" ></canvas>
    </section>
  )
}

export default WhiteboardTwo