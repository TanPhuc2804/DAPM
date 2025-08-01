import { Button, Popconfirm, Table, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { openNotification } from "../../../../assets/hooks/notification"
import { deleteSupplier, fetchDataSuppliers, selectedSupplier } from "../../redux/supplier/supplierSclice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import ModalSupplier from "../../components/Supplier/ModalSupplier"

function SupplierPage() {
  const dispatch = useDispatch()
  const suppliers = useSelector(state => state.suppliers.supplierTemp)
  const [visible, setVisible] = useState(false)

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text) => (<Typography className="text-center">{text + 1}</Typography>)
    },
    {
      title: 'Công ty',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: (<Typography className="text-center">số điện thoại</Typography>),
      dataIndex: 'numberphone',
      key: 'index',
      render: (text) => (<Typography className="text-center">{text}</Typography>)
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: "Hành động",
      fixed: "right",
      render: (_, record) => {
        return (
          <>
            <div className='flex items-center justify-between'>
              <EditOutlined
                style={{ color: "#1677ff" }} className='hover: cursor-pointer'
                onClick={() => handleUpdate(record)}
              />
              <Popconfirm
                title="Bạn chắc chắn sẽ xóa ?"
                cancelText="Không"
                okText="Có"
                onConfirm={() => handleDelete(record._id)}
              >
                <DeleteOutlined
                  style={{ color: "#ff4d4f" }}
                  className='hover: cursor-pointer'
                />
              </Popconfirm>


            </div>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    axios.get("http://localhost:3000/supplier/list-supplier")
      .then(res => res.data)
      .then(data => {
        const suppliers = data.suppliers?.map((item, index) => {
          return {
            ...item,
            index: index,
            key: item._id
          }
        })
        dispatch(fetchDataSuppliers(suppliers))
      })
      .catch(err => {
        console.log(err)
        openNotification(false, "Không lấy được dữ liệu nhà cung cấp !", "")
      })
  }, [])


  const handleUpdate = (supplier) => {
    dispatch(selectedSupplier(supplier))
    setVisible(true)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/supplier/delete-supplier/${id}`)
      .then(res => res.data)
      .then(data => {
        dispatch(deleteSupplier({id:id}))
        openNotification(true, "Xóa nhà cung cấp thành công !", "")
      })
      .catch(err => {
        console.log(err)
        openNotification(false, "Không xóa được nhà cung cấp !",err.response.data.message?? "")
      })
  }

  return (
    < >
      <div className='flex justify-between items-center mb-[20px]'>
        <Button
          className=' bg-blue-600 text-white'
          type='primary'
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => { setVisible(true) }}
        >
          <Typography.Text className='text-white font-semibold'>Thêm nhà cung cấp</Typography.Text>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={suppliers}
      >

      </Table>
      <ModalSupplier
        visible={visible}
        onClose={() => setVisible(false)}
      ></ModalSupplier>
    </>
  )
}

export default SupplierPage