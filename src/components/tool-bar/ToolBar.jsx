import React from 'react'

import styles from './ToolBar.module.css'

const ToolBar = (props) => {
  const { setSelectedTool,
       setSelectedColor,
       saveImageHandler ,
       changeImageHandler ,
       setBrushWidth,
       undoLast,
       clearCanvasHandler,
       setIsHand,
       setFillColor,
       inputImageRef
      } = props
  return (
    <section className={styles.toolsBoard}>
      <div className={styles.row}>
        <label className={styles.title}>shapes</label>
        <ul className={styles.options}>
          <li
            className={`${styles.option} ${styles.tool}`}
            onClick={()=>setSelectedTool('rectangle')}
            id="rectangle"
          >
            <img src="./icons/rectangle.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.tool}`}
            onClick={()=>setSelectedTool('circle')}
            id="circle"
          >
            <img src="./icons/circle.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.tool}`}
            onClick={()=>setSelectedTool('triangle')}
            id="triangle"
          >
            <img src="./icons/triangle.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.tool}`}
            onClick={()=>setSelectedTool('line')}
            id="line"
          >
            <img src="./icons/line.svg" alt="" />
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
      <div className={styles.row}>
        <label className={styles.title}>Options</label>
        <ul className={styles.options}>
          <li
            className={`${styles.option} ${styles.active} ${styles.tool}`}
            id="brush"
            onClick={()=>setSelectedTool('brush')}
          >
            <img src="./icons/brush.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.active} ${styles.tool}`}
            id="marker"
            onClick={()=>setSelectedTool('marker')}
          >
            <img src="./icons/marker.svg" alt="" />
          </li>
          <li
            className={`${styles.option} ${styles.tool}`}
            id="eraser"
            onClick={()=>setSelectedTool('eraser')}
          >
            <img src="./icons/eraser.svg" alt="" />
          </li>

          <li className={styles.option} style={{ display: 'inline-inline' }}>
            <input
              type="range"
              className={styles.sizeSlider}
              id="sizeSlider"
              min="1"
              max="15"
              defaultValue={2}
              onChange={(e)=>setBrushWidth(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <div className={`${styles.row} ${styles.colors}`}>
        <label className={styles.title}>Colors</label>
        <ul className={styles.options}>
          <li className={styles.option} onClick={()=>setSelectedColor('#fff')}></li>
          <li
            className={`${styles.option} ${styles.selected} `}
            onClick={()=>setSelectedColor('#000')}
          ></li>
          <li
            className={styles.option}
            onClick={()=>setSelectedColor('#e02020')}
          ></li>
          <li
            className={styles.option}
            onClick={()=>setSelectedColor('#6dd400')}
          ></li>

          <li className={styles.option}>
            <input
              type="color"
              className={styles.colorPicker}
              id="colorPicker"
              defaultValue={'#4a98f7'}
              onChange={(e) => {
                setSelectedColor(e.target.value)
              }}
            />
          </li>
        </ul>
      </div>
      <div className={`${styles.row} ${styles.buttons}`}>
        <button onClick={undoLast}>
          <img src="./icons/undo.svg" alt="" />
        </button>
        <button onClick={clearCanvasHandler}>
          <img src="./icons/refresh.svg" alt="" />
        </button>

        <button onClick={(e)=>setIsHand(true)}>
          <img src="./icons/hand.svg" alt="" />
        </button>
        <label htmlFor="input-img"  className={styles.labelInput}>
          <img src="./icons/pic.svg" alt="" />
        </label>
        <input
        ref={inputImageRef}
          id="input-img"
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(e)=>{changeImageHandler(e)}}
        />
        <button onClick={saveImageHandler}>
          <img src="./icons/download.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

export default ToolBar
