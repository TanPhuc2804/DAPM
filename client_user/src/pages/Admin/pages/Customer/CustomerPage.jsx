import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { openNotification } from '../../../../assets/hooks/notification';
import { useDispatch, useSelector } from 'react-redux';
import { changeBlock, fetchDataCustomer } from '../../redux/customer/CustomerSlice';
import { Button, Popconfirm, Table, Typography } from 'antd';
import { createStyles } from 'antd-style';
import 'dayjs/locale/vi'
import dayjs from 'dayjs';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { faL } from '@fortawesome/free-solid-svg-icons';
dayjs.locale('vi')
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

function CustomerPage() {
  const dispatch = useDispatch()
  const [blocks, setIsBlock] = useState([])
  const customers = useSelector(state => state.customers.customers)
  const stylesTable = useStyle().styles
  useEffect(() => {
    axios.get("http://localhost:3000/customer/list-customer")
      .then(res => res.data)
      .then(data => {
        const customer = data.message.map(item => {
          return {
            ...item,
            key: item._id,
            gender: item.gender ?? "unknow",
            numberphone: item.numberphone ?? "Chưa đăng ký"
          }
        })
        const isBlocks = customer.reverse().map(item => {
          return {
            id: item._id,
            isBlock: item.role === 'block' ? true : false
          }
        })
        setIsBlock(isBlocks)
        dispatch(fetchDataCustomer(customer))
      })
      .catch(err => {
        console.log(err)
        openNotification(false, "Không lấy được dữ liệu người dùng", "")
      })
  }, [])
  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (_, record, index) => <Typography className='text-center'>{index + 1}</Typography>
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberphone',
      key: 'numberphone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <Typography className='text-center'>{getGender(text)}</Typography>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <Typography>{dayjs(text).format("DD-MM-YYYY")}</Typography>
    },

    {
      title: 'Hành động',
      dataIndex: 'role',
      key: 'role',
      fixed: "right",
      render: (_, record, index) => {
        return (
          <div className='flex items-center justify-center'>
            {blocks[index]?.isBlock ?
              <Popconfirm
                onConfirm={() => handleUnblock(record._id, index)}
                title="Bạn có muốn gỡ khóa người dùng"
              >
                <Button style={{ color: "green", borderColor: "green" }}>
                  Mở khóa
                  <UnlockOutlined style={{ color: "green" }} />
                </Button>
              </Popconfirm>


              :
              <Popconfirm
                onConfirm={() => handleBlock(record._id, index)}
                title="Bạn có muốn khóa người dùng"
              >
                <Button style={{ color: "red", borderColor: "red" }}>
                  Khóa
                  <LockOutlined style={{ color: "red" }} />
                </Button>
              </Popconfirm>
            }
          </div>
        )

      }
    },
  ];

  const handleBlock = (id, index) => {
    axios.post(`http://localhost:3000/customer/list-customer/block/${id}`)
      .then(res => res.data)
      .then(data => {
        openNotification(true, "Khóa người dùng thàn công", "")
        dispatch(changeBlock(id, "block"))
        let dataBlocks = [...blocks]
        dataBlocks[index].isBlock = true
        setIsBlock(dataBlocks)
      })
      .catch(err => {
        openNotification(false, "Khóa người dùng không thành công", err.response?.data?.message ?? "")
      })
  }

  const handleUnblock = (id, index) => {
    axios.post(`http://localhost:3000/customer/list-customer/unblock/${id}`)
      .then(res => res.data)
      .then(data => {
        openNotification(true, "Gỡ người dùng thành công", "")
        dispatch(changeBlock(id, "Customer"))
         let dataBlocks = [...blocks]
        dataBlocks[index].isBlock = false
        setIsBlock(dataBlocks)
      })
      .catch(err => {
        openNotification(false, "Gỡ người dùng không thành công", err.response?.data?.message ?? "")
      })
  }


  const getGender = (gender) => {
    let genderData = ""
    switch (gender) {
      case 'male': {
        genderData = "Nam"
        break
      }
      case 'female': {
        genderData = "Nữ"
        break
      }
      default: {
        genderData = "Không xác định"
        break
      }
    }
    return genderData
  }

  return (
    <Table
      columns={columns}
      dataSource={customers}
      scroll={{
        x: "max-content"
      }}
      className={stylesTable.customTable}
    >
    </Table>
  )
}

export default CustomerPage