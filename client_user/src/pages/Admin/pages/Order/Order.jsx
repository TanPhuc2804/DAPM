import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs'
import { Spin, Pagination, Modal, Select } from 'antd';
import { openNotification } from '../../../../assets/hooks/notification';
import ModalOrder from '../../components/ModalDetailOrder/ModalOrder';
import { fetchData, selectData, updateOrderState, updateTemp } from '../../redux/select/selectOrder';

// Định dạng bảng
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
   &:hover {
    cursor: pointer;
  }
`;

const TableRow = styled.tr`
  
`;

const TableHeader = styled.th`
  border: 1px solid black;
  padding: 8px;
  font-weight: bold;
`;

const TableCell = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: none;
  color: black;
  cursor: pointer;
  margin-right: 5px;
  background-color: ${props => props.color || 'grey'};
  &:hover {
    opacity: 0.8;
  }
`;
const OrderAdmin = () => {
  const [openChangeState, setOpenChangeState] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusChange, setStatusChange] = useState(false);
  //const [currentOrders,setCurrentOrders] = useState([])

  const dispatch = useDispatch()
  const [orderState, setOrderState] = useState({});
  const orderMain = useSelector((state) => state.orders.orders)
  const orders = useSelector((state) => state.orders.temporder)
  const selectedOrder = useSelector((state) => state.orders.selectedRow);
  //tinh toan page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = orders?.slice(startIndex, endIndex)
  const hanldeChangeState = (stateObject) => {
    axios.post(`http://localhost:3000/order/change-state/${stateObject.idOrder}`, { stateOrder: stateObject.state })
      .then(res => res.data)
      .then(data => {
        dispatch(updateOrderState({ id: data.order._id, stateOrder: data.order.stateOrder }))
        openNotification(true, "Thay đổi trạng thái thành công ", "")
      })
      .catch(err => {
        openNotification(false, "Thay đổi trạng thái thất bại ", err.response?.data?.message ?? err)
      })
    setOpenChangeState(false)
  }

  const handleMenuClick = (key) => {
    // Gọi hàm để cập nhật trạng thái với key đã chọn
    setOpenChangeState(key);
  };

  const items = [
    {
      value: "defauld",
      label: "Mặc định",
    },
    {
      value: "waiting",
      label: "Chờ xác nhận",
    },
    {
      value: "comfirmed",
      label: "Đã xác nhận",
    },
    {
      value: "shipping",
      label: "Đang giao hàng",
    },
    {
      value: "delivered",
      label: "Giao hàng thành công",
    },
    {
      value: "success",
      label: "Thành công",
    },
    {
      value: "paymented",
      label: "Thanh toán thành công",
    },

  ];

  const dropdownItems = items.map(item => ({
    key: item.key,
    label: (
      <a onClick={() => handleMenuClick(item.key)}>
        {item.label}
      </a>
    ),
  }));

  const getStateOrder = (state) => {
    switch (state) {
      case "waiting":
        return 'Chờ xác nhận'
      case "comfirmed":
        return 'Đã xác nhận'
      case "cancelled":
        return 'Đã hủy'
      case "shipping":
        return 'Đang giao hàng'
      case "delivered":
        return "Giao hàng thành công"
      case "success":
        return 'Đơn hàng thành công'
      case "paymented":
        return 'Thanh toán thành công'
      default:
        return 'Lỗi'
    }
  }
  useLayoutEffect(() => {
    axios.get("http://localhost:3000/order/all-order")
      .then(res => res.data)
      .then(data => {
        dispatch(fetchData(data.order))
        dispatch(updateTemp(data.order))

      })
      .catch(err => {
        openNotification(false, "Lấy dữ liệu thất bạt", err.response.data.message)
      })
  }, [])

  // thay doi page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý khi nhấp chọn một hàng
  const handleRowClick = (order) => {
    dispatch(selectData(order))
    setOpen(true)
  };

  // Xử lý xóa đơn hàng
  const closeModal = () => {
    setOpen(false)
  };


  const hanldeFilterOrder = (value) => {
    if (value == "defauld") {
      dispatch(updateTemp(orderMain))

    } else {
      axios.post("http://localhost:3000/order/list-order-for-state", { stateOrder: value })
        .then(res => res.data)
        .then(data => {
          if (data.status) {
            dispatch(updateTemp(data.order))
          }
        })
        .catch(err => {
          openNotification(false, "Lọc đơn hàng theo trạng thái thất bại", err.response.data.message)
        })
    }

  }

  const handleChange = (value, id) => {
    const stateChange = value
    setOpenChangeState(true)
    setOrderState({
      state: stateChange,
      idOrder: id
    })
  }

  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }} className='text-[30px] mb-[10px]'>Đơn Hàng</h2>

      <Select className='ml-[1005px] mb-[10px] w-[210px]' options={items} onChange={hanldeFilterOrder} defaultValue={"Chọn trạng thái đơn hàng"} />

      {currentOrders.length > 0 ? <Table>
        <thead>
          <tr>
            <TableHeader>STT</TableHeader>
            <TableHeader>Họ Tên KH</TableHeader>
            <TableHeader>SDT</TableHeader>
            <TableHeader>Địa chỉ giao hàng</TableHeader>
            <TableHeader>Số lượng SP</TableHeader>
            <TableHeader>Tổng tiền</TableHeader>
            <TableHeader>Ngày lập</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
          </tr>
        </thead>


        <tbody>
          {currentOrders.map((order, index) => {

            return (
              <TableRow
                key={order._id}
              >
                <TableCell onClick={() => handleRowClick(order)} >{index + 1}</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{order.idCustomer.fullname}</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{order.delivery_detail?.phone ?? "NULL"}</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{order.delivery_detail.
                  address_shipping
                }</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{order.order_details.length}</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{order.
                  totalPrice
                }</TableCell>
                <TableCell onClick={() => handleRowClick(order)}>{dayjs(order.updatedAt).format('DD/MM/YYYY')
                }</TableCell>
                <TableCell>
                  <Select
                    className='w-[200px]'
                    onChange={(value) => handleChange(value, order._id)}
                    value={order.stateOrder}
                    options={items}
                  />
                </TableCell>
              </TableRow >
            )
          })
          }
        </tbody>
      </Table>
        :
        <Spin></Spin>
      }
      <div className='my-[10px] mb-[20px] right-0'>
        <Pagination align="end" defaultCurrent={1} total={orders.length} onChange={handlePageChange}></Pagination>
      </div>
      <ModalOrder open={open} closeModal={closeModal} order={selectedOrder}></ModalOrder>
      <Modal
        title="Bạn có muốn thay đổi không ?"
        open={openChangeState}
        onOk={() => hanldeChangeState(orderState)}
        onCancel={() => { setOpenChangeState(false) }}
        cancelText="Trở lại"
      >
        <b>Bạn có muốn thay đổi trạng thái đơn hàng là: {getStateOrder(orderState.state)}</b>
      </Modal>
    </div>
  );
};

export default OrderAdmin