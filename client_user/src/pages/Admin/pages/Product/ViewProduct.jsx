import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import styled from "styled-components";

const WrapperProduct = styled.div`
    width: 150px;
    padding: 20px;
    margin: 10px;
    background-color: #fff;
    border-radius: 8px;
    border-left: 6px solid ${props => props.color};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 16px;
`
const WrapperProduct1 = styled.p`
    margin: 0;
    font-weight: bold;
`
const WrapperProductBackground = styled.div`
    background-color: #FFF0F5;
    weight:100%;
`
const ViewProduct = ({ title, color }) => {
  return (
    <WrapperProductBackground>
      <WrapperProduct style={{ borderLeftColor: color }}>
       <div>
        <WrapperProduct1>
          <Link to ="/admin/viewdetailproduct">
        <p>{title}</p>
        </Link>
        </WrapperProduct1>
    </div>
    </WrapperProduct>
    </WrapperProductBackground>
  )
}

export default ViewProduct