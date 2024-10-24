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
    color: black;
`;
const WrapperProduct1 = styled.p`
    margin: 0;
    font-weight: bold;
    color: black;
`;
const WrapperProductBackground = styled.div`
    background-color: #FFF0F5;
`;

const ViewProduct = ({ title, color, id }) => {
  return (
    <WrapperProductBackground>
      <WrapperProduct color={color}>
        <div>
          <WrapperProduct1>
            <Link to={`/admin/viewdetailproduct/${id}?title=${title}`}>
              <p>{title}</p>
            </Link>
          </WrapperProduct1>
        </div>
      </WrapperProduct>
    </WrapperProductBackground>
  );
};
const Product = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3000/category/get-categorylist ")
      .then(res => res.data)
      .then(data => {
        setCategories(data.categories)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
      {categories.map((item, index) => (
        <ViewProduct title={item.name} color="blue" id={item._id} />
      ))}

    </div>
  )
}

export default Product