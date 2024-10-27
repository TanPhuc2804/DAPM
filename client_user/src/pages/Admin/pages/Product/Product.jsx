import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Image, Button, Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { openNotification } from "../../../../assets/hooks/notification"
import dayjs from 'dayjs';
import axios from 'axios';
import { setProduct, selectedProduct,filterProductCate,deleteProduct } from '../../redux/Product/productSlice';

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



const ViewProduct = ({ title, color, item, hanldeFilterCate }) => {
  return (
    <WrapperProductBackground>
      <WrapperProduct color={color}>
        <div>
          <WrapperProduct1>
            <Link onClick={()=>hanldeFilterCate(item)}>
              <p>{title}</p>
            </Link>
          </WrapperProduct1>
        </div>
      </WrapperProduct>
    </WrapperProductBackground>
  );
};
const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const productTemps = useSelector(state => state.product.productTemps)

  const [categories, setCategories] = useState([])

  const hanldeFilterCate = (category) => {
    dispatch(filterProductCate(category._id))
  }

  const handleDeleted = (record) => {
    axios.delete(`http://localhost:3000/products/delete-product/${record._id}`)
      .then(res => res.data)
      .then(data => {
        dispatch(deleteProduct(record._id))
        openNotification(true, data.message, "")
      })
      .catch(err => {
        openNotification(false, err.response?.data?.message ?? "Không xóa được sản phẩm", "")
      })
  }
  const handleUpdate = (record) => {
    dispatch(selectedProduct(record))
    navigate('/admin/addproduct')
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      width: 200,
      key: 'name',
    },
    {
      title: 'Mô tả',
      width: 300,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price.toLocaleString('vi-VN')} VND`
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (images) => (
        <Image
          width={50}
          src={images[0]}
          alt="Product Image"
        />
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: ['supplier', 'companyName'],
      key: 'category',
    },
    {
      title: 'Kích cỡ & Số lượng',
      dataIndex: 'productSizes',
      key: 'productSizes',
      render: (sizes) => (
        <ul>
          {sizes.map((size) => (
            <li key={size._id}>
              {`Size: ${size.size}, Số lượng: ${size.quantity}`}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Ngày cập nhật ',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'updatedAt',
      fixed: 'right',
      render: (_, record) => (
        <div >

          <Button className='mr-[20px]' onClick={() => handleUpdate(record)}>Update</Button>
          <Button className=' bg-red-600 text-white'>
            <Popconfirm
              title={"Bạn có chắc sẽ xóa ?"}
              okText="Xóa"
              cancelText="Quay lại"
              onConfirm={() => handleDeleted(record)}
            >
              Delete
            </Popconfirm>

          </Button>
        </div>
      )
    }
  ];


  useEffect(() => {
    axios.get("http://localhost:3000/category/get-categorylist ")
      .then(res => res.data)
      .then(data => {
        setCategories(data.categories)
      })
      .catch(err => console.log(err))
    axios.get("http://localhost:3000/products/list-product")
      .then(res => res.data)
      .then(data => {
        dispatch(setProduct(data.products))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',alignItems:"center", padding: '20px', backgroundColor: '#ffffff' }}>
        {categories.map((item, index) => (
          <ViewProduct
            title={item.name}
            key={index}
            color="blue"
            item={item}
            hanldeFilterCate = {hanldeFilterCate}
          />
        ))}
        <Button onClick={()=>dispatch(setProduct(products))}>Mặc định</Button>
      </div>
      <Link to={"/admin/addproduct"} className='flex items-start justify-start mx-[20px] mb-[10px]'>
        <Button
          type='primary'
          icon={<FontAwesomeIcon icon={faPlus} />}
        >
          Thêm sản phẩm
        </Button>
      </Link>


      <div className='max-w-[1000px]'>
        <Table
          bordered
          columns={columns}
          dataSource={productTemps}
          scroll={{
            x: 'max-content',
          }}

        ></Table>
      </div>
    </>

  )
}

export default Product