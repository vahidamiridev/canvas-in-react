import React from 'react'

import styles from './ToolBar.module.css'

const ToolBar = () => {
  return (
    <section className={styles.toolsBoard}>
      <div className={styles.row}>
        <label className={styles.title}>shapes</label>
        <ul className={styles.options}>
          <li className={`${styles.option} ${styles.tool}  `} id="rectangle">
            <img src="./icons/rectangle.svg" alt="" />
          </li>
          <li className={`${styles.option} ${styles.tool}  `} id="circle">
            <img src="./icons/circle.svg" alt="" />
          </li>
          <li className={`${styles.option} ${styles.tool}  `} id="triangle">
            <img src="./icons/triangle.svg" alt="" />
          </li>
          <li className={`${styles.option} ${styles.tool}  `} id="line">
            <img src="./icons/line.svg" alt="" />
          </li>

          <li className={styles.option}>
            <input type="checkbox" id={styles.fillColor} />
            <label htmlFor="fill-color">Fill</label>
          </li>
        </ul>
      </div>
      <div className={styles.row}>
        <label className={styles.title}>Options</label>
        <ul className={styles.options}>
          <li
            className={`${styles.option} ${styles.active} ${styles.tool}`}
            id="brush"
          >
            <img src="./icons/brush.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.active} ${styles.tool}`}
            id="marker"
          >
            <img src="./icons/marker.svg" alt="" />
          </li>
          <li className={`${styles.option} ${styles.tool}`} id="eraser">
            <img src="./icons/eraser.svg" alt="" />
          </li>

          <li className={styles.option} style={{display:'inline-inline'}}>
            <input
              type="range"
              id={styles.sizeSlider}
              min="1"
              max="15"
              defaultValue={2}
            />
          </li>
        </ul>
      </div>
      <div className={`${styles.row} ${styles.colors}`}>
        <label className={styles.title}>Colors</label>
        <ul className={styles.options}>
          <li className={styles.option}></li>
          <li className={`${styles.option} ${styles.selected} `}></li>
          <li className={styles.option}></li>
          <li className={styles.option}></li>

          <li className={styles.option}>
            <input
              type="color"
              id={styles.colorPicker}
              defaultValue={'#4a98f7'}
            />
          </li>
        </ul>
      </div>
      <div className={`${styles.row} ${styles.buttons}`}>
        <button>
          <img src="./icons/undo.svg" alt="" />
        </button>
        <button>
          <img src="./icons/refresh.svg" alt="" />
        </button>

        <button>
          <img src="./icons/hand.svg" alt="" />
        </button>
        <label htmlFor="input-img" className={styles.labelInput}>
          <img src="./icons/pic.svg" alt="" />
        </label>
        <input
          id="input-img"
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
        />
        <button>
          <img src="./icons/download.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

export default ToolBar
