import React from 'react'
import styles from './SubMenuMarker.module.css'

const SubMenuMarker = (props) => {


  const {
    
    setColor,
    setBrushWidth,
    setIsActiveColors
  } = props


  return (
    <div className={`${styles.row} ${styles.colors}`} style={{position:'absolute' ,top:'30%' , left:'90%'  , zIndex:"4"}}
    onClick={(e)=>e.stopPropagation()}>
        <ul className={styles.options}>
          <li className={styles.option} onClick={()=>setColor('orangered')}></li>
          <li
            className={`${styles.option}`}
            onClick={()=>setColor('#000')}
          ></li>
          <li
            className={styles.option}
            onClick={()=>setColor('#e02020')}
          ></li>
          <li
            className={styles.option}
            onClick={()=>setColor('#6dd400')}
          ></li>
          <li
            className={styles.option}
            onClick={()=>setColor('yellow')}
          ></li>

          <li className={styles.option}>
            <label htmlFor="colorPicker" style={{cursor:'pointer'}}>

            <img src="./icons/colorPicker.svg" alt="" />
            </label>
            <input
              type="color"
              style={{display : 'none'}}
              className={styles.colorPicker}
              id="colorPicker"
              defaultValue={'#4a98f7'}
              onChange={(e) => {
                setColor(e.target.value)
              }}
            />
          </li>
          {/* <li >
            <input
              type="range"
              className={styles.sizeSlider}
              id="sizeSlider"
              min="1"
              max="15"
              defaultValue={2}
              onChange={(e)=>setBrushWidth(e.target.value)}
            />
          </li> */}
        </ul>
      </div>
  )
}

export default SubMenuMarker