import React from 'react'

export const Message = (props) => {
  return (
    <h3 onClick={props.onMessageClick}>{props.message}</h3>
  )
}
