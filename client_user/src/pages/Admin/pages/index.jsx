import React, { useState } from 'react'

import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd'
import { items } from '../config/itemMenu.jsx'
const { Header, Content, Footer, Sider } = Layout



function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const currentKey = location.pathname.split("/").pop();
    const breadcrumbItems = findBreadcrumbPath(items, currentKey) || [];
    const navigate = useNavigate()

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const handleClickMenu = (key) => {
        navigate(key)
    }

    function findBreadcrumbPath(items, targetKey, path = []) {
        for (const item of items) {
            const newPath = [...path, item];
            if (item.key === targetKey) return newPath;
            if (item.children) {
                const childPath = findBreadcrumbPath(item.children, targetKey, newPath);
                if (childPath) return childPath;
            }
        }
        return null;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                style={{ width: '1200px' }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Typography.Title level={3} style={{ color: 'white', textAlign: 'center', marginTop: 16 }}>
                    Quản trị viên
                </Typography.Title>
                <Menu
                    theme='dark'
                    defaultOpenKeys={['product-list']}
                    selectedKeys={[currentKey]}
                    mode='inline'
                    items={items}
                    onClick={(e) => handleClickMenu(e.key)}
                />
            </Sider>
            <Layout >
                <Header style={{
                    padding: 0,
                    background: colorBgContainer,
                }}>
                    <div className="text-2xl font-bold text-gray-800">Quản trị viên</div>
                </Header>
                <Content
                    style={{
                        padding: "0 24px",
                        minHeight: 280, 
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                        hoverable={true}

                    >
                        <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
                        {breadcrumbItems.map(item => (
                            <Breadcrumb.Item key={item.key} onClick={() => handleClickMenu(item.key)}>{item.label}</Breadcrumb.Item>
                        ))}

                    </Breadcrumb>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Admin