import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Image, Button, Popconfirm, Typography, Select, Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { openNotification } from "../../../../assets/hooks/notification"
import dayjs from 'dayjs';
import axios from 'axios';
import { setProduct, selectedProduct, filterProduct, deleteProduct } from '../../redux/Product/productSlice';
import ModelFormProduct from '../../components/Product/ModelFormProduct';
import ModalCategory from '../../components/Product/ModalCategory';

const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [filterData, setFilterData] = useState({ cate: "1", supplier: "1" })
  const productTemps = useSelector(state => state.product.productTemps)
  const [visible, setVisible] = useState(false)
  const [visibleModalCate, setVisibleModalCate] = useState(false)

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
    setVisible(true)
  }

  const handleFilterProduct = () => {
    dispatch(filterProduct(filterData))
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
    handleFilterProduct()
  }, [filterData])

  useEffect(() => {
    axios.get("http://localhost:3000/category/get-categorylist ")
      .then(res => res.data)
      .then(data => {
        const formattedCate = data.categories.map(cate => (
          {
            value: cate._id,
            label: cate.name
          }
        ))
        setCategories([{ value: "1", label: "Tất cả danh mục" }, ...formattedCate])
      })
      .catch(err => console.log(err))
    axios.get("http://localhost:3000/supplier/list-supplier")
      .then(res => res.data)
      .then(data => {

        const formattedSuppliers = data.suppliers.map(supplier => (
          {
            value: supplier._id,
            label: supplier.companyName
          }
        ))

        setSuppliers([{ value: "1", label: "Tất cả nhà cung cấp" }, ...formattedSuppliers])
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
      <div className='flex justify-between items-center mb-[20px]'>
        <Button
          className=' bg-blue-600 text-white'
          type='primary'
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => { setVisible(true) }}
        >
          <Typography.Text className='text-white font-semibold'>Thêm sản phẩm</Typography.Text>
        </Button>
        <div>
          <Select
            style={{ width: "250px" }}
            options={suppliers}
            defaultValue={"1"}
            onChange={(value) => {
              setFilterData(pre => ({ ...pre, supplier: value }))
            }}>

          </Select>
          <Select
            style={{ width: "250px", marginLeft: "20px" }}
            options={categories}
            defaultValue={"1"}
            onChange={(value) => {
              setFilterData(pre => ({ ...pre, cate: value }))
            }}>

          </Select>
          <Button
            className='ml-[20px] bg-blue-600 text-white'
            type='primary'
            onClick ={()=> setVisibleModalCate(true)}
          >
            <Typography.Text className='text-white font-semibold'>Danh mục</Typography.Text>
          </Button>
        </div>
      </div>

      <div className='max-w-[1400px]'>
        <Table
          bordered
          columns={columns}
          dataSource={productTemps}
          scroll={{
            x: 'max-content',
          }}

        ></Table>
      </div>
      <ModelFormProduct visible={visible} onClose={() => setVisible(false)} supliers={suppliers} categories={categories} />
      <ModalCategory visible={visibleModalCate} onClose={() => setVisibleModalCate(false)} />
    </>

  )
}

export default Product