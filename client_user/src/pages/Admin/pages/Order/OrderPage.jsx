import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Modal, Select, Table, Typography } from "antd"
import axios from "axios"
import { openNotification } from '../../../../assets/hooks/notification';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, filterOrder, updateOrderState, updateTemp } from '../../redux/select/selectOrder';
import FormOrderDetail from '../../components/FormOrder/FormOrderDetail';
import ModalOrder from '../../components/ModalDetailOrder/ModalOrder';
import dayjs from 'dayjs';



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

function formatCurrencyVND(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function OrderPage() {
    const dispatch = useDispatch()
    const ordersMain = useSelector(state=>state.orders.orders)
    const orders = useSelector(state => state.orders.temporder)
    const [visibleModal, setVisibleModal] = useState(false)
    const [order, setOrder] = useState()
    useEffect(() => {
        axios.get("http://localhost:3000/order/all-order")
            .then(res => res.data)
            .then(data => {
                const orders = data.order.map((item, index) => {
                    return {
                        ...item,
                        index: index + 1,
                        key: item._id
                    }
                })
                dispatch(fetchData(orders))
                dispatch(updateTemp(orders))
            })
            .catch(err => {
                openNotification(false, "Không lấy được dữ liệu đơn hàng ", "")
            })
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Họ tên khách hàng',
            dataIndex: ["idCustomer", "fullname"],
            key: "fullname",
        },
        {
            title: 'Số điện thoại',
            dataIndex: ["delivery_detail", "phone"],
            key: 'phone_number',
        },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: ["delivery_detail", "address_shipping"],
            key: 'address'
        },
        {
            title: <Typography className='text-center'>Số lượng sản phẩm</Typography>,
            dataIndex: ["order_details"],
            key: 'quantity_product',
            render: (orderDetails) => <Typography className='text-center'>{orderDetails.length ?? 0}</Typography>
        },
        {
            title: <Typography className='text-center'>Tổng tiền</Typography>,
            dataIndex: ["totalPrice"],
            key: 'total_price',
            render: (text) => <Typography className='text-center'>{formatCurrencyVND(text)}</Typography>
        },
        {
            title: <Typography className='text-center'>Ngày đặt</Typography>,
            dataIndex: ["createdAt"],
            key: 'total_price',
            render: (text) => <Typography className='text-center'>{dayjs(text).format("DD-MM-YYYY")}</Typography>,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div>
                    <DatePicker.RangePicker
                        onReset={()=>{
                            dispatch(updateTemp(ordersMain))
                            clearFilters()
                            
                        }}
                        onChange={(dates)=>{
                            setSelectedKeys(dates ? [dates]:[])
                            confirm()
                        }}
                        format={"DD-MM-YYYY"}
                    >

                    </DatePicker.RangePicker>

                </div>
            ),
            onFilter:(value,record)=>{
                if(!value)
                    return true
                const startDate = value[0]
                const endDate = value[1]
                const recordDate =dayjs(record.createdAt)
                return (recordDate.isAfter(startDate,"day","[]") && recordDate.isBefore(endDate.endOf("day"),"[]")) || recordDate.isSame(startDate,"day") || recordDate.isSame(endDate,"day")
            }

        },
        {
            title: 'Trạng thái',
            fixed: 'right',
            dataIndex: ["stateOrder"],
            key: 'total_price',
            render: (_, record) => {
                return (
                    <Select
                        className='w-[200px]'
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(value) => hanldeChangeState(value, record._id)}
                        value={record.stateOrder}
                        options={items}
                    >

                    </Select>
                )
            }

        },
    ];
    const hanldeChangeState = (value, id) => {

        axios.post(`http://localhost:3000/order/change-state/${id}`, { stateOrder: value })
            .then(res => res.data)
            .then(data => {
                dispatch(updateOrderState({ id: data.order._id, stateOrder: data.order.stateOrder }))
                //openNotification(true, "Thay đổi trạng thái thành công ", "")
            })
            .catch(err => {
                console.log(err)
                openNotification(false, "Thay đổi trạng thái thất bại ", "")
            })
        setOpenChangeState(false)
    }

    const handleClickRow = (data) => {
        setOrder(data)
        setVisibleModal(true)
    }

    const handleFilterState = (value) => {
        dispatch(filterOrder({ value: value }))
    }

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
            <Select
                className='flex w-[200px] my-3'
                options={items}
                defaultValue={"defauld"}
                onChange={(value) => handleFilterState(value)}
            >
            </Select>
            <Table
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={orders}
                onRow={(data) => {
                    return {
                        onClick: () => handleClickRow(data)
                    }
                }}
            />
            <ModalOrder
                open={visibleModal}
                closeModal={() => setVisibleModal(false)}
                order={order}
            ></ModalOrder>

        </>
    )
}

export default OrderPage