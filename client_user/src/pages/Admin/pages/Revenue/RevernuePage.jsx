import { Col, DatePicker, Row, Select, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { EllipsisOutlined, RiseOutlined, ShoppingOutlined, TransactionOutlined, UserOutlined } from '@ant-design/icons'
import CardRevenue from '../../components/Card/CardRevenue'
import ChartRevenue from '../../components/Chart/Chart'
import TableProductRevenue from '../../components/Chart/TableProductRevenue'
import { openNotification } from "../../../../assets/hooks/notification"

let revenueMonth = [
    {
        month: 1,
        revenue: 0
    },
    {
        month: 2,
        revenue: 0
    },
    {
        month: 3,
        revenue: 0
    },
    {
        month: 4,
        revenue: 0
    },
    {
        month: 5,
        revenue: 0
    },
    {
        month: 6,
        revenue: 0
    },
    {
        month: 7,
        revenue: 0
    },
    {
        month: 8,
        revenue: 0
    },
    {
        month: 9,
        revenue: 0
    },
    {
        month: 10,
        revenue: 0
    },
    {
        month: 11,
        revenue: 0
    },
    {
        month: 12,
        revenue: 0
    }
]
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchData, updateTemp } from '../../redux/select/selectOrder'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.locale('vi')
dayjs.extend(isBetween)
function RevernuePage() {
    const orders = useSelector(state => state.orders.orders)
    let tempOrder = useSelector(state => state.orders.temporder)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [totalUser, setTotaluser] = useState(0)
    const [daySearch, setDaySearch] = useState({
        startDay: "",
        endDay: ""
    })
    let dataSet = []
    const productOrders = useMemo(
        () => {
            return tempOrder.map(item => item.order_details ?? item).flat()
        }, [tempOrder])
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get("http://localhost:3000/order/all-order")
            .then(res => res.data)
            .then(data => {
                const ordersData = data.order
                dispatch(fetchData(ordersData))
                dispatch(updateTemp(ordersData))

            })
            .catch(err => {
                console.log(err.response?.data?.message ?? err)
                openNotification("error", "Lỗi", err.response.data.message)
            })

        axios.get("http://localhost:3000/category/get-categorylist")
            .then(res => res.data)
            .then(data => {
                setCategories(data.categories)

            })
            .catch(err => console.log(err))

        axios.get("http://localhost:3000/customer/list-customer/")
            .then(res => res.data)
            .then(data => {
                setTotaluser(data.message?.length)
            })
            .catch(err => {
                openNotification(false, "Lỗi dữ liệu", "Không lấy được số lượng khách hàng")
            })
    }, [])

    useEffect(() => {
        setCateInPro()
    }, [categories, productOrders])

    const getData = (orders) => {
        const monthlyRevenue = Array.from({ length: 12 }).map((_, index) => ({ month: index + 1, revenue: 0 }))
        orders.forEach(order => {
            const monthly = dayjs(order.createdAt).month()
            monthlyRevenue[monthly] = {
                ...monthlyRevenue[monthly],
                revenue: monthlyRevenue[monthly].revenue + order.totalPrice
            }
        })
        return monthlyRevenue
    }

    const setCateInPro = () => {
        // lay cac san pham trong don hang
        const dataPro = Object.values(productOrders.reduce((acc, current) => {
            const _idProduct = current._idProduct._id ?? current._idProduct
            if (acc[_idProduct]) {
                acc[_idProduct].quantity += current.quantity
                acc[_idProduct].revenue += current.price
            } else {
                acc[_idProduct] = { ...current, revenue: current.price }
            }
            return acc
        }, {}))
        // them ten danh muc vao
        const data = dataPro.map((item, index) => {
            const idCate = item._idProduct.category
            const category = categories.find(cate => cate._id === idCate)
            if (category) {
                item.categoryName = category?.name ?? ""
            }
            return { ...item, index: index + 1 }
        })
        setProducts(data)
    }


    const totalPrice = useMemo(() => {
        return productOrders.reduce((total, item) => {
            return total + (item.price * item.quantity)

        }, 0)
    }, [orders])
    function formatCurrencyVND(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    }

    const handleFilterDate = (date) => {

    }

    const hanldeSearch = (e) => {
        if (!e) {
            tempOrder = orders
            dispatch(updateTemp(tempOrder))
            return
        }
        const startDate = e[0]
        const endDate = e[1]
        tempOrder = orders.filter(order => {
            const orderDate = dayjs(order.createdAt);

            if (startDate.isSame(endDate, 'day')) {
                return orderDate.isSame(startDate, 'day');
            }
            return orderDate.isBetween(startDate, endDate, null, '[]')
        })
        if (tempOrder.length > 0) {
            console.log("Nhay zo day")
            dispatch(updateTemp(tempOrder))
        } else {
            dispatch(updateTemp(tempOrder))
            openNotification(false, "Không có đơn hàng nào vào" + daySearch.startDay + " - " + daySearch.endDay, "")
        }
    }
    //console.log(tempOrder)
    return (
        <>
            <Space className='flex justify-end mx-[40px]'>
                <DatePicker.RangePicker placeholder='Chọn ngày' onDe onChange={(dates) => hanldeSearch(dates)}></DatePicker.RangePicker>
            </Space>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={15}>
                    <Row>
                        <ChartRevenue dataset={getData(orders)} />
                    </Row>
                    <Row className='mt-4'>
                        <TableProductRevenue productOrders={products} filterCate={categories} />
                    </Row>
                </Col>
                <Col span={9} className=''>
                    <CardRevenue title="Tổng doanh thu" icon={<TransactionOutlined style={{ fontSize: "40px" }} />} content={formatCurrencyVND(totalPrice)} increase={30} color="#3f8600" />
                    <CardRevenue title="Tổng đơn hàng" icon={<ShoppingOutlined style={{ fontSize: "40px" }} />} content={(tempOrder?.length ?? 0) + " Đơn hàng"} increase={10} color="#3f8600" />
                    <CardRevenue title="Tổng người dùng" icon={<UserOutlined style={{ fontSize: "40px" }} />} content={totalUser + " Khách hàng"} increase={10} color="#3f8600" />
                </Col>
            </Row>
        </>


    )
}

export default RevernuePage