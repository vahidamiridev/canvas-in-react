import React from 'react'
import styles from './SubMenuBackground.module.css'

const SubMenuBackground = (props) => {

  const [whichGrid ,setWhichGrid ] = React.useState('')
  const [colorBtns ,setColorBtns ] = React.useState()


  

const {
changeBackgroundCanvas,
gridXFixing,
gridYFixing,
gridXYFixing,
sizeOfGrid,
setSizeOfGrid,
clearGrid
} = props



  return (
    <div className={`${styles.row} ${styles.colors}`} style={{position:'absolute' ,top:'30%' , left:'90%' , zIndex:"4"}}
    onClick={(e)=>e.stopPropagation()}>
        <ul className={styles.options}>
          <li
           
           className={styles.option} onClick={(e)=>{
            changeBackgroundCanvas('#18381d')

          }
            }></li>
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


          <li 
           
          className={styles.option} 
          onClick={()=> {
            setWhichGrid('y')
            gridYFixing(sizeOfGrid)
            }}>
              <img src="./icons/vertical.svg" alt="" />
            </li>
          <li
           
            className={`${styles.option}  `}
            onClick={()=> {
              setWhichGrid('x')
              gridXFixing(sizeOfGrid)
            }}
          >
              <img src="./icons/horizontal.svg" alt="" />

          </li>
          <li
           
            className={styles.option}
            onClick={()=>{ 
              setWhichGrid('xy')
              gridXYFixing(sizeOfGrid)}}
          >
              <img src="./icons/chess.svg" alt="" />

          </li>
          <li
            className={styles.option}
            onClick={()=>{ 
              clearGrid()
            }}
          >
              <img src="./icons/no-grid.svg" alt="" />

          </li>
          <li >
            <input
              type="range"
              className={styles.sizeSlider}
              id="sizeSlider"
              min="10"
              max="55"
              defaultValue={sizeOfGrid}
              onChange={(e)=>{
                let newSize = sizeOfGrid
                newSize = e.target.value
                setSizeOfGrid(newSize)
                const newWhichGrid = whichGrid
                switch(newWhichGrid){
                    case 'x':
                  gridXFixing(newSize)
                  break;
                    case 'y':
                  gridYFixing(newSize)
                  break;
                    case 'xy':
                  gridXYFixing(newSize)
                  break;
                  default:  gridXYFixing(newSize)
                }
              }}
            />
          </li>
        
        </ul>
      </div>
  )
}

export default SubMenuBackground