import React from 'react'
import styles from './Pagination.module.css'
const Pagination = (props) => {
const {
  numberOfPage,
  setNumberOfPage,
  createElement,
  arrayOfCreatedElementsButton,

} = props


  return (
    <div
    className={styles.pagination}>
      <div className={styles.plus} onClick={(e)=>{
        e.stopPropagation()
        let newNumberOfPage = numberOfPage 
        createElement(newNumberOfPage)
        newNumberOfPage += 1
          setNumberOfPage(newNumberOfPage)
       
           
      }} >
         <img src="./icons/plus.svg" alt="" />
      </div>
      {
        arrayOfCreatedElementsButton.map((item)=><div
        style={{width:'2.5rem'  , height:'2.5rem'}}
         key={item.id}
         >{item.element}</div>)
      }

    </div>
  )
}

export default Pagination