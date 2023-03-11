import React from 'react'
import styles from './SubMenuShapes.module.css';

const SubMenuShapes = (props) => {
  const {
    setSelectedTool,
    setFillColor
  } = props
  return (
    <div className={styles.row} style={{position:'absolute' ,top:'30%' , left:'90%'}} 
    onClick={(e)=>e.stopPropagation()}
    >
    <ul className={styles.options}>
      <li
        className={`${styles.option} ${styles.tool}`}
        onClick={()=>setSelectedTool('rectangle')}
        id="rectangle"
      >
        <img src="./icons/rectangle-figma.svg" alt="" />
      </li>
      <li
        className={`${styles.option} ${styles.tool}`}
        onClick={()=>setSelectedTool('circle')}
        id="circle"
      >
        <img src="./icons/circle-figma.svg" alt="" />
      </li>
      <li
        className={`${styles.option} ${styles.tool}`}
        onClick={()=>setSelectedTool('triangle')}
        id="triangle"
      >
        <img src="./icons/triangle-figma.svg" alt="" />
      </li>
      <li
        className={`${styles.option} ${styles.tool}`}
        onClick={()=>setSelectedTool('line')}
        id="line"
      >
        <img src="./icons/line-figma.svg" alt="" />
      </li>

      <li className={styles.option}>
        <input
          type="checkbox"
          id="fillColor"
          className={styles.fillColor}
          onChange={(e)=>{setFillColor(e.target.checked)} }
        />
        <label htmlFor="fillColor">Fill</label>
      </li>
    </ul>
  </div>
  )
}

export default SubMenuShapes