import { FilterOutlined } from '@ant-design/icons';
import { Table, ConfigProvider, Typography } from 'antd';
import React, { useState } from 'react'
function formatCurrencyVND(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function TableProductRevenue({ productOrders, filterCate }) {
    const [sortInfo, setSortInfo] = useState({});
    const columns = [
        {
            width: 60,
            title: (<Typography className='text-center text-white'>STT</Typography>),
            dataIndex: 'index',
            render: text => <Typography className='text-white text-center'>{text}</Typography>

        },
        {
            width: 200,
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            ellipsis: false,
        },
        {
            title: (<Typography className='text-center text-white'>Giá tiền</Typography>),
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price,
            },
        },
        ,
        {
            title: (<Typography className='text-center text-white'>Số lương bán</Typography>),
            dataIndex: 'quantity',
            columnKey:'quantity', 
            render: text => <Typography className='text-white text-center'>{text}</Typography>,
            sorter: {
                compare: (a, b) => a.quantity - b.quantity,
            },
        },
        ,
        {
            title: (<Typography className='text-center text-white'>Doanh thu</Typography>),
            dataIndex: 'revenue',
            
            render: text => <Typography className='text-white'>{formatCurrencyVND(text)}</Typography>

        },
        {
            title: "Danh mục sản phẩm",
            dataIndex: 'categoryName',
            //filters: true,
            filterIcon: (filtered) => (
                <FilterOutlined style={{ color: 'white' }} />
            ),
            onFilter: (value, record) => {
                {
                    return value === record._idProduct.category
                }
            },
            filters: filterCate.map(item => ({ text: item.name, value: item._id })),
        },

    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: '#001529',
                        headerColor: '#fff',
                        rowHoverBg: "#001529",
                        headerSortHoverBg:"#001529",
                        headerSortActiveBg:"#001529",
                        bodySortBg:"#001529",
                        rowSelectedHoverBg:"#001529",
                        colorIcon:"white",
                        colorIconHover:"white"
                    },
                },
            }}
        >
            <Table
                columns={columns}
                style={{ height: '500px', overflowY: 'auto' }}
                dataSource={productOrders}
                className="custom-ant-table rounded-lg overflow-hidden w-full "
                rowClassName={() => 'text-white bg-[#001529]'}
                pagination={false}
                bordered
                onChange={(pagination, filters, sorter) => {
                    
                    setSortInfo(sorter);
                }}
            >

            </Table>
        </ConfigProvider>

    )
}

export default TableProductRevenue