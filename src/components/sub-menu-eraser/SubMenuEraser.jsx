import React from 'react'
import styles from './SubMenuEraser.module.css'

const SubMenuEraser = (props) => {
const { 
  setBrushWidth
} = props

  return (
    <div className={`${styles.row} ${styles.colors}`} style={{position:'absolute' ,top:'30%' , left:'90%'  , zIndex:"4"}}
    onClick={(e)=>e.stopPropagation()}>
        <ul className={styles.options}>
          

         
          
          <li >
            <input
              type="range"
              className={styles.sizeSlider}
              id="sizeSlider"
              min="5"
              max="100"
              defaultValue={2}
              onChange={(e)=>setBrushWidth(e.target.value)}
            />
          </li>
        </ul>
      </div>
  )
}

export default SubMenuEraser