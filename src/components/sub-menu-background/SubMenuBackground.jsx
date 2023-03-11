import React from 'react'
import styles from './SubMenuBackground.module.css'

const SubMenuBackground = (props) => {

const {
changeBackgroundCanvas,
gridXFixing,
gridYFixing,
gridXYFixing
} = props

  return (
    <div className={`${styles.row} ${styles.colors}`} style={{position:'absolute' ,top:'30%' , left:'90%'}}
    onClick={(e)=>e.stopPropagation()}>
        <ul className={styles.options}>
          <li className={styles.option} onClick={(e)=>{
            changeBackgroundCanvas('#18381d')}}></li>
          <li
            className={`${styles.option} ${styles.selected} `}
            onClick={(e)=>{
              changeBackgroundCanvas('#242222')}}
          ></li>
          <li
            className={styles.option}
            onClick={(e)=>{
              changeBackgroundCanvas('#fff')}}
          ></li>


          <li className={styles.option} onClick={gridYFixing}>
              <img src="./icons/vertical.svg" alt="" />
            </li>
          <li
            className={`${styles.option}  `}
            onClick={gridXFixing}
          >
              <img src="./icons/horizontal.svg" alt="" />

          </li>
          <li
            className={styles.option}
            onClick={gridXYFixing}
          >
              <img src="./icons/chess.svg" alt="" />

          </li>
        
        </ul>
      </div>
  )
}

export default SubMenuBackground