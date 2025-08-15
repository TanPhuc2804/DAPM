import { Avatar } from 'antd'
import React from 'react'
import imgUrl from "../../../../assets/Image/image-user-man.svg" 
function ImageUser({size,urlImage,handleClick}) {
  return (
    <Avatar
        onClick={handleClick}
        size={size}
        src={urlImage ?? imgUrl}
    />
  )
}

export default ImageUser