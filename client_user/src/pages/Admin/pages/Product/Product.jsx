import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';

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
`;
const WrapperProduct1 = styled.p`
    margin: 0;
    font-weight: bold;
`;
const WrapperProductBackground = styled.div`
    background-color: #FFF0F5;
`;

const ViewProduct = ({ title, color }) => {

  return (
    <WrapperProductBackground>
      <WrapperProduct color={color}>
        <div>
          <WrapperProduct1>
            <Link to="/admin/viewdetailproduct">
              <p>{title}</p>
            </Link>
          </WrapperProduct1>
        </div>
      </WrapperProduct>
    </WrapperProductBackground>
  );
};
const Product = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
      <ViewProduct title="Áo" color="red" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />
      <ViewProduct title="Áo" color="red" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />
      <ViewProduct title="Áo" color="red" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />
      <ViewProduct title="Áo" color="red" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />

    </div>
  )
}

export default Product