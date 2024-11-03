import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreAddOutlined } from '@ant-design/icons';
const SideBar = () => {
  return (
    <div style={{ width: 250, backgroundColor: '#f0f2f5', height: '100vh', position: 'fixed' }}>
    <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
    >
        <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
            <Link to="/admin">Quản lý sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/admin/category">Quản lý danh mục sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/admin/vouchers">Quản lý vouchers</Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to="/admin/order">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="5">
            <Link to="/admin/revenue">Quản lý doanh thu</Link>
        </Menu.Item>
        <Menu.Item key="6">
            <Link to="/admin/customer">Quản lý khách hàng</Link>
        </Menu.Item>
        <Menu.Item key="7">
            <Link to="/admin/supplier">Quản lý nhà cung cấp</Link>
        </Menu.Item>
        <Menu.Item key="8">
            <Link to="/admin/staff">Quản lý nhân viên</Link>
        </Menu.Item>
    </Menu>
</div>
  )
}

export default SideBar