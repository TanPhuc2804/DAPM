import React from 'react';
import { Col, Row } from 'antd'
import OrderDetail from './OrderDetail';

const OrderItem = ({ order }) => {
  const getStateOrder = (state) => {
    switch (state) {
      case "waiting":
        return (<p className='text-[#FFC107]'>Chờ xác nhận</p>)
      case "comfirmed":
        return (<p className='text-[#4CAF50]'>Đã xác nhận</p>)
      case "cancelled":
        return (<p className='text-[#F44336]'>Đã hủy</p>)
      case "shipping":
        return (<p className='text-[#FF9800]'>Đang giao hàng</p>)
      case "delivered":
        return (<p className='text-[#03A9F4]'>Giao hàng thành công</p>)
      case "success":
        return (<p className='text-[#4CAF50]'>Đơn hàng thành công</p>)
      case "paymented":
        return (<p className='text-[#9C27B0]'>Đã thanh toán</p>)
      default:
        return 'Lỗi'
    }
  }
  return (
    <div className='m-[10px]'>
      <Row className='m-[10px]'>
        <Col span={12} className='text-[18px] text-left'><b>Mã đơn hàng:</b> {order._id}</Col>

        <Col span={12} className='text-[18px] text-right font-bold'>{getStateOrder(order.stateOrder)}</Col>
      </Row>
      <Row className='m-[10px]'>
        {
          order.order_details.map((item, index) => {
            return (<Col key={index} span={24}>
            <OrderDetail product = {item}></OrderDetail>
          </Col>)
            
          })
        }
      </Row>

      <Row className='m-[10px] text-[18px] text-left'>
        <Col span={24} className='font-bold text-[19px] my-[5px]'>Thông tin người nhận</Col>
        <Col span={24}><b>Họ tên:</b> {order.delivery_detail.name} </Col>
        <Col span={24}><b>Địa chỉ:</b> {order.delivery_detail.address_shipping}</Col>
        <Col span={24}><b>Số điện thoại:</b> {order.delivery_detail.phone}</Col>
      </Row>

    </div>
  );
};

export default OrderItem;
