import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Success() {
  const{session_id} = useParams()
  console.log(session_id)
  useEffect(()=>{
    axios.get(`http://localhost:3000/checkout/complete/${session_id}`)
      .then(res=>res.data)
      .then(data=>console.log(data))
      .catch(err=>console.log(err.response))
  },[])
  return (
    <div>Success</div>
  )
}

export default Success