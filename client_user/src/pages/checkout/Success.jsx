import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { openNotification } from '../../assets/hooks/notification'

function Success() {
  const { session_id } = useParams()
  const urlParams = new URLSearchParams(window.location.search);
  const infor = urlParams.get("infor")
  if(session_id){
    useEffect(() => {
      axios.post(`http://localhost:3000/checkout/complete/${session_id}`, JSON.parse(infor))
        .then(res => res.data)
        .then(data => {
          if (data.status) {
            openNotification(true, data.message, "Cảm ơn bạn đã đặt hàng !")
          }
        })
        .catch(err => {
          openNotification(false, data.message, "")
        }
        )
    }, [])
  }
  return (
    <div>Success</div>
  )
}

export default Success