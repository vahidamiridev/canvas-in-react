import React from 'react'

import styles from './Whiteboard.module.css';

const Whiteboard = () => {
  return (
 
    <section className={styles.drawingBoard}>
        <canvas id="canvas"></canvas>
    </section>
  )
}

export default Whiteboard