import { Button, Col, Popconfirm, Row, Table, Typography } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../../../assets/hooks/notification';
import { deleteVoucher, fetchDataVoucher, selectVoucher } from '../../redux/Voucher/voucherSlice';
import ModalVoucher from '../../components/Voucher/ModalVoucher';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function VoucherPage() {
    const dispatch = useDispatch()
    const vouchers = useSelector(state => state.voucher.vouchers)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3000/Voucher/get-allvoucher/")
            .then(res => res.data)
            .then(data => {
                const voucherData = data.vouchers.map((item, index) => {
                    return {
                        ...item,
                        index: index,
                        key: item._id
                    }
                })
                dispatch(fetchDataVoucher(voucherData))
            })
            .catch(err => {
                openNotification(false, "Không lấy được dữ liệu voucher!", "")
            })
    }, [])

    const columns = [
        {
            title: (<Typography className='text-center'>STT</Typography>),
            dataIndex: 'index',
            key: 'index',
            render: (text) => (<Typography className='text-center'>{text + 1}</Typography>)
        },
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'nameVoucher',
            key: 'nameVoucher',
        },
        {
            title: (<Typography className='text-center'>Giảm giá</Typography>),
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => (<Typography className='text-center'>{text}</Typography>)
        },

        {
            title: (<Typography className='text-center'>Số lượng</Typography>),
            dataIndex: 'quantity',
            key: 'address',
            render: (text) => (<Typography className='text-center'>{text}</Typography>)
        },
        {
            title: (<Typography className='text-center'>Ngày bắt đầu</Typography>),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (<Typography className='text-center'>{dayjs(text).format("DD-MM-YYYY")}</Typography>)
        }
        ,
        {
            title: (<Typography className='text-center'>Ngày kết thúc</Typography>),
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (text) => (<Typography className='text-center'>{dayjs(text).format("DD-MM-YYYY")}</Typography>)
        },
        {
            title: "Hành động",
            fixed: "right",
            render: (_, record) => {
                return (
                    <>
                        <div className='flex items-center justify-between w-[50px]'>
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


    const handleUpdate = (voucher) => {
        dispatch(selectVoucher(voucher))
        setVisible(true)
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/Voucher/delete-voucher/${id}`)
            .then(res => res.data)
            .then(data => {
                dispatch(deleteVoucher({id}))
                openNotification(true, "Xóa voucher thành công!", "")

            })
            .catch(err => {
                openNotification(false, "Xóa voucher không thành công!", "")
            })
    }

    return (
        <>
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
                dataSource={vouchers}
            >

            </Table>
            <ModalVoucher
                visible={visible}
                onClose={() => setVisible(false)}
            >

            </ModalVoucher>
        </>
    )
}

export default VoucherPage