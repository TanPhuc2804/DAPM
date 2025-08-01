import React from 'react'
import { Table } from 'antd'
import { formatCurrency } from '../../../../assets/Function/formatCurrency'
function FormOrderDetail({ order }) {


  const data = order.order_details.map((item=>({
    ...item,
    key:item.productId,
    price:formatCurrency(item.price),
    total_price: formatCurrency(item.quantity * item.price)
  })))

  const columns = [
    {
      title:"Tên sản phẩm",
      dataIndex:"name",
      key:"name"
    },
    {
      title:"Số lượng",
      dataIndex:"quantity",
      key:"quantity"
    },
    {
      title:"Size",
      dataIndex:"size",
      key:"size"
    },
    {
      title:"Giá tiền",
      dataIndex:"price",
      key:"price"
    },
    {
      title:"Tổng giá tiền",
      dataIndex:"total_price",
      key:"total_price"
    },
  ]


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
  return (
    <>
      
      <div>
        <h2 className='text-black text-[17px] font-bold'>Thông tin khách hàng</h2>
        <div className='m-[10px] text-[15px] text-black '>
          <span className='font-medium'>Họ và tên</span>: {order?.idCustomer?.fullname}
        </div>
        <div className='m-[10px] text-[15px] text-black'>
          <span className='font-medium'>Email</span>: {order?.idCustomer?.email}
        </div>
        <div className='m-[10px] text-[15px] text-black'>
          <span className='font-medium'>Số điện thoại</span>: {order?.delivery_detail?.phone ?? "NULL"}
        </div>
        <div className='m-[10px] text-[15px] text-black'>
          <span className='font-medium'>Địa chỉ giao hàng</span>: {order?.delivery_detail?.address_shipping ?? "NULL"}
        </div>
      </div>
      <div>
        <h2 className='text-black text-[17px] font-bold'>Thông tin chi tiết đơn hàng</h2>
        <div className='m-[10px] text-[15px] text-black d-flex'>
          <span className='font-medium mr-[5px]'>Phương thức thanh toán:</span>
          <b>{order?.paymentMethod.trim()}</b>
        
        </div>
        <div className='m-[10px] text-[15px] text-black d-flex'>
          <span className='font-medium mr-[5px]'>Trạng thái đơn hàng:</span>
          <b>{getStateOrder(order?.stateOrder.trim())}</b>
                  </div>
        <div className='m-[10px] text-[15px] text-black '>
          <span className='font-medium mr-[5px]'>Sản phẩm</span>
          <Table dataSource={data} columns={columns} bordered></Table>
        </div>

      </div>

    </>
  )
}

export default FormOrderDetail