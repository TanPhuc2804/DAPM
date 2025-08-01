import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from "../../../../assets/hooks/notification"
import { deleteStaff, fetchStaff, selectStaff } from '../../redux/staff/staff';
import { Button, Popconfirm, Table, Typography } from 'antd';
import axios from "axios"
import dayjs from 'dayjs';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { createStyles } from 'antd-style';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalStaff from '../../components/Staff/ModalStaff';
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

function StaffPage() {
    const dispatch = useDispatch()
    const staffs = useSelector(state => state.staffs.staffTemp)
    const [visibleModal, setVisibleModal] = useState(false)
    const stylesTable = useStyle().styles
    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <Typography className='text-center'>{text}</Typography>
        },
        {
            title: 'Họ Tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <Typography >{text}</Typography>
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            render: (text) => <Typography className='text-center'>{text}</Typography>
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text) => <Typography className='text-center'>{dayjs(text).format("DD-MM-YYYY")}</Typography>
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => <Typography className='text-center'>{text}</Typography>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'numberphone',
            key: 'numberphone',
            render: (text) => <Typography className='text-center'>{text}</Typography>
        },
        {
            title: 'Chức vụ',
            dataIndex: ['role', 'name'],
            key: 'role',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày vào việc',
            dataIndex: 'ngaylamviec',
            key: 'ngaylamviec',
            render: (text) => <Typography className='text-center'>{dayjs(text).format("DD-MM-YYYY")}</Typography>
        },
        {
            title: 'Hành động',
            fixed: "right",
            render: (_, record) => {
                return (
                    <div className='flex items-center justify-between'>
                        <EditOutlined
                            style={{ color: "#1677ff" }} className='hover: cursor-pointer'
                            onClick={() => handleEdit(record)}
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
                )
            }
        },
    ];
    useEffect(() => {
        axios.get("http://localhost:3000/staff/get-allstaff")
            .then(res => res.data)
            .then(data => {
                const staffsData = data.staffs.map(item => ({ ...item, key: item._id }))
                dispatch(fetchStaff(staffsData))

            })
            .catch(err => {
                console.log(err)
                openNotification(false, "Không lấy được dữ liệu", "")
            })
    }, [])

    const handleDelete = (idStaff) => {
        axios.delete(`http://localhost:3000/staff//delete-staff/${idStaff}`)
            .then(res=>res.data)
            .then(data=>{
                dispatch(deleteStaff({id:idStaff}))
                openNotification(true,"Xóa thành công","")
            })
            .catch(err=>{
                openNotification(false,"Không xóa được nhân viên",err.response?.data?.message ?? "Lỗi hệ thống")
            })
    }
    const handleEdit = (staff) => {
        dispatch(selectStaff(staff))
        setVisibleModal(true)
    }
    return (
        <>
            <Button
                className=' bg-blue-600 text-white flex my-2'
                type='primary'
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => { setVisibleModal(true) }}
            >
                <Typography.Text className='text-white font-semibold'>Thêm nhân viên</Typography.Text>
            </Button>
            <Table
                columns={columns}
                dataSource={staffs}
                scroll={{ x: 'max-content' }}
                className={stylesTable.customTable}
            >

            </Table>
            <ModalStaff visble={visibleModal} onClose={() => setVisibleModal(false)} />
        </>
    )
}

export default StaffPage