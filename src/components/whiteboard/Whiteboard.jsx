import React from 'react'
// import WithWhiteboard from '../../HOC/WithWhiteboard';

import styles from './Whiteboard.module.css';

const Whiteboard = (props) => {

  console.log(props.toolBtn)
  return (
 
    <section className={styles.drawingBoard}>
        <canvas id="canvas"></canvas>
    </section>
  )
}

export default Whiteboard