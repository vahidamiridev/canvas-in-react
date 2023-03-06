import React from 'react'

const WithWhiteboard = (Component) => {

  return (props) => {
    return (
      <>
        <Component
         {...props} 
        />
      </>
    )
  }
}
export default WithWhiteboard
